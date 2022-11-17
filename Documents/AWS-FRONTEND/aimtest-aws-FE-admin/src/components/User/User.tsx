import { AnyAction } from 'redux';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh, faSearch } from '@fortawesome/free-solid-svg-icons';

import { RootState } from 'redux/store';
import styles from './index.module.css';
import className from 'classnames/bind';
import { getUsers } from 'redux/action/User';
import { loader } from 'redux/reducer/Loader';
import { Loader } from 'components/Loader/Loader';
import UserTable from 'components/Table/UserTable';
import UserModal from 'components/Modal/UserModal';
import { getSections } from 'redux/action/Section';
import { getUserRoles } from 'redux/action/UserRole';

const User = () => {
  const dispatch = useDispatch();
  const cx = className.bind(styles);

  const adminToken = useSelector((state: RootState) => state?.login?.loginData);
  const userData = useSelector(
    (state: RootState) => state?.user?.userData?.users
  );
  const userRole = useSelector((state: RootState) => state?.login?.userRole);
  const load = useSelector((state: RootState) => state?.loader?.loader);

  const [page, setPage] = useState(1);
  const [todo, setTodo] = useState('');
  const [search, setSearch] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const [deleteType, setDeleteType] = useState('');
  const [deleteCount, setDeleteCount] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [deleteValue, setDeleteValue] = useState('');
  const [values, setValues] = useState<string[]>([]);
  const [pageWiseData, setPageWiseData] = useState([]);

  const endingIndex = 15 * page;
  const startingIndex = 15 * (page - 1);

  useEffect(() => {
    const dataToDisplay = userData?.slice(startingIndex, endingIndex);
    setPageWiseData(dataToDisplay);
  }, [startingIndex, endingIndex, userData]);

  useEffect(() => {
    if (userRole === 1 && adminToken?.length > 0) {
      dispatch(loader(true)),
        dispatch(getUsers(adminToken) as unknown as AnyAction);
    }
  }, [adminToken, dispatch, userRole]);

  const searchList = (e: React.FormEvent<HTMLDivElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setSearch(value);
  };
  const Create = () => {
    dispatch(getSections(adminToken) as unknown as AnyAction);
    dispatch(getUserRoles(adminToken) as unknown as AnyAction);
    setModalShow(true);
    setTodo('create');
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
        <div className={cx('flex-style')}>
          <div className={cx('parent-section')}>
            <div>
              <Loader open={load} />

              <UserModal
                show={modalShow}
                onClose={() => setModalShow(false)}
                todo={todo}
                deleteValue={deleteValue}
                deleteType={deleteType}
                deleteCount={deleteCount}
                deleteId={values}
                pageNumber={
                  pageWiseData && pageWiseData?.length === values?.length
                    ? 1
                    : page
                }
                setPageNumber={setPageNumber}
              />
              <div className={cx('animate__animated animate__slideInRight')}>
                <div className={cx('card')}>
                  <div className={cx('card-table')}>
                    <div className={cx('mb-2')}>
                      <h4>User</h4>
                    </div>
                    <div className={cx('search-flex')}>
                      <div className='flex items-center justify-center'>
                        <div>
                          <div
                            className='search'
                            onChange={(e: FormEvent<HTMLDivElement>) =>
                              searchList(e)
                            }
                          >
                            <FontAwesomeIcon
                              icon={faSearch}
                              className={cx('has-search')}
                            />
                            <input
                              className='icon-box'
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
                                  getUsers(adminToken) as unknown as AnyAction
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
                            onClick={() => Create()}
                          >
                            Add User
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
                    <UserTable
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
        <div className='no-record'>
          {' '}
          <h3>Access Denied</h3>
        </div>
      )}
    </>
  );
};
export default User;
