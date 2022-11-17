import {
  ErrorMessage,
  Field,
  FieldArray,
  Form,
  Formik,
  FormikErrors,
  FormikTouched,
} from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import Link from 'next/link';
import { AnyAction } from 'redux';
import { useRouter } from 'next/router';
import {
  faPlus,
  faTrash,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import Select, { GroupBase } from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { RootState } from 'redux/store';
import styles from './index.module.css';
import className from 'classnames/bind';
import {
  dataQuestionType,
  level,
  modeOptions,
  sendReportOptions,
  statusOptions,
  testsExam,
} from 'components/Select/SelectOptions';
import { useDispatch } from 'react-redux';
import { loader } from 'redux/reducer/Loader';
import { Loader } from 'components/Loader/Loader';
import { SelectField } from 'components/Select/Select';
import { postExamData, putExamData } from 'redux/action/Exam';
import { classList } from 'components/MemoryTest/GetClassList';
import RestoreLevelModal from 'components/Modal/RestoreLevelModal';

const AddExam = (props: { setAddExam: (arg0: boolean) => void }) => {
  const router = useRouter();
  const query = router.query;
  const dispatch = useDispatch();
  const cx = className.bind(styles);

  const packageData = useSelector(
    (state: RootState) => state?.package?.packageData?.packages
  );
  const sectionData = useSelector(
    (state: RootState) => state?.section?.sectionData?.sections
  );
  const elementData = useSelector(
    (state: RootState) => state?.element?.elementData?.elements
  );
  const load = useSelector((state: RootState) => state?.loader?.loader);
  const classData = useSelector(
    (state: RootState) => state?.class?.classData?.classes
  );
  const particularExamData = useSelector(
    (state: RootState) => state?.exam?.particularExamData
  );
  const token = useSelector((state: RootState) => state?.login?.loginData);
  const restore = useSelector((state: RootState) => state?.restore?.restoreId);

  const testDt = testsExam.map((item) => {
    return {
      label: item,
    };
  });

  const [count, setCount] = useState(1);
  const [restoreLevel, setRestoreLevel] = useState(false);
  const [sampleTest, setSampleTest] = useState<{ label: string }[] | []>([]);

  useEffect(() => {
    if (restore?.length > 0) {
      setRestoreLevel(true);
    }
  }, [dispatch, restore]);

  useEffect(() => {
    if (query?.editId && query?.editId !== undefined) {
      setCount(particularExamData?.options?.length);
      const a = particularExamData?.testSequence?.map(
        (item: { label: string }) => {
          return {
            label: item,
          };
        }
      );
      const dt = testDt?.filter(
        (item) => !a?.some((o2: { label: string }) => item.label === o2?.label)
      );
      setSampleTest(dt as { label: string }[]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    particularExamData?.sendAudioReport,
    particularExamData?.sendReport,
    particularExamData?.testSequence,
    query?.editId,
  ]);

  const filterPackageData = packageData?.filter(
    (item: { status: boolean }) => item?.status === true
  );
  const dataSection = sectionData?.map((item: { name: string }) => {
    return { ...item, label: item?.name, value: item?.name };
  });
  const dataElement = elementData?.map((item: { name: string }) => {
    return { ...item, label: item?.name, value: item?.name };
  });
  const dataPackage = filterPackageData?.map((item: { name: string }) => {
    return { ...item, label: item?.name, value: item?.name };
  });
  const dataClass = classData?.map((item: { name: string }) => {
    return { ...item, label: item?.name, value: item?.name };
  });

  let startPosition: number;
  let endPosition: number;

  const dragStart = (position: number) => {
    startPosition = position;
  };

  const dragEnter = (position: number) => {
    endPosition = position;
  };
  const addInSequence = (
    e: { label: string },
    setFieldValue: {
      (
        field: string,
        value: string,
        shouldValidate?: boolean | undefined
      ): void;
      (arg0: string, arg1: string[]): void;
    },
    data: string[]
  ) => {
    if (e !== null) {
      setFieldValue(`testSequence`, [...data, e.label]);
    }
    const removeSelectedTestFromOptions = sampleTest?.filter(
      (item: { label: string }) => item?.label !== e?.label
    );
    setSampleTest(removeSelectedTestFromOptions);
  };
  const drop = (
    values: string[],
    setFieldValue: {
      (
        field: string,
        value: string,
        shouldValidate?: boolean | undefined
      ): void;
      (arg0: string, arg1: string[]): void;
    }
  ) => {
    const copyListItems = [...values];
    const dragItemContent = copyListItems[startPosition];
    copyListItems?.splice(startPosition, 1);
    copyListItems?.splice(endPosition, 0, dragItemContent);
    setFieldValue(`testSequence`, copyListItems);
  };

  const removeTest = (
    data: string,
    values: string[],
    setFieldValue: {
      (
        field: string,
        value: string,
        shouldValidate?: boolean | undefined
      ): void;
      (arg0: string, arg1: string[]): void;
    }
  ) => {
    setSampleTest((prev) => [...prev, { label: data }]);
    const filteredTest = values?.filter((item: string) => item !== data);
    setFieldValue(`testSequence`, filteredTest);
  };

  const initialValues: examValues = {
    difficultyLevel: query?.editId?.length
      ? particularExamData?.difficultyLevel
      : '',
    mode: query?.editId?.length ? particularExamData?.mode : '',
    package: {
      name: query?.editId?.length ? particularExamData?.package?.name : '',
      _id: query?.editId?.length ? particularExamData?.package?._id : '',
    },
    class: {
      _id: query?.editId?.length ? particularExamData?.class?._id : '',
      name: query?.editId?.length ? particularExamData?.class?.name : '',
    },
    status: query?.editId?.length ? particularExamData?.status : true,
    name: query?.editId?.length ? particularExamData?.name : '',
    options: query?.editId?.length
      ? particularExamData?.options
      : [
          {
            section: {
              _id: '',
              name: '',
            },
            element: {
              _id: '',
              name: '',
            },
            noOfQuestions: '',
            questionType: '',
          },
        ],
    sendReport: query?.editId?.length ? particularExamData?.sendReport : [],
    sendAudioReport: query?.editId?.length
      ? particularExamData?.sendAudioReport
      : [],
    showAnswerSheet: query?.editId?.length
      ? particularExamData?.showAnswerSheet
      : false,
    randomQuestion: query?.editId?.length
      ? particularExamData?.randomQuestion
      : true,
    browserTolerence: query?.editId?.length
      ? particularExamData?.browserTolerence
      : true,
    optionShuffle: query?.editId?.length
      ? particularExamData?.optionShuffle
      : true,
    examDuration: query?.editId?.length ? particularExamData?.examDuration : '',
    attemptCount: query?.editId?.length ? particularExamData?.attemptCount : '',
    startDate: query?.editId?.length
      ? (particularExamData?.startDate as string)?.substring(0, 10)
      : '',
    endDate: query?.editId?.length
      ? (particularExamData?.endDate as string)?.substring(0, 10)
      : '',
    testSequence: query?.editId?.length
      ? particularExamData?.testSequence
      : testsExam,
  };

  const disablePastDate = (date: string | null) => {
    return date === null || date === '' ? moment().format('YYYY-MM-DD') : date;
  };

  return (
    <>
      {(query?.editId === particularExamData?._id ||
        query?.editId === undefined) && (
        <div className={cx('flex-style')}>
          <div className={cx('parent-section')}>
            <div className={cx('text-btn')}>
              <Loader open={load} />
              <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={Yup.object().shape({
                  name: Yup.string().required('Required'),
                  difficultyLevel: Yup.string().required('Required'),
                  package: Yup.object().shape({
                    name: Yup.string().required('Required'),
                  }),
                  class: Yup.object().shape({
                    name: Yup.string().required('Required'),
                  }),
                  status: Yup.string().required('Required'),
                  mode: Yup.string().required('Required'),
                  testSequence: Yup.array().min(1, 'Required'),
                  examDuration: Yup.number().required('Required'),
                  startDate: Yup.date().required('Required'),
                  endDate: Yup.date().required('Required'),
                  showAnswerSheet: Yup.string().required('Required'),
                  randomQuestion: Yup.string().required('Required'),
                  browserTolerence: Yup.boolean().required('Required'),
                  optionShuffle: Yup.string().required('Required'),
                  sendReport: Yup.array().min(1, 'Required'),
                  sendAudioReport: Yup.array().min(1, 'Required'),
                  options: Yup.array().of(
                    Yup.object().shape({
                      section: Yup.object().shape({
                        name: Yup.string().required('Required'),
                      }),
                      element: Yup.object().shape({
                        name: Yup.string().required('Required'),
                      }),
                      questionType: Yup.string().required('Required'),
                      noOfQuestions: Yup.number().required('Required'),
                    })
                  ),
                })}
                onSubmit={(values) => {
                  values.name =
                    values.name?.charAt(0)?.toUpperCase() +
                    values.name?.slice(1)?.trim();
                  values.name = values.name?.replace(/\s+/g, ' ').trim();
                  dispatch(loader(true));
                  query?.editId?.length
                    ? dispatch(
                        putExamData(
                          query?.editId as string,
                          values,
                          token,
                          props.setAddExam,
                          router
                        ) as unknown as AnyAction
                      )
                    : dispatch(
                        postExamData(
                          values,
                          token,
                          props.setAddExam,
                          router
                        ) as unknown as AnyAction
                      );
                }}
              >
                {({
                  values,
                  handleSubmit,
                  setFieldTouched,
                  setFieldValue,
                  errors,
                  handleBlur,
                  touched,
                  resetForm,
                }) => (
                  <>
                    <RestoreLevelModal
                      title='Restore Exam'
                      modalName='Exam'
                      restoreId={restore}
                      navigate={props.setAddExam}
                      resetForm={resetForm}
                      content='Exam Exist But Soft Deleted. Do You Want To Restore The Data'
                      show={restoreLevel}
                      onClose={() => setRestoreLevel(false)}
                    />
                    <Form onSubmit={handleSubmit}>
                      <div
                        className={cx(
                          'animate__animated animate__slideInRight'
                        )}
                      >
                        <div className={cx('card')}>
                          <div className={cx('add-scroll')}>
                            <Row className={cx('m-1 pt-1')}>
                              <Col sm={6}>
                                <div className={cx('card-flex')}>
                                  <Link href='/exam'>
                                    <FontAwesomeIcon
                                      icon={faArrowLeft}
                                      className={cx('back-img')}
                                      onClick={() => {
                                        resetForm(),
                                          router.replace('/exam'),
                                          props.setAddExam(false);
                                      }}
                                    />
                                  </Link>
                                  <h4>
                                    {' '}
                                    {query?.editId && query?.editId?.length > 0
                                      ? 'Edit Exam'
                                      : 'Add Exam'}
                                  </h4>
                                </div>
                              </Col>
                              <Col sm={3}>
                                <div>
                                  <h6 className={cx('label-style')}> Mode </h6>
                                  <SelectField
                                    name='mode'
                                    options={modeOptions}
                                    value={values?.mode}
                                    placeholder='Mode'
                                    onChange={(e) =>
                                      setFieldValue(
                                        'mode',
                                        e &&
                                          (e as SelectType)?.label &&
                                          (e as SelectType)?.label?.length > 0
                                          ? (e as SelectType)?.label
                                          : ''
                                      )
                                    }
                                    onBlur={setFieldTouched}
                                    error={errors?.mode as string}
                                    touched={
                                      touched?.mode as FormikTouched<boolean>
                                    }
                                  />
                                </div>
                              </Col>

                              <Col sm={3}>
                                <div>
                                  <h6 className={cx('label-style')}>
                                    {' '}
                                    Status{' '}
                                  </h6>
                                  <SelectField
                                    name='status'
                                    options={statusOptions}
                                    value={
                                      (values?.status + '')?.toLowerCase() ===
                                      'true'
                                        ? 'Activated'
                                        : 'Deactivated'
                                    }
                                    placeholder='Status'
                                    isSearchable={false}
                                    onChange={(e) =>
                                      setFieldValue(
                                        'status',
                                        e &&
                                          (e as SelectType)?.label &&
                                          (e as SelectType)?.label?.length > 0
                                          ? (e as SelectType)?.label ===
                                            'Activated'
                                            ? true
                                            : false
                                          : ''
                                      )
                                    }
                                    onBlur={setFieldTouched}
                                    error={errors?.status as string}
                                    touched={
                                      touched?.status as FormikTouched<boolean>
                                    }
                                  />
                                </div>
                              </Col>
                            </Row>

                            <div className={cx('card-table')}>
                              <Row className={cx('mb-2')}>
                                <Col sm={4}>
                                  <h6 className={cx('label-style')}>
                                    {' '}
                                    Name of Exam
                                  </h6>
                                  <Field
                                    value={values?.name}
                                    name='name'
                                    type='text'
                                    className={cx('form-control')}
                                    placeholder='Name Of Exam'
                                    autoComplete='off'
                                  />
                                  <ErrorMessage
                                    className='error-message'
                                    name='name'
                                    component='span'
                                  />
                                </Col>
                                <Col sm={4}>
                                  <h6 className={cx('label-style')}>
                                    {' '}
                                    Package
                                  </h6>
                                  <div>
                                    <SelectField
                                      name='package.name'
                                      options={dataPackage}
                                      value={values?.package?.name}
                                      placeholder='Select Package'
                                      onChange={(e) => {
                                        setFieldValue(
                                          'package',
                                          e &&
                                            (e as SelectType)?.label &&
                                            (e as SelectType)?.label?.length > 0
                                            ? {
                                                _id: (e as SelectType)?._id,
                                                name: (e as SelectType)?.label,
                                              }
                                            : {
                                                _id: '',
                                                name: '',
                                              }
                                        ),
                                          setFieldValue(
                                            'attemptCount',
                                            e &&
                                              (e as SelectType)?.label &&
                                              (e as SelectType)?.label?.length >
                                                0
                                              ? (e as SelectType)?.attemptCount
                                              : ''
                                          );
                                      }}
                                      onBlur={setFieldTouched}
                                      error={errors?.package?.name as string}
                                      touched={
                                        touched?.package
                                          ?.name as FormikTouched<boolean>
                                      }
                                    />
                                  </div>
                                </Col>
                                <Col sm={4}>
                                  <h6 className={cx('label-style')}> Class</h6>
                                  <div>
                                    <SelectField
                                      name='class.name'
                                      options={classList(dataClass)}
                                      value={values?.class?.name}
                                      placeholder='Select Class'
                                      onChange={(e) => {
                                        setFieldValue(
                                          'class',
                                          e &&
                                            (e as SelectType)?.label &&
                                            (e as SelectType)?.label?.length > 0
                                            ? {
                                                _id: (e as SelectType)?._id,
                                                name: (e as SelectType)?.label,
                                              }
                                            : {
                                                _id: '',
                                                name: '',
                                              }
                                        );
                                      }}
                                      onBlur={setFieldTouched}
                                      error={errors?.class?.name as string}
                                      touched={
                                        touched?.class
                                          ?.name as FormikTouched<boolean>
                                      }
                                    />
                                  </div>
                                </Col>
                              </Row>
                              <h6 className={cx('label-style')}>
                                Sequence Of Exam
                              </h6>
                              <div>
                                {sampleTest?.length > 0 && (
                                  <div>
                                    <Select
                                      options={
                                        sampleTest as unknown as readonly (
                                          | string
                                          | GroupBase<string>
                                        )[]
                                      }
                                      isClearable
                                      onChange={(e) =>
                                        addInSequence(
                                          e as unknown as { label: string },
                                          setFieldValue,
                                          values.testSequence
                                        )
                                      }
                                      value=''
                                    />
                                    <ErrorMessage
                                      className='error-message'
                                      name='testSequence'
                                      component='span'
                                    />
                                  </div>
                                )}
                                {values.testSequence?.length > 0 && (
                                  <div className='row mx-0  my-3 border rounded px-2'>
                                    {values.testSequence &&
                                      values.testSequence?.map(
                                        (item: string, index) => (
                                          <>
                                            <div className='col-sm-6 my-2 ps-0 '>
                                              <div className='border rounded p-2'>
                                                <div
                                                  className={cx(
                                                    'row align-items-center justify-content-center'
                                                  )}
                                                >
                                                  <div
                                                    className='col-11 main-box-text'
                                                    onDragStart={() =>
                                                      dragStart(index)
                                                    }
                                                    onDragEnter={() =>
                                                      dragEnter(index)
                                                    }
                                                    onDragEnd={() =>
                                                      drop(
                                                        values?.testSequence,
                                                        setFieldValue
                                                      )
                                                    }
                                                    key={index}
                                                    draggable
                                                    style={{
                                                      cursor: 'grabbing',
                                                    }}
                                                  >
                                                    {item}
                                                  </div>
                                                  <div className='col-1 button-box-tag px-1'>
                                                    <button
                                                      type='button'
                                                      className='btn btn-close tag-button'
                                                      key={index}
                                                      onClick={() =>
                                                        removeTest(
                                                          item,
                                                          values?.testSequence,
                                                          setFieldValue
                                                        )
                                                      }
                                                    ></button>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </>
                                        )
                                      )}
                                  </div>
                                )}
                              </div>
                              <div className={cx('table-scroll-1')}>
                                <table
                                  className={cx(
                                    'table table-bordered table-striped mt-3'
                                  )}
                                >
                                  <thead>
                                    <tr>
                                      <th className='col-2'>Section Name</th>
                                      <th className='col-2'>Element Name</th>
                                      <th className='col-2'>No of Question</th>
                                      <th className='col-2'>Question Type</th>
                                      <th className='col-1'>Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {values?.options &&
                                      values?.options?.length > 0 &&
                                      values?.options?.map((friend, index) => (
                                        <tr key={index}>
                                          <td scope='row'>
                                            <div>
                                              <SelectField
                                                name={`options.${index}.section.name`}
                                                options={dataSection?.sort(
                                                  (
                                                    a: {
                                                      label: string;
                                                    },
                                                    b: {
                                                      label: string;
                                                    }
                                                  ) =>
                                                    a?.label?.localeCompare(
                                                      b?.label
                                                    )
                                                )}
                                                value={
                                                  values?.options[index]
                                                    ?.section.name
                                                }
                                                placeholder='Select Section'
                                                onChange={(e) => {
                                                  setFieldValue(
                                                    `options.${index}.section`,
                                                    e &&
                                                      (e as SelectType)
                                                        ?.label &&
                                                      (e as SelectType).label
                                                        ?.length > 0
                                                      ? {
                                                          _id: (e as SelectType)
                                                            ?._id,
                                                          name: (
                                                            e as SelectType
                                                          )?.label,
                                                        }
                                                      : {
                                                          _id: '',
                                                          name: '',
                                                        }
                                                  );
                                                  setFieldValue(
                                                    `options.${index}.element`,
                                                    e &&
                                                      (e as SelectType)
                                                        ?.label &&
                                                      (e as SelectType)?.label
                                                        ?.length > 0
                                                      ? {
                                                          _id: '',
                                                          name: '',
                                                        }
                                                      : {
                                                          _id: '',
                                                          name: '',
                                                        }
                                                  );
                                                }}
                                                onBlur={setFieldTouched}
                                                error={
                                                  errors?.options !==
                                                    undefined &&
                                                  (
                                                    errors?.options[
                                                      index
                                                    ] as FormikErrors<{
                                                      section: {
                                                        _id: string;
                                                        name: string;
                                                      };
                                                    }>
                                                  )?.section?.name
                                                }
                                                touched={
                                                  touched?.options !==
                                                    undefined &&
                                                  touched?.options[index]
                                                    ?.section?.name
                                                }
                                              />
                                            </div>
                                          </td>
                                          <td scope='row'>
                                            <div>
                                              <SelectField
                                                name={`options.${index}.element.name`}
                                                options={dataElement
                                                  ?.filter(
                                                    (e: {
                                                      section: { _id: string };
                                                    }) => {
                                                      return (
                                                        e?.section?._id ===
                                                          values?.options[index]
                                                            ?.section?._id ||
                                                        !values?.options[index]
                                                          ?.section?._id
                                                      );
                                                    }
                                                  )
                                                  ?.sort(
                                                    (
                                                      a: {
                                                        label: string;
                                                      },
                                                      b: {
                                                        label: string;
                                                      }
                                                    ) =>
                                                      a?.label?.localeCompare(
                                                        b?.label
                                                      )
                                                  )}
                                                placeholder='Select Element'
                                                value={
                                                  values?.options[index]
                                                    ?.element.name
                                                }
                                                onChange={(e) => {
                                                  setFieldValue(
                                                    `options.${index}.element`,
                                                    e &&
                                                      (e as SelectType)
                                                        ?.label &&
                                                      (e as SelectType)?.label
                                                        ?.length > 0
                                                      ? {
                                                          _id: (e as SelectType)
                                                            ?._id,
                                                          name: (
                                                            e as SelectType
                                                          )?.label,
                                                        }
                                                      : {
                                                          _id: '',
                                                          name: '',
                                                        }
                                                  );
                                                  e &&
                                                    (
                                                      e as unknown as elementDataType
                                                    )?.section &&
                                                    (
                                                      e as unknown as elementDataType
                                                    ).section?.name?.length >
                                                      0 &&
                                                    setFieldValue(
                                                      `options.${index}.section`,
                                                      e &&
                                                        (
                                                          e as unknown as elementDataType
                                                        )?.section &&
                                                        (
                                                          e as unknown as elementDataType
                                                        )?.section?.name
                                                          ?.length > 0 && {
                                                          _id: (
                                                            e as unknown as elementDataType
                                                          )?.section?._id,
                                                          name: (
                                                            e as unknown as elementDataType
                                                          )?.section?.name,
                                                        }
                                                    );
                                                }}
                                                onBlur={setFieldTouched}
                                                error={
                                                  errors?.options !==
                                                    undefined &&
                                                  (
                                                    errors?.options[
                                                      index
                                                    ] as FormikErrors<{
                                                      element: {
                                                        _id: string;
                                                        name: string;
                                                      };
                                                    }>
                                                  )?.element?.name
                                                }
                                                touched={
                                                  touched?.options !==
                                                    undefined &&
                                                  touched?.options[index]
                                                    ?.element?.name
                                                }
                                              />
                                            </div>
                                          </td>
                                          <td scope='row'>
                                            <div>
                                              <Field
                                                type='number'
                                                min='0'
                                                value={
                                                  values?.options[index]
                                                    ?.noOfQuestions
                                                }
                                                placeholder='Number Of Question'
                                                name={`options.${index}.noOfQuestions`}
                                                className='form-control custom-control-1'
                                              />
                                              <ErrorMessage
                                                className='error-message'
                                                name={`options.${index}.noOfQuestions`}
                                                component='p'
                                              />
                                            </div>
                                          </td>
                                          <td scope='row'>
                                            <div>
                                              <SelectField
                                                name={`options.${index}.questionType`}
                                                options={dataQuestionType}
                                                value={
                                                  values?.options[index]
                                                    ?.questionType
                                                }
                                                onChange={(e) =>
                                                  setFieldValue(
                                                    `options.${index}.questionType`,
                                                    e &&
                                                      (e as SelectType)
                                                        ?.label &&
                                                      (e as SelectType)?.label
                                                        ?.length > 0
                                                      ? (e as SelectType)?.label
                                                      : ''
                                                  )
                                                }
                                                placeholder='Select Question Type'
                                                onBlur={setFieldTouched}
                                                error={
                                                  errors?.options !==
                                                    undefined &&
                                                  (
                                                    errors?.options[
                                                      index
                                                    ] as FormikErrors<{
                                                      questionType: string;
                                                    }>
                                                  )?.questionType
                                                }
                                                touched={
                                                  touched?.options !==
                                                    undefined &&
                                                  touched?.options[index]
                                                    ?.questionType
                                                }
                                              />
                                            </div>
                                          </td>
                                          <td
                                            scope='row'
                                            className={cx('action-td')}
                                          >
                                            <FieldArray
                                              name='options'
                                              render={(arrayHelpers) => (
                                                <div
                                                  className={cx('table-btn')}
                                                  key={index}
                                                >
                                                  {index === count - 1 ? (
                                                    <div className='d-flex gap-2 align-items-center'>
                                                      <div
                                                        className={cx(
                                                          'addoption-icon'
                                                        )}
                                                        onClick={() => {
                                                          arrayHelpers.insert(
                                                            index + count,
                                                            {
                                                              section: {
                                                                _id: '',
                                                                name: '',
                                                              },
                                                              element: {
                                                                _id: '',
                                                                name: '',
                                                              },
                                                              noOfQuestions: '',
                                                              questionType: '',
                                                            }
                                                          );
                                                          setCount(
                                                            (count) => count + 1
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
                                                            arrayHelpers.remove(
                                                              index
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
                                                    </div>
                                                  ) : (
                                                    <div
                                                      className={cx(
                                                        'removeoption-icon'
                                                      )}
                                                      onClick={() => {
                                                        arrayHelpers.remove(
                                                          index
                                                        ),
                                                          setCount(
                                                            (count) => count - 1
                                                          );
                                                      }}
                                                    >
                                                      <FontAwesomeIcon
                                                        icon={faTrash}
                                                        title='Delete'
                                                      />
                                                    </div>
                                                  )}
                                                </div>
                                              )}
                                            />
                                          </td>
                                        </tr>
                                      ))}
                                  </tbody>
                                </table>
                              </div>
                              <div className={cx('my-3')}>
                                <div className={cx('flex-input')}>
                                  <div className={cx('field-size')}>
                                    <h6 className={cx('label-style')}>
                                      Exam Duration (Min.)
                                    </h6>
                                    <Field
                                      type='number'
                                      min='0'
                                      value={values.examDuration}
                                      name='examDuration'
                                      className={cx('form-control my-1')}
                                      placeholder='Exam Duration'
                                    />
                                    <ErrorMessage
                                      name='examDuration'
                                      component='span'
                                      className='error-message'
                                    />
                                  </div>
                                  <div className={cx('field-size')}>
                                    <h6 className={cx('label-style')}>
                                      {' '}
                                      Attempt Count
                                    </h6>
                                    <Field
                                      type='number'
                                      min='0'
                                      name='attemptCount'
                                      disabled
                                      value={values.attemptCount}
                                      className={cx('form-control my-1')}
                                      placeholder='Attempt Count'
                                    />
                                    <ErrorMessage
                                      name='attemptCount'
                                      component='span'
                                      className='error-message'
                                    />
                                  </div>
                                  <div className={cx('field-size')}>
                                    <h6 className={cx('label-style')}>
                                      {' '}
                                      Start Date
                                    </h6>
                                    <Field
                                      type='Date'
                                      name='startDate'
                                      min={
                                        query?.editId?.length
                                          ? disablePastDate(
                                              particularExamData?.startDate?.substring(
                                                0,
                                                10
                                              )
                                            )
                                          : disablePastDate('')
                                      }
                                      className={cx('form-control my-1')}
                                      value={values.startDate}
                                      onChange={(e: {
                                        target: { value: string };
                                      }) => {
                                        e.target.value?.length === 0 &&
                                          setFieldValue('endDate', '');
                                        setFieldValue(
                                          'startDate',
                                          e.target.value
                                        );
                                      }}
                                    />
                                    <ErrorMessage
                                      name='startDate'
                                      component='span'
                                      className='error-message'
                                    />
                                  </div>
                                  <div className={cx('field-size')}>
                                    <h6 className={cx('label-style')}>
                                      {' '}
                                      End Date
                                    </h6>
                                    <Field
                                      type='Date'
                                      name='endDate'
                                      min={disablePastDate(values.startDate)}
                                      disabled={
                                        values.startDate?.length > 0
                                          ? false
                                          : true
                                      }
                                      className={cx('form-control my-1')}
                                      value={values.endDate}
                                    />
                                    <ErrorMessage
                                      name='endDate'
                                      component='span'
                                      className='error-message'
                                    />
                                  </div>
                                </div>

                                <div className={cx('flex-radio')}>
                                  <div className={cx('field-size')}>
                                    {' '}
                                    <h6 className={cx('label-style')}>
                                      {' '}
                                      Show Answer Sheet{' '}
                                    </h6>
                                    <div
                                      className={cx(
                                        'form-check form-check-inline'
                                      )}
                                    >
                                      <Field
                                        className={cx('form-check-input')}
                                        type='radio'
                                        name='showAnswerSheet'
                                        checked={values.showAnswerSheet}
                                        onChange={(e: {
                                          target: { value: string };
                                        }) =>
                                          e.target.value === 'Yes' &&
                                          setFieldValue('showAnswerSheet', true)
                                        }
                                        value='Yes'
                                      />

                                      <label
                                        className={cx('form-check-label')}
                                        htmlFor='inlineRadio1'
                                      >
                                        <span className={cx('text-radio')}>
                                          {' '}
                                          Yes
                                        </span>
                                      </label>
                                    </div>
                                    <div
                                      className={cx(
                                        'form-check form-check-inline'
                                      )}
                                    >
                                      <Field
                                        className={cx('form-check-input')}
                                        type='radio'
                                        name='showAnswerSheet'
                                        value='No'
                                        checked={
                                          values.showAnswerSheet === false
                                        }
                                        onChange={(e: {
                                          target: { value: string };
                                        }) => {
                                          e.target.value === 'No' &&
                                            setFieldValue(
                                              'showAnswerSheet',
                                              false
                                            );
                                        }}
                                      />
                                      <label
                                        className={cx('form-check-label')}
                                        htmlFor='inlineRadio2'
                                      >
                                        <span className={cx('text-radio')}>
                                          {' '}
                                          No
                                        </span>
                                      </label>
                                    </div>
                                    <ErrorMessage
                                      component='span'
                                      className='error-message'
                                      name='showAnswerSheet'
                                    />
                                  </div>
                                  <div className={cx('field-size')}>
                                    <h6 className={cx('label-style')}>
                                      {' '}
                                      Random Question{' '}
                                    </h6>
                                    <div
                                      className={cx(
                                        'form-check form-check-inline'
                                      )}
                                    >
                                      <Field
                                        className={cx('form-check-input')}
                                        type='radio'
                                        name='randomQuestion'
                                        checked={values.randomQuestion}
                                        onChange={(e: {
                                          target: { value: string };
                                        }) => {
                                          e.target.value === 'Yes' &&
                                            setFieldValue(
                                              'randomQuestion',
                                              true
                                            );
                                        }}
                                        value='Yes'
                                      />
                                      <label
                                        className={cx('form-check-label')}
                                        htmlFor='inlineRadio3'
                                      >
                                        <span className={cx('text-radio')}>
                                          {' '}
                                          Yes
                                        </span>
                                      </label>
                                    </div>
                                    <div
                                      className={cx(
                                        'form-check form-check-inline'
                                      )}
                                    >
                                      <Field
                                        className={cx('form-check-input')}
                                        type='radio'
                                        name='randomQuestion'
                                        checked={
                                          values.randomQuestion === false
                                        }
                                        value='No'
                                        onChange={(e: {
                                          target: { value: string };
                                        }) => {
                                          e.target.value === 'No' &&
                                            setFieldValue(
                                              'randomQuestion',
                                              false
                                            );
                                        }}
                                      />
                                      <label
                                        className={cx('form-check-label')}
                                        htmlFor='inlineRadio4'
                                      >
                                        <span className={cx('text-radio')}>
                                          {' '}
                                          No
                                        </span>
                                      </label>
                                    </div>
                                    <ErrorMessage
                                      component='span'
                                      className='error-message'
                                      name='randomQuestion'
                                    />
                                  </div>
                                  <div className={cx('field-size')}>
                                    {' '}
                                    <h6 className={cx('label-style')}>
                                      {' '}
                                      Browse Tolrence{' '}
                                    </h6>
                                    <div
                                      className={cx(
                                        'form-check form-check-inline'
                                      )}
                                    >
                                      <Field
                                        className={cx('form-check-input')}
                                        type='radio'
                                        name='browserTolerence'
                                        value='Yes'
                                        checked={values.browserTolerence}
                                        onChange={(e: {
                                          target: { value: string };
                                        }) => {
                                          e.target.value === 'Yes' &&
                                            setFieldValue(
                                              'browserTolerence',
                                              true
                                            );
                                        }}
                                      />
                                      <label
                                        className={cx('form-check-label')}
                                        htmlFor='inlineRadio5'
                                      >
                                        <span className={cx('text-radio')}>
                                          {' '}
                                          Yes
                                        </span>
                                      </label>
                                    </div>
                                    <div
                                      className={cx(
                                        'form-check form-check-inline'
                                      )}
                                    >
                                      <Field
                                        className={cx('form-check-input')}
                                        type='radio'
                                        name='browserTolerence'
                                        value='No'
                                        checked={
                                          values.browserTolerence === false
                                        }
                                        onChange={(e: {
                                          target: { value: string };
                                        }) => {
                                          e.target.value === 'No' &&
                                            setFieldValue(
                                              'browserTolerence',
                                              false
                                            );
                                        }}
                                      />
                                      <label
                                        className={cx('form-check-label')}
                                        htmlFor='inlineRadio6'
                                      >
                                        <span className={cx('text-radio')}>
                                          {' '}
                                          No
                                        </span>
                                      </label>
                                    </div>
                                    <ErrorMessage
                                      component='span'
                                      className='error-message'
                                      name='browserTolerence'
                                    />
                                  </div>
                                  <div className={cx('field-size')}>
                                    {' '}
                                    <h6 className={cx('label-style')}>
                                      {' '}
                                      Option Shuffle{' '}
                                    </h6>
                                    <div
                                      className={cx(
                                        'form-check form-check-inline'
                                      )}
                                    >
                                      <Field
                                        className={cx('form-check-input')}
                                        type='radio'
                                        name='optionShuffle'
                                        value='Yes'
                                        checked={values.optionShuffle}
                                        onChange={(e: {
                                          target: { value: string };
                                        }) => {
                                          e.target.value === 'Yes' &&
                                            setFieldValue(
                                              'optionShuffle',
                                              true
                                            );
                                        }}
                                      />
                                      <label
                                        className={cx('form-check-label')}
                                        htmlFor='inlineRadio13'
                                      >
                                        <span className={cx('text-radio')}>
                                          {' '}
                                          Yes
                                        </span>
                                      </label>
                                    </div>
                                    <div
                                      className={cx(
                                        'form-check form-check-inline'
                                      )}
                                    >
                                      <Field
                                        className={cx('form-check-input')}
                                        type='radio'
                                        name='optionShuffle'
                                        value='No'
                                        checked={values.optionShuffle === false}
                                        onChange={(e: {
                                          target: { value: string };
                                        }) => {
                                          e.target.value === 'No' &&
                                            setFieldValue(
                                              'optionShuffle',
                                              false
                                            );
                                        }}
                                      />
                                      <label
                                        className={cx('form-check-label')}
                                        htmlFor='inlineRadio14'
                                      >
                                        <span className={cx('text-radio')}>
                                          {' '}
                                          No
                                        </span>
                                      </label>
                                    </div>
                                    <ErrorMessage
                                      component='span'
                                      className='error-message'
                                      name='optionShuffle'
                                    />
                                  </div>
                                </div>
                                <Row className={cx('mt-2')}>
                                  <Col sm={4}>
                                    <h6 className={cx('label-style')}>
                                      {' '}
                                      Difficulty Level
                                    </h6>
                                    <div>
                                      <SelectField
                                        name='difficultyLevel'
                                        options={level}
                                        value={values.difficultyLevel}
                                        placeholder='Difficulty Level'
                                        onChange={(e) =>
                                          setFieldValue(
                                            'difficultyLevel',
                                            e &&
                                              (e as SelectType)?.label &&
                                              (e as SelectType)?.label?.length >
                                                0
                                              ? (e as SelectType)?.label
                                              : ''
                                          )
                                        }
                                        onBlur={setFieldTouched}
                                        error={
                                          errors?.difficultyLevel as string
                                        }
                                        touched={
                                          touched?.difficultyLevel as FormikTouched<boolean>
                                        }
                                      />
                                    </div>
                                  </Col>
                                  <Col sm={4}>
                                    <h6 className={cx('label-style')}>
                                      Send Report
                                    </h6>
                                    <div>
                                      <Select
                                        placeholder='Send Report'
                                        name='sendReport'
                                        isClearable
                                        isMulti
                                        value={
                                          values?.sendReport?.length > 0
                                            ? values?.sendReport.map(
                                                (item: string) => {
                                                  return {
                                                    label: item,
                                                    value: item,
                                                  };
                                                }
                                              )
                                            : []
                                        }
                                        options={sendReportOptions}
                                        onChange={(e) => {
                                          if (e?.length > 0) {
                                            const a = e.map(
                                              (item: { label: string }) => {
                                                return item.label;
                                              }
                                            );
                                            setFieldValue(`sendReport`, a);
                                          } else if (e?.length === 0) {
                                            setFieldValue(`sendReport`, []);
                                          }
                                        }}
                                        onBlur={handleBlur}
                                      />
                                      <ErrorMessage
                                        className='error-message'
                                        name='sendReport'
                                        component='span'
                                      />
                                    </div>
                                  </Col>
                                  <Col sm={4}>
                                    <h6 className={cx('label-style')}>
                                      {' '}
                                      Send Audio Report
                                    </h6>
                                    <div>
                                      <Select
                                        placeholder='Send Audio Report'
                                        name='sendAudioReport'
                                        isClearable
                                        isMulti
                                        options={sendReportOptions}
                                        value={
                                          values?.sendAudioReport?.length > 0
                                            ? values?.sendAudioReport.map(
                                                (item: string) => {
                                                  return {
                                                    label: item,
                                                    value: item,
                                                  };
                                                }
                                              )
                                            : []
                                        }
                                        onChange={(e) => {
                                          if (e?.length > 0) {
                                            const a = e?.map(
                                              (item: { label: string }) => {
                                                return item.label;
                                              }
                                            );
                                            setFieldValue(`sendAudioReport`, a);
                                          } else if (e?.length === 0) {
                                            setFieldValue(
                                              `sendAudioReport`,
                                              []
                                            );
                                          }
                                        }}
                                        onBlur={handleBlur}
                                      />
                                      <ErrorMessage
                                        className='error-message'
                                        name='sendAudioReport'
                                        component='span'
                                      />
                                    </div>
                                  </Col>
                                </Row>
                                <div className={cx('mt-4')}>
                                  <div className={cx('save-close')}>
                                    <Button
                                      className={cx('close-btn')}
                                      type='button'
                                      onClick={() => {
                                        resetForm(),
                                          router.replace('/exam'),
                                          props.setAddExam(false);
                                      }}
                                    >
                                      Cancel
                                    </Button>
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
                        </div>
                      </div>
                    </Form>
                  </>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default AddExam;
