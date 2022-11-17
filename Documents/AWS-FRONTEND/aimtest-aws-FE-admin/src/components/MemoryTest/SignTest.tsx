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
  faPlus,
  faRefresh,
  faSearch,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FieldArray, Form, Formik, FormikErrors, FormikTouched } from 'formik';

import {
  getSignTestRanges,
  postSignTestRange,
  putSignTestRange,
} from 'redux/action/Test/SignTest';
import { RootState } from 'redux/store';
import styles from './index.module.css';
import className from 'classnames/bind';
import { classList } from './GetClassList';
import { loader } from 'redux/reducer/Loader';
import { getClasses } from 'redux/action/Class';
import { Loader } from 'components/Loader/Loader';
import DeleteModal from 'components/Modal/DeleteModal';
import { SelectField } from 'components/Select/Select';
import { getSignTestLevels } from 'redux/action/Level/SignTest';
import RestoreLevelModal from 'components/Modal/RestoreLevelModal';

const SignTest = () => {
  const dispatch = useDispatch();
  const cx = className.bind(styles);
  const testPageTodo = Cookies.get('delete');

  const token = useSelector((state: RootState) => state?.login?.loginData);

  const testData = useSelector(
    (state: RootState) => state?.signTest?.signTestData?.signTests
  );
  const load = useSelector((state: RootState) => state?.loader?.loader);
  const numberOfRecord = useSelector(
    (state: RootState) => state?.signTest?.signTestData?.numberOfRecord
  );
  const userRole = useSelector((state: RootState) => state?.login?.userRole);
  const restore = useSelector((state: RootState) => state?.restore?.restoreId);
  const classData = useSelector(
    (state: RootState) => state?.class?.classData?.classes
  );
  const signTestLevel = useSelector(
    (state: RootState) =>
      state?.signTestLevel?.signTestLevelData?.signTestLevels
  );

  const [todo, setTodo] = useState('');
  const [count, setCount] = useState(1);
  const [search, setSearch] = useState('');
  const [editData, setEditData] = useState([]);
  const [display, setDisplay] = useState(false);
  const [dataCount, setDataCount] = useState(15);
  const [checkAll, setCheckAll] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [deleteType, setDeleteType] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [deleteCount, setDeleteCount] = useState(0);
  const [isDisable, setIsDisable] = useState([true]);
  const [values, setValues] = useState<string[]>([]);
  const [deleteValue, setDeleteValue] = useState('');
  const [id, setId] = useState<string | string[]>('');
  const [pageWiseData, setPageWiseData] = useState([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [restoreLevel, setRestoreLevel] = useState(false);
  const [levelList, setLevelList] = useState<[] | [][]>([]);
  const [selectedType, setSelectedType] = useState<string>('');

  const pageCount = numberOfRecord / dataCount;
  const endingIndex = dataCount * pageNumber;
  const startingIndex = dataCount * (pageNumber - 1);

  useEffect(() => {
    if (restore?.length > 0) {
      setRestoreLevel(true);
    }
  }, [dispatch, restore]);

  useEffect(() => {
    const dataToDisplay = testData?.slice(startingIndex, endingIndex);
    setPageWiseData(dataToDisplay);
  }, [startingIndex, endingIndex, testData]);

  useEffect(() => {
    if (token?.length > 0) {
      dispatch(loader(true));
      dispatch(getSignTestLevels(token) as unknown as AnyAction);
      dispatch(getSignTestRanges(token) as unknown as AnyAction);
      dispatch(getClasses(token) as unknown as AnyAction);
    }
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

  const dataClass = classData?.map((item: { name: string }) => {
    return { ...item, label: item?.name, value: item?.name };
  });

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

  const Edit = (item: rangeData) => {
    setTodo('edit');
    setDisplay(true);
    setEditData([item] as never);
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
  const initialValues: signTestRange = {
    signTestDetail:
      todo === 'edit'
        ? editData
        : [
            {
              class: { name: '', _id: '' },
              from: { level: '', _id: '' },
              to: { level: '', _id: '' },
            },
          ],
  };
  const handlePageChange = (e: { selected: number }) => {
    setPageNumber(e.selected + 1);
  };
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setDataCount(Number(e?.target.value));
    setPageNumber(1);
  };

  const searchList = (e: React.FormEvent<HTMLDivElement>) => {
    const value = (e?.target as HTMLInputElement).value;
    setSearch(value);
  };

  const getSearch = () => {
    let list = testData;
    if (search?.length > 0) {
      list = list?.filter((item: rangeData) => {
        return Object?.keys(item)?.some(
          () =>
            item &&
            // (item?.from?.level &&
            // item?.from?.level
            //   ?.toString()
            //   .padStart(7, `Level `)
            //   ?.concat(` - Level ${item?.to?.level}`)
            //   ?.toLowerCase()
            //   ?.startsWith(search?.toString().lowerCase())) ||
            // (item?.to?.level &&
            //   item?.to?.level
            //     ?.toString()
            //     .padStart(7, `Level `)
            //     ?.toLowerCase()
            //     ?.startsWith(search?.toString()?.toLowerCase())) ||
            item?.class?.name &&
            item?.class?.name
              ?.toString()
              ?.toLowerCase()
              ?.startsWith(search?.toString()?.toLowerCase())
        );
      });
    }
    return list;
  };
  const levelListOptions = (digit: number, index: number) => {
    const filteredList = signTestLevel?.filter(
      (item: { level: number; _id: string }) => {
        return item?.level > digit;
      }
    );
    if (levelList[index]?.length === 0 || levelList[index]?.length > 0) {
      levelList[index] = filteredList;
    } else {
      setLevelList((prev) => [...prev, filteredList]);
    }
  };
  return (
    <>
      <Loader open={load} />
      <DeleteModal
        modalName='Sign Test'
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
        <div className={cx('parent-section')}>
          <div className={cx('text-btn')}>
            <Formik
              enableReinitialize={true}
              initialValues={initialValues}
              validationSchema={
                todo !== 'Reset' &&
                Yup.object().shape({
                  signTestDetail: Yup.array().of(
                    Yup.object().shape({
                      class: Yup.object().shape({
                        name: Yup.string().required('Required'),
                      }),
                      from: Yup.object().shape({
                        level: Yup.string().required('Required'),
                      }),
                      to: Yup.object().shape({
                        level: Yup.string().required('Required'),
                      }),
                    })
                  ),
                })
              }
              onSubmit={(values, { resetForm }) => {
                if (todo === 'edit') {
                  dispatch(loader(true));
                  dispatch(
                    putSignTestRange(
                      values.signTestDetail[0]._id as string,
                      values.signTestDetail[0] as rangeData,
                      token,
                      setDisplay,
                      resetForm
                    ) as unknown as AnyAction
                  );
                } else if (todo === 'Reset') {
                  resetForm();
                  setDisplay(false);
                } else {
                  dispatch(loader(true));
                  dispatch(
                    postSignTestRange(
                      values,
                      token,
                      setDisplay,
                      resetForm
                    ) as unknown as AnyAction
                  );
                }
              }}
            >
              {({
                values,
                handleSubmit,
                setFieldTouched,
                setFieldValue,
                errors,
                touched,
                resetForm,
              }) => (
                <>
                  <RestoreLevelModal
                    title='Restore Sign Test'
                    modalName='Sign Test'
                    restoreId={restore}
                    resetForm={resetForm}
                    navigate={setDisplay}
                    content='Sign Test Exist But Soft Deleted. Do You Want To Restore The Data'
                    show={restoreLevel}
                    onClose={() => setRestoreLevel(false)}
                  />
                  {display ? (
                    <Form onSubmit={handleSubmit}>
                      <div
                        className={cx(
                          'animate__animated animate__slideInRight'
                        )}
                      >
                        <div className={cx('card')}>
                          <div className={cx('card-table')}>
                            <div className=''>
                              <div className={cx('card-flex')}>
                                <Button
                                  className={cx('btn-icon-breadcrumb')}
                                  type='submit'
                                  onClick={() => {
                                    setTodo('Reset');
                                    setCount(1);
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
                            <FieldArray
                              name='signTestDetail'
                              render={(arrayHelpers) => (
                                <div className='table-height border-0'>
                                  {values?.signTestDetail?.map(
                                    (friend: unknown, index: number) => (
                                      <div key={index}>
                                        <div className='row'>
                                          <div className='col'>
                                            <h6 className={cx('test-back')}>
                                              Class
                                            </h6>
                                            <SelectField
                                              name={`signTestDetail[${index}].class.name`}
                                              options={classList(dataClass)}
                                              placeholder='Select Class'
                                              value={
                                                values?.signTestDetail[index]
                                                  ?.class?.name
                                              }
                                              onChange={(e) =>
                                                setFieldValue(
                                                  `signTestDetail[${index}].class`,
                                                  e &&
                                                    (e as SelectType)?.label &&
                                                    (e as SelectType)?.label
                                                      ?.length > 0
                                                    ? {
                                                        _id: (e as SelectType)
                                                          ?._id,
                                                        name: (e as SelectType)
                                                          ?.label,
                                                      }
                                                    : {
                                                        _id: '',
                                                        name: '',
                                                      }
                                                )
                                              }
                                              onBlur={setFieldTouched}
                                              error={
                                                errors?.signTestDetail !==
                                                  undefined &&
                                                (
                                                  errors?.signTestDetail[
                                                    index
                                                  ] as FormikErrors<{
                                                    class: {
                                                      _id: string;
                                                      name: string;
                                                    };
                                                  }>
                                                )?.class?.name
                                              }
                                              touched={
                                                touched?.signTestDetail !==
                                                  undefined &&
                                                touched?.signTestDetail[index]
                                                  ?.class?.name
                                              }
                                            />
                                          </div>
                                          <div className='col'>
                                            <h6 className={cx('test-back')}>
                                              From Level
                                            </h6>

                                            <div className='row'>
                                              <div className='col pe-0'>
                                                <SelectField
                                                  name={`signTestDetail[${index}].from.level`}
                                                  isSearchable={false}
                                                  options={signTestLevel
                                                    ?.map(
                                                      (item: {
                                                        level: number;
                                                        _id: string;
                                                      }) => {
                                                        return {
                                                          label: item?.level,
                                                          _id: item?._id,
                                                        };
                                                      }
                                                    )
                                                    ?.sort(
                                                      (
                                                        a: { label: number },
                                                        b: { label: number }
                                                      ) =>
                                                        Number(a?.label) -
                                                        Number(b?.label)
                                                    )}
                                                  placeholder='Select Level'
                                                  value={
                                                    values?.signTestDetail[
                                                      index
                                                    ]?.from?.level as string
                                                  }
                                                  onChange={(e) => {
                                                    setFieldValue(
                                                      `signTestDetail[${index}].to`,
                                                      {
                                                        level: '',
                                                        _id: '',
                                                      }
                                                    ),
                                                      ((e as SelectType)
                                                        .label as unknown as number) >
                                                        0 &&
                                                        ((isDisable[index] =
                                                          false),
                                                        levelListOptions(
                                                          Number(
                                                            (e as SelectType)
                                                              .label
                                                          ),
                                                          index
                                                        ));
                                                    (e as SelectType).label ===
                                                      undefined &&
                                                      ((isDisable[index] =
                                                        true),
                                                      setFieldValue(
                                                        `signTestDetail[${index}].to`,
                                                        e &&
                                                          (e as SelectType)
                                                            ?.label
                                                          ? {
                                                              _id: (
                                                                e as SelectType
                                                              )?._id,
                                                              level: (
                                                                e as SelectType
                                                              )?.label,
                                                            }
                                                          : {
                                                              _id: '',
                                                              level: '',
                                                            }
                                                      ),
                                                      setLevelList(
                                                        levelList?.slice(
                                                          0,
                                                          index
                                                        )
                                                      ));
                                                    setFieldValue(
                                                      `signTestDetail[${index}].from`,
                                                      e &&
                                                        (e as SelectType)?.label
                                                        ? {
                                                            _id: (
                                                              e as SelectType
                                                            )?._id,
                                                            level: (
                                                              e as SelectType
                                                            )?.label,
                                                          }
                                                        : {
                                                            _id: '',
                                                            level: '',
                                                          }
                                                    );
                                                  }}
                                                  onBlur={setFieldTouched}
                                                  error={
                                                    errors.signTestDetail !==
                                                      undefined &&
                                                    (
                                                      errors?.signTestDetail[
                                                        index
                                                      ] as FormikErrors<{
                                                        from: {
                                                          level: string;
                                                        };
                                                      }>
                                                    )?.from?.level
                                                  }
                                                  touched={
                                                    touched.signTestDetail !==
                                                      undefined &&
                                                    (touched?.signTestDetail[
                                                      index
                                                    ]?.from
                                                      ?.level as FormikTouched<boolean>)
                                                  }
                                                />
                                              </div>
                                            </div>
                                          </div>
                                          <div className='col'>
                                            <h6 className={cx('test-back')}>
                                              To Level
                                            </h6>
                                            <div className='row'>
                                              <div className='col pe-0'>
                                                <SelectField
                                                  name={`signTestDetail[${index}].to.level`}
                                                  isSearchable={false}
                                                  options={levelList[index]
                                                    ?.map(
                                                      (item: {
                                                        level: number;
                                                        _id: string;
                                                      }) => {
                                                        return {
                                                          label: item?.level,
                                                          _id: item?._id,
                                                        };
                                                      }
                                                    )
                                                    ?.sort(
                                                      (
                                                        a: { label: number },
                                                        b: { label: number }
                                                      ) =>
                                                        Number(a?.label) -
                                                        Number(b?.label)
                                                    )}
                                                  placeholder='Select Level'
                                                  value={
                                                    values?.signTestDetail[
                                                      index
                                                    ]?.to?.level as string
                                                  }
                                                  onChange={(e) =>
                                                    setFieldValue(
                                                      `signTestDetail[${index}].to`,
                                                      e &&
                                                        (e as SelectType)?.label
                                                        ? {
                                                            _id: (
                                                              e as SelectType
                                                            )?._id,
                                                            level: (
                                                              e as SelectType
                                                            )?.label,
                                                          }
                                                        : {
                                                            _id: '',
                                                            level: '',
                                                          }
                                                    )
                                                  }
                                                  onBlur={setFieldTouched}
                                                  disable={isDisable[index]}
                                                  error={
                                                    errors.signTestDetail !==
                                                      undefined &&
                                                    (
                                                      errors?.signTestDetail[
                                                        index
                                                      ] as FormikErrors<{
                                                        to: {
                                                          level: string;
                                                        };
                                                      }>
                                                    )?.to?.level
                                                  }
                                                  touched={
                                                    touched?.signTestDetail !==
                                                      undefined &&
                                                    (touched?.signTestDetail[
                                                      index
                                                    ]?.to
                                                      ?.level as FormikTouched<boolean>)
                                                  }
                                                />
                                              </div>
                                              {todo !== 'edit' && (
                                                <div className='col-auto'>
                                                  <div
                                                    className={cx('icon-style')}
                                                  >
                                                    {index === count - 1 ? (
                                                      <>
                                                        <div
                                                          className={cx(
                                                            'addoption-icon'
                                                          )}
                                                          onClick={() => {
                                                            setIsDisable(
                                                              (prev) => [
                                                                ...prev,
                                                                true,
                                                              ]
                                                            ),
                                                              arrayHelpers?.insert(
                                                                index + count,
                                                                {
                                                                  class: {
                                                                    _id: '',
                                                                    name: '',
                                                                  },
                                                                  from: {
                                                                    _id: '',
                                                                    level: '',
                                                                  },
                                                                  to: {
                                                                    _id: '',
                                                                    level: '',
                                                                  },
                                                                }
                                                              ),
                                                              setCount(
                                                                count + 1
                                                              );
                                                          }}
                                                        >
                                                          <FontAwesomeIcon
                                                            icon={faPlus}
                                                            title='Add'
                                                          />
                                                        </div>

                                                        {count > 1 && (
                                                          <div
                                                            className={cx(
                                                              'removeoption-icon'
                                                            )}
                                                            onClick={() => {
                                                              setIsDisable(
                                                                isDisable?.slice(
                                                                  0,
                                                                  index
                                                                )
                                                              );
                                                              setLevelList(
                                                                levelList?.slice(
                                                                  0,
                                                                  index
                                                                )
                                                              );
                                                              arrayHelpers?.remove(
                                                                index as number
                                                              ),
                                                                setCount(
                                                                  (count) =>
                                                                    count - 1
                                                                );
                                                            }}
                                                          >
                                                            <FontAwesomeIcon
                                                              icon={faTrash}
                                                              title='Delete'
                                                            />
                                                          </div>
                                                        )}
                                                      </>
                                                    ) : (
                                                      <>
                                                        <div
                                                          className={cx(
                                                            'removeoption-icon'
                                                          )}
                                                          onClick={() => {
                                                            isDisable.splice(
                                                              index,
                                                              1
                                                            );
                                                            arrayHelpers?.remove(
                                                              index as number
                                                            ),
                                                              setCount(
                                                                (count) =>
                                                                  count - 1
                                                              );
                                                          }}
                                                        >
                                                          <FontAwesomeIcon
                                                            icon={faTrash}
                                                            title='Delete'
                                                          />
                                                        </div>
                                                      </>
                                                    )}
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                        <Row className={cx(' mt-1 mb-2')}>
                                          <Col className={cx('flex-icon-1')}>
                                            <div className='col'></div>
                                            <div className='col'></div>
                                          </Col>
                                        </Row>
                                      </div>
                                    )
                                  )}
                                  <div className={cx('save')}>
                                    <Button
                                      style={{
                                        marginRight: '8px',
                                      }}
                                      className='warn-btn'
                                      type='button'
                                      onClick={() => {
                                        setTodo('Reset');
                                        setCount(1);
                                        setDisplay(false);
                                        resetForm();
                                      }}
                                    >
                                      Cancel
                                    </Button>
                                    <div>
                                      <Button
                                        className={cx('sucess-btn')}
                                        type='submit'
                                      >
                                        Save
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            />
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
                          <div className={cx('card')}>
                            <div className={cx('card-table')}>
                              <div className={cx('add-flex')}>
                                <div>
                                  <div className={cx('card-flex')}>
                                    <ol className='cd-breadcrumb'>
                                      <li>
                                        <h4>Memory Test</h4>
                                      </li>

                                      <li className='current'>Sign Test</li>
                                    </ol>
                                  </div>
                                  <h6 className={cx('test')}></h6>
                                </div>
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
                                            getSignTestRanges(
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
                                      Assign Level
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
                              <div className='table-scroll-height'>
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
                                      <div>Class</div>
                                    </td>
                                    <td>
                                      <div>From - To</div>
                                    </td>
                                    <td>Action</td>
                                  </tr>
                                  {(search?.length
                                    ? getSearch()
                                    : pageWiseData
                                  )?.map((item: rangeData, index: number) => {
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
                                            {(pageNumber - 1) * 15 + index + 1}
                                          </td>
                                          <td>{item?.class?.name}</td>
                                          <td>
                                            Level {item?.from?.level} - Level{' '}
                                            {item?.to?.level}
                                          </td>
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
                                  })}
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
