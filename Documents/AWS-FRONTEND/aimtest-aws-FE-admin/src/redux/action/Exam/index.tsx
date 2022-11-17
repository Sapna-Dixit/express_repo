import axios from 'axios';
import Cookies from 'js-cookie';
import { NextRouter } from 'next/router';
import { AnyAction, Dispatch } from 'redux';

import {
  errorMessage,
  errorr,
  examCreate,
  examDelete,
  examExist,
  examRestore,
  examsDelete,
  examUpdate,
  success,
} from 'components/Toaster/ToasterMessage';
import { url } from 'components/Api/ApiUrl';
import { loader } from 'redux/reducer/Loader';
import { restoreData } from 'redux/reducer/Restore';
import showToaster from 'components/Toaster/Toaster';
import { getAllExam, getParticularExam } from 'redux/reducer/Exam';

export const getExams = (token: string) => (dispatch: Dispatch) => {
  axios
    .get(`${url}exams`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      dispatch(loader(false));
      dispatch(getAllExam(res.data));
    })
    .catch(() => {
      showToaster(errorr, errorMessage);
      dispatch(loader(false));
      console.warn('Something Went Wrong');
    });
};

export const getExam = (id: string, token: string) => (dispatch: Dispatch) => {
  axios
    .get(`${url}exam/${id}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      dispatch(getParticularExam(res.data));
      dispatch(loader(false));
    })
    .catch(() => {
      dispatch(loader(false));
      console.warn('Something Went Wrong');
      showToaster(errorr, errorMessage);
    });
};

export const postExamData =
  (
    data: examValues,
    token: string,
    navigate: { (arg0: boolean): void; (arg0: boolean): void },
    router: NextRouter
  ) =>
  (dispatch: Dispatch) => {
    axios
      .post(`${url}exam`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        navigate(false);
        router.replace('/exam');
        showToaster(success, examCreate);
        dispatch(loader(false));
        dispatch(getExams(token) as unknown as AnyAction);
      })
      .catch((err) => {
        navigate(true);
        console.warn('Something Went Wrong');
        err?.response?.data?._id !== undefined &&
          dispatch(restoreData(err?.response?.data?._id));
        err?.response?.status !== 409 && showToaster(errorr, errorMessage);
        err?.response?.status === 409 &&
          err?.response?.data?._id === undefined &&
          showToaster(errorr, examExist);
        dispatch(loader(false));
      });
  };

export const putExamData =
  (
    id: string,
    data: examValues,
    token: string,
    navigate: { (arg0: boolean): void; (arg0: boolean): void },
    router: NextRouter
  ) =>
  (dispatch: Dispatch) => {
    axios
      .put(`${url}exam/${id}`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        navigate(false);
        router.replace('/exam');
        showToaster(success, examUpdate);
        dispatch(loader(false));
      })
      .catch((err) => {
        navigate(true);
        console.warn('Something Went Wrong');
        err?.response?.data?._id !== undefined &&
          dispatch(restoreData(err?.response?.data?._id));
        err?.response?.status !== 409 && showToaster(errorr, errorMessage);
        err?.response?.status === 409 &&
          err?.response?.data?._id === undefined &&
          showToaster(errorr, examExist);
        dispatch(loader(false));
      });
  };

export const restoreExamData =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .patch(
        `${url}exam/${id}/restore`,
        { isDeleted: false },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(() => {
        showToaster(success, examRestore);
        dispatch(loader(false));
        dispatch(getExams(token) as unknown as AnyAction);
      })
      .catch(() => {
        console.warn('Something Went Wrong');
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };

export const deleteExams =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .delete(`${url}exams`, {
        headers: {
          Authorization: token,
        },
        data: {
          examIds: id,
        },
      })
      .then(() => {
        Cookies.remove('delete');
        showToaster(success, id?.length === 1 ? examDelete : examsDelete);
        dispatch(loader(false));
        dispatch(getExams(token) as unknown as AnyAction);
      })
      .catch(() => {
        console.warn('Something Went Wrong');
        Cookies.remove('delete');
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };
