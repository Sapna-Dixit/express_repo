import axios from 'axios';
import Cookies from 'js-cookie';
import { NextRouter } from 'next/router';
import { AnyAction, Dispatch } from 'redux';

import {
  getAllWritingTest,
  getParticularWritingTest,
} from 'redux/reducer/Test/WritingTest';
import {
  errorMessage,
  errorr,
  testCreate,
  testDelete,
  testsDelete,
  testUpdate,
  success,
} from 'components/Toaster/ToasterMessage';
import { url } from 'components/Api/ApiUrl';
import { loader } from 'redux/reducer/Loader';
import showToaster from 'components/Toaster/Toaster';

export const getWritingTests = (token: string) => (dispatch: Dispatch) => {
  axios
    .get(`${url}test/writings`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      dispatch(loader(false));
      dispatch(getAllWritingTest(res.data));
    })
    .catch(() => {
      showToaster(errorr, errorMessage);
      dispatch(loader(false));

      console.warn('Something Went Wrong');
    });
};

export const getWritingTest =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .get(`${url}test/writing/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(getParticularWritingTest(res.data));
        dispatch(loader(false));
      })
      .catch(() => {
        dispatch(loader(false));

        console.warn('Something Went Wrong');
        showToaster(errorr, errorMessage);
      });
  };

export const postWritingTest =
  (
    data: writingTestType,
    token: string,
    navigate: { (arg0: boolean): void; (arg0: boolean): void },
    router: NextRouter
  ) =>
  (dispatch: Dispatch) => {
    axios
      .post(`${url}test/writing`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        navigate(false);
        router.replace('/test/writingtest');
        showToaster(success, testCreate);
        dispatch(loader(false));
        dispatch(getWritingTests(token) as unknown as AnyAction);
      })
      .catch(() => {
        navigate(true);
        console.warn('Something Went Wrong');
        showToaster(errorr, errorMessage);
        dispatch(loader(false));
      });
  };

export const putWritingTest =
  (
    id: string,
    data: writingTestType,
    token: string,
    navigate: { (arg0: boolean): void; (arg0: boolean): void },
    router: NextRouter
  ) =>
  (dispatch: Dispatch) => {
    axios
      .put(`${url}test/writing/${id}`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        navigate(false);
        router.replace('/test/writingtest');
        showToaster(success, testUpdate);
        dispatch(loader(false));
      })
      .catch(() => {
        navigate(true);
        console.warn('Something Went Wrong');
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };

export const deleteWritingTests =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .delete(`${url}test/writings`, {
        headers: {
          Authorization: token,
        },
        data: {
          writingTestIds: id,
        },
      })
      .then(() => {
        Cookies.remove('delete');
        showToaster(success, id?.length === 1 ? testDelete : testsDelete);
        dispatch(loader(false));
        dispatch(getWritingTests(token) as unknown as AnyAction);
      })
      .catch(() => {
        console.warn('Something Went Wrong');
        Cookies.remove('delete');
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };
