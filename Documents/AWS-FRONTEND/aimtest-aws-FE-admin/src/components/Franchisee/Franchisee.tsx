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
import { getFranchisees } from 'redux/action/Franchisee';
import FranchiseeTable from 'components/Table/FranchiseeTable';
import AddFranchisee from 'components/AddFranchisee/AddFranchisee';

const Franchisee = () => {
  const router = useRouter();
  const query = router.query;
  const dispatch = useDispatch();
  const cx = className.bind(styles);

  const load = useSelector((state: RootState) => state?.loader?.loader);
  const adminToken = useSelector((state: RootState) => state?.login?.loginData);
  const franchisee = useSelector(
    (state: RootState) => state?.franchisee?.franchiseeData?.franchisees
  );
  const userRole = useSelector((state: RootState) => state?.login?.userRole);

  localStorage.removeItem('parentFranchisee');
  localStorage.removeItem('franchiseeName');

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
    const dataToDisplay = franchisee?.slice(startingIndex, endingIndex);
    setPageWiseData(dataToDisplay);
  }, [startingIndex, endingIndex, franchisee]);

  useEffect(() => {
    if (
      userRole === 1 &&
      adminToken?.length > 0 &&
      query?.editId === undefined
    ) {
      dispatch(loader(true));
      dispatch(getFranchisees(adminToken) as unknown as AnyAction);
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
              <div className={cx('parent-section')}>
                <div>
                  <Loader open={load} />
                  <DeleteModal
                    modalName='Franchisee'
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
                  <div
                    className={cx('animate__animated animate__slideInRight')}
                  >
                    <div className={cx('card')}>
                      <div className={cx('card-table')}>
                        <h4>Franchisee</h4>
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
                                      getFranchisees(
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
                                Add Franchisee
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
                        <FranchiseeTable
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
            <AddFranchisee setAddFranchisee={setAddForm} />
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
export default Franchisee;
