import axios from 'axios';
import Cookies from 'js-cookie';
import { AnyAction, Dispatch } from 'redux';

import {
  errorr,
  success,
  roleCreate,
  roleDelete,
  rolesDelete,
  roleUpdate,
  errorMessage,
} from 'components/Toaster/ToasterMessage';
import { url } from 'components/Api/ApiUrl';
import { loader } from 'redux/reducer/Loader';
import showToaster from 'components/Toaster/Toaster';
import { getAllUserRole, getParticularUserRole } from 'redux/reducer/UserRole';

export const getUserRoles = (token: string) => (dispatch: Dispatch) => {
  axios
    .get(`${url}user/roles`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      dispatch(loader(false));
      dispatch(getAllUserRole(res.data));
    })
    .catch(() => {
      showToaster(errorr, errorMessage);
      dispatch(loader(false));

      console.warn('Something Went Wrong');
    });
};

export const getUserRole =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .get(`${url}user/role/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(getParticularUserRole(res.data));
        dispatch(loader(false));
      })
      .catch(() => {
        dispatch(loader(false));

        console.warn('Something Went Wrong');
        showToaster(errorr, errorMessage);
      });
  };

export const postUserRole =
  (data: { name: string }, token: string) => (dispatch: Dispatch) => {
    axios
      .post(`${url}user/role`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        showToaster(success, roleCreate);
        dispatch(loader(false));
        dispatch(getUserRoles(token) as unknown as AnyAction);
      })
      .catch(() => {
        console.warn('Something Went Wrong');
        showToaster(errorr, errorMessage);
        dispatch(loader(false));
      });
  };

export const putUserRole =
  (id: string, data: { name: string }, token: string) =>
  (dispatch: Dispatch) => {
    axios
      .put(`${url}user/role/${id}`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        showToaster(success, roleUpdate);
        dispatch(loader(false));
        dispatch(getUserRoles(token) as unknown as AnyAction);
      })
      .catch(() => {
        console.warn('Something Went Wrong');
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };

export const deleteUserRoles =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .delete(`${url}user/roles`, {
        headers: {
          Authorization: token,
        },
        data: {
          roleIds: id,
        },
      })
      .then(() => {
        Cookies.remove('delete');
        showToaster(success, id?.length === 1 ? roleDelete : rolesDelete);
        dispatch(loader(false));
        dispatch(getUserRoles(token) as unknown as AnyAction);
      })
      .catch(() => {
        console.warn('Something Went Wrong');
        Cookies.remove('delete');
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };
