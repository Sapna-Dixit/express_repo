import axios from 'axios';
import { Dispatch } from 'redux';
import { NextRouter } from 'next/router';

import {
  errorr,
  success,
  errorMessage,
  loginSuccess,
  profileUpdate,
} from 'components/Toaster/ToasterMessage';
import { url } from 'components/Api/ApiUrl';
import { loader } from 'redux/reducer/Loader';
import showToaster from 'components/Toaster/Toaster';
import { login, userProfileData, userRole } from 'redux/reducer/Login';

const postLogin =
  (data: loginType, router: NextRouter) => async (dispatch: Dispatch) => {
    await axios
      .post(`${url}login`, data)
      .then((response) => {
        dispatch(loader(false));
        router.push('dashboard');
        showToaster(success, loginSuccess);
        dispatch(login(response?.data?.token));
        dispatch(userRole(response?.data?.role));
      })
      .catch(() => {
        showToaster(errorr, errorMessage);
        dispatch(loader(false));
        console.warn('Something Went Wrong');
      });
  };
export default postLogin;

export const getUserProfile = (token: string) => (dispatch: Dispatch) => {
  axios
    .get(`${url}get-profile`, {
      headers: {
        Authorization: token as unknown as string,
      },
    })
    .then((res) => {
      dispatch(loader(false));
      dispatch(userProfileData(res.data));
    })
    .catch(() => {
      console.warn('Something Went Wrong');
      showToaster(errorr, errorMessage);
      dispatch(loader(false));
    });
};

export const updateProfile =
  (data: FormData, token: string, router: NextRouter) =>
  async (dispatch: Dispatch) => {
    await axios
      .put(`${url}update-profile`, data, {
        headers: {
          Authorization: token as unknown as string,
        },
      })
      .then(() => {
        router.back();
        dispatch(loader(false));
        showToaster(success, profileUpdate);
      })
      .catch(() => {
        showToaster(errorr, errorMessage);
        dispatch(loader(false));
        console.warn('Something Went Wrong');
      });
  };
