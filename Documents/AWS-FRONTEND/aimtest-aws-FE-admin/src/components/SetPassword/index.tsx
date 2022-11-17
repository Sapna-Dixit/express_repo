import axios from 'axios';
import * as Yup from 'yup';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import { RootState } from 'redux/store';
import {
  errorMessage,
  errorr,
  setSuccess,
  success,
} from 'components/Toaster/ToasterMessage';
import { url } from 'components/Api/ApiUrl';
import mainLogo from 'Images/logo-login.png';
import { loader } from 'redux/reducer/Loader';
import { Loader } from 'components/Loader/Loader';
import showToaster from 'components/Toaster/Toaster';

const SetPassword = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const queryParams = router.query;
  const intialValues: resetPasswordType = {
    password: '',
    confirmPassword: '',
  };

  const load = useSelector((state: RootState) => state?.loader.loader);

  return (
    <>
      <div className='main-section'>
        <div className='app'>
          <div className='bg-reset'></div>
          <Loader open={load} />
          <Formik
            initialValues={intialValues}
            validationSchema={Yup.object().shape({
              password: Yup.string()
                .min(6, 'Minimum 6 Character Required')
                .required('Required'),
              confirmPassword: Yup.string()
                .required('Required')
                .when('password', {
                  is: (val: string) => (val && val?.length > 0 ? true : false),
                  then: Yup.string().oneOf(
                    [Yup.ref('password')],
                    'Password Not Matched'
                  ),
                }),
            })}
            onSubmit={(values, { resetForm }) => {
              dispatch(loader(true));
              values.email = queryParams?.email as string;
              values.token = queryParams?.token as string;
              const postData = JSON.parse(JSON.stringify(values));
              delete postData.confirmPassword;
              axios
                .post(`${url}user/set-password`, postData)
                .then(() => {
                  dispatch(loader(false));
                  showToaster(success, setSuccess);
                  setTimeout(() => {
                    router.push('/');
                  }, 1000);
                  resetForm();
                })
                .catch(() => {
                  dispatch(loader(false));
                  console.warn('Something Went Wrong');
                  showToaster(errorr, errorMessage);
                  resetForm();
                });
            }}
          >
            {(props) => (
              <Form onSubmit={props.handleSubmit} className='login-form'>
                <header>
                  <Image
                    src={mainLogo}
                    alt='loginImage'
                    width='120px'
                    height='70px'
                  />
                </header>
                <div className='inputs'>
                  <div>
                    <h3 className='text-white'>Set Password</h3>
                  </div>
                  <div className='label-float'>
                    <Field
                      type='password'
                      name='password'
                      autoComplete='off'
                      value={props.values.password}
                      placeholder=' '
                    />
                    <label>Password</label>
                  </div>
                  <div>
                    <ErrorMessage
                      name='password'
                      component='span'
                      className='error-message'
                    />
                  </div>

                  <div className='label-float'>
                    <Field
                      type='password'
                      name='confirmPassword'
                      autoComplete='off'
                      value={props.values.confirmPassword}
                      placeholder=' '
                    />
                    <label>Confirm Password</label>
                  </div>
                  <div>
                    <ErrorMessage
                      name='confirmPassword'
                      component='span'
                      className='error-message'
                    />
                  </div>
                </div>
                <footer>
                  <button className='form-btn' type='submit'>
                    Submit
                  </button>
                  <div className='reset-login'>
                    <Link href='/'>Login</Link>
                  </div>
                </footer>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default SetPassword;
