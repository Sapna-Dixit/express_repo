import { AnyAction } from 'redux';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh, faSearch } from '@fortawesome/free-solid-svg-icons';

import { RootState } from 'redux/store';
import styles from './index.module.css';
import className from 'classnames/bind';
import { loader } from 'redux/reducer/Loader';
import { Loader } from 'components/Loader/Loader';
import { getPackages } from 'redux/action/Package';
import PackageModal from 'components/Modal/PackageModal';
import PackageTable from 'components/Table/PackageTable';

const Package = () => {
  const dispatch = useDispatch();
  const cx = className.bind(styles);

  const load = useSelector((state: RootState) => state?.loader?.loader);
  const packageData = useSelector(
    (state: RootState) => state?.package?.packageData?.packages
  );
  const userRole = useSelector((state: RootState) => state?.login?.userRole);
  const adminToken = useSelector((state: RootState) => state?.login?.loginData);

  const [page, setPage] = useState(1);
  const [todo, setTodo] = useState('');
  const [search, setSearch] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const [deleteType, setDeleteType] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [deleteCount, setDeleteCount] = useState(0);
  const [deleteValue, setDeleteValue] = useState('');
  const [values, setValues] = useState<string[]>([]);
  const [pageWiseData, setPageWiseData] = useState([]);

  const endingIndex = 15 * page;
  const startingIndex = 15 * (page - 1);

  useEffect(() => {
    const dataToDisplay = packageData?.slice(startingIndex, endingIndex);
    setPageWiseData(dataToDisplay);
  }, [startingIndex, endingIndex, packageData]);

  useEffect(() => {
    if (userRole === 1 && adminToken?.length > 0) {
      dispatch(loader(true)),
        dispatch(getPackages(adminToken) as unknown as AnyAction);
    }
  }, [adminToken, dispatch, userRole]);

  const searchList = (e: { target: { value: string } }) => {
    const value = e.target.value;
    setSearch(value);
  };

  const Create = () => {
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
            <div className={cx('text-btn')}>
              <Loader open={load} />

              <PackageModal
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
                    <div className={cx('mb-2')}>
                      <h4>Package</h4>
                    </div>
                    <div className={cx('search-flex')}>
                      <div>
                        <div className={cx('search')}>
                          <FontAwesomeIcon
                            icon={faSearch}
                            className={cx('has-search')}
                          />
                          <input
                            className={cx('icon-box')}
                            placeholder='Search '
                            onChange={searchList}
                          />
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
                                  getPackages(
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
                            onClick={() => Create()}
                          >
                            Add Package
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
                    <PackageTable
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
export default Package;
