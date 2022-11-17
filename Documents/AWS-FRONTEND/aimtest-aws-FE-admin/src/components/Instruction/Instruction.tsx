import * as Yup from 'yup';
import { AnyAction } from 'redux';
import { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';

import {
  deleteInstructionData,
  getInstructions,
  postInstructionData,
  putInstructionData,
} from 'redux/action/Instruction';
import { RootState } from 'redux/store';
import styles from './index.module.css';
import className from 'classnames/bind';
import { loader } from 'redux/reducer/Loader';
import TextEditor from 'components/Editor/Editor';
import { Loader } from 'components/Loader/Loader';

const Instruction = () => {
  const dispatch = useDispatch();
  const cx = className.bind(styles);

  const instructionData = useSelector(
    (state: RootState) => state?.instruction?.instructionData.instructions
  );

  const token = useSelector((state: RootState) => state?.login?.loginData);
  const load = useSelector((state: RootState) => state?.loader?.loader);

  const countt = instructionData?.length;

  useEffect(() => {
    if (token?.length > 0) {
      dispatch(loader(true));
      dispatch(getInstructions(token) as unknown as AnyAction);
    }
  }, [token, dispatch]);

  const initialValues: instructionDataType = {
    instruction: instructionData,
  };

  const SubmitForm = (
    data: { testPage: string; _id: string; content: string },
    index: number
  ) => {
    if (index >= countt) {
      dispatch(loader(true));
      dispatch(postInstructionData(data, token) as unknown as AnyAction);
    } else {
      dispatch(loader(true));
      dispatch(
        putInstructionData(data._id, data, token) as unknown as AnyAction
      );
    }
  };

  return (
    <>
      <div className={cx('flex-style')}>
        <div className={cx('parent-section')}>
          <Loader open={load} />
          <div className={cx('text-btn')}>
            <Formik
              enableReinitialize={true}
              initialValues={initialValues}
              validationSchema={Yup.object().shape({
                instruction: Yup.array().of(
                  Yup.object().shape({
                    testPage: Yup.string().required('Required'),
                    content: Yup.string().required('Required'),
                  })
                ),
              })}
              onSubmit={() => {
                // dispatch(
                //   putInstructionData(
                //     values[0]?._id,
                //     values,
                //     token
                //   ) as unknown as AnyAction
                // );
              }}
            >
              {({ values, handleSubmit, setFieldValue }) => (
                <Form onSubmit={handleSubmit}>
                  <div
                    className={cx('animate__animated animate__slideInRight')}
                  >
                    <div className={cx('card')}>
                      <div className='mx-2 mt-3 mb-2'>
                        <div className='formula-refresh'>
                          <div className={cx('card-flex')}>
                            <h4>Instructions</h4>
                          </div>
                          <div>
                            <div>
                              <Button
                                className={cx('sucess-btn')}
                                variant='success'
                                onClick={() => {
                                  token?.length > 0 && dispatch(loader(true)),
                                    dispatch(
                                      getInstructions(
                                        token
                                      ) as unknown as AnyAction
                                    );
                                }}
                                title='Refresh'
                              >
                                <FontAwesomeIcon icon={faRefresh} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={cx('add-scroll')}>
                        <div className={cx('card-table')}>
                          <div>
                            <FieldArray
                              name='instruction'
                              render={(arrayHelpers) => (
                                <>
                                  <Row></Row>
                                  <div>
                                    {values?.instruction?.map(
                                      (friend: unknown, index: number) => (
                                        <div key={index} className='mb-3'>
                                          <Row
                                            className={cx(
                                              'mb-2 align-items-start'
                                            )}
                                          >
                                            <div className={cx('col pe-0')}>
                                              <h6 className={cx('label-style')}>
                                                Selected Test{' '}
                                              </h6>
                                              <Col sm={12}>
                                                <Field
                                                  type='text'
                                                  value={
                                                    values?.instruction[index]
                                                      ?.testPage
                                                  }
                                                  className='form-control'
                                                  autoComplete='off'
                                                  placeholder='Enter Test Name'
                                                  name={`instruction[${index}].testPage`}
                                                />
                                                <ErrorMessage
                                                  name={`instruction[${index}].testPage`}
                                                  component='span'
                                                  className='error-message'
                                                />
                                              </Col>{' '}
                                              <Col sm={12}>
                                                <h6
                                                  className={cx('label-style')}
                                                >
                                                  Enter Instructions
                                                </h6>
                                                <div>
                                                  <TextEditor
                                                    name={`instruction[${index}].content`}
                                                    cookiesValue='content'
                                                    placeholder='Enter Instruction'
                                                    todo='create'
                                                    editorValue={
                                                      values?.instruction[index]
                                                        ?.content?.length === 0
                                                        ? ''
                                                        : values?.instruction[
                                                            index
                                                          ]?.content
                                                    }
                                                    onChange={setFieldValue}
                                                  />
                                                </div>
                                                <ErrorMessage
                                                  name={`instruction[${index}].content`}
                                                  component='span'
                                                  className='error-message'
                                                />
                                              </Col>
                                            </div>
                                          </Row>

                                          <div className={cx('save')}>
                                            <Button
                                              className={cx('sucess-btn mx-2')}
                                              type='submit'
                                              onClick={() =>
                                                values?.instruction[index]
                                                  ?.content?.length > 0 &&
                                                values?.instruction[index]
                                                  ?.testPage?.length > 0 &&
                                                SubmitForm(
                                                  values?.instruction[index],
                                                  index
                                                )
                                              }
                                            >
                                              {index > countt - 1
                                                ? 'Add'
                                                : 'Update'}
                                            </Button>
                                            {index > countt - 1 ? (
                                              <Button
                                                className={cx(
                                                  'delete-btn mx-2'
                                                )}
                                                type='submit'
                                                onClick={() => {
                                                  arrayHelpers.remove(index);
                                                }}
                                              >
                                                Remove
                                              </Button>
                                            ) : (
                                              <Button
                                                className={cx('delete-btn')}
                                                type='submit'
                                                onClick={() => {
                                                  {
                                                    dispatch(loader(true));
                                                    dispatch(
                                                      deleteInstructionData(
                                                        values?.instruction[
                                                          index
                                                        ]._id,
                                                        token
                                                      ) as unknown as AnyAction
                                                    );
                                                  }
                                                }}
                                              >
                                                Delete
                                              </Button>
                                            )}
                                          </div>
                                        </div>
                                      )
                                    )}
                                    <div
                                      className='text-end'
                                      style={{
                                        marginBottom: '4rem',
                                      }}
                                    >
                                      <Button
                                        className={cx('sucess-btn ms-auto')}
                                        onClick={() => {
                                          arrayHelpers.push({
                                            testPage: '',
                                            content: '',
                                          });
                                        }}
                                      >
                                        <FontAwesomeIcon
                                          icon={faPlus}
                                          className='me-2'
                                        />
                                        Add New Instructions
                                      </Button>
                                    </div>
                                  </div>
                                </>
                              )}
                            ></FieldArray>
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
    </>
  );
};
export default Instruction;
