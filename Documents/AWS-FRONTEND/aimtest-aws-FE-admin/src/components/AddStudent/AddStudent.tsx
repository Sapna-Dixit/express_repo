import * as Yup from 'yup';
import moment from 'moment';
import { AnyAction } from 'redux';
import { useRouter } from 'next/router';
import { RootState } from 'redux/store';
import { Button, Col, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ErrorMessage, Field, Form, Formik, FormikTouched } from 'formik';

import styles from './index.module.css';
import className from 'classnames/bind';
import { loader } from 'redux/reducer/Loader';
import { Loader } from 'components/Loader/Loader';
import { SelectField } from 'components/Select/Select';
import { phoneRegExp } from 'components/Validation/Validation';
import { classList } from 'components/MemoryTest/GetClassList';
import { postStudentData, putStudentData } from 'redux/action/Student';

const AddStudent = (props: { setAddStudent: (arg0: boolean) => void }) => {
  const router = useRouter();
  const query = router.query;
  const dispatch = useDispatch();
  const cx = className.bind(styles);

  const particularStudentData = useSelector(
    (state: RootState) => state?.student?.particularStudentData
  );
  const classData = useSelector(
    (state: RootState) => state?.class?.classData?.classes
  );

  const load = useSelector((state: RootState) => state?.loader?.loader);
  const token = useSelector((state: RootState) => state?.login?.loginData);

  const dataClass = classData?.map((item: { name: string }) => {
    return { ...item, label: item?.name, value: item?.name };
  });

  const initialValues: studentType = {
    fname: query?.editId?.length ? particularStudentData?.fname : '',
    lname: query?.editId?.length ? particularStudentData?.lname : '',
    phone: query?.editId?.length ? particularStudentData?.phone : '',
    fatherName: query?.editId?.length ? particularStudentData?.fatherName : '',
    motherName: query?.editId?.length ? particularStudentData?.motherName : '',
    dob: query?.editId?.length
      ? particularStudentData?.dob?.substring(0, 10)
      : '',
    email: query?.editId?.length ? particularStudentData?.email : '',
    userName: query?.editId?.length ? particularStudentData?.userName : '',
    class: {
      _id: query?.editId?.length ? particularStudentData?.class?._id : '',
      name: query?.editId?.length ? particularStudentData?.class?.name : '',
    },
    school: query?.editId?.length ? particularStudentData?.school : '',
    password: query?.editId?.length ? particularStudentData?.password : '',
    isWeb: true,
  };

  const today = new Date();
  const subdate = moment(today).subtract(6, 'year').format('YYYY-MM-DD');

  return (
    <>
      {(query?.editId === particularStudentData?._id ||
        query?.editId === undefined) && (
        <div
          className={cx(
            'animate__animated animate__slideInRight parent-section'
          )}
        >
          <Loader open={load} />
          <div className={cx('card')}>
            <div className={cx('add-scroll')}>
              <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={Yup.object().shape({
                  fname: Yup.string().required('Required'),
                  dob: Yup.date().required('Required'),
                  userName: Yup.string().required('Required'),
                  password: Yup.string().required('Required'),
                  phone: Yup.string()
                    .required('Required')
                    .matches(phoneRegExp, 'Phone number is not valid'),
                  class: Yup.object().shape({
                    name: Yup.string().required('Required'),
                  }),
                })}
                onSubmit={(values) => {
                  values.fname =
                    values.fname?.charAt(0)?.toUpperCase() +
                    values.fname?.slice(1)?.trim();
                  values.fname = values.fname?.replace(/\s+/g, ' ')?.trim();
                  values.lname =
                    values.lname?.charAt(0)?.toUpperCase() +
                    values.lname?.slice(1)?.trim();
                  values.lname = values.lname?.replace(/\s+/g, ' ')?.trim();
                  dispatch(loader(true));
                  query?.editId?.length
                    ? dispatch(
                        putStudentData(
                          query?.editId as string,
                          values,
                          token,
                          props.setAddStudent,
                          router
                        ) as unknown as AnyAction
                      )
                    : dispatch(
                        postStudentData(
                          values,
                          token,
                          props.setAddStudent,
                          router
                        ) as unknown as AnyAction
                      );
                }}
              >
                {({
                  values,
                  handleSubmit,
                  errors,
                  touched,
                  setFieldValue,
                  setFieldTouched,
                  resetForm,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <div className={cx('card-table')}>
                      <div>
                        <div className={cx('card-flex')}>
                          <FontAwesomeIcon
                            icon={faArrowLeft}
                            className={cx('back-img')}
                            onClick={() => {
                              resetForm(),
                                props.setAddStudent(false),
                                router.replace('/student');
                            }}
                          />
                          <h4>
                            {query?.editId && query?.editId?.length > 0
                              ? 'Edit Student'
                              : 'Add Student'}
                          </h4>
                        </div>
                      </div>

                      <Row>
                        <Col sm={6}>
                          <div>
                            <h6 className={cx('label-style')}>First Name</h6>
                            <Field
                              type='text'
                              className='form-control'
                              value={values?.fname}
                              placeholder='First Name'
                              name='fname'
                              autoComplete='off'
                            />
                            <ErrorMessage
                              component='span'
                              className='error-message'
                              name='fname'
                            />
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div>
                            <h6 className={cx('label-style')}>Last Name</h6>
                            <Field
                              type='text'
                              className='form-control'
                              value={values?.lname}
                              placeholder='Last Name'
                              name='lname'
                              autoComplete='off'
                            />
                          </div>
                        </Col>
                        <div className='col-lg-6 '>
                          <div>
                            <h6 className={cx('label-style')}>Father Name</h6>
                            <Field
                              type='text'
                              value={values?.fatherName}
                              name='fatherName'
                              className='form-control'
                              placeholder='Father Name'
                              autoComplete='off'
                            />
                          </div>
                        </div>
                        <div className='col'>
                          <div>
                            <h6 className={cx('label-style')}>Mother Name</h6>
                            <Field
                              type='text'
                              value={values?.motherName}
                              name='motherName'
                              className='form-control'
                              placeholder='Mother Name'
                              autoComplete='off'
                            />
                          </div>
                        </div>
                      </Row>

                      <Row>
                        <Col sm={6}>
                          <div>
                            <h6 className={cx('label-style')}>UserName</h6>
                            <Field
                              type='text'
                              className='form-control'
                              value={values?.userName}
                              placeholder='User Name'
                              name='userName'
                              autoComplete='off'
                            />
                            <ErrorMessage
                              component='span'
                              className='error-message'
                              name='userName'
                            />
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div>
                            <h6 className={cx('label-style')}>Password</h6>
                            <Field
                              type='text'
                              className='form-control'
                              value={values?.password}
                              placeholder='Password'
                              name='password'
                              autoComplete='off'
                            />
                            <ErrorMessage
                              component='span'
                              className='error-message'
                              name='password'
                            />
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div className='my-2'>
                            <h6 className={cx('label-style')}>Email</h6>
                            <Field
                              type='email'
                              min='0'
                              value={values?.email}
                              name='email'
                              className='form-control'
                              placeholder='Email'
                              autoComplete='off'
                            />
                            <ErrorMessage
                              component='span'
                              className='error-message'
                              name='email'
                            />
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div className='my-2'>
                            <h6 className={cx('label-style')}>Mobile Number</h6>
                            <Field
                              type='text'
                              min='0'
                              value={values?.phone}
                              name='phone'
                              className='form-control'
                              placeholder='Mobile Number'
                              autoComplete='off'
                            />
                            <ErrorMessage
                              component='span'
                              className='error-message'
                              name='phone'
                            />
                          </div>
                        </Col>
                        <Col sm={6}>
                          <h6 className={cx('label-style')}>Class</h6>
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
                                touched?.class?.name as FormikTouched<boolean>
                              }
                            />
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div className='my-1'>
                            <h6 className={cx('label-style')}>Date Of Birth</h6>
                            <Field
                              type='date'
                              max={subdate}
                              value={values?.dob}
                              name='dob'
                              className='form-control'
                              placeholder='Mobile Number'
                              autoComplete='off'
                            />
                            <ErrorMessage
                              component='span'
                              className='error-message'
                              name='dob'
                            />
                          </div>
                        </Col>
                        <Col sm={12}>
                          <div className='my-1'>
                            <h6 className={cx('label-style')}>School Name</h6>
                            <Field
                              type='text'
                              min='0'
                              value={values?.school}
                              name='school'
                              className='form-control'
                              placeholder='School Name'
                              autoComplete='off'
                            />
                          </div>
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
                                router.replace('/student'),
                                props.setAddStudent(false);
                            }}
                          >
                            Cancel
                          </Button>
                          <Button className={cx('modalsave-btn')} type='submit'>
                            Save
                          </Button>
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

export default AddStudent;
