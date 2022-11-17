import { AnyAction } from 'redux';
import { useRouter } from 'next/router';
import { RootState } from 'redux/store';
import Form from 'react-bootstrap/Form';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons';

import { loader } from 'redux/reducer/Loader';
import { getExamResult, getTestResult } from 'redux/action/Student';

const StudentExamTable = (props: { searchData: string }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const studentExamData = useSelector(
    (state: RootState) => state?.student?.studentExam?.userExamList
  );

  const adminToken = useSelector((state: RootState) => state?.login?.loginData);

  studentExamData !== undefined &&
    localStorage.setItem(
      'reportExamName',
      JSON.stringify(studentExamData[0]?.examName)
    );

  const [mount, setMount] = useState(false);
  const [dataCount, setDataCount] = useState(15);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageWiseData, setPageWiseData] = useState([]);

  const endingIndex = dataCount * pageNumber;
  const startingIndex = dataCount * (pageNumber - 1);

  useEffect(() => {
    const dataToDisplay = studentExamData?.slice(startingIndex, endingIndex);
    setPageWiseData(dataToDisplay);
  }, [startingIndex, endingIndex, studentExamData]);

  useEffect(() => {
    setMount(true);
  }, []);

  const getSearch = () => {
    let list = studentExamData;
    if (props.searchData?.length > 0) {
      list = list?.filter((item: studentExamType) => {
        return Object?.keys(item)?.some(
          () =>
            item &&
            ((item?.examName &&
              item?.examName
                ?.toString()
                ?.toLowerCase()
                ?.startsWith(props.searchData?.toString()?.toLowerCase())) ||
              (item?.date &&
                item?.date
                  ?.toString()
                  ?.toLowerCase()
                  ?.startsWith(props.searchData?.toString()?.toLowerCase())))
        );
      });
    }
    return list;
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
          <div className='table-scroll-question'>
            <table className='customers'>
              <tr className='table-heading'>
                <td>
                  <div>S.No</div>
                </td>
                <td>
                  <div>Exam Name</div>
                </td>
                <td>
                  <div>Attempt Date</div>
                </td>
                <td>Action</td>
              </tr>
              {(props?.searchData?.length ? getSearch() : pageWiseData)?.map(
                (item: studentExamType, index: number) => {
                  return (
                    <>
                      <tr key={item?.documentId} className='table-data'>
                        <td>{(pageNumber - 1) * 15 + index + 1}</td>
                        <td>{item?.examName}</td>
                        <td>{item?.date?.substring(0, 10)}</td>
                        <td>
                          <div className='action-btn'>
                            <div
                              onClick={() => {
                                dispatch(loader(true));
                                dispatch(
                                  getExamResult(
                                    adminToken,
                                    item?.userId as string,
                                    router,
                                    item?.documentId as string
                                  ) as unknown as AnyAction
                                );
                                dispatch(
                                  getTestResult(
                                    adminToken,
                                    item?.userId as string,
                                    router,
                                    item?.documentId as string
                                  ) as unknown as AnyAction
                                );
                              }}
                            >
                              <div className='con'>
                                <div className='con-tooltip top'>
                                  <div className='sucess-icon'>
                                    <div className='edit-icon'>
                                      <FontAwesomeIcon
                                        icon={faExpandArrowsAlt}
                                      />
                                      <div className='tooltip '>
                                        <p>View Result</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
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
export default StudentExamTable;
