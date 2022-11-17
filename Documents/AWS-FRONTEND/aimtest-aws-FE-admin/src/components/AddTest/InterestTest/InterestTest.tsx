import * as Yup from 'yup';
import { AnyAction } from 'redux';
import Select from 'react-select';
import { useRouter } from 'next/router';
import {
  faArrowLeft,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';

import { RootState } from 'redux/store';
import className from 'classnames/bind';
import styles from '../index.module.css';
import {
  postInterestTestData,
  putInterestTestData,
} from 'redux/action/Test/Interest';
import {
  interestTestOptions,
  interestTestPercentage,
} from 'components/Select/SelectOptions';
import { loader } from 'redux/reducer/Loader';
import { Loader } from 'components/Loader/Loader';

const AddInterestTest = (props: {
  setAddInterestTest: (arg0: boolean) => void;
}) => {
  const router = useRouter();
  const query = router.query;
  const dispatch = useDispatch();
  const cx = className.bind(styles);

  const particularInterestTestData = useSelector(
    (state: RootState) => state?.interestTest?.particularInterestTestData
  );
  const token = useSelector((state: RootState) => state?.login?.loginData);
  const load = useSelector((state: RootState) => state?.loader?.loader);

  const [optionCount, setOptionCount] = useState([
    {
      option: 1,
    },
  ]);
  const [questionCount, setQuestionCount] = useState(1);

  useEffect(() => {
    if (query?.editId !== undefined) {
      const a =
        particularInterestTestData?.questions !== undefined &&
        particularInterestTestData?.questions?.map(
          (item: { options: { option: number }[] }) => {
            return {
              option: item?.options?.length,
            };
          }
        );
      setOptionCount(a);
      setQuestionCount(particularInterestTestData?.questions?.length);
    }
  }, [
    particularInterestTestData,
    particularInterestTestData?.question,
    particularInterestTestData?.questions,
    query?.editId,
  ]);

  const initialValues: interestTestData = {
    interest: query?.editId?.length ? particularInterestTestData?.interest : [],
    totalTestTime: query?.editId?.length
      ? particularInterestTestData?.totalTestTime
      : '',
    questions: query?.editId?.length
      ? particularInterestTestData?.questions
      : [
          {
            question: '',
            options: [{ option: '', percentage: '' }],
          },
        ],
    minOptions: query?.editId?.length
      ? particularInterestTestData?.minOptions
      : '',
    maxOptions: query?.editId?.length
      ? particularInterestTestData?.maxOptions
      : '',
  };

  return (
    <>
      {((query?.editId !== undefined &&
        query?.editId === particularInterestTestData?._id) ||
        query?.editId === undefined) && (
        <div className={cx('flex-style')}>
          <div className={cx('parent-section')}>
            <Loader open={load} />
            <div className={cx('text-btn')}>
              <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={Yup.object().shape({
                  interest: Yup.array().min(1, 'Required'),
                  totalTestTime: Yup.number().required('Required'),
                  minOptions: Yup.number().required('Required'),
                  maxOptions: Yup.number().required('Required'),
                  questions: Yup.array().of(
                    Yup.object().shape({
                      question: Yup.string().required('Required'),
                      options: Yup.array().of(
                        Yup.object().shape({
                          option: Yup.string().required('Required'),
                          percentage: Yup.string().required('Required'),
                        })
                      ),
                    })
                  ),
                })}
                onSubmit={(values) => {
                  dispatch(loader(true));
                  query?.editId?.length
                    ? dispatch(
                        putInterestTestData(
                          query?.editId as string,
                          values,
                          token,
                          props.setAddInterestTest,
                          router
                        ) as unknown as AnyAction
                      )
                    : dispatch(
                        postInterestTestData(
                          values,
                          token,
                          props.setAddInterestTest,
                          router
                        ) as unknown as AnyAction
                      );
                }}
              >
                {({
                  values,
                  handleSubmit,
                  setFieldValue,
                  handleBlur,
                  resetForm,
                }) => (
                  <Form onSubmit={handleSubmit}>
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
                                    resetForm(),
                                      router.push('/test/interest'),
                                      props.setAddInterestTest(false);
                                  }}
                                />
                                <h4>
                                  {query?.editId && query?.editId?.length > 0
                                    ? 'Edit Interest Test'
                                    : 'Add Interest Test'}
                                </h4>
                              </div>
                            </div>
                            <div>
                              <Row className={cx('mb-2')}>
                                <Col sm={12}>
                                  <h6 className={cx('label-style')}>
                                    Interest{' '}
                                  </h6>
                                  <Select
                                    placeholder='Select Interest'
                                    name='interest'
                                    isClearable
                                    isMulti
                                    value={
                                      values?.interest?.length > 0
                                        ? values?.interest?.map(
                                            (item: string) => {
                                              return {
                                                label: item,
                                                value: item,
                                              };
                                            }
                                          )
                                        : []
                                    }
                                    options={interestTestOptions}
                                    onChange={(e) => {
                                      if (e?.length > 0) {
                                        const a = e?.map(
                                          (item: { label: string }) => {
                                            return item.label;
                                          }
                                        );
                                        setFieldValue(`interest`, a);
                                      } else if (e?.length === 0) {
                                        setFieldValue(`interest`, []);
                                      }
                                    }}
                                    onBlur={() =>
                                      handleBlur({
                                        target: { name: 'interest' },
                                      })
                                    }
                                  />
                                  <ErrorMessage
                                    className='error-message'
                                    name='interest'
                                    component='span'
                                  />
                                </Col>
                              </Row>

                              <FieldArray
                                name='questions'
                                render={(arrayHelpers) => (
                                  <div>
                                    {values?.questions?.map(
                                      (friend: unknown, index: number) => (
                                        <div key={index} className='mb-3'>
                                          <h6 className={cx('label-style')}>
                                            {index + 1}. Question{' '}
                                          </h6>
                                          <Row
                                            className={cx(
                                              'mb-2 align-items-start'
                                            )}
                                          >
                                            <div className={cx('col pe-0')}>
                                              <Field
                                                name={`questions[${index}].question`}
                                                className={cx('form-control ')}
                                                onChange={(e: {
                                                  target: {
                                                    value: string;
                                                  };
                                                }) => {
                                                  setFieldValue(
                                                    `questions[${index}].question`,
                                                    e?.target?.value?.replace(
                                                      /  +/g,
                                                      ' '
                                                    )
                                                  );
                                                }}
                                                autoComplete='off'
                                                placeholder='Question'
                                                value={
                                                  values?.questions[index]
                                                    ?.question
                                                }
                                              />
                                              <ErrorMessage
                                                name={`questions[${index}].question`}
                                                component='span'
                                                className='error-message'
                                              />
                                            </div>

                                            <div
                                              className={cx(
                                                'add-option col-auto'
                                              )}
                                            >
                                              {index === questionCount - 1 ? (
                                                <div
                                                  className={cx('add-plusicon')}
                                                >
                                                  <div>
                                                    <div
                                                      className={cx(
                                                        'icon-style'
                                                      )}
                                                    >
                                                      <div
                                                        className={cx(
                                                          'addoption-icon'
                                                        )}
                                                        onClick={() => {
                                                          arrayHelpers.insert(
                                                            index +
                                                              questionCount,
                                                            {
                                                              question: '',
                                                              options: [
                                                                {
                                                                  option: '',
                                                                  percentage:
                                                                    '',
                                                                },
                                                              ],
                                                            }
                                                          ),
                                                            setQuestionCount(
                                                              (count) =>
                                                                count + 1
                                                            );
                                                          setOptionCount(
                                                            (prev) => [
                                                              ...prev,
                                                              {
                                                                option: 1,
                                                              },
                                                            ]
                                                          );
                                                        }}
                                                      >
                                                        <FontAwesomeIcon
                                                          icon={faPlus}
                                                        />
                                                      </div>
                                                      {index === 0 && (
                                                        <div id='hidebox'></div>
                                                      )}
                                                      {index > 0 && (
                                                        <div
                                                          className={cx(
                                                            'removeoption-icon'
                                                          )}
                                                          onClick={() => {
                                                            arrayHelpers.remove(
                                                              index as number
                                                            ),
                                                              setQuestionCount(
                                                                (count) =>
                                                                  count - 1
                                                              );
                                                            optionCount?.splice(
                                                              index,
                                                              1
                                                            );
                                                          }}
                                                        >
                                                          <FontAwesomeIcon
                                                            icon={faTrash}
                                                          />
                                                        </div>
                                                      )}
                                                    </div>
                                                  </div>
                                                </div>
                                              ) : (
                                                <div
                                                  className={cx('add-plusicon')}
                                                >
                                                  <div>
                                                    <div
                                                      className={cx(
                                                        'icon-style'
                                                      )}
                                                    >
                                                      <div
                                                        className={cx(
                                                          'removeoption-icon'
                                                        )}
                                                        onClick={() => {
                                                          arrayHelpers.remove(
                                                            index as number
                                                          ),
                                                            setQuestionCount(
                                                              (count) =>
                                                                count - 1
                                                            );
                                                          optionCount?.splice(
                                                            index,
                                                            1
                                                          );
                                                        }}
                                                      >
                                                        <FontAwesomeIcon
                                                          icon={faTrash}
                                                        />
                                                      </div>
                                                      <div id='hidebox'></div>
                                                    </div>
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                          </Row>
                                          <div className={cx('option-box')}>
                                            <div className={cx('option-flex')}>
                                              <FieldArray
                                                name={`questions[${index}].options`}
                                                render={(arrayHelpers) => (
                                                  <>
                                                    <div
                                                      className={cx(
                                                        'background-option'
                                                      )}
                                                    >
                                                      <div className='row'>
                                                        <h6
                                                          className={cx(
                                                            'label-style mx-2'
                                                          )}
                                                        >
                                                          Options
                                                        </h6>
                                                        {values?.questions[
                                                          index
                                                        ]?.options?.map(
                                                          (
                                                            friend: unknown,
                                                            optionIndex: number
                                                          ) => (
                                                            <div
                                                              className={cx(
                                                                'flex-fields'
                                                              )}
                                                              key={optionIndex}
                                                            >
                                                              <div
                                                                className={cx(
                                                                  'field-size'
                                                                )}
                                                              >
                                                                <div className='col'>
                                                                  <Field
                                                                    type='text'
                                                                    className={cx(
                                                                      'form-control mb-2'
                                                                    )}
                                                                    name={`questions[${index}].options[${optionIndex}].option`}
                                                                    placeholder='Option'
                                                                    autoComplete='off'
                                                                    value={
                                                                      values
                                                                        ?.questions[
                                                                        index
                                                                      ]
                                                                        ?.options[
                                                                        optionIndex
                                                                      ]?.option
                                                                    }
                                                                    onChange={(e: {
                                                                      target: {
                                                                        value: string;
                                                                      };
                                                                    }) => {
                                                                      setFieldValue(
                                                                        `questions[${index}].options[${optionIndex}].option`,
                                                                        e?.target?.value?.replace(
                                                                          /  +/g,
                                                                          ' '
                                                                        )
                                                                      );
                                                                    }}
                                                                  />
                                                                  <ErrorMessage
                                                                    name={`questions[${index}].options[${optionIndex}].option`}
                                                                    component='span'
                                                                    className='error-message mb-2'
                                                                  />
                                                                </div>
                                                                <div className='col'>
                                                                  <Select
                                                                    name={`questions[${index}].options[${optionIndex}].percentage`}
                                                                    options={
                                                                      interestTestPercentage
                                                                    }
                                                                    className={cx(
                                                                      'mb-2'
                                                                    )}
                                                                    placeholder='Percentage'
                                                                    value={{
                                                                      label:
                                                                        values
                                                                          .questions[
                                                                          index
                                                                        ]
                                                                          .options[
                                                                          optionIndex
                                                                        ]
                                                                          .percentage
                                                                          ?.length >
                                                                        0
                                                                          ? values
                                                                              .questions[
                                                                              index
                                                                            ]
                                                                              .options[
                                                                              optionIndex
                                                                            ]
                                                                              .percentage
                                                                          : 'Select Percentage',
                                                                    }}
                                                                    isClearable={
                                                                      true
                                                                    }
                                                                    onChange={(
                                                                      e
                                                                    ) => {
                                                                      setFieldValue(
                                                                        `questions[${index}].options[${optionIndex}].percentage`,
                                                                        e &&
                                                                          (
                                                                            e as SelectType
                                                                          )
                                                                            ?.label &&
                                                                          (
                                                                            e as SelectType
                                                                          )
                                                                            ?.label
                                                                            ?.length >
                                                                            0
                                                                          ? (
                                                                              e as SelectType
                                                                            )
                                                                              ?.label
                                                                          : ''
                                                                      );
                                                                    }}
                                                                    onBlur={() => {
                                                                      handleBlur(
                                                                        {
                                                                          target:
                                                                            {
                                                                              name: `questions[${index}].options[${optionIndex}].percentage`,
                                                                            },
                                                                        }
                                                                      );
                                                                    }}
                                                                  />
                                                                  <ErrorMessage
                                                                    name={`questions[${index}].options[${optionIndex}].percentage`}
                                                                    component='span'
                                                                    className='error-message mb-2'
                                                                  />
                                                                </div>
                                                                <div>
                                                                  {optionIndex ===
                                                                  optionCount[
                                                                    index
                                                                  ]?.option -
                                                                    1 ? (
                                                                    <div className='col-auto'>
                                                                      <div>
                                                                        <div
                                                                          className={cx(
                                                                            'icon-style'
                                                                          )}
                                                                        >
                                                                          <div
                                                                            className={cx(
                                                                              'addoption-icon'
                                                                            )}
                                                                            onClick={() => {
                                                                              arrayHelpers.insert(
                                                                                optionIndex +
                                                                                  optionCount[
                                                                                    index
                                                                                  ]
                                                                                    ?.option,
                                                                                {
                                                                                  option:
                                                                                    '',
                                                                                  percentage:
                                                                                    '',
                                                                                }
                                                                              ),
                                                                                (optionCount[
                                                                                  index
                                                                                ].option =
                                                                                  optionCount[
                                                                                    index
                                                                                  ]
                                                                                    ?.option +
                                                                                  1);
                                                                            }}
                                                                          >
                                                                            <FontAwesomeIcon
                                                                              icon={
                                                                                faPlus
                                                                              }
                                                                            />
                                                                          </div>
                                                                          {optionIndex ===
                                                                            0 && (
                                                                            <div id='hidebox'></div>
                                                                          )}

                                                                          {optionIndex >
                                                                            0 && (
                                                                            <div
                                                                              className={cx(
                                                                                'removeoption-icon'
                                                                              )}
                                                                              onClick={() => {
                                                                                arrayHelpers.remove(
                                                                                  optionIndex as number
                                                                                ),
                                                                                  (optionCount[
                                                                                    index
                                                                                  ].option =
                                                                                    optionCount[
                                                                                      index
                                                                                    ]
                                                                                      .option -
                                                                                    1);
                                                                              }}
                                                                            >
                                                                              <FontAwesomeIcon
                                                                                icon={
                                                                                  faTrash
                                                                                }
                                                                              />
                                                                            </div>
                                                                          )}
                                                                        </div>
                                                                      </div>
                                                                    </div>
                                                                  ) : (
                                                                    <div
                                                                      className={cx(
                                                                        'add-plusicon'
                                                                      )}
                                                                    >
                                                                      <div>
                                                                        <div
                                                                          className={cx(
                                                                            'icon-style'
                                                                          )}
                                                                        >
                                                                          <div
                                                                            className={cx(
                                                                              'removeoption-icon'
                                                                            )}
                                                                            onClick={() => {
                                                                              arrayHelpers.remove(
                                                                                optionIndex as number
                                                                              ),
                                                                                (optionCount[
                                                                                  index
                                                                                ].option =
                                                                                  optionCount[
                                                                                    index
                                                                                  ]
                                                                                    .option -
                                                                                  1);
                                                                            }}
                                                                          >
                                                                            <FontAwesomeIcon
                                                                              icon={
                                                                                faTrash
                                                                              }
                                                                            />
                                                                          </div>
                                                                          <div id='hidebox'></div>
                                                                        </div>
                                                                      </div>
                                                                    </div>
                                                                  )}
                                                                </div>
                                                              </div>
                                                            </div>
                                                          )
                                                        )}
                                                      </div>
                                                    </div>
                                                  </>
                                                )}
                                              ></FieldArray>
                                            </div>
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </div>
                                )}
                              ></FieldArray>
                              <Row>
                                <Col sm={4}>
                                  <h6 className={cx('label-style')}>
                                    Minimum Options To Select
                                  </h6>
                                  <Field
                                    type='number'
                                    min='0'
                                    className={cx('form-control')}
                                    placeholder='Minimum Options To Select'
                                    value={values?.minOptions}
                                    name='minOptions'
                                  />
                                  <ErrorMessage
                                    name='minOptions'
                                    component='span'
                                    className='error-message'
                                  />
                                </Col>
                                <Col sm={4}>
                                  <h6 className={cx('label-style')}>
                                    Maximum Options To Select
                                  </h6>
                                  <Field
                                    type='number'
                                    min='0'
                                    className={cx('form-control')}
                                    placeholder='Maximum Options To Select'
                                    value={values?.maxOptions}
                                    name='maxOptions'
                                  />
                                  <ErrorMessage
                                    name='maxOptions'
                                    component='span'
                                    className='error-message'
                                  />
                                </Col>
                                <Col sm={4}>
                                  <h6 className={cx('label-style')}>
                                    Total Test Time (In Min)
                                  </h6>
                                  <Field
                                    type='number'
                                    min='0'
                                    className={cx('form-control')}
                                    placeholder='Total Test Time (In Min)'
                                    value={values?.totalTestTime}
                                    name='totalTestTime'
                                  />
                                  <ErrorMessage
                                    name='totalTestTime'
                                    component='span'
                                    className='error-message'
                                  />
                                </Col>
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
                                      resetForm(),
                                        router.push('/test/interest'),
                                        props.setAddInterestTest(false);
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
export default AddInterestTest;
