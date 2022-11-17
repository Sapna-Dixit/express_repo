import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikErrors,
  FormikTouched,
} from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { AnyAction } from 'redux';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { RootState } from 'redux/store';
import className from 'classnames/bind';
import styles from '../index.module.css';
import {
  calculationTestBrackets,
  calculationTestNumber,
  calculationTestOperations,
} from 'components/Select/SelectOptions';
import {
  postCalculationTest,
  putCalculationTest,
} from 'redux/action/Test/CalculationTest';
import { loader } from 'redux/reducer/Loader';
import { Loader } from 'components/Loader/Loader';
import { SelectField } from 'components/Select/Select';
import { classList } from 'components/MemoryTest/GetClassList';
import RestoreLevelModal from 'components/Modal/RestoreLevelModal';

const AddCalculationTest = (props: {
  setAddCalculationTest: (arg0: boolean) => void;
}) => {
  const router = useRouter();
  const query = router.query;
  const dispatch = useDispatch();
  const cx = className.bind(styles);

  const classData = useSelector(
    (state: RootState) => state?.class?.classData?.classes
  );
  const particularCalculationTestData = useSelector(
    (state: RootState) => state?.calculationTest?.particularCalculationTestData
  );
  const load = useSelector((state: RootState) => state?.loader?.loader);
  const token = useSelector((state: RootState) => state?.login?.loginData);
  const calculationTestLevels = useSelector(
    (state: RootState) =>
      state.calculationTestLevel.calculationTestLevelData.calculationTestLevels
  );
  const restore = useSelector((state: RootState) => state?.restore?.restoreId);

  const [restoreLevel, setRestoreLevel] = useState(false);

  useEffect(() => {
    if (restore?.length > 0) {
      setRestoreLevel(true);
    }
  }, [dispatch, restore]);

  const dataClass = classData?.map((item: { name: string }) => {
    return { ...item, label: item?.name, value: item?.name };
  });

  const getNoOfOperations = (
    no: number,
    setFieldValue: {
      (
        field: string,
        value: string,
        shouldValidate?: boolean | undefined
      ): void;
      (
        arg0: string,
        arg1: { operations: string; brackets: string; number: string }[]
      ): void;
    }
  ) => {
    const sampleArray = [];
    for (let c = 0; c < no; c++) {
      sampleArray?.push({ operations: '', brackets: '', number: '' });
    }
    setFieldValue('calculation', sampleArray);
  };

  const initalValues: calculationTestType = {
    class: {
      _id: query?.editId?.length
        ? particularCalculationTestData?.class?._id
        : '',
      name: query?.editId?.length
        ? particularCalculationTestData?.class?.name
        : '',
    },
    level: {
      _id: query?.editId?.length
        ? particularCalculationTestData?.level?._id
        : '',
      level: query?.editId?.length
        ? particularCalculationTestData?.level?.level
        : '',
    },
    number: query?.editId?.length ? particularCalculationTestData?.number : '',
    noOfQuestions: query?.editId?.length
      ? particularCalculationTestData?.noOfQuestions
      : '',
    calculation: query?.editId?.length
      ? particularCalculationTestData?.calculation
      : [],
  };

  return (
    <>
      {(query?.editId === particularCalculationTestData?._id ||
        query?.editId === undefined) && (
        <div className={cx('flex-style')}>
          <div className={cx('parent-section')}>
            <Loader open={load} />
            <div className={cx('text-btn')}>
              <Formik
                enableReinitialize={true}
                initialValues={initalValues}
                validationSchema={Yup.object().shape({
                  class: Yup.object().shape({
                    name: Yup.string().required('Required'),
                  }),
                  level: Yup.object().shape({
                    level: Yup.string().required('Required'),
                  }),
                  number: Yup.string().required('Required'),
                  noOfQuestions: Yup.string().required('Required'),
                  calculation: Yup.array().of(
                    Yup.object().shape({
                      operations: Yup.string().required('Required'),
                      number: Yup.string().required('Required'),
                    })
                  ),
                })}
                onSubmit={(values) => {
                  dispatch(loader(true));
                  query?.editId?.length
                    ? dispatch(
                        putCalculationTest(
                          query?.editId as string,
                          values,
                          token,
                          props.setAddCalculationTest,
                          router
                        ) as unknown as AnyAction
                      )
                    : dispatch(
                        postCalculationTest(
                          values,
                          token,
                          props.setAddCalculationTest,
                          router
                        ) as unknown as AnyAction
                      );
                }}
              >
                {({
                  handleSubmit,
                  values,
                  setFieldTouched,
                  setFieldValue,
                  errors,
                  touched,
                  resetForm,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <RestoreLevelModal
                      title='Restore Calculation Test'
                      modalName='Calculation Test'
                      restoreId={restore}
                      resetForm={resetForm}
                      navigate={props.setAddCalculationTest}
                      content='Calculation Test Exist But Soft Deleted. Do You Want To Restore The Data'
                      show={restoreLevel}
                      onClose={() => setRestoreLevel(false)}
                    />
                    <div
                      className={cx('animate__animated animate__slideInRight')}
                    >
                      <div className={cx('card')}>
                        <div className={cx('add-scroll')}>
                          <div className={cx('card-table')}>
                            <div>
                              <div className={cx('card-flex')}>
                                <FontAwesomeIcon
                                  icon={faArrowLeft}
                                  className={cx('back-img')}
                                  onClick={() => {
                                    router.replace('/test/calculationtest'),
                                      props.setAddCalculationTest(false);
                                    resetForm();
                                  }}
                                />
                                <h4>
                                  {query?.editId && query?.editId?.length > 0
                                    ? 'Edit Calculation Test'
                                    : 'Add Calculation Test'}
                                </h4>
                              </div>
                            </div>
                            <div>
                              <Row className={cx('mb-2')}>
                                <Col sm={4}>
                                  <h6 className={cx('label-style')}>Class</h6>
                                  <SelectField
                                    name='class.name'
                                    options={classList(dataClass)}
                                    placeholder='Select Class'
                                    value={values.class.name}
                                    onChange={(e) =>
                                      setFieldValue(
                                        'class',
                                        e &&
                                          (e as SelectType)?.label &&
                                          (e as SelectType)?.label?.length > 0
                                          ? {
                                              _id: (e as SelectType)._id,
                                              name: (e as SelectType).label,
                                            }
                                          : {
                                              _id: '',
                                              name: '',
                                            }
                                      )
                                    }
                                    onBlur={setFieldTouched}
                                    error={errors?.class?.name as string}
                                    touched={
                                      touched?.class
                                        ?.name as FormikTouched<boolean>
                                    }
                                  />
                                </Col>
                                <Col sm={4}>
                                  <h6 className={cx('label-style')}>Level</h6>
                                  <SelectField
                                    name='level.level'
                                    options={calculationTestLevels
                                      ?.map(
                                        (item: {
                                          level: number;
                                          _id: string;
                                          noOfOperations: number;
                                        }) => {
                                          return {
                                            label: item?.level,
                                            _id: item?._id,
                                            noOfOperations:
                                              item?.noOfOperations,
                                          };
                                        }
                                      )
                                      ?.sort(
                                        (
                                          a: { label: number },
                                          b: { label: number }
                                        ) => Number(a?.label) - Number(b?.label)
                                      )}
                                    placeholder='Select Level'
                                    value={values?.level.level as string}
                                    onChange={(e) => {
                                      getNoOfOperations(
                                        (e as operationsSelectType)
                                          ?.noOfOperations,
                                        setFieldValue
                                      ),
                                        setFieldValue(
                                          'level',
                                          e && (e as SelectType)?.label
                                            ? {
                                                _id: (e as SelectType)._id,
                                                level: (e as SelectType).label,
                                              }
                                            : {
                                                _id: '',
                                                level: '',
                                              }
                                        );
                                    }}
                                    onBlur={setFieldTouched}
                                    error={errors?.level?.level as string}
                                    touched={
                                      touched?.level
                                        ?.level as FormikTouched<boolean>
                                    }
                                  />
                                </Col>{' '}
                                <Col sm={4}>
                                  <h6 className={cx('label-style')}>
                                    Number Of Questions
                                  </h6>
                                  <Field
                                    name='noOfQuestions'
                                    type='number'
                                    min='1'
                                    className={cx('form-control')}
                                    value={values.noOfQuestions}
                                    placeholder='Number Of Questions'
                                  />
                                  <ErrorMessage
                                    name='noOfQuestions'
                                    className='error-message'
                                    component='span'
                                  />
                                </Col>
                              </Row>
                              <Row className={cx('mb-2')}>
                                <Col sm={12}>
                                  <h6 className={cx('label-style')}>
                                    Equation Starting Number
                                  </h6>
                                  <SelectField
                                    name='number'
                                    options={calculationTestNumber}
                                    placeholder='Select Equation Starting Number'
                                    value={values.number}
                                    onChange={(e) =>
                                      setFieldValue(
                                        'number',
                                        e &&
                                          (e as SelectType)?.label &&
                                          (e as SelectType)?.label?.length > 0
                                          ? (e as SelectType).label
                                          : ''
                                      )
                                    }
                                    isSearchable={false}
                                    onBlur={setFieldTouched}
                                    error={errors?.number as string}
                                    touched={
                                      touched?.number as FormikTouched<boolean>
                                    }
                                  />
                                </Col>
                              </Row>
                              <Row className={cx('mb-2')}>
                                <div>
                                  {values?.calculation?.map(
                                    (friend: unknown, index: number) => (
                                      <div key={index}>
                                        <Row className={cx(' mt-1 mb-2')}>
                                          <Col className={cx('flex-icon-1')}>
                                            <div className='col'>
                                              <h6 className={cx('label-style')}>
                                                Operation
                                              </h6>
                                              <SelectField
                                                name={`calculation[${index}].operations`}
                                                options={
                                                  calculationTestOperations
                                                }
                                                value={
                                                  values?.calculation[
                                                    index as number
                                                  ]?.operations
                                                }
                                                placeholder='Select Operation'
                                                onChange={(e) => {
                                                  setFieldValue(
                                                    `calculation[${index}].operations`,
                                                    e &&
                                                      (e as SelectType)
                                                        ?.label &&
                                                      (e as SelectType)?.label
                                                        ?.length > 0
                                                      ? (e as SelectType).label
                                                      : ''
                                                  );
                                                }}
                                                isSearchable={false}
                                                onBlur={setFieldTouched}
                                                error={
                                                  errors?.calculation !==
                                                    undefined &&
                                                  (
                                                    errors?.calculation[
                                                      index
                                                    ] as FormikErrors<{
                                                      operations: string;
                                                    }>
                                                  )?.operations
                                                }
                                                touched={
                                                  touched?.calculation !==
                                                    undefined &&
                                                  touched?.calculation[index]
                                                    ?.operations
                                                }
                                              />
                                            </div>
                                            <div className='col'>
                                              <h6 className={cx('label-style')}>
                                                Bracket
                                              </h6>
                                              <Select
                                                name={`calculation[${index}].brackets`}
                                                options={
                                                  calculationTestBrackets
                                                }
                                                value={{
                                                  label:
                                                    values?.calculation[
                                                      index as number
                                                    ]?.brackets?.length > 0
                                                      ? values?.calculation[
                                                          index as number
                                                        ]?.brackets
                                                      : 'Select Brackets',
                                                }}
                                                isClearable
                                                isSearchable={false}
                                                placeholder='Select Bracket'
                                                onChange={(e) => {
                                                  setFieldValue(
                                                    `calculation[${index}].brackets`,
                                                    e &&
                                                      (
                                                        e as unknown as SelectType
                                                      )?.label &&
                                                      (
                                                        e as unknown as SelectType
                                                      )?.label?.length > 0
                                                      ? (
                                                          e as unknown as SelectType
                                                        )?.label
                                                      : ''
                                                  );
                                                }}
                                              />
                                            </div>
                                            <div className='col'>
                                              <h6 className={cx('label-style')}>
                                                Number
                                              </h6>
                                              <SelectField
                                                name={`calculation[${index}].number`}
                                                options={calculationTestNumber}
                                                value={
                                                  values?.calculation[
                                                    index as number
                                                  ]?.number
                                                }
                                                placeholder='Select Number'
                                                isSearchable={false}
                                                onChange={(e) => {
                                                  setFieldValue(
                                                    `calculation[${index}].number`,
                                                    e &&
                                                      (e as SelectType)
                                                        ?.label &&
                                                      (e as SelectType)?.label
                                                        ?.length > 0
                                                      ? (e as SelectType)?.label
                                                      : ''
                                                  );
                                                }}
                                                onBlur={setFieldTouched}
                                                error={
                                                  errors?.calculation !==
                                                    undefined &&
                                                  (
                                                    errors?.calculation[
                                                      index
                                                    ] as FormikErrors<{
                                                      number: string;
                                                    }>
                                                  )?.number
                                                }
                                                touched={
                                                  touched?.calculation !==
                                                    undefined &&
                                                  touched?.calculation[index]
                                                    ?.number
                                                }
                                              />
                                            </div>
                                          </Col>
                                        </Row>
                                      </div>
                                    )
                                  )}
                                </div>
                              </Row>
                              <div>
                                <div className={cx('save')}>
                                  <Button
                                    style={{
                                      marginRight: '8px',
                                    }}
                                    className={cx('close-btn')}
                                    type='button'
                                    onClick={() => {
                                      router.replace('/test/calculationtest'),
                                        props.setAddCalculationTest(false);
                                      resetForm();
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
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default AddCalculationTest;
