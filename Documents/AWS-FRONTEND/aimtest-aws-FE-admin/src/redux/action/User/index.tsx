import axios from 'axios';
import Cookies from 'js-cookie';
import { AnyAction, Dispatch } from 'redux';

import {
  errorMessage,
  errorr,
  userCreate,
  userDelete,
  usersDelete,
  userUpdate,
  success,
} from 'components/Toaster/ToasterMessage';
import { url } from 'components/Api/ApiUrl';
import { loader } from 'redux/reducer/Loader';
import showToaster from 'components/Toaster/Toaster';
import { getAllUser, getParticularUser } from 'redux/reducer/User';

export const getUsers = (token: string) => (dispatch: Dispatch) => {
  axios
    .get(`${url}users`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      dispatch(loader(false));
      dispatch(getAllUser(res.data));
    })
    .catch(() => {
      showToaster(errorr, errorMessage);
      dispatch(loader(false));

      console.warn('Something Went Wrong');
    });
};

export const getUser = (id: string, token: string) => (dispatch: Dispatch) => {
  axios
    .get(`${url}user/${id}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      dispatch(getParticularUser(res.data));
      dispatch(loader(false));
    })
    .catch(() => {
      dispatch(loader(false));

      console.warn('Something Went Wrong');
      showToaster(errorr, errorMessage);
    });
};

export const postUser =
  (data: postUserData, token: string) => (dispatch: Dispatch) => {
    axios
      .post(`${url}user`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        showToaster(success, userCreate);
        dispatch(loader(false));
        dispatch(getUsers(token) as unknown as AnyAction);
      })
      .catch(() => {
        console.warn('Something Went Wrong');
        showToaster(errorr, errorMessage);
        dispatch(loader(false));
      });
  };

export const putUser =
  (id: string, data: postUserData, token: string) => (dispatch: Dispatch) => {
    axios
      .put(`${url}user/${id}`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        showToaster(success, userUpdate);
        dispatch(loader(false));
        dispatch(getUsers(token) as unknown as AnyAction);
      })
      .catch(() => {
        console.warn('Something Went Wrong');
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };

export const deleteUsers =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .delete(`${url}users`, {
        headers: {
          Authorization: token,
        },
        data: {
          userIds: id,
        },
      })
      .then(() => {
        Cookies.remove('delete');
        showToaster(success, id?.length === 1 ? userDelete : usersDelete);
        dispatch(loader(false));
        dispatch(getUsers(token) as unknown as AnyAction);
      })
      .catch(() => {
        console.warn('Something Went Wrong');
        Cookies.remove('delete');
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };
