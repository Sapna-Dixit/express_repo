import {
  ErrorMessage,
  Field,
  FieldArray,
  Form,
  Formik,
  FormikTouched,
} from 'formik';
import * as Yup from 'yup';
import { AnyAction } from 'redux';
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

import { RootState } from 'redux/store';
import className from 'classnames/bind';
import styles from '../index.module.css';
import { loader } from 'redux/reducer/Loader';
import { Loader } from 'components/Loader/Loader';
import TextEditor from 'components/Editor/Editor';
import { SelectField } from 'components/Select/Select';
import { classList } from 'components/MemoryTest/GetClassList';
import SelectTrueOption from 'components/Modal/SelectTrueModal';
import { booleanOptions } from 'components/Select/SelectOptions';
import { postPassageData, putPassageData } from 'redux/action/Test/Passage';

const AddPassage = (props: { setAddPassageTest: (arg0: boolean) => void }) => {
  const router = useRouter();
  const query = router.query;
  const regex = /<[^>]*>/gim;
  const dispatch = useDispatch();
  const cx = className.bind(styles);

  const classData = useSelector(
    (state: RootState) => state?.class?.classData?.classes
  );
  const particularPassageData = useSelector(
    (state: RootState) => state?.passage?.particularPassageData
  );
  const load = useSelector((state: RootState) => state?.loader?.loader);
  const token = useSelector((state: RootState) => state?.login?.loginData);

  const [optionCount, setOptionCount] = useState([
    {
      option: 1,
    },
  ]);
  const [modalShow, setModalShow] = useState(false);
  const [questionCount, setQuestionCount] = useState(1);

  useEffect(() => {
    if (query?.editId !== undefined) {
      const a =
        particularPassageData?.questions !== undefined &&
        particularPassageData?.questions?.map(
          (item: { options: { option: number }[] }) => {
            return {
              option: item?.options?.length,
            };
          }
        );
      setOptionCount(a);
      setQuestionCount(particularPassageData?.questions?.length);
    }
  }, [
    particularPassageData,
    particularPassageData?.description,
    particularPassageData?.question,
    particularPassageData?.questions,
    query?.editId,
  ]);

  const handleTrueFalse = (
    questionIndex: number,
    setFieldValue: {
      (
        field: string,
        value: string,
        shouldValidate?: boolean | undefined
      ): void;
      (arg0: string, arg1: boolean): void;
    },
    valuesOfQuestion: string | { option: string }[],
    optionsIndex: number
  ) => {
    const length = valuesOfQuestion?.length;
    for (let count = 0; count < length; count++) {
      if (count !== optionsIndex) {
        setFieldValue(
          `questions[${questionIndex}].options[${count}].isCorrect`,
          false
        );
      }
    }
  };

  const dataClass = classData?.map((item: { name: string }) => {
    return { ...item, label: item?.name, value: item?.name };
  });

  const initialValues: passageDataType = {
    title: query?.editId?.length ? particularPassageData?.title : '',
    class: {
      _id: query?.editId?.length ? particularPassageData?.class?._id : '',
      name: query?.editId?.length ? particularPassageData?.class?.name : '',
    },
    passageDisplayTime: query?.editId?.length
      ? particularPassageData?.passageDisplayTime
      : '',
    totalTestTime: query?.editId?.length
      ? particularPassageData?.totalTestTime
      : '',
    description: query?.editId?.length
      ? particularPassageData?.description
      : '',
    questions: query?.editId?.length
      ? particularPassageData?.questions
      : [
          {
            question: '',
            options: [{ option: '', isCorrect: false }],
          },
        ],
  };

  return (
    <>
      {((query?.editId !== undefined &&
        query?.editId === particularPassageData?._id) ||
        query?.editId === undefined) && (
        <div className={cx('flex-style')}>
          <Loader open={load} />
          <div className={cx('parent-section')}>
            <SelectTrueOption
              show={modalShow}
              content='One Option Must Be True'
              onClose={() => setModalShow(false)}
            />
            <div className={cx('text-btn')}>
              <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={Yup.object().shape({
                  title: Yup.string().required('Required'),
                  class: Yup.object().shape({
                    name: Yup.string().required('Required'),
                  }),
                  passageDisplayTime: Yup.number().required('Required'),
                  totalTestTime: Yup.number().required('Required'),
                  description: Yup.string().required('Required'),
                  questions: Yup.array().of(
                    Yup.object().shape({
                      question: Yup.string().required('Required'),
                      options: Yup.array().of(
                        Yup.object().shape({
                          option: Yup.string().required('Required'),
                        })
                      ),
                    })
                  ),
                })}
                onSubmit={(values) => {
                  const sampleArray = [];
                  values?.questions?.filter((item) => {
                    item?.options?.filter((dt) => {
                      if (dt?.isCorrect === true) {
                        sampleArray.push('1');
                      }
                    });
                  });
                  if (sampleArray?.length === values?.questions?.length) {
                    values.title =
                      values.title?.charAt(0)?.toUpperCase() +
                      values.title?.slice(1)?.trim();
                    values.title = values.title?.replace(/\s+/g, ' ').trim();
                    dispatch(loader(true));
                    query?.editId?.length
                      ? dispatch(
                          putPassageData(
                            query?.editId as string,
                            values,
                            token,
                            props.setAddPassageTest,
                            router
                          ) as unknown as AnyAction
                        )
                      : dispatch(
                          postPassageData(
                            values,
                            token,
                            props.setAddPassageTest,
                            router
                          ) as unknown as AnyAction
                        );
                  } else {
                    setModalShow(true);
                  }
                }}
              >
                {({
                  values,
                  handleSubmit,
                  setFieldTouched,
                  setFieldValue,
                  touched,
                  errors,
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
                                      router.push('/test/passage'),
                                      props.setAddPassageTest(false);
                                  }}
                                />
                                <h4>
                                  {query?.editId && query?.editId?.length > 0
                                    ? 'Edit Passage Test'
                                    : 'Add Passage Test'}
                                </h4>
                              </div>
                            </div>
                            <div>
                              <Row className={cx('mb-2')}>
                                <Col sm={6}>
                                  <h6 className={cx('label-style')}>Title </h6>
                                  <Field
                                    type='text'
                                    name='title'
                                    value={values?.title}
                                    className={cx('form-control')}
                                    placeholder='Title'
                                  />
                                  <ErrorMessage
                                    className='error-message'
                                    name='title'
                                    component='span'
                                  />
                                </Col>
                                <Col sm={6}>
                                  <h6 className={cx('label-style')}>Class</h6>
                                  <SelectField
                                    name='class.name'
                                    options={classList(dataClass)}
                                    placeholder='Select Class'
                                    value={values?.class?.name}
                                    onChange={(e) =>
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
                                      )
                                    }
                                    onBlur={setFieldTouched}
                                    error={errors?.class?.name as string}
                                    touched={
                                      touched?.class
                                        ?.name as FormikTouched<boolean>
                                    }
                                  />
                                </Col>{' '}
                              </Row>
                              <Row className={cx('mb-2')}>
                                <Col sm={12}>
                                  <h6 className={cx('label-style')}>
                                    Description
                                  </h6>
                                  <div>
                                    <TextEditor
                                      name='description'
                                      cookiesValue='packageDescription'
                                      placeholder='Enter Passage Description'
                                      todo='create'
                                      editorValue={values.description}
                                      onChange={setFieldValue}
                                    />
                                  </div>
                                  <ErrorMessage
                                    name='description'
                                    component='span'
                                    className='error-message'
                                  />
                                </Col>
                                <div
                                  className={cx('word-count')}
                                >{`Word Count - ${
                                  values?.description
                                    .replace(regex, '')
                                    .trim()
                                    ?.split(' ')[0] === ''
                                    ? 0
                                    : values?.description
                                        .replace(regex, '')
                                        .trim()
                                        ?.split(' ')?.length
                                }`}</div>
                              </Row>
                              <Row>
                                <Col sm={6}>
                                  <h6 className={cx('label-style')}>
                                    Passage Display Time (In Mins)
                                  </h6>
                                  <Field
                                    type='number'
                                    min='0'
                                    className={cx('form-control')}
                                    placeholder=' Passage Display Time'
                                    value={values?.passageDisplayTime}
                                    name='passageDisplayTime'
                                  />
                                  <ErrorMessage
                                    name='passageDisplayTime'
                                    component='span'
                                    className='error-message'
                                  />
                                </Col>
                                <Col sm={6}>
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
                                                autoComplete='off'
                                                placeholder='Question'
                                                value={
                                                  values?.questions[index]
                                                    ?.question
                                                }
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
                                                                  isCorrect:
                                                                    false,
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
                                                                  <SelectField
                                                                    name={`questions[${index}].options[${optionIndex}].isCorrect`}
                                                                    options={
                                                                      booleanOptions
                                                                    }
                                                                    placeholder='Correct'
                                                                    isClearable={
                                                                      false
                                                                    }
                                                                    value={
                                                                      (
                                                                        values
                                                                          .questions[
                                                                          index
                                                                        ]
                                                                          .options[
                                                                          optionIndex
                                                                        ]
                                                                          .isCorrect +
                                                                        ''
                                                                      )?.toLowerCase() ==
                                                                      'true'
                                                                        ? 'True'
                                                                        : 'False'
                                                                    }
                                                                    onChange={(
                                                                      e
                                                                    ) => {
                                                                      setFieldValue(
                                                                        `questions[${index}].options[${optionIndex}].isCorrect`,
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
                                                                              ?.label ===
                                                                            'True'
                                                                            ? true
                                                                            : false
                                                                          : ''
                                                                      );
                                                                      e &&
                                                                        (
                                                                          e as SelectType
                                                                        )
                                                                          ?.label &&
                                                                        (
                                                                          e as SelectType
                                                                        )
                                                                          ?.label ===
                                                                          'True' &&
                                                                        handleTrueFalse(
                                                                          index,
                                                                          setFieldValue,
                                                                          values
                                                                            ?.questions[
                                                                            index
                                                                          ]
                                                                            ?.options,
                                                                          optionIndex
                                                                        );
                                                                    }}
                                                                  />
                                                                </div>
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

                                                                <div>
                                                                  {optionCount !==
                                                                    undefined &&
                                                                  optionIndex ===
                                                                    optionCount[
                                                                      index
                                                                    ]?.option -
                                                                      1 ? (
                                                                    <div>
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
                                                                                  isCorrect:
                                                                                    false,
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
                                        router.push('/test/passage'),
                                        props.setAddPassageTest(false);
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
export default AddPassage;
