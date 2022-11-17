import * as Yup from 'yup';
import {
  ChangeEvent,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import Cookies from 'js-cookie';
import { AnyAction } from 'redux';
import Form1 from 'react-bootstrap/Form';
import ReactPaginate from 'react-paginate';
import {
  faArrowLeft,
  faEdit,
  faRefresh,
  faSearch,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { loader } from 'redux/reducer/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  getSignTestLevels,
  postSignTestLevel,
  putSignTestLevel,
} from 'redux/action/Level/SignTest';
import { RootState } from 'redux/store';
import styles from './index.module.css';
import className from 'classnames/bind';
import DeleteModal from 'components/Modal/DeleteModal';
import RestoreLevelModal from 'components/Modal/RestoreLevelModal';

const SignTest = ({ tabName }: { tabName: string }) => {
  const dispatch = useDispatch();
  const cx = className.bind(styles);
  const testPageTodo = Cookies.get('delete');

  const token = useSelector((state: RootState) => state?.login?.loginData);

  const testData = useSelector(
    (state: RootState) =>
      state?.signTestLevel?.signTestLevelData?.signTestLevels
  );
  const userRole = useSelector((state: RootState) => state?.login?.userRole);

  const load = useSelector((state: RootState) => state?.loader?.loader);
  const numberOfRecord = useSelector(
    (state: RootState) =>
      state?.signTestLevel?.signTestLevelData?.numberOfRecord
  );
  const restore = useSelector((state: RootState) => state?.restore?.restoreId);

  const [todo, setTodo] = useState('');
  const [search, setSearch] = useState('');
  const [display, setDisplay] = useState(false);
  const [dataCount, setDataCount] = useState(15);
  const [checkAll, setCheckAll] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [deleteType, setDeleteType] = useState('');
  const [deleteCount, setDeleteCount] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [deleteValue, setDeleteValue] = useState('');
  const [values, setValues] = useState<string[]>([]);
  const [id, setId] = useState<string | string[]>('');
  const [pageWiseData, setPageWiseData] = useState([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const [restoreSignLevel, setRestoreSignLevel] = useState(false);
  const [editData, setEditData] = useState<TestDataType | string>('');

  const pageCount = numberOfRecord / dataCount;
  const endingIndex = dataCount * pageNumber;
  const startingIndex = dataCount * (pageNumber - 1);

  useEffect(() => {
    if (tabName === 'signtest' && restore?.length > 0) {
      setRestoreSignLevel(true);
    }
  }, [dispatch, restore, tabName]);

  useEffect(() => {
    const dataToDisplay = testData?.slice(startingIndex, endingIndex);
    const newData = dataToDisplay?.sort(
      (item: { level: number }, item1: { level: number }) =>
        item.level - item1.level
    );
    setPageWiseData(newData);
  }, [startingIndex, endingIndex, testData]);

  useEffect(() => {
    token?.length > 0 && dispatch(loader(true)),
      dispatch(getSignTestLevels(token) as unknown as AnyAction);
  }, [dispatch, token]);
  useEffect(() => {
    if (load === true) {
      setDeleteType('');
      setDeleteCount(0);
      setSelected([]);
      setCheckAll(false);
      setValues([]);
      setSelectedType('');
      setDeleteValue('');
    }
  }, [load]);

  useEffect(() => {
    setPageNumber(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testPageTodo !== undefined]);

  const globalCheck = (e: ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.checked) {
      setSelected([]);
      setValues([]);
      setCheckAll(e.target.checked);
      pageWiseData?.map((item: TestDataType) =>
        setSelected(((pre: string[]) => [
          ...pre,
          item._id,
        ]) as unknown as string[])
      );
      pageWiseData?.map((item: TestDataType) =>
        setValues(((pre: string[]) => [
          ...pre,
          item._id,
        ]) as unknown as string[])
      );
    } else {
      setSelected([]);
      setCheckAll(e.target.checked);
      setValues([]);
    }
  };
  const localCheck = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    if (e?.target?.checked) {
      setSelected((prev) => [...prev, id]);
      setValues(((prev: string[]) => [...prev, id]) as unknown as string[]);
    } else {
      const a = selected?.filter((dt) => dt != id);
      setSelected(a);
      setValues(a);
    }
  };

  const Edit = (item: TestDataType) => {
    setTodo('edit');
    setDisplay(true);
    setEditData(item);
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
  const globalDelete = () => {
    setModalShow(true);
    setTodo('delete');
    setDeleteType('global');
    values?.length === 0
      ? setDeleteValue('zero')
      : values?.length >= 1 &&
        (setDeleteValue('multiple'), setDeleteCount(values?.length));
  };
  const initialValues: TestValues = {
    level:
      todo === 'edit' ? (editData as unknown as { level: number }).level : '',
    noOfSigns:
      todo === 'edit'
        ? (editData as { noOfSigns: string | number }).noOfSigns
        : '',
    marks:
      todo === 'edit' ? (editData as { marks: string | number }).marks : '',
    timeDuration:
      todo === 'edit'
        ? (editData as { timeDuration: string | number }).timeDuration
        : '',
    totalTestTime:
      todo === 'edit'
        ? (editData as { totalTestTime: string | number }).totalTestTime
        : '',
  };
  const handlePageChange = (e: { selected: number }) => {
    setPageNumber(e.selected + 1);
  };
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setDataCount(Number(e.target.value));
    setPageNumber(1);
  };

  const searchList = (e: React.FormEvent<HTMLDivElement>) => {
    const value = (e?.target as HTMLInputElement)?.value;
    setSearch(value);
  };

  const getSearch = () => {
    let list = testData;
    if (search?.length > 0) {
      list = list?.filter((item: TestDataType) => {
        return Object?.keys(item)?.some(
          () =>
            item &&
            ((item.level &&
              item.level
                ?.toString()
                ?.toLowerCase()
                ?.startsWith(search?.toString()?.toLowerCase())) ||
              (item.timeDuration &&
                item.timeDuration
                  ?.toString()
                  ?.concat(' Sec')
                  ?.toLowerCase()
                  ?.startsWith(search?.toString()?.toLowerCase())) ||
              (item.level &&
                item.level
                  ?.toString()
                  ?.toLowerCase()
                  ?.startsWith(search?.toString()?.toLowerCase())) ||
              (item.noOfSigns &&
                item.noOfSigns
                  ?.toString()
                  ?.toLowerCase()
                  ?.startsWith(search?.toString()?.toLowerCase())) ||
              (item.totalTestTime &&
                item.totalTestTime
                  ?.toString()
                  ?.concat(' Min')
                  ?.toLowerCase()
                  ?.startsWith(search?.toString()?.toLowerCase())))
        );
      });
    }
    return list;
  };

  return (
    <>
      <DeleteModal
        modalName='Level Sign Test'
        show={modalShow}
        onClose={() => setModalShow(false)}
        todo={todo}
        deleteValue={
          deleteType === 'global' && deleteValue ? deleteValue : selectedType
        }
        editValue={selectedType}
        editId={id as string}
        deleteId={deleteType === 'global' ? values : (id as string)}
        deleteType={deleteType}
        deleteCount={deleteCount}
        pageNumber={
          (pageWiseData !== undefined && pageWiseData?.length === 1
            ? 1
            : pageNumber) as number
        }
        setPageNumber={setPageNumber}
      />
      <div className={cx('flex-style')}>
        <div>
          <div className={cx('text-btn')}>
            <Formik
              enableReinitialize={true}
              initialValues={initialValues}
              validationSchema={
                todo !== 'Reset' &&
                Yup.object().shape({
                  level: Yup.number().required('Required'),
                  noOfSigns: Yup.number().required('Required'),
                  marks: Yup.number().required('Required'),
                  timeDuration: Yup.number().required('Required'),
                  totalTestTime: Yup.number().required('Required'),
                })
              }
              onSubmit={(values, { resetForm }) => {
                if (todo === 'edit') {
                  dispatch(loader(true));
                  dispatch(
                    putSignTestLevel(
                      (editData as { _id: string })._id,
                      values,
                      token,
                      setDisplay,
                      resetForm
                    ) as unknown as AnyAction
                  );
                } else if (todo === 'Reset') {
                  dispatch(loader(true));
                  resetForm();
                  setDisplay(false);
                } else {
                  dispatch(
                    postSignTestLevel(
                      values,
                      token,
                      setDisplay,
                      resetForm
                    ) as unknown as AnyAction
                  );
                }
              }}
            >
              {({ values, handleSubmit, resetForm }) => (
                <>
                  <RestoreLevelModal
                    title='Restore Level'
                    modalName='Level Sign Test'
                    restoreId={restore}
                    resetForm={resetForm}
                    navigate={setDisplay}
                    content='Level Exist But Soft Deleted. Do You Want To Restore The Data'
                    show={restoreSignLevel}
                    onClose={() => setRestoreSignLevel(false)}
                  />
                  {display ? (
                    <Form onSubmit={handleSubmit}>
                      <div
                        className={cx(
                          'animate__animated animate__slideInRight'
                        )}
                      >
                        <div className='table-height'>
                          <div>
                            <div>
                              <div className={cx('card-flex')}>
                                <Button
                                  className={cx('btn-icon-breadcrumb')}
                                  type='submit'
                                  onClick={() => {
                                    setTodo('Reset');
                                    setDisplay(false);
                                    resetForm();
                                  }}
                                >
                                  <FontAwesomeIcon
                                    icon={faArrowLeft}
                                    className={cx('back-img')}
                                  />
                                </Button>
                                <h4>Sign Test</h4>
                              </div>
                            </div>

                            <div className='row'>
                              <div className='col-sm-8'>
                                <h6 className={cx('label-style')}>Level</h6>
                              </div>
                              <div className='col-sm-4'>
                                <h6 className={cx('label-style')}>
                                  {' '}
                                  No of Signs
                                </h6>
                              </div>
                            </div>
                            <Row className={cx('mb-2')}>
                              <div className='col-8'>
                                <div className='row '>
                                  <div className='col-6'>
                                    <input
                                      className={cx('form-control')}
                                      disabled
                                      value='Level'
                                    />
                                  </div>

                                  <div className='col-6'>
                                    <Field
                                      className={cx('form-control')}
                                      type='number'
                                      placeholder='Enter Level Number'
                                      value={values.level}
                                      min='1'
                                      name='level'
                                    />
                                    <ErrorMessage
                                      className='error-message'
                                      component='span'
                                      name='level'
                                    />
                                  </div>
                                </div>
                              </div>

                              <Col sm={4}>
                                <Field
                                  value={values.noOfSigns}
                                  name='noOfSigns'
                                  type='number'
                                  min='1'
                                  className={cx('form-control')}
                                  placeholder=' No of Signs'
                                />
                                <ErrorMessage
                                  className='error-message'
                                  component='span'
                                  name='noOfSigns'
                                />
                              </Col>
                            </Row>
                            <Row className={cx('mb-2')}>
                              <Col sm={4}>
                                <h6 className={cx('label-style')}>Marks</h6>
                                <Field
                                  value={values.marks}
                                  name='marks'
                                  type='number'
                                  min='1'
                                  className={cx('form-control')}
                                  placeholder='Marks'
                                />
                                <ErrorMessage
                                  className='error-message'
                                  component='span'
                                  name='marks'
                                />
                              </Col>
                              <Col sm={4}>
                                <h6 className={cx('label-style')}>
                                  {' '}
                                  Sign Display Duration In Sec
                                </h6>
                                <Field
                                  value={values.timeDuration}
                                  name='timeDuration'
                                  type='number'
                                  min='1'
                                  className={cx('form-control')}
                                  placeholder=' Time Duration'
                                />
                                <ErrorMessage
                                  className='error-message'
                                  component='span'
                                  name='timeDuration'
                                />
                              </Col>
                              <Col sm={4}>
                                <h6 className={cx('label-style')}>
                                  {' '}
                                  Total Test Duration In Min
                                </h6>
                                <Field
                                  value={values.totalTestTime}
                                  name='totalTestTime'
                                  type='number'
                                  min='1'
                                  className={cx('form-control')}
                                  placeholder=' Time Duration'
                                />
                                <ErrorMessage
                                  className='error-message'
                                  component='span'
                                  name='totalTestTime'
                                />
                              </Col>
                            </Row>
                            <div className={cx('save')}>
                              <Button
                                style={{
                                  marginRight: '8px',
                                }}
                                className={cx('close-btn')}
                                type='button'
                                onClick={() => {
                                  setDisplay(false);
                                  resetForm();
                                }}
                              >
                                Cancel
                              </Button>
                              <div>
                                <Button
                                  className={cx('modalsave-btn')}
                                  type='submit'
                                >
                                  Save
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Form>
                  ) : (
                    <div>
                      <Form onSubmit={handleSubmit}>
                        <div
                          className={cx(
                            'animate__animated animate__slideInRight'
                          )}
                        >
                          <div>
                            <div>
                              <div className={cx('add-flex')}>
                                <div></div>
                              </div>
                              <div className={cx('search-flex')}>
                                <div
                                  className={cx(
                                    'flex items-center justify-center'
                                  )}
                                >
                                  <div>
                                    <div
                                      className={cx('search')}
                                      onChange={(
                                        e: FormEvent<HTMLDivElement>
                                      ) => searchList(e)}
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
                                        token?.length > 0 &&
                                          dispatch(loader(true)),
                                          dispatch(
                                            getSignTestLevels(
                                              token
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
                                      onClick={() => {
                                        setDisplay(true);
                                        setTodo('create');
                                      }}
                                    >
                                      Add Sign Test Level
                                    </Button>
                                  </div>
                                  <div className={cx('add-btn')}>
                                    <Button
                                      className={cx('delete-btn')}
                                      onClick={() => globalDelete()}
                                    >
                                      Delete
                                    </Button>
                                  </div>
                                </div>
                              </div>
                              <div className={cx(!display && 'table-level')}>
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
                                    <td>
                                      <div>S.No.</div>
                                    </td>
                                    <td>
                                      <div>Level</div>
                                    </td>
                                    <td>
                                      <div>No of Signs</div>
                                    </td>
                                    <td>Marks</td>
                                    <td>Sign Display Duration</td>
                                    <td>Total Time Duration</td>
                                    <td>Action</td>
                                  </tr>
                                  {(search?.length
                                    ? getSearch()
                                    : pageWiseData
                                  )?.map(
                                    (item: TestDataType, index: number) => {
                                      return (
                                        <>
                                          <tr
                                            key={item?._id}
                                            className='table-data'
                                          >
                                            <td>
                                              <input
                                                type='checkbox'
                                                className='select-box-table'
                                                onChange={(e) =>
                                                  localCheck(
                                                    e,
                                                    item?._id as string
                                                  )
                                                }
                                                checked={selected.includes(
                                                  item?._id as string
                                                )}
                                              />
                                            </td>
                                            <td>
                                              {(pageNumber - 1) * 15 +
                                                index +
                                                1}
                                            </td>
                                            <td>{item?.level}</td>
                                            <td>{item?.noOfSigns}</td>
                                            <td>{item?.marks}</td>
                                            <td>{item?.timeDuration} Sec</td>
                                            <td>{item?.totalTestTime} Min</td>
                                            <td>
                                              <div className='action-btn'>
                                                {userRole === 1 && (
                                                  <div
                                                    className='edit-icon'
                                                    onClick={() => {
                                                      Edit(item);
                                                    }}
                                                  >
                                                    <div className='con'>
                                                      <div className='con-tooltip top'>
                                                        <div className='sucess-icon'>
                                                          <FontAwesomeIcon
                                                            icon={faEdit}
                                                          />
                                                          <div className='tooltip '>
                                                            <p>Edit</p>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                )}
                                                <div
                                                  className='delete-icon'
                                                  onClick={() => {
                                                    Delete(item._id as string);
                                                  }}
                                                >
                                                  <div className='con'>
                                                    <div className='con-tooltip top'>
                                                      <div className='sucess-icon'>
                                                        <FontAwesomeIcon
                                                          icon={faTrash}
                                                        />
                                                        <div className='tooltip '>
                                                          <p>Delete</p>
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
                                  pageWiseData?.length === 0) && (
                                  <div className='no-record'>
                                    {' '}
                                    <h3>No Record Found</h3>
                                  </div>
                                )}
                              </div>
                              <div className='py-2'>
                                <div className='d-flex  justify-content-end'>
                                  <div className='me-3'>
                                    <Form1.Select
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
                                    </Form1.Select>
                                  </div>
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
                                    pageCount={Math.ceil(pageCount)}
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
                            </div>
                          </div>
                        </div>
                      </Form>
                    </div>
                  )}
                </>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignTest;
