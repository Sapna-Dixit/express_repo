import axios from 'axios';
import Cookies from 'js-cookie';
import { NextRouter } from 'next/router';
import { AnyAction, Dispatch } from 'redux';

import {
  getAllSubFranchisee,
  getParticularSubFranchisee,
} from 'redux/reducer/SubFranchisee';
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

export const getSubFranchisees = (token: string) => (dispatch: Dispatch) => {
  axios
    .get(`${url}sub-franchisees`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      dispatch(loader(false));
      dispatch(getAllSubFranchisee(res.data));
    })
    .catch(() => {
      showToaster(errorr, errorMessage);
      dispatch(loader(false));
      console.warn('Something Went Wrong');
    });
};

export const getSubFranchisee =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .get(`${url}sub-franchisee/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(getParticularSubFranchisee(res.data));
        dispatch(loader(false));
      })
      .catch(() => {
        dispatch(loader(false));
        console.warn('Something Went Wrong');
        showToaster(errorr, errorMessage);
      });
  };

export const postSubFranchiseeData =
  (
    data: subfranchiseeType,
    token: string,
    navigate: { (arg0: boolean): void; (arg0: boolean): void },
    router: NextRouter
  ) =>
  (dispatch: Dispatch) => {
    axios
      .post(`${url}sub-franchisee`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        navigate(false);
        router.replace('/sub/franchisee');
        showToaster(success, franchiseeCreate);
        dispatch(loader(false));
        dispatch(getSubFranchisees(token) as unknown as AnyAction);
      })
      .catch(() => {
        navigate(true);
        console.warn('Something Went Wrong');
        showToaster(errorr, errorMessage);
        dispatch(loader(false));
      });
  };

export const putSubFranchiseeData =
  (
    id: string,
    data: subfranchiseeType,
    token: string,
    navigate: { (arg0: boolean): void; (arg0: boolean): void },
    router: NextRouter
  ) =>
  (dispatch: Dispatch) => {
    axios
      .put(`${url}sub-franchisee/${id}`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        navigate(false);
        router.replace('/sub/franchisee');
        showToaster(success, franchiseeUpdate);
        dispatch(loader(false));
      })
      .catch(() => {
        navigate(true);
        console.warn('Something Went Wrong');
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };

export const deleteSubFranchisees =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .delete(`${url}sub-franchisees`, {
        headers: {
          Authorization: token,
        },
        data: {
          subFranchiseeIds: id,
        },
      })
      .then(() => {
        Cookies.remove('delete');
        showToaster(
          success,
          id?.length === 1 ? franchiseeDelete : franchiseesDelete
        );
        dispatch(loader(false));
        dispatch(getSubFranchisees(token) as unknown as AnyAction);
      })
      .catch(() => {
        console.warn('Something Went Wrong');
        Cookies.remove('delete');
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };
