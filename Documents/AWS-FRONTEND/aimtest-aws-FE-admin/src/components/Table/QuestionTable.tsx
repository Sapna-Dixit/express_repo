import axios from 'axios';
import Cookies from 'js-cookie';
import { AnyAction } from 'redux';
import parse from 'html-react-parser';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ChangeEvent, SetStateAction, useEffect, useState } from 'react';

import { RootState } from 'redux/store';
import { url } from 'components/Api/ApiUrl';
import { loader } from 'redux/reducer/Loader';
import { getClasses } from 'redux/action/Class';
import { getElements } from 'redux/action/Element';
import { getSections } from 'redux/action/Section';
import DeleteModal from 'components/Modal/DeleteModal';
import { getQuestion, getQuestions } from 'redux/action/Question';

const QuestionTable = (props: tablePropsType) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const questionPageTodo = Cookies.get('delete');

  const questionData = useSelector(
    (state: RootState) => state?.question?.questionData?.questions
  );
  const userRole = useSelector((state: RootState) => state?.login?.userRole);

  const numberOfRecord = useSelector(
    (state: RootState) => state?.question?.questionData?.totalNumberOfRecords
  );

  const adminToken = useSelector((state: RootState) => state?.login?.loginData);
  const load = useSelector((state: RootState) => state?.loader?.loader);

  const [todo, setTodo] = useState('');
  const [mount, setMount] = useState(false);
  const [dataCount, setDataCount] = useState(15);
  const [checkAll, setCheckAll] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [modalShow, setModalShow] = useState(false);
  const [id, setId] = useState<string | string[]>('');
  const [searchData, setSearchData] = useState(false);
  const [pageWiseData, setPageWiseData] = useState([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');

  const endingIndex = dataCount * pageNumber;
  const startingIndex = dataCount * (pageNumber - 1);
  const pageCount = numberOfRecord / dataCount;

  useEffect(() => {
    setPageWiseData(questionData);
  }, [startingIndex, endingIndex, questionData]);

  useEffect(() => {
    if (load === true) {
      setSelected([]);
      setCheckAll(false);
      props.setValues([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [load]);

  useEffect(() => {
    if (props.valueOfPage && props.valueOfPage > 1) {
      setPageNumber(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.valueOfPage, questionPageTodo !== undefined]);

  useEffect(() => {
    setMount(true);
  }, []);

  useEffect(() => {
    props.setPage(pageNumber);
  }, [pageNumber, props]);

  useEffect(() => {
    if (props.searchData?.length > 0) {
      setSearchData(true);
      dispatch(loader(true));
      axios
        .get(`${url}questions?search=${props.searchData}`, {
          headers: {
            Authorization: adminToken,
          },
        })
        .then((res) => {
          dispatch(loader(false));
          if (props.searchData.length > 2) {
            setPageWiseData(res.data.questions);
          } else {
            setPageWiseData(questionData);
          }
        })
        .catch((err) => {
          dispatch(loader(false));
          setDataCount(15);
          setSearchData(false);
          setPageWiseData(questionData);
          console.warn(err);
        });
    } else {
      setDataCount(15);
      setSearchData(false);
      setPageWiseData(questionData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.searchData]);

  const globalCheck = (e: ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.checked) {
      setSelected([]);
      props.setValues([]);
      setCheckAll(e.target.checked);
      pageWiseData?.map((item: questionDataType) =>
        setSelected(((pre: string[]) => [
          ...pre,
          item._id,
        ]) as unknown as string[])
      );
      pageWiseData?.map((item: questionDataType) =>
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
    dispatch(getQuestion(id, adminToken) as unknown as AnyAction);
    dispatch(getElements(adminToken) as unknown as AnyAction);
    dispatch(getSections(adminToken) as unknown as AnyAction);
    dispatch(getClasses(adminToken) as unknown as AnyAction);
  };

  const Edit = (id: string) => {
    setTodo('edit');
    selected?.length === 1 && selected[0] === id
      ? (setSelectedType('single'),
        setId(id),
        props.setAddForm && props.setAddForm(true),
        apiCalling(id),
        router.replace(`/question?editId=${id}`))
      : selected?.length > 1
      ? (setModalShow(true), setSelectedType('multiple'))
      : selected?.length === 0
      ? (setSelectedType('single'),
        setId(id),
        apiCalling(id),
        router.replace(`/question?editId=${id}`))
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
    adminToken?.length > 0 &&
      dispatch(loader(true)) &&
      dispatch(
        getQuestions(
          adminToken,
          dataCount,
          e.selected * dataCount
        ) as unknown as AnyAction
      );
    setPageNumber(e.selected + 1);
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    adminToken?.length > 0 &&
      dispatch(loader(true)) &&
      dispatch(
        getQuestions(
          adminToken,
          Number(e.target.value),
          0
        ) as unknown as AnyAction
      );
    setDataCount(Number(e.target.value));
    setPageNumber(1);
  };

  return (
    <div>
      {mount && (
        <>
          <DeleteModal
            modalName='Question'
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
                  <div>Question</div>
                </td>
                <td>
                  <div>Question Type</div>
                </td>
                <td>
                  <div>Section</div>
                </td>
                <td>
                  <div>Element</div>
                </td>
                <td>
                  <div>Class</div>
                </td>
                <td>
                  <div>Difficulty Level</div>
                </td>
                <td>Action</td>
              </tr>
              {pageWiseData?.map((item: questionDataType, index: number) => {
                return (
                  <>
                    <tr key={index} className='table-data'>
                      <td>
                        <input
                          type='checkbox'
                          className='select-box-table'
                          onChange={(e) => localCheck(e, item._id as string)}
                          checked={selected.includes(item._id as string)}
                        />
                      </td>
                      <td>
                        {props.searchData?.length > 0
                          ? index + 1
                          : (pageNumber - 1) * dataCount + index + 1}
                      </td>
                      <td className='wrap'>
                        {item.question === undefined
                          ? ''
                          : parse(item?.question)}
                      </td>
                      <td>{item?.type}</td>
                      <td>{item?.section?.name}</td>
                      <td>{item?.element?.name}</td>
                      <td>{item?.class?.name}</td>
                      <td>{item?.difficultyLevel}</td>
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
              })}
            </table>
            {(pageWiseData === undefined || pageWiseData?.length === 0) && (
              <div className='no-record'>
                {' '}
                <h3>No Record Found</h3>
              </div>
            )}
          </div>
          <div className='py-2'>
            <div className='d-flex justify-content-end'>
              {searchData === false && (
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
                forcePage={props?.searchData?.length > 0 ? 0 : pageNumber - 1}
                onPageChange={(event) => {
                  handlePageChange(event);
                }}
                pageCount={Math.ceil(
                  searchData
                    ? pageWiseData?.length / pageWiseData?.length
                    : pageCount
                )}
                previousLabel='Previous'
                disableInitialCallback={true}
                nextLabel='Next'
                marginPagesDisplayed={5}
                pageRangeDisplayed={5}
                containerClassName='pagination'
                activeClassName='active'
                pageLinkClassName='page-link'
                breakLinkClassName='page-link'
                nextLinkClassName='page-link'
                previousLinkClassName='page-link'
                pageClassName='page-item'
                breakClassName='page-item'
                nextClassName='page-item'
                previousClassName='page-item'
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default QuestionTable;
