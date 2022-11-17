import axios from 'axios';
import Cookies from 'js-cookie';
import { NextRouter } from 'next/router';
import { AnyAction, Dispatch } from 'redux';

import {
  getAllfranchisee,
  getParticularFranchisee,
} from 'redux/reducer/Franchisee';
import {
  errorMessage,
  errorr,
  franchiseeCreate,
  franchiseeDelete,
  franchiseesDelete,
  franchiseeUpdate,
  success,
} from 'components/Toaster/ToasterMessage';
import { url } from 'components/Api/ApiUrl';
import { loader } from 'redux/reducer/Loader';
import showToaster from 'components/Toaster/Toaster';

export const getFranchisees = (token: string) => (dispatch: Dispatch) => {
  axios
    .get(`${url}franchisees`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      dispatch(loader(false));
      dispatch(getAllfranchisee(res.data));
    })
    .catch(() => {
      showToaster(errorr, errorMessage);
      dispatch(loader(false));
      console.warn('Something Went Wrong');
    });
};

export const getFranchisee =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .get(`${url}franchisee/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(getParticularFranchisee(res.data));
        dispatch(loader(false));
      })
      .catch(() => {
        dispatch(loader(false));
        console.warn('Something Went Wrong');
        showToaster(errorr, errorMessage);
      });
  };

export const postFranchiseeData =
  (
    data: franchiseeType,
    token: string,
    navigate: { (arg0: boolean): void; (arg0: boolean): void },
    router: NextRouter
  ) =>
  (dispatch: Dispatch) => {
    axios
      .post(`${url}franchisee`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        navigate(false);
        router.replace('/franchisee');
        showToaster(success, franchiseeCreate);
        dispatch(loader(false));
        dispatch(getFranchisees(token) as unknown as AnyAction);
      })
      .catch(() => {
        navigate(true);
        console.warn('Something Went Wrong');
        showToaster(errorr, errorMessage);
        dispatch(loader(false));
      });
  };

export const putFranchiseeData =
  (
    id: string,
    data: franchiseeType,
    token: string,
    navigate: { (arg0: boolean): void; (arg0: boolean): void },
    router: NextRouter
  ) =>
  (dispatch: Dispatch) => {
    axios
      .put(`${url}franchisee/${id}`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        navigate(false);
        router.replace('/franchisee');
        showToaster(success, franchiseeUpdate);
        dispatch(loader(false));
        dispatch(getFranchisees(token) as unknown as AnyAction);
      })
      .catch(() => {
        navigate(true);
        console.warn('Something Went Wrong');
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };

export const deleteFranchisees =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .delete(`${url}franchisees`, {
        headers: {
          Authorization: token,
        },
        data: {
          franchiseeIds: id,
        },
      })
      .then(() => {
        Cookies.remove('delete');
        showToaster(
          success,
          id?.length === 1 ? franchiseeDelete : franchiseesDelete
        );
        dispatch(loader(false));
        dispatch(getFranchisees(token) as unknown as AnyAction);
      })
      .catch(() => {
        console.warn('Something Went Wrong');
        Cookies.remove('delete');
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };
