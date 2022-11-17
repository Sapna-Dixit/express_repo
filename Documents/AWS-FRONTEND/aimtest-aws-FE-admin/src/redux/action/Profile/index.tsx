import axios from 'axios';

import {
  errorr,
  success,
  errorMessage,
  passwordMatched,
  passwordUpdated,
  profileUpdated,
} from 'components/Toaster/ToasterMessage';
import { url } from 'components/Api/ApiUrl';
import showToaster from 'components/Toaster/Toaster';

export const profileUpdate = (
  token: string,
  data: {
    fullName: string;
    userName: string;
    email: string;
    mobile: number;
  }
) => {
  axios
    .put(`${url}`, data, {
      headers: {
        Authorization: token,
      },
    })
    .then(() => {
      showToaster(success, profileUpdated);
    })
    .catch(() => {
      console.warn('Something Went Wrong');
      showToaster(errorr, errorMessage);
    });
};

export const passwordUpdate = (
  token: string,
  data: {
    newPassword: string;
  }
) => {
  axios
    .put(`${url}`, data, {
      headers: {
        Authorization: token,
      },
    })
    .then(() => {
      showToaster(success, passwordUpdated);
    })
    .catch(() => {
      console.warn('Something Went Wrong');
      showToaster(errorr, errorMessage);
    });
};
export const passwordCheck = (
  token: string,
  data: {
    newPassword: string;
  }
) => {
  axios
    .post(`${url}`, data, {
      headers: {
        Authorization: token,
      },
    })
    .then(() => {
      showToaster(success, passwordMatched);
    })
    .catch(() => {
      console.warn('Something Went Wrong');
    });
};
