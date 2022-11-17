import axios from 'axios';
import Cookies from 'js-cookie';
import { NextRouter } from 'next/router';
import { AnyAction, Dispatch } from 'redux';

import {
  getAllStudent,
  getParticularStudent,
  getStudentExamQuestions,
  getStudentExamTest,
  studentExams,
} from 'redux/reducer/Student';
import {
  errorMessage,
  errorr,
  studentCreate,
  studentDelete,
  studentExist,
  studentRestore,
  studentsDelete,
  studentUpdate,
  success,
} from 'components/Toaster/ToasterMessage';
import { url } from 'components/Api/ApiUrl';
import { loader } from 'redux/reducer/Loader';
import { restoreData } from 'redux/reducer/Restore';
import showToaster from 'components/Toaster/Toaster';

export const getStudents =
  (token: string, limit: number, skip: number) => (dispatch: Dispatch) => {
    axios
      .get(`${url}students?limit=${limit}&skip=${skip}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(loader(false));
        dispatch(getAllStudent(res.data));
      })
      .catch(() => {
        showToaster(errorr, errorMessage);
        dispatch(loader(false));

        console.warn('Something Went Wrong');
      });
  };

export const getStudent =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .get(`${url}student/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(getParticularStudent(res.data));
        dispatch(loader(false));
      })
      .catch(() => {
        dispatch(loader(false));

        console.warn('Something Went Wrong');
        showToaster(errorr, errorMessage);
      });
  };

export const postStudentData =
  (
    data: studentType,
    token: string,
    navigate: { (arg0: boolean): void; (arg0: boolean): void },
    router: NextRouter
  ) =>
  (dispatch: Dispatch) => {
    axios
      .post(`${url}student`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        navigate(false);
        router.replace('/student');
        showToaster(success, studentCreate);
        dispatch(loader(false));
        dispatch(getStudents(token, 15, 0) as unknown as AnyAction);
      })
      .catch((err) => {
        navigate(true);
        console.warn('Something Went Wrong');
        err?.response?.data?._id !== undefined &&
          dispatch(restoreData(err?.response?.data?._id));
        err?.response?.status !== 409 && showToaster(errorr, errorMessage);
        err?.response?.status === 409 &&
          err?.response?.data?._id === undefined &&
          showToaster(errorr, studentExist);
        dispatch(loader(false));
      });
  };

export const putStudentData =
  (
    id: string,
    data: studentType,
    token: string,
    navigate: { (arg0: boolean): void; (arg0: boolean): void },
    router: NextRouter
  ) =>
  (dispatch: Dispatch) => {
    axios
      .put(`${url}student/${id}`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        navigate(false);
        router.replace('/student');
        showToaster(success, studentUpdate);
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
          showToaster(errorr, studentExist);
        dispatch(loader(false));
      });
  };

export const getStudentResult =
  (id: string, token: string, router: NextRouter) => (dispatch: Dispatch) => {
    axios
      .get(`${url}student/${id}/exams`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        router.push('/student-exam');
        dispatch(loader(false));
        dispatch(studentExams(res.data));
      })
      .catch(() => {
        dispatch(loader(false));
        console.warn('Something Went Wrong');
        showToaster(errorr, errorMessage);
      });
  };

export const restoreStudentData =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .patch(
        `${url}student/${id}/restore`,
        { isDeleted: false },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(() => {
        showToaster(success, studentRestore);
        dispatch(loader(false));
        dispatch(getStudents(token, 15, 0) as unknown as AnyAction);
      })
      .catch(() => {
        console.warn('Something Went Wrong');
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };

export const deleteStudents =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .delete(`${url}students`, {
        headers: {
          Authorization: token,
        },
        data: {
          studentIds: id,
        },
      })
      .then(() => {
        Cookies.remove('delete');
        showToaster(success, id?.length === 1 ? studentDelete : studentsDelete);
        dispatch(loader(false));
        dispatch(getStudents(token, 15, 0) as unknown as AnyAction);
      })
      .catch(() => {
        console.warn('Something Went Wrong');
        Cookies.remove('delete');
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };
export const getExamResult =
  (token: string, userId: string, router: NextRouter, documentId: string) =>
  (dispatch: Dispatch) => {
    axios
      .get(`${url}student/${userId}/exam/${documentId}/questions/result`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        router.push('/result');
        dispatch(loader(false));
        dispatch(getStudentExamQuestions(res.data));
      })
      .catch(() => {
        dispatch(loader(false));
        console.warn('Something Went Wrong');
        showToaster(errorr, errorMessage);
      });
  };
  export const getTestResult =
  (token: string, userId: string, router: NextRouter, documentId: string) =>
  (dispatch: Dispatch) => {
    axios
      .get(`${url}student/${userId}/exam/${documentId}/tests/result`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        router.push('/result');
        dispatch(loader(false));
        dispatch(getStudentExamTest(res.data));
      })
      .catch(() => {
        dispatch(loader(false));
        console.warn('Something Went Wrong');
        showToaster(errorr, errorMessage);
      });
  };
