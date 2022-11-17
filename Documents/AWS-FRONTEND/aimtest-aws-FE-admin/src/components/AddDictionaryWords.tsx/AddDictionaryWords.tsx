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
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';

import { RootState } from 'redux/store';
import styles from './index.module.css';
import className from 'classnames/bind';
import { loader } from 'redux/reducer/Loader';
import { Loader } from 'components/Loader/Loader';
import { postDictionary, putDictionary } from 'redux/action/Dictionary';

const AddDictionaryWords = (props: {
  setAddDictionary: (arg0: boolean) => void;
}) => {
  const router = useRouter();
  const query = router.query;
  const dispatch = useDispatch();
  const cx = className.bind(styles);

  const particularDictionaryData = useSelector(
    (state: RootState) => state?.dictionary?.particularDictionaryData
  );

  const token = useSelector((state: RootState) => state?.login?.loginData);
  const load = useSelector((state: RootState) => state?.loader?.loader);

  const [count, setCount] = useState(0);
  const [wordData, setWordData] = useState([]);

  useEffect(() => {
    const a = particularDictionaryData?.words?.map((item: string) => {
      return {
        word: item,
      };
    });
    setWordData(a);
  }, [particularDictionaryData?.words]);

  const initialValues: wordDictionaryType = {
    title: query?.editId?.length ? particularDictionaryData?.title : '',
    words: query?.editId?.length ? wordData : [{ word: '' }],
  };
  return (
    <>
      {(query?.editId === particularDictionaryData?._id ||
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
                        putDictionary(
                          query?.editId as string,
                          values,
                          token,
                          props.setAddDictionary,
                          router
                        ) as unknown as AnyAction
                      )
                    : dispatch(
                        postDictionary(
                          values,
                          token,
                          props.setAddDictionary,
                          router
                        ) as unknown as AnyAction
                      );
                }}
              >
                {({ handleSubmit, values, setFieldValue }) => (
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
                                    router.push('/dictionary'),
                                      props.setAddDictionary(false);
                                  }}
                                />
                                <h4>
                                  {query?.editId && query?.editId?.length > 0
                                    ? 'Edit Dictionary'
                                    : 'Add Dictionary'}
                                </h4>
                              </div>
                            </div>
                            <div>
                              <Row className={cx('mb-2')}>
                                <Col sm={12}>
                                  <h6 className={cx('label-style')}>Title</h6>
                                  <Field
                                    type='text'
                                    value={values.title}
                                    name='title'
                                    className={cx('form-control')}
                                    placeholder='Title'
                                  />
                                  <ErrorMessage
                                    name='title'
                                    component='span'
                                    className='error-message '
                                  />
                                </Col>
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
                                                  className={cx('label-style px-3')}
                                                >
                                                  Word {index + 1}
                                                </h6>
                                              <div
                                                className={cx('input-words')}
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
                                                {index === count ? (
                                                  <>
                                                    <div
                                                      className={cx(
                                                        'addoption-icon'
                                                      )}
                                                      onClick={() => {
                                                        arrayHelpers?.insert(
                                                          index + count + 1,
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
                                                    {count > 0 && (
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
                                      router.push('/dictionary'),
                                        props.setAddDictionary(false);
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
export default AddDictionaryWords;
