import { AnyAction } from 'redux';
import { useRouter } from 'next/router';
import className from 'classnames/bind';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh, faSearch } from '@fortawesome/free-solid-svg-icons';

import { RootState } from 'redux/store';
import styles from './index.module.css';
import { loader } from 'redux/reducer/Loader';
import { Loader } from 'components/Loader/Loader';
import DeleteModal from 'components/Modal/DeleteModal';
import { getStudentFranchisees } from 'redux/action/StudentFranchisee';
import StudentFranchiseeTable from 'components/Table/StudentFranchiseeTable';
import AddStudentFranchisee from 'components/AddStudentFranchisee/AddStudentFranchisee';

const StudentFranchisee = () => {
  const router = useRouter();
  const query = router.query;
  const dispatch = useDispatch();
  const cx = className.bind(styles);

  const load = useSelector((state: RootState) => state?.loader?.loader);
  const adminToken = useSelector((state: RootState) => state?.login?.loginData);
  const studentFranchisee = useSelector(
    (state: RootState) =>
      state?.studentFranchisee?.studentFranchiseeData?.studentSubFranchisees
  );
  const userRole = useSelector((state: RootState) => state?.login?.userRole);

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
    const dataToDisplay = studentFranchisee?.slice(startingIndex, endingIndex);
    setPageWiseData(dataToDisplay);
  }, [startingIndex, endingIndex, studentFranchisee]);

  useEffect(() => {
    if (userRole === 1 && adminToken?.length > 0 && query?.editId === undefined) {
      dispatch(loader(true)),
        dispatch(getStudentFranchisees(adminToken) as unknown as AnyAction);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminToken, dispatch, userRole]);

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
      {userRole === 1 ? (
        <div>
          {addForm === false ? (
            <div className={cx('flex-style')}>
              <div>
                <div>
                  <Loader open={load} />
                  <DeleteModal
                    modalName='Student Franchisee'
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
                  <div>
                    <div>
                      <div>
                        <div className={cx('search-flex')}>
                          <div
                            className={cx('flex items-center justify-center')}
                          >
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
                                  adminToken?.length > 0 &&
                                    dispatch(loader(true)),
                                    dispatch(
                                      getStudentFranchisees(
                                        adminToken
                                      ) as unknown as AnyAction
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
                                onClick={() => setAddForm(true)}
                              >
                                Add Student
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
                        <StudentFranchiseeTable
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
            <AddStudentFranchisee setAddStudentFranchisee={setAddForm} />
          )}
        </div>
      ) : (
        <div className='no-record'>
          {' '}
          <h3>Access Denied</h3>
        </div>
      )}
    </>
  );
};
export default StudentFranchisee;
