import axios from 'axios';
import Cookies from 'js-cookie';
import { NextRouter } from 'next/router';
import { AnyAction, Dispatch } from 'redux';

import {
  getAllStudentFranchisee,
  getParticularStudentFranchisee,
} from 'redux/reducer/StudentFranchisee';
import {
  errorMessage,
  errorr,
  studentCreate,
  studentDelete,
  studentsDelete,
  studentUpdate,
  success,
} from 'components/Toaster/ToasterMessage';
import { url } from 'components/Api/ApiUrl';
import { loader } from 'redux/reducer/Loader';
import showToaster from 'components/Toaster/Toaster';

export const getStudentFranchisees =
  (token: string) => (dispatch: Dispatch) => {
    axios
      .get(`${url}student-franchisees`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(loader(false));
        dispatch(getAllStudentFranchisee(res.data));
      })
      .catch(() => {
        showToaster(errorr, errorMessage);
        dispatch(loader(false));
        console.warn('Something Went Wrong');
      });
  };

export const getStudentFranchisee =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .get(`${url}student-franchisee/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(getParticularStudentFranchisee(res.data));
        dispatch(loader(false));
      })
      .catch(() => {
        dispatch(loader(false));
        console.warn('Something Went Wrong');
        showToaster(errorr, errorMessage);
      });
  };

export const postStudentFranchiseeData =
  (
    data: studentfranchiseeType,
    token: string,
    navigate: { (arg0: boolean): void; (arg0: boolean): void },
    router: NextRouter
  ) =>
  (dispatch: Dispatch) => {
    axios
      .post(`${url}student-franchisee`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        navigate(false);
        router.replace('/sub/franchisee');
        showToaster(success, studentCreate);
        dispatch(loader(false));
        dispatch(getStudentFranchisees(token) as unknown as AnyAction);
      })
      .catch(() => {
        navigate(true);
        console.warn('Something Went Wrong');
        showToaster(errorr, errorMessage);
        dispatch(loader(false));
      });
  };

export const putStudentFranchiseeData =
  (
    id: string,
    data: studentfranchiseeType,
    token: string,
    navigate: { (arg0: boolean): void; (arg0: boolean): void },
    router: NextRouter
  ) =>
  (dispatch: Dispatch) => {
    axios
      .put(`${url}student-franchisee/${id}`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        navigate(false);
        router.replace('/sub/franchisee');
        showToaster(success, studentUpdate);
        dispatch(loader(false));
      })
      .catch(() => {
        navigate(true);
        console.warn('Something Went Wrong');
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };

export const deleteStudentFranchisees =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .delete(`${url}student-franchisees`, {
        headers: {
          Authorization: token,
        },
        data: {
          studentFranchiseeIds: id,
        },
      })
      .then(() => {
        Cookies.remove('delete');
        showToaster(success, id?.length === 1 ? studentDelete : studentsDelete);
        dispatch(loader(false));
        dispatch(getStudentFranchisees(token) as unknown as AnyAction);
      })
      .catch(() => {
        console.warn('Something Went Wrong');
        Cookies.remove('delete');
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };
