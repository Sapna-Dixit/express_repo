import axios from 'axios';
import Cookies from 'js-cookie';
import { AnyAction, Dispatch } from 'redux';

import {
  errorMessage,
  errorr,
  classCreate,
  classDelete,
  classesDelete,
  classUpdate,
  success,
  classRestore,
  classExist,
} from 'components/Toaster/ToasterMessage';
import { url } from 'components/Api/ApiUrl';
import { loader } from 'redux/reducer/Loader';
import { restoreData } from 'redux/reducer/Restore';
import showToaster from 'components/Toaster/Toaster';
import { getAllClasses, getParticularClass } from 'redux/reducer/Class';

export const getClasses = (token: string) => (dispatch: Dispatch) => {
  axios
    .get(`${url}classes`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      dispatch(loader(false));
      dispatch(getAllClasses(res.data));
    })
    .catch(() => {
      showToaster(errorr, errorMessage);
      dispatch(loader(false));
      console.warn('Something Went Wrong');
    });
};

export const getClass = (id: string, token: string) => (dispatch: Dispatch) => {
  axios
    .get(`${url}class/${id}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      dispatch(getParticularClass(res.data));
      dispatch(loader(false));
    })
    .catch(() => {
      dispatch(loader(false));
      console.warn('Something Went Wrong');
      showToaster(errorr, errorMessage);
    });
};

export const postClassData =
  (data: { name: string }, token: string) => (dispatch: Dispatch) => {
    axios
      .post(`${url}class`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        showToaster(success, classCreate);
        dispatch(loader(false));
        dispatch(getClasses(token) as unknown as AnyAction);
      })
      .catch((err) => {
        console.warn('Something Went Wrong');
        err?.response?.data?._id !== undefined &&
          dispatch(restoreData(err?.response?.data?._id));
        err?.response?.status !== 409 && showToaster(errorr, errorMessage);
        err?.response?.status === 409 &&
          err?.response?.data?._id === undefined &&
          showToaster(errorr, classExist);
        dispatch(loader(false));
      });
  };

export const putClassData =
  (id: string, data: { name: string }, token: string) =>
  (dispatch: Dispatch) => {
    axios
      .put(`${url}class/${id}`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        showToaster(success, classUpdate);
        dispatch(loader(false));
        dispatch(getClasses(token) as unknown as AnyAction);
      })
      .catch((err) => {
        console.warn('Something Went Wrong');
        err?.response?.data?._id !== undefined &&
          dispatch(restoreData(err?.response?.data?._id));
        err?.response?.status !== 409 && showToaster(errorr, errorMessage);
        err?.response?.status === 409 &&
          err?.response?.data?._id === undefined &&
          showToaster(errorr, classExist);
        dispatch(loader(false));
      });
  };

export const restoreClassData =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .patch(
        `${url}class/${id}/restore`,
        { isDeleted: false },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(() => {
        showToaster(success, classRestore);
        dispatch(loader(false));
        dispatch(getClasses(token) as unknown as AnyAction);
      })
      .catch(() => {
        console.warn('Something Went Wrong');
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };

export const deleteClasses =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .delete(`${url}classes`, {
        headers: {
          Authorization: token,
        },
        data: {
          classIds: id,
        },
      })
      .then(() => {
        Cookies.remove('delete');
        showToaster(success, id?.length === 1 ? classDelete : classesDelete);
        dispatch(loader(false));
        dispatch(getClasses(token) as unknown as AnyAction);
      })
      .catch(() => {
        console.warn('Something Went Wrong');
        Cookies.remove('delete');
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };
