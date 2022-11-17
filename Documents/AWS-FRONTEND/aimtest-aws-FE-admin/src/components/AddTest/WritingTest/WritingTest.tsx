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
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  ErrorMessage,
  Field,
  FieldArray,
  Form,
  Formik,
  FormikTouched,
} from 'formik';

import { RootState } from 'redux/store';
import styles from '../index.module.css';
import className from 'classnames/bind';
import { loader } from 'redux/reducer/Loader';
import { Loader } from 'components/Loader/Loader';
import { SelectField } from 'components/Select/Select';
import { postWritingTest, putWritingTest } from 'redux/action/Test/WritingTest';

const AddWritingTest = (props: {
  setAddWritingTest: (arg0: boolean) => void;
}) => {
  const router = useRouter();
  const query = router.query;
  const dispatch = useDispatch();
  const cx = className.bind(styles);

  const particularWritingTestData = useSelector(
    (state: RootState) => state?.writingTest?.particularWritingTestData
  );
  const classData = useSelector(
    (state: RootState) => state?.class?.classData?.classes
  );
  const token = useSelector((state: RootState) => state?.login?.loginData);
  const load = useSelector((state: RootState) => state?.loader?.loader);

  const [count, setCount] = useState(28);
  const [wordData, setWordData] = useState([]);

  useEffect(() => {
    const a = particularWritingTestData?.words?.map((item: string) => {
      return {
        word: item,
      };
    });
    setWordData(a);
  }, [particularWritingTestData?.words]);

  const dataClass = classData?.map((item: { name: string }) => {
    return { ...item, label: item?.name, value: item?.name };
  });

  const initialValues: writingTestType = {
    title: query?.editId?.length ? particularWritingTestData?.title : '',
    class: {
      _id: query?.editId?.length ? particularWritingTestData?.class?._id : '',
      name: query?.editId?.length ? particularWritingTestData?.class?.name : '',
    },
    words: query?.editId?.length
      ? wordData
      : [
          { word: '' },
          { word: '' },
          { word: '' },
          { word: '' },
          { word: '' },
          { word: '' },
          { word: '' },
          { word: '' },
          { word: '' },
          { word: '' },
          { word: '' },
          { word: '' },
          { word: '' },
          { word: '' },
          { word: '' },
          { word: '' },
          { word: '' },
          { word: '' },
          { word: '' },
          { word: '' },
          { word: '' },
          { word: '' },
          { word: '' },
          { word: '' },
          { word: '' },
          { word: '' },
          { word: '' },
          { word: '' },
          { word: '' },
          { word: '' },
          { word: '' },
        ],
    timeDuration: query?.editId?.length
      ? particularWritingTestData?.timeDuration
      : '',
  };
  return (
    <>
      {(query?.editId === particularWritingTestData?._id ||
        query?.editId === undefined) && (
        <div className={cx('flex-style')}>
          <Loader open={load} />
          <div className={cx('parent-section')}>
            <div className={cx('text-btn')}>
              <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={Yup.object().shape({
                  title: Yup.string().required('Required'),
                  class: Yup.object().shape({
                    name: Yup.string().required('Required'),
                  }),
                  timeDuration: Yup.number().required('Required'),
                  words: Yup.array().of(
                    Yup.object().shape({
                      word: Yup.string().required('Required'),
                    })
                  ),
                })}
                onSubmit={(values) => {
                  const wordsArray = values?.words?.map(
                    (item) => (item as { word: string }).word
                  );
                  values.title =
                    values.title?.charAt(0)?.toUpperCase() +
                    values.title?.slice(1)?.trim();
                  values.title = values.title?.replace(/\s+/g, ' ')?.trim();
                  values.words = wordsArray as [];
                  dispatch(loader(true));
                  query?.editId?.length
                    ? dispatch(
                        putWritingTest(
                          query?.editId as string,
                          values,
                          token,
                          props.setAddWritingTest,
                          router
                        ) as unknown as AnyAction
                      )
                    : dispatch(
                        postWritingTest(
                          values,
                          token,
                          props.setAddWritingTest,
                          router
                        ) as unknown as AnyAction
                      );
                }}
              >
                {({
                  handleSubmit,
                  values,
                  setFieldTouched,
                  errors,
                  setFieldValue,
                  touched,
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
                                    router.push('/test/writingtest'),
                                      props.setAddWritingTest(false);
                                  }}
                                />
                                <h4>
                                  {query?.editId && query?.editId?.length > 0
                                    ? 'Edit Writting Test'
                                    : 'Add Writting Test'}
                                </h4>
                              </div>
                            </div>
                            <div>
                              <Row className={cx('mb-2')}>
                                <Col sm={12}>
                                  <h6 className={cx('label-style')}>
                                    Questions
                                  </h6>
                                  <Field
                                    as='textarea'
                                    value={values.title}
                                    name='title'
                                    className={cx('form-control')}
                                    placeholder='Question'
                                  />
                                  <ErrorMessage
                                    name='title'
                                    component='span'
                                    className='error-message '
                                  />
                                </Col>
                              </Row>
                              <Row className={cx('mb-2')}>
                                <Col sm={6}>
                                  <h6 className={cx('label-style')}>
                                    Time Duration
                                  </h6>
                                  <Field
                                    type='number'
                                    min='0'
                                    value={values.timeDuration}
                                    name='timeDuration'
                                    className={cx('form-control')}
                                    placeholder='Time Duration (In Mins)'
                                  />
                                  <ErrorMessage
                                    name='timeDuration'
                                    component='span'
                                    className='error-message '
                                  />
                                </Col>
                                <Col sm={6}>
                                  <h6 className={cx('label-style')}>Class</h6>
                                  <SelectField
                                    name='class.name'
                                    options={dataClass}
                                    placeholder='Select Class'
                                    value={values?.class?.name}
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
                                </Col>{' '}
                              </Row>
                              <div className={cx('my-3')}>
                                <FieldArray
                                  name='words'
                                  render={(arrayHelpers) => (
                                    <div className='row'>
                                      {values?.words?.map(
                                        (friend: unknown, index: number) => (
                                          <div
                                            className='col-4 custom-arrow mb-3'
                                            key={index}
                                          >
                                            <div className='row'>
                                              <h6
                                                className={cx(
                                                  'label-style px-3'
                                                )}
                                              >
                                                Word {index + 1}
                                              </h6>
                                              <div
                                                className={
                                                  index > 29
                                                    ? 'col-11'
                                                    : 'col-12'
                                                }
                                              >
                                                <Field
                                                  name={`words[${index}].word`}
                                                  className={cx(
                                                    'form-control '
                                                  )}
                                                  placeholder='Enter Word'
                                                  onChange={(e: {
                                                    target: {
                                                      value: string;
                                                    };
                                                  }) => {
                                                    setFieldValue(
                                                      `words[${index}].word`,
                                                      e.target.value?.replace(
                                                        /  +/g,
                                                        ' '
                                                      )
                                                    );
                                                  }}
                                                  autoComplete='off'
                                                />
                                                <ErrorMessage
                                                  name={`words[${index}].word`}
                                                  component='span'
                                                  className='error-message '
                                                />
                                              </div>
                                              <div className='col-1 p-0 '>
                                                {index === count + 2 ? (
                                                  <>
                                                    <div
                                                      className={cx(
                                                        'addoption-icon'
                                                      )}
                                                      onClick={() => {
                                                        arrayHelpers?.insert(
                                                          index + count,
                                                          {
                                                            word: '',
                                                          }
                                                        ),
                                                          setCount(count + 1);
                                                      }}
                                                    >
                                                      <FontAwesomeIcon
                                                        icon={faPlus}
                                                        title='Add'
                                                      />
                                                    </div>
                                                  </>
                                                ) : (
                                                  <>
                                                    {index > 29 && count > 28 && (
                                                      <div>
                                                        <div
                                                          className={cx(
                                                            'removeoption-icon'
                                                          )}
                                                          onClick={() => {
                                                            arrayHelpers.remove(
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
                                                      </div>
                                                    )}
                                                  </>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  )}
                                />
                              </div>
                              <div>
                                <div className={cx('save')}>
                                  <Button
                                    style={{
                                      marginRight: '8px',
                                    }}
                                    className={cx('close-btn')}
                                    type='button'
                                    onClick={() => {
                                      router.push('/test/writingtest'),
                                        props.setAddWritingTest(false);
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
export default AddWritingTest;
