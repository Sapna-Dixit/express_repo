import axios from 'axios';
import Cookies from 'js-cookie';
import { AnyAction, Dispatch } from 'redux';
import showToaster from 'components/Toaster/Toaster';

import {
  errorr,
  success,
  errorMessage,
  packageCreate,
  packageUpdate,
  packageDelete,
  packagesDelete,
} from 'components/Toaster/ToasterMessage';
import { url } from 'components/Api/ApiUrl';
import { loader } from 'redux/reducer/Loader';
import { getAllPackage, getParticularPackage } from 'redux/reducer/Package';

export const getPackages = (token: string) => (dispatch: Dispatch) => {
  axios
    .get(`${url}packages`, {
      headers: {
        Authorization: token as unknown as string,
      },
    })
    .then((res) => {
      dispatch(loader(false));
      dispatch(getAllPackage(res.data));
    })
    .catch(() => {
      console.warn('Something Went Wrong');
      showToaster(errorr, errorMessage);
      dispatch(loader(false));
    });
};

export const getPackage =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .get(`${url}package/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(getParticularPackage(res.data));
        dispatch(loader(false));
      })
      .catch(() => {
        dispatch(loader(false));
        console.warn('Something Went Wrong');
        showToaster(errorr, errorMessage);
      });
  };

export const postPackageData =
  (data: packageDataType, token: string) => (dispatch: Dispatch) => {
    axios
      .post(`${url}package`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        dispatch(loader(false));
        showToaster(success, packageCreate);
        dispatch(getPackages(token) as unknown as AnyAction);
      })
      .catch(() => {
        console.warn('Something Went Wrong');
        showToaster(errorr, errorMessage);
        dispatch(loader(false));
      });
  };

export const putPackageData =
  (id: string, data: packageDataType, token: string) =>
  (dispatch: Dispatch) => {
    axios
      .put(`${url}package/${id}`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        showToaster(success, packageUpdate);
        dispatch(loader(false));
        dispatch(getPackages(token) as unknown as AnyAction);
      })
      .catch(() => {
        console.warn('Something Went Wrong');
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };

export const deletePackages =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .delete(`${url}packages`, {
        headers: {
          Authorization: token,
        },
        data: {
          packageIds: id,
        },
      })
      .then(() => {
        Cookies.remove('delete');
        showToaster(success, id?.length === 1 ? packageDelete : packagesDelete);
        dispatch(loader(false));
        dispatch(getPackages(token) as unknown as AnyAction);
      })
      .catch(() => {
        console.warn('Something Went Wrong');
        Cookies.remove('delete');
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };
