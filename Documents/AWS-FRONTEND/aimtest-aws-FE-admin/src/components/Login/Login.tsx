import * as Yup from 'yup';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { AnyAction } from 'redux';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { RootState } from 'redux/store';
import postLogin from 'redux/action/Login';
import mainLogo from 'Images/logo-login.png';
import { loader } from 'redux/reducer/Loader';
import { Loader } from 'components/Loader/Loader';

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const load = useSelector((state: RootState) => state?.loader?.loader);

  const [showPass, setShowPass] = useState(false);

  const intialValues: loginType = {
    userName: '',
    password: '',
  };

  return (
    <div className='main-section'>
      <div className='app'>
        <div className='bg'></div>
        <Loader open={load} />
        <Formik
          initialValues={intialValues}
          validationSchema={Yup.object().shape({
            userName: Yup.string().required('Required'),
            password: Yup.string()
              .min(6, 'Minimum 6 Character Required')
              .required('Required'),
          })}
          onSubmit={(values) => {
            dispatch(loader(true));
            dispatch(postLogin(values, router) as unknown as AnyAction);
          }}
        >
          {(props) => (
            <>
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
                    <h3 className='text-white'>Log In</h3>
                  </div>
                  <div className='label-float'>
                    <Field
                      type='text'
                      name='userName'
                      autoComplete='off'
                      value={props.values.userName}
                      placeholder=' '
                    />
                    <label>Username</label>
                  </div>
                  <div>
                    <ErrorMessage
                      name='userName'
                      component='span'
                      className='error-message'
                    />
                  </div>
                  <div className='eye-relative'>
                    {' '}
                    <div className='label-float'>
                      <Field
                        type={showPass ? 'text' : 'password'}
                        name='password'
                        autoComplete='off'
                        value={props.values.password}
                        placeholder=' '
                      />
                      <label>Password</label>
                    </div>
                    <div
                      className='eye-absolute'
                      onClick={() => setShowPass(!showPass)}
                    >
                      {' '}
                      <FontAwesomeIcon
                        icon={showPass ? faEye : faEyeSlash}
                        className='eye-icon'
                      />
                    </div>
                  </div>
                  <div>
                    <ErrorMessage
                      name='password'
                      component='span'
                      className='error-message'
                    />
                  </div>
                  <div className='forgot-text'>
                    <Link href={{ pathname: 'forgot/password' }}>
                      <span className='forgot-text'> Forgot Password</span>
                    </Link>
                  </div>
                </div>
                <footer>
                  <button className='form-btn' type='submit' disabled={load}>
                    Login
                  </button>
                </footer>
              </Form>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
