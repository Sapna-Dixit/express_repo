import { AnyAction } from 'redux';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh, faSearch } from '@fortawesome/free-solid-svg-icons';

import { RootState } from 'redux/store';
import styles from './index.module.css';
import className from 'classnames/bind';
import { getExams } from 'redux/action/Exam';
import { loader } from 'redux/reducer/Loader';
import { getClasses } from 'redux/action/Class';
import AddExam from 'components/AddExam/AddExam';
import { Loader } from 'components/Loader/Loader';
import { getPackages } from 'redux/action/Package';
import ExamTable from 'components/Table/ExamTable';
import { getElements } from 'redux/action/Element';
import { getSections } from 'redux/action/Section';
import DeleteModal from 'components/Modal/DeleteModal';

const Exam = () => {
  const router = useRouter();
  const query = router.query;
  const dispatch = useDispatch();
  const cx = className.bind(styles);

  const load = useSelector((state: RootState) => state?.loader?.loader);
  const adminToken = useSelector((state: RootState) => state?.login?.loginData);
  const examData = useSelector(
    (state: RootState) => state?.exam?.examData?.exams
  );

  const [page, setPage] = useState(1);
  const [todo, setTodo] = useState('');
  const [search, setSearch] = useState('');
  const [addForm, setAddForm] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [deleteType, setDeleteType] = useState('');
  const [deleteCount, setDeleteCount] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [values, setValues] = useState<string[]>([]);
  const [deleteValue, setDeleteValue] = useState('');
  const [pageWiseData, setPageWiseData] = useState([]);

  const endingIndex = 15 * page;
  const startingIndex = 15 * (page - 1);

  useEffect(() => {
    const dataToDisplay = examData?.slice(startingIndex, endingIndex);
    setPageWiseData(dataToDisplay);
  }, [startingIndex, endingIndex, examData]);

  useEffect(() => {
    if (query?.editId === undefined && adminToken?.length > 0) {
      dispatch(loader(true)),
        dispatch(getExams(adminToken) as unknown as AnyAction);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminToken, dispatch]);

  useEffect(() => {
    if (query?.editId !== undefined && query.editId?.length > 0) {
      setAddForm(true);
    }
  }, [addForm, query.editId, router]);

  const searchList = (e: React.FormEvent<HTMLDivElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setSearch(value);
  };

  const Delete = () => {
    setModalShow(true);
    setTodo('delete');
    setDeleteType('global');
    values?.length === 0
      ? setDeleteValue('zero')
      : values?.length >= 1 &&
        (setDeleteValue('multiple'), setDeleteCount(values?.length));
  };
  
  return (
    <>
      {addForm === false ? (
        <div className={cx('flex-style')}>
          <div className={cx('parent-section')}>
            <div>
              <Loader open={load} />

              <DeleteModal
                modalName='Exam'
                show={modalShow}
                onClose={() => setModalShow(false)}
                todo={todo}
                deleteValue={deleteValue}
                deleteType={deleteType}
                deleteCount={deleteCount}
                deleteId={values}
                pageNumber={
                  pageWiseData !== undefined &&
                  pageWiseData?.length === values?.length
                    ? 1
                    : page
                }
                setPageNumber={setPageNumber}
              />
              <div className={cx('animate__animated animate__slideInRight')}>
                <div className={cx('card')}>
                  <div className={cx('card-table')}>
                    <div>
                      <h4>Exam</h4>
                    </div>
                    <div className={cx('search-flex')}>
                      <div className={cx('flex items-center justify-center')}>
                        <div>
                          <div
                            className={cx('search')}
                            onChange={(e: FormEvent<HTMLDivElement>) =>
                              searchList(e)
                            }
                          >
                            <FontAwesomeIcon
                              icon={faSearch}
                              className={cx('has-search')}
                            />
                            <input
                              className={cx('icon-box')}
                              placeholder='Search term'
                            />
                          </div>
                        </div>
                      </div>
                      <div className={cx('section-btn')}>
                        <div className={cx('add-btn')}>
                          <Button
                            className={cx('sucess-btn')}
                            variant='success'
                            onClick={() => {
                              adminToken?.length > 0 && dispatch(loader(true)),
                                dispatch(
                                  getExams(adminToken) as unknown as AnyAction
                                );
                            }}
                            title='Refresh'
                          >
                            <FontAwesomeIcon icon={faRefresh} />
                          </Button>
                        </div>
                        <div className={cx('add-btn')}>
                          <Button
                            className={cx('sucess-btn')}
                            variant='success'
                            onClick={() => {
                              setAddForm(true);
                              adminToken?.length > 0 &&
                                dispatch(
                                  getPackages(
                                    adminToken
                                  ) as unknown as AnyAction
                                ),
                                dispatch(
                                  getElements(
                                    adminToken
                                  ) as unknown as AnyAction
                                ),
                                dispatch(
                                  getSections(
                                    adminToken
                                  ) as unknown as AnyAction
                                ),
                                dispatch(
                                  getClasses(adminToken) as unknown as AnyAction
                                );
                            }}
                          >
                            Add Exam
                          </Button>
                        </div>
                        <div className={cx('add-btn')}>
                          <Button
                            className={cx('delete-btn')}
                            onClick={() => Delete()}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                    <ExamTable
                      setValues={setValues}
                      setPage={setPage}
                      searchData={search}
                      valueOfPage={pageNumber}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <AddExam setAddExam={setAddForm} />
      )}
    </>
  );
};
export default Exam;
