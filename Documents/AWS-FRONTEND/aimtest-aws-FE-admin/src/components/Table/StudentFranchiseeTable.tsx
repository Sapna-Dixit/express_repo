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
import { getClasses } from 'redux/action/Class';
import DeleteModal from 'components/Modal/DeleteModal';
import { getStudentFranchisee } from 'redux/action/StudentFranchisee';

const StudentFranchiseeTable = (props: tablePropsType) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const franchiseeTodo = Cookies.get('delete');
  const parentFranchisee = JSON.parse(
    localStorage.getItem('parentFranchisee') as string
  );

  const studentFranchisee = useSelector(
    (state: RootState) =>
      state?.studentFranchisee?.studentFranchiseeData?.studentFranchisees
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
    const dataToDisplay = studentFranchisee?.slice(startingIndex, endingIndex);
    const newData = dataToDisplay?.filter(
      (item: { franchiseeProvider: { _id: string } }) =>
        item?.franchiseeProvider?._id === parentFranchisee?._id
    );
    setPageWiseData(newData);
  }, [startingIndex, endingIndex, studentFranchisee, parentFranchisee?._id]);

  useEffect(() => {
    if (load === true) {
      setSelected([]);
      setCheckAll(false);
      props.setValues([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [load]);

  useEffect(() => {
    props.valueOfPage === 1 && setPageNumber(props.valueOfPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.valueOfPage, franchiseeTodo !== undefined]);

  useEffect(() => {
    setMount(true);
  }, []);

  useEffect(() => {
    props.setPage(pageNumber);
  }, [pageNumber, props]);

  const getSearch = () => {
    let list = studentFranchisee;
    if (props.searchData?.length > 0) {
      list = list?.filter((item: studentfranchiseeType) => {
        return Object?.keys(item)?.some(
          () =>
            item &&
            ((item.name &&
              item.name
                ?.toString()
                ?.toLowerCase()
                ?.startsWith(props.searchData?.toString()?.toLowerCase())) ||
              (item.parentsName &&
                item.parentsName
                  ?.toString()
                  ?.toLowerCase()
                  ?.startsWith(props.searchData?.toString()?.toLowerCase())) ||
              (item.address &&
                item.address?.label
                  ?.toString()
                  ?.toLowerCase()
                  ?.startsWith(props.searchData?.toString()?.toLowerCase())) ||
              (item.class.name &&
                item.class.name
                  ?.toString()
                  ?.toLowerCase()
                  ?.startsWith(props.searchData?.toString()?.toLowerCase())) ||
              (item.phoneNumber &&
                item.phoneNumber
                  ?.toString()
                  ?.toLowerCase()
                  ?.startsWith(props.searchData?.toString()?.toLowerCase())) ||
              (item.fees &&
                item.fees
                  ?.toString()
                  ?.toLowerCase()
                  ?.startsWith(props.searchData?.toString()?.toLowerCase())) ||
              (item.dateOfExam &&
                item.dateOfExam
                  ?.toString()
                  ?.toLowerCase()
                  ?.startsWith(props.searchData?.toString()?.toLowerCase())) ||
              (item.attempt &&
                item.attempt
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
      pageWiseData?.map((item: studentfranchiseeType) =>
        setSelected(((pre: string[]) => [
          ...pre,
          item._id,
        ]) as unknown as string[])
      );
      pageWiseData?.map((item: studentfranchiseeType) =>
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
    dispatch(getStudentFranchisee(id, adminToken) as unknown as AnyAction);
    dispatch(getClasses(adminToken) as unknown as AnyAction);
  };

  const Edit = (id: string) => {
    setTodo('edit');
    selected?.length === 1 && selected[0] === id
      ? (setSelectedType('single'),
        setId(id),
        apiCalling(id),
        router.replace(`/sub/franchisee?editId=${id}`))
      : selected?.length > 1
      ? (setModalShow(true), setSelectedType('multiple'))
      : selected?.length === 0
      ? (setSelectedType('single'),
        setId(id),
        apiCalling(id),
        router.replace(`/sub/franchisee?editId=${id}`))
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

  return (
    <div>
      {mount && (
        <>
          <DeleteModal
            modalName='Student Franchisee'
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
          <div className='table-scroll-subfranchisee'>
            <table className='customers'>
              <tr className='table-heading'>
                <td>
                  <input
                    className='select-box-table'
                    type='checkbox'
                    onChange={(e) => globalCheck(e)}
                    checked={checkAll}
                  />
                </td>
                <td>S No.</td>
                <td>
                  <div>Name of Student</div>
                </td>
                <td>
                  <div>Parents Name</div>
                </td>
                <td>
                  <div>Address</div>
                </td>
                <td>
                  <div>Class</div>
                </td>
                <td>Phone Number</td>
                <td>Fees</td>
                <td>Date Of Exam</td>
                <td>Actual Amount</td>
                <td>Discount Amount</td>
                <td>Credit Amount</td>
                <td>Debit Amount</td>
                <td>Attempt</td> <td>Action</td>
              </tr>
              {(props?.searchData?.length ? getSearch() : pageWiseData)?.map(
                (item: studentfranchiseeType, index: number) => {
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
                        <td>{item.name}</td>
                        <td>{item.parentsName}</td>
                        <td>{item.address?.label}</td>
                        <td>{item.class.name}</td>
                        <td>{item.phoneNumber}</td>
                        <td>{item?.fees}</td>
                        <td>{item.dateOfExam.substring(0, 10)}</td>
                        <td>{item?.actualAmount}</td>
                        <td>{item?.discountedAmount}</td>
                        <td>{item?.creditedAmount}</td>
                        <td>{item?.debitedAmount}</td>
                        <td>{item.attempt}</td>
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
export default StudentFranchiseeTable;
