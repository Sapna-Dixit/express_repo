import { AnyAction } from 'redux';
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
import { getSections } from 'redux/action/Section';
import SectionModal from 'components/Modal/SectionModal';
import SectionTable from 'components/Table/SectionTable';
import RestoreLevelModal from 'components/Modal/RestoreLevelModal';

const Section = () => {
  const dispatch = useDispatch();
  const cx = className.bind(styles);

  const load = useSelector((state: RootState) => state?.loader?.loader);
  const adminToken = useSelector((state: RootState) => state?.login?.loginData);
  const sectionData = useSelector(
    (state: RootState) => state?.section?.sectionData?.sections
  );
  const restore = useSelector((state: RootState) => state?.restore?.restoreId);

  const [page, setPage] = useState(1);
  const [todo, setTodo] = useState('');
  const [search, setSearch] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const [deleteType, setDeleteType] = useState('');
  const [deleteCount, setDeleteCount] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [values, setValues] = useState<string[]>([]);
  const [deleteValue, setDeleteValue] = useState('');
  const [pageWiseData, setPageWiseData] = useState([]);
  const [restoreLevel, setRestoreLevel] = useState(false);

  const endingIndex = 15 * page;
  const startingIndex = 15 * (page - 1);

  useEffect(() => {
    if (restore?.length > 0) {
      setRestoreLevel(true);
    }
  }, [dispatch, restore]);

  useEffect(() => {
    const dataToDisplay = sectionData?.slice(startingIndex, endingIndex);
    setPageWiseData(dataToDisplay);
  }, [startingIndex, endingIndex, sectionData]);

  useEffect(() => {
    adminToken?.length > 0 && dispatch(loader(true)),
      dispatch(getSections(adminToken) as unknown as AnyAction);
  }, [adminToken, dispatch]);

  const searchList = (e: React.FormEvent<HTMLDivElement>) => {
    const value = (e.target as HTMLInputElement).value;
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
      <div className={cx('flex-style')}>
        <div className={cx('parent-section')}>
          <div>
            <div>
              <Loader open={load} />
              <RestoreLevelModal
                title='Restore Section'
                modalName='Section'
                restoreId={restore}
                content='Section Exist But Soft Deleted. Do You Want To Restore The Data'
                show={restoreLevel}
                onClose={() => setRestoreLevel(false)}
              />
              <SectionModal
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
                      <h4>Section</h4>
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
                                  getSections(
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
                            Add Section
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
                    <SectionTable
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
      </div>
    </>
  );
};
export default Section;
