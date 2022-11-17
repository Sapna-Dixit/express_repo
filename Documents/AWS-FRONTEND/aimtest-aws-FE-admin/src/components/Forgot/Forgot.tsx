import axios from 'axios';
import * as Yup from 'yup';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import { RootState } from 'redux/store';
import {
  errorMessage,
  errorr,
  resetLink,
  success,
} from 'components/Toaster/ToasterMessage';
import { url } from 'components/Api/ApiUrl';
import { loader } from 'redux/reducer/Loader';
import mainLogo from '../../Images/logo-login.png';
import { Loader } from 'components/Loader/Loader';
import showToaster from 'components/Toaster/Toaster';

const Forgot = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const initialValues: forgotType = { email: '' };

  const load = useSelector((state: RootState) => state?.loader?.loader);

  return (
    <div className="main-section">
      <div className="app-forgot">
        <div className="bg-forgot"></div>
        <Loader open={load} />
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email('Must Be Valid Email')
              .required('Required'),
          })}
          onSubmit={(values, { resetForm }) => {
            dispatch(loader(true));
            axios
              .post(`${url}forgot-password`, values)
              .then(() => {
                dispatch(loader(false));
                showToaster(success, resetLink);
                setTimeout(() => {
                  router.push('/forgot/reset-message');
                }, 2000);
              })
              .catch(() => {
                dispatch(loader(false));
                resetForm();
                console.warn('Something Went Wrong');
                showToaster(errorr, errorMessage);
              });
          }}
        >
          {(props) => (
            <Form onSubmit={props.handleSubmit} className="login-form">
              <header>
                <Image
                  src={mainLogo}
                  alt="loginImage"
                  width="120px"
                  height="70px"
                />
              </header>
              <div className="inputs">
                <div>
                  <h3 className="text-white">Forgot Password</h3>
                </div>

                <div className="label-float">
                  <Field
                    type="text"
                    name="email"
                    autoComplete="off"
                    value={props.values.email}
                    placeholder=" "
                  />
                  <label>Email ID</label>
                </div>
                <ErrorMessage
                  name="email"
                  component="span"
                  className="error-message"
                />
              </div>
              <footer>
                <button className="form-btn" type="submit">
                  Submit
                </button>
                <div className="reset-login">
                  <Link href="/">Login</Link>
                </div>
              </footer>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Forgot;
