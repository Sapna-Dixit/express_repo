import axios from 'axios';
import Cookies from 'js-cookie';
import { AnyAction } from 'redux';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ChangeEvent, SetStateAction, useEffect, useState } from 'react';

import { RootState } from 'redux/store';
import styles from './index.module.css';
import className from 'classnames/bind';
import { url } from 'components/Api/ApiUrl';
import {
  errorMessage,
  errorr,
  statusUpdate,
  success,
} from 'components/Toaster/ToasterMessage';
import { loader } from 'redux/reducer/Loader';
import showToaster from 'components/Toaster/Toaster';
import { getExam, getExams } from 'redux/action/Exam';
import DeleteModal from 'components/Modal/DeleteModal';
import { getClasses } from 'redux/action/Class';
import { getElements } from 'redux/action/Element';
import { getPackages } from 'redux/action/Package';
import { getSections } from 'redux/action/Section';

const ExamTable = (props: tablePropsType) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cx = className.bind(styles);
  const examPageTodo = Cookies.get('delete');

  const examData = useSelector(
    (state: RootState) => state?.exam?.examData?.exams
  );
  const load = useSelector((state: RootState) => state?.loader?.loader);
  const userRole = useSelector((state: RootState) => state?.login?.userRole);
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
    const dataToDisplay = examData?.slice(startingIndex, endingIndex);
    setPageWiseData(dataToDisplay);
  }, [startingIndex, endingIndex, examData]);

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
  }, [props.valueOfPage, examPageTodo !== undefined]);

  useEffect(() => {
    setMount(true);
  }, []);

  useEffect(() => {
    props?.setPage(pageNumber);
  }, [pageNumber, props]);

  const getSearch = () => {
    let list = examData;
    if (props.searchData?.length > 0) {
      list = list?.filter((item: examValues) => {
        return Object?.keys(item)?.some(
          () =>
            item &&
            ((item.mode &&
              item.mode
                ?.toString()
                ?.toLowerCase()
                ?.startsWith(props.searchData?.toString()?.toLowerCase())) ||
              (item.name &&
                item.name
                  ?.toString()
                  ?.toLowerCase()
                  ?.startsWith(props.searchData?.toString()?.toLowerCase())) ||
              (item.package.name &&
                item.package.name
                  ?.toString()
                  ?.toLowerCase()
                  ?.startsWith(props.searchData?.toString()?.toLowerCase())) ||
              (item.examDuration &&
                item.examDuration
                  ?.toString()
                  ?.toLowerCase()
                  ?.startsWith(props.searchData?.toString()?.toLowerCase())) ||
              (item.startDate &&
                item.startDate
                  ?.toString()
                  ?.toLowerCase()
                  ?.startsWith(props.searchData?.toString()?.toLowerCase())) ||
              (item.class.name &&
                item.class.name
                  ?.toString()
                  ?.toLowerCase()
                  ?.startsWith(props.searchData?.toString()?.toLowerCase())) ||
              (item.endDate &&
                item.endDate
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
      pageWiseData?.map((item: examValues) =>
        setSelected(((pre: string[]) => [
          ...pre,
          item._id,
        ]) as unknown as string[])
      );
      pageWiseData?.map((item: examValues) =>
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

  const apiCalling = (id: string) => {
    dispatch(getExam(id, adminToken) as unknown as AnyAction);
    dispatch(getPackages(adminToken) as unknown as AnyAction);
    dispatch(getElements(adminToken) as unknown as AnyAction);
    dispatch(getSections(adminToken) as unknown as AnyAction);
    dispatch(getClasses(adminToken) as unknown as AnyAction);
  };

  const Edit = (id: string) => {
    setTodo('edit');
    selected?.length === 1 && selected[0] === id
      ? (setSelectedType('single'),
        setId(id),
        apiCalling(id),
        router.replace(`/exam?editId=${id}`))
      : selected?.length > 1
      ? (setModalShow(true), setSelectedType('multiple'))
      : selected?.length === 0
      ? (setSelectedType('single'),
        setId(id),
        apiCalling(id),
        router.replace(`/exam?editId=${id}`))
      : (setModalShow(true), setSelectedType('incorrect'));
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
        `${url}exam/status/${id}`,
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
        setPageWiseData(newData);
        showToaster(success, statusUpdate);
        dispatch(loader(false));
        dispatch(getExams(adminToken) as unknown as AnyAction);
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
          <DeleteModal
            modalName='Exam'
            show={modalShow}
            onClose={() => setModalShow(false)}
            todo={todo}
            deleteValue={selectedType}
            editValue={selectedType}
            editId={id as string}
            deleteId={id as string}
            pageNumber={
              (pageWiseData !== undefined && pageWiseData?.length === 1
                ? 1
                : pageNumber) as number
            }
            setPageNumber={setPageNumber}
          />
          <div className='table-scroll-question'>
            <table className='customers'>
              <tr className='table-heading'>
                <td className='select-all'>
                  <input
                    className='select-box-table'
                    type='checkbox'
                    onChange={(e) => globalCheck(e)}
                    checked={checkAll}
                  />
                </td>
                <td>
                  <div>S.No</div>
                </td>
                <td>
                  <div>Mode</div>
                </td>
                <td>
                  <div>Name</div>
                </td>
                <td>
                  <div>Package</div>
                </td>
                <td>
                  <div>Class</div>
                </td>
                <td>
                  <div>Section</div>
                </td>
                <td>
                  <div>Element</div>
                </td>
                <td>
                  <div>Exam Duration</div>
                </td>
                <td>
                  <div>Attempt Count</div>
                </td>
                <td>
                  <div>Start Date</div>
                </td>
                <td>
                  <div>End Date</div>
                </td>
                <td>
                  <div>Status</div>
                </td>
                <td>Action</td>
              </tr>
              {(props?.searchData?.length ? getSearch() : pageWiseData)?.map(
                (item: examValues, index: number) => {
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
                        <td>{item?.mode}</td>
                        <td>{item?.name}</td>
                        <td>{item?.package?.name}</td>
                        <td>{item?.class?.name}</td>
                        <td className='wrap'>
                          {item?.options?.map((v, i) =>
                            i === item.options?.length - 1
                              ? v.section?.name
                              : `${v.section?.name} | `
                          )}
                        </td>
                        <td className='wrap'>
                          {item?.options?.map((v, i) =>
                            i === item.options?.length - 1
                              ? v.element?.name
                              : `${v.element?.name} | `
                          )}
                        </td>
                        <td>{item?.examDuration} Min</td>
                        <td>{item?.attemptCount}</td>
                        <td>{item?.startDate.substring(0, 10)}</td>
                        <td>{item?.endDate.substring(0, 10)}</td>
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
                                    <div className='sucess-icon'>
                                      <div className='edit-icon'>
                                        <FontAwesomeIcon icon={faEdit} />
                                        <div className='tooltip '>
                                          <p>Edit</p>
                                        </div>
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
                                  <div className='sucess-icon'>
                                    <div className='delete-icon'>
                                      <FontAwesomeIcon icon={faTrash} />
                                      <div className='tooltip '>
                                        <p>Delete</p>
                                      </div>
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
            <div className='d-flex justify-content-end'>
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
export default ExamTable;
