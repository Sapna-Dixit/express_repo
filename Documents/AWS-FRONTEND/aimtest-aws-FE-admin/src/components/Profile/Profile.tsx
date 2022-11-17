import axios from 'axios';
import * as Yup from 'yup';
import Image from 'next/image';
import { AnyAction } from 'redux';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Tab, Tabs, Button } from 'react-bootstrap';
import { ChangeEvent, useEffect, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRetweet, faXmark } from '@fortawesome/free-solid-svg-icons';

import { RootState } from 'redux/store';
import styles from './index.module.css';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import {
  errorMessage,
  errorr,
  passwordChange,
  passwordMatch,
  success,
} from 'components/Toaster/ToasterMessage';
import { url } from 'components/Api/ApiUrl';
import { loader } from 'redux/reducer/Loader';
import user from '../../../src/Images/client.png';
import showToaster from 'components/Toaster/Toaster';
import { phoneRegExp } from 'components/Validation/Validation';
import { getUserProfile, updateProfile } from 'redux/action/Login';

const Profile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cx = classNames.bind(styles);

  const token = useSelector((state: RootState) => state?.login?.loginData);
  const userData = useSelector((state: RootState) => state?.login?.userData);

  const [edit, setEdit] = useState(true);
  const [inputField, setInputField] = useState(true);
  const [submitType, setSubmitType] = useState('profile');
  const [picture, setPicture] = useState(userData?.profile);
  const [logoFile, setLogoFile] = useState<File | null>(userData?.profile);

  useEffect(() => {
    dispatch(getUserProfile(token) as unknown as AnyAction);
  }, [dispatch, token]);

  useEffect(() => {
    setInputField(true);
  }, [picture?.length]);

  const imageOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e?.target.files && e?.target.files?.length > 0) {
      setLogoFile(e.target.files[0]);
      file2Base64(e.target.files[0]).then((img: string) => {
        setPicture(img);
      });
    }
  };

  const file2Base64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result?.toString() || '');
      reader.onerror = (error) => reject(error);
    });
  };

  const checkPassword = (e: string) => {
    if (e?.length > 0) {
      axios
        .put(
          `${url}verify-password`,
          { oldPassword: e },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then(() => {
          setEdit(false);
          showToaster(success, passwordMatch);
        })
        .catch((err) => {
          setEdit(true);
          console.warn(err);
        });
    }
  };

  const RemoveLogo = () => {
    setInputField(false);
    setPicture('');
    setLogoFile(null);
  };

  return (
    <>
      <div className={cx('flex-style')}>
        <div className={cx('parent-section')}>
          <div className={cx('text-btn')}>
            <div className={cx('container')}>
              <Formik
                enableReinitialize={true}
                initialValues={{
                  fullName: userData?.fullName,
                  userName: userData?.userName,
                  email: userData?.email,
                  phoneNumber: userData?.phoneNumber,
                  oldPassword: '',
                  password: '',
                  confirmPassword: '',
                  profile: userData?.profile,
                }}
                validationSchema={
                  submitType === 'password'
                    ? Yup.object().shape({
                        oldPassword: Yup.string()
                          .required('Required')
                          .min(6, 'Minimum 6 Character Required'),
                        password: Yup.string()
                          .required('Required')
                          .min(6, 'Minimum 6 Character Required'),
                        confirmPassword: Yup.string()
                          .required('Required')
                          .min(6, 'Minimum 6 Character Required')
                          .when('newPassword', {
                            is: (val: string) =>
                              val && val?.length > 0 ? true : false,
                            then: Yup.string().oneOf(
                              [Yup.ref('newPassword')],
                              'Password Not Matched'
                            ),
                          }),
                      })
                    : Yup.object().shape({
                        fullName: Yup.string().required('Required'),
                        userName: Yup.string().required('Required'),
                        email: Yup.string()
                          .email('Must Be Valid Email')
                          .required('Required'),
                        phoneNumber: Yup.string()
                          .required('Required')
                          .matches(phoneRegExp, 'Phone number is not valid')
                          .min(10, 'Must Be 10 Digits')
                          .max(10, 'Must Be 10 Digits'),
                      })
                }
                onSubmit={(values) => {
                  const postData = JSON.parse(JSON.stringify(values));
                  if (submitType === 'profile') {
                    dispatch(loader(true));
                    const formData = new FormData();
                    delete postData.password;
                    delete postData.oldPassword;
                    delete postData.confirmPassword;
                    delete postData.userName;
                    delete postData.email;
                    formData.append('fullName', postData.fullName);
                    formData.append('phoneNumber', postData.phoneNumber);
                    formData.append('profile', logoFile as Blob);
                    dispatch(
                      updateProfile(
                        formData,
                        token,
                        router
                      ) as unknown as AnyAction
                    );
                  } else {
                    delete postData.fullName;
                    delete postData.userName;
                    delete postData.phoneNumber;
                    delete postData.email;
                    delete postData.oldPassword;
                    dispatch(loader(true));
                    axios
                      .put(`${url}change-password`, postData, {
                        headers: {
                          Authorization: token,
                        },
                      })
                      .then(() => {
                        showToaster(success, passwordChange);
                        router.back();
                      })
                      .catch(() => {
                        showToaster(errorr, errorMessage);
                      });
                  }
                }}
              >
                {({ values, handleSubmit, setFieldValue }) => (
                  <>
                    <Form onSubmit={handleSubmit}>
                      <div
                        className={cx(
                          'animate__animated animate__slideInRight'
                        )}
                      >
                        <div className={cx('cards card-form ')}>
                          <Tabs
                            defaultActiveKey='User Profile'
                            id='justify-tab-example'
                            className={cx('pt-3 mx-3')}
                            onSelect={(e) =>
                              e === 'User Profile'
                                ? setSubmitType('profile')
                                : setSubmitType('password')
                            }
                          >
                            <Tab eventKey='User Profile' title='User Profile'>
                              <div className={cx('profile-card')}>
                                <div className={cx('cards card-form m-3')}>
                                  <div className={cx('profile-gray')}>
                                    <div className={cx('row no-gutters m-0')}>
                                      <div className={cx('col-lg-3 card-body')}>
                                        <h5>
                                          <strong className='headings-color'>
                                            User Profile
                                          </strong>
                                        </h5>
                                        <div className={cx('avatar-upload')}>
                                          <label
                                            htmlFor='main-file'
                                            className={cx('avatar-preview')}
                                          >
                                            {
                                              <div className='image-uppar'>
                                                {picture && picture?.length && (
                                                  <Button
                                                    className={cx(
                                                      'button-image-remove'
                                                    )}
                                                    onClick={() => RemoveLogo()}
                                                  >
                                                    <FontAwesomeIcon
                                                      icon={faXmark}
                                                      className={cx(
                                                        'image-delete'
                                                      )}
                                                      title='Remove Image'
                                                    />
                                                  </Button>
                                                )}
                                                <Image
                                                  src={picture ? picture : user}
                                                  className={cx('img-profile')}
                                                  alt='logo'
                                                  height={
                                                    picture ? '200px' : '200px'
                                                  }
                                                  width={
                                                    picture ? '200px' : '200px'
                                                  }
                                                />
                                              </div>
                                            }

                                            {inputField && (
                                              <>
                                                <input
                                                  type='file'
                                                  id='main-file'
                                                  name='logo'
                                                  accept='image/*'
                                                  className={cx('d-none')}
                                                  onChange={(
                                                    event: ChangeEvent<HTMLInputElement>
                                                  ): void => {
                                                    if (
                                                      !!event.currentTarget
                                                        ?.files?.[0]
                                                    ) {
                                                      setFieldValue(
                                                        'file',
                                                        event.currentTarget
                                                          ?.files[0]
                                                      );
                                                    }
                                                    imageOnChange(event);
                                                  }}
                                                />
                                              </>
                                            )}
                                          </label>
                                        </div>
                                      </div>
                                      <div className='col-lg-9 card-form__body card-body'>
                                        <div className={cx('row mx-2')}>
                                          <div className={cx('col-sm-12 my-1')}>
                                            <label
                                              className={cx('label-style')}
                                              htmlFor='fullname'
                                            >
                                              Full Name
                                            </label>
                                            <Field
                                              type='text'
                                              value={values.fullName}
                                              name='fullName'
                                              placeholder='Full Name'
                                              className={cx('form-control')}
                                              autoComplete='off'
                                            />
                                          </div>
                                          <div>
                                            <ErrorMessage
                                              name='fullName'
                                              component='span'
                                              className='error-message'
                                            />
                                          </div>

                                          <div className={cx('col-sm-12 my-1')}>
                                            <label
                                              className={cx('label-style')}
                                              htmlFor='fullname'
                                            >
                                              Username
                                            </label>
                                            <Field
                                              type='text'
                                              value={values.userName}
                                              name='userName'
                                              disabled
                                              placeholder='Username'
                                              autoComplete='off'
                                              className={cx('form-control')}
                                            />
                                          </div>
                                          <div>
                                            <ErrorMessage
                                              name='userName'
                                              component='span'
                                              className='error-message'
                                            />
                                          </div>
                                          <div className={cx('col-sm-12 my-1')}>
                                            <label
                                              className={cx('label-style')}
                                              htmlFor='fullname'
                                            >
                                              Email
                                            </label>
                                            <Field
                                              type='text'
                                              value={values.email}
                                              name='email'
                                              disabled
                                              placeholder='Email'
                                              autoComplete='off'
                                              className={cx('form-control')}
                                            />
                                          </div>
                                          <div>
                                            <ErrorMessage
                                              name='email'
                                              component='span'
                                              className='error-message'
                                            />
                                          </div>
                                          <div className={cx('col-sm-12 my-1')}>
                                            <label
                                              className={cx('label-style')}
                                              htmlFor='fullname'
                                            >
                                              Phone Number
                                            </label>
                                            <Field
                                              type='text'
                                              value={values.phoneNumber}
                                              name='phoneNumber'
                                              placeholder='Phone Number'
                                              autoComplete='off'
                                              className={cx('form-control')}
                                            />
                                          </div>
                                          <div>
                                            <ErrorMessage
                                              name='phoneNumber'
                                              component='span'
                                              className='error-message'
                                            />
                                          </div>
                                          <div
                                            className={cx('add-btn-1 mt-2 ')}
                                          >
                                            <Button
                                              className={cx(
                                                'sucess-btn ms-auto'
                                              )}
                                              variant='success'
                                              type='submit'
                                            >
                                              <FontAwesomeIcon
                                                icon={faRetweet}
                                                className={cx('text-white')}
                                              />
                                              Update
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Tab>
                            <Tab
                              eventKey='Update Password'
                              title='Update Password'
                            >
                              <div className={cx('profile-card')}>
                                <div className={cx('cards card-form m-3')}>
                                  <div className={cx('profile-gray')}>
                                    <div className={cx('row no-gutters m-0')}>
                                      <div
                                        className={cx('col-lg-3 card-body ')}
                                      >
                                        <div className={cx('px-2')}>
                                          <h5>
                                            <strong className='headings-color'>
                                              Update Password
                                            </strong>
                                          </h5>
                                        </div>
                                      </div>
                                      <div className='col-lg-9 card-form__body card-body'>
                                        <div className={cx('row mx-2')}>
                                          <div className={cx('col-sm-12 my-1')}>
                                            <label
                                              className={cx('label-style')}
                                              htmlFor='fullname'
                                            >
                                              Old Password
                                            </label>
                                            <Field
                                              type='password'
                                              value={values.oldPassword}
                                              name='oldPassword'
                                              placeholder='Old Password'
                                              autoComplete='off'
                                              className={cx('form-control')}
                                              onChange={(e: {
                                                target: { value: string };
                                              }) => {
                                                checkPassword(e.target.value),
                                                  setFieldValue(
                                                    'oldPassword',
                                                    e.target.value
                                                  );
                                              }}
                                            />
                                          </div>
                                          <div>
                                            <ErrorMessage
                                              name='oldPassword'
                                              component='span'
                                              className='error-message'
                                            />
                                          </div>
                                          <div className={cx('col-sm-12 my-1')}>
                                            <label
                                              className={cx('label-style')}
                                              htmlFor='fullname'
                                            >
                                              New Password
                                            </label>
                                            <Field
                                              type='password'
                                              value={values.password}
                                              name='password'
                                              disabled={edit}
                                              placeholder='New Password'
                                              autoComplete='off'
                                              className={cx('form-control')}
                                            />
                                          </div>
                                          <div>
                                            <ErrorMessage
                                              name='password'
                                              component='span'
                                              className='error-message'
                                            />
                                          </div>
                                          <div className={cx('col-sm-12 my-1')}>
                                            <label
                                              className={cx('label-style')}
                                              htmlFor='fullname'
                                            >
                                              Confirm Password
                                            </label>
                                            <Field
                                              type='password'
                                              value={values.confirmPassword}
                                              disabled={edit}
                                              name='confirmPassword'
                                              placeholder='Confirm Password'
                                              autoComplete='off'
                                              className={cx('form-control')}
                                            />
                                          </div>
                                          <div>
                                            <ErrorMessage
                                              name='confirmPassword'
                                              component='span'
                                              className='error-message'
                                            />
                                          </div>
                                          <div className={cx('add-btn-1 mt-2')}>
                                            <Button
                                              className={cx(
                                                'sucess-btn ms-auto'
                                              )}
                                              variant='success'
                                              type='submit'
                                            >
                                              <FontAwesomeIcon
                                                icon={faRetweet}
                                                className={cx('text-white')}
                                              />
                                              Update
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Tab>
                          </Tabs>
                        </div>
                      </div>
                    </Form>
                  </>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
