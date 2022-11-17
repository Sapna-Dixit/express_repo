import Cookies from 'js-cookie';
import { AnyAction } from 'redux';
import { Form } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ChangeEvent, SetStateAction, useEffect, useState } from 'react';

import { RootState } from 'redux/store';
import styles from './index.module.css';
import className from 'classnames/bind';
import UserModal from 'components/Modal/UserModal';
import { getSections } from 'redux/action/Section';
import { getUserRoles } from 'redux/action/UserRole';
import { getUsers, getUser } from 'redux/action/User';

import axios from 'axios';
import { url } from 'components/Api/ApiUrl';
import {
  errorMessage,
  errorr,
  success,
  statusUpdate,
} from 'components/Toaster/ToasterMessage';
import { loader } from 'redux/reducer/Loader';
import showToaster from 'components/Toaster/Toaster';

const UserTable = (props: tablePropsType) => {
  const dispatch = useDispatch();
  const cx = className.bind(styles);
  const userPageTodo = Cookies.get('delete');

  const userData = useSelector(
    (state: RootState) => state?.user?.userData?.users
  );
  const userRole = useSelector((state: RootState) => state?.login?.userRole);
  const load = useSelector((state: RootState) => state?.loader?.loader);
  const adminToken = useSelector((state: RootState) => state?.login?.loginData);

  const [todo, setTodo] = useState('');
  const [mount, setMount] = useState(false);
  const [dataCount, setDataCount] = useState(15);
  const [checkAll, setCheckAll] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [modalShow, setModalShow] = useState(false);
  const [id, setId] = useState<string | string[]>('');
  const [pageWiseData, setPageWiseData] = useState([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');

  const endingIndex = dataCount * pageNumber;
  const startingIndex = dataCount * (pageNumber - 1);

  useEffect(() => {
    const dataToDisplay = userData?.slice(startingIndex, endingIndex);
    setPageWiseData(dataToDisplay);
  }, [startingIndex, endingIndex, userData]);

  useEffect(() => {
    if (load === true) {
      setSelected([]);
      setCheckAll(false);
      props.setValues([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [load]);

  useEffect(() => {
    props?.valueOfPage === 1 && setPageNumber(props.valueOfPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.valueOfPage, userPageTodo !== undefined]);

  useEffect(() => {
    setMount(true);
  }, []);

  useEffect(() => {
    props?.setPage(pageNumber);
  }, [pageNumber, props]);

  const getSearch = () => {
    let list = userData;
    if (props.searchData?.length > 0) {
      list = list?.filter((item: { userName?: string; name?: string }) => {
        return Object?.keys(item)?.some(
          () =>
            item &&
            ((item.userName &&
              item.userName
                ?.toString()
                ?.toLowerCase()
                ?.startsWith(props.searchData?.toString()?.toLowerCase())) ||
              (item.name &&
                item.name
                  ?.toString()
                  ?.toLowerCase()
                  ?.startsWith(props.searchData?.toString()?.toLowerCase())))
        );
      });
    }
    return list;
  };

  const globalCheck = (e: ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.checked) {
      setSelected([]);
      props.setValues([]);
      setCheckAll(e.target.checked);
      pageWiseData?.map((item: userDataType) =>
        setSelected(((pre: string[]) => [
          ...pre,
          item._id,
        ]) as unknown as string[])
      );
      pageWiseData?.map((item: userDataType) =>
        props.setValues(((pre: string[]) => [
          ...pre,
          item._id,
        ]) as unknown as string[])
      );
    } else {
      setSelected([]);
      setCheckAll(e.target.checked);
      props.setValues([]);
    }
  };

  const localCheck = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    if (e?.target?.checked) {
      setSelected((prev) => [...prev, id]);
      props.setValues(((prev: string[]) => [
        ...prev,
        id,
      ]) as unknown as string[]);
    } else {
      const a = selected?.filter((dt) => dt != id);
      setSelected(a);
      props.setValues(a);
    }
  };

  const Edit = (id: string) => {
    dispatch(getSections(adminToken) as unknown as AnyAction);
    dispatch(getUserRoles(adminToken) as unknown as AnyAction);
    setModalShow(true);
    setTodo('edit');
    selected?.length === 1 && selected[0] === id
      ? (setSelectedType('single'),
        setId(id),
        dispatch(getUser(id, adminToken) as unknown as AnyAction))
      : selected?.length > 1
      ? setSelectedType('multiple')
      : selected?.length === 0
      ? (setSelectedType('single'),
        setId(id),
        dispatch(getUser(id, adminToken) as unknown as AnyAction))
      : setSelectedType('incorrect');
  };

  const Delete = (id: SetStateAction<string>) => {
    setModalShow(true);
    setTodo('delete');
    selected?.length === 1 && selected[0] === id
      ? (setSelectedType('single'), setId([id]))
      : selected?.length > 1
      ? setSelectedType('multiple')
      : selected?.length === 0
      ? (setSelectedType('single'), setId([id as string]))
      : setSelectedType('incorrect');
  };

  const handlePageChange = (e: { selected: number }) => {
    setPageNumber(e.selected + 1);
  };
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setDataCount(Number(e.target.value));
    setPageNumber(1);
  };
  
  const UpdateStatus = (id: string, status: boolean, index: number) => {
    dispatch(loader(true));
    axios
      .patch(
        `${url}user/status/${id}`,
        {
          status: status,
        },
        {
          headers: {
            Authorization: adminToken,
          },
        }
      )
      .then(() => {
        const newData = JSON.parse(JSON.stringify(pageWiseData));
        newData[index].status = !newData[index]?.status;
        dispatch(loader(false));
        setPageWiseData(newData);
        showToaster(success, statusUpdate);
        dispatch(getUsers(adminToken) as unknown as AnyAction);
      })
      .catch(() => {
        dispatch(loader(false));
        console.warn('Something Went Wrong');
        showToaster(errorr, errorMessage);
      });
  };
  return (
    <div>
      {mount && (
        <>
          <UserModal
            show={modalShow}
            onClose={() => setModalShow(false)}
            todo={todo}
            deleteValue={selectedType}
            editValue={selectedType}
            editId={id as string}
            deleteId={id as string}
            pageNumber={
              (pageWiseData && pageWiseData?.length === 1
                ? 1
                : pageNumber) as number
            }
            setPageNumber={setPageNumber}
          />
          <div className='table-scroll-height'>
            <table className='customers'>
              <tr className='table-heading'>
                <td>
                  <input
                    type='checkbox'
                    className='select-box-table'
                    onChange={(e) => globalCheck(e)}
                    checked={checkAll}
                  />{' '}
                </td>
                <td>
                  <div>S.No</div>
                </td>
                <td>
                  <div>User Role</div>
                </td>
                <td>
                  <div>User Name</div>
                </td>
                <td>
                  <div>Name</div>
                </td>
                <td>
                  <div>Email</div>
                </td>
                <td>
                  <div>Phone Number</div>
                </td>
                <td>
                  <div>Section Name</div>
                </td>
                <td>
                  <div>Status</div>
                </td>
                <td>
                  <div>Action</div>
                </td>
              </tr>
              {(props?.searchData?.length ? getSearch() : pageWiseData)?.map(
                (item: userDataType, index: number) => {
                  return (
                    <>
                      <tr key={item._id} className='table-data'>
                        <td>
                          <input
                            type='checkbox'
                            className='select-box-table'
                            onChange={(e) => localCheck(e, item._id as string)}
                            checked={selected.includes(item._id as string)}
                          />
                        </td>
                        <td>{(pageNumber - 1) * 15 + index + 1}</td>
                        <td>{item?.role?.name}</td>
                        <td>{item?.userName}</td>
                        <td>{item?.name}</td>
                        <td>{item?.email}</td>
                        <td>{item?.mobile}</td>
                        <td>
                          {item?.sections?.map((v, i) =>
                            i === item?.sections?.length - 1
                              ? v.name
                              : `${v.name} | `
                          )}
                        </td>
                        <td
                          onClick={() => {
                            UpdateStatus(
                              item._id as string,
                              !item?.status,
                              index
                            );
                          }}
                        >
                          <div
                            className={cx(
                              item?.status === true
                                ? 'badge badge-success'
                                : 'badge badge-danger'
                            )}
                          >
                            {item?.status === true
                              ? 'Activated'
                              : 'Deactivated'}{' '}
                          </div>
                        </td>
                        <td>
                          <div className='action-btn'>
                            {userRole === 1 && (
                              <div
                                onClick={() => {
                                  Edit(item._id as string);
                                }}
                              >
                                <div className='con'>
                                  <div className='con-tooltip top'>
                                    <div className={cx('edit-icon')}>
                                      <FontAwesomeIcon icon={faEdit} />
                                      <div className='tooltip '>
                                        <p>Edit</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>{' '}
                              </div>
                            )}
                            <div
                              onClick={() => {
                                Delete(item._id as string);
                              }}
                            >
                              <div className='con'>
                                <div className='con-tooltip top'>
                                  <div className={cx('delete-icon')}>
                                    <FontAwesomeIcon icon={faTrash} />
                                    <div className='tooltip '>
                                      <p>Delete</p>
                                    </div>
                                  </div>
                                </div>
                              </div>{' '}
                            </div>
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                }
              )}
            </table>
            {(pageWiseData === undefined ||
              pageWiseData?.length === 0 ||
              getSearch()?.length === 0) && (
              <div className='no-record'>
                {' '}
                <h3>No Record Found</h3>
              </div>
            )}
          </div>
          <div className='py-2'>
            <div className='d-flex  justify-content-end'>
              {props?.searchData?.length === 0 && (
                <div className='me-3'>
                  <Form.Select
                    size='sm'
                    className='entites-box'
                    onChange={(e) => handleChange(e)}
                  >
                    <option selected>15</option>
                    <option>30</option>
                    <option>60</option>
                    <option>100</option>
                    <option>150</option>
                    <option>200</option>
                  </Form.Select>
                </div>
              )}
              <ReactPaginate
                initialPage={0}
                previousLabel='Previous'
                nextLabel='Next'
                forcePage={pageNumber - 1}
                pageClassName='page-item'
                pageLinkClassName='page-link'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                breakLabel='...'
                breakClassName='page-item'
                breakLinkClassName='page-link'
                pageCount={Math.ceil(getSearch()?.length / dataCount)}
                marginPagesDisplayed={3}
                pageRangeDisplayed={5}
                onPageChange={(event) => {
                  handlePageChange(event);
                }}
                containerClassName='pagination'
                activeClassName='active'
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default UserTable;
