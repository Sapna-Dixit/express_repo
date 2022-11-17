import axios from 'axios';
import Cookies from 'js-cookie';
import { NextRouter } from 'next/router';
import { AnyAction, Dispatch } from 'redux';

import {
  getAllInterestTest,
  getParticularInterestTest,
} from 'redux/reducer/Test/InterestTest';
import {
  errorr,
  errorMessage,
  success,
  testCreate,
  testUpdate,
  testDelete,
  testsDelete,
} from 'components/Toaster/ToasterMessage';
import { url } from 'components/Api/ApiUrl';
import { loader } from 'redux/reducer/Loader';
import showToaster from 'components/Toaster/Toaster';

export const getInterestTests = (token: string) => (dispatch: Dispatch) => {
  axios
    .get(`${url}test/interests`, {
      headers: {
        Authorization: token as unknown as string,
      },
    })
    .then((res) => {
      dispatch(loader(false));
      dispatch(getAllInterestTest(res.data));
    })
    .catch(() => {
      console.warn('Something Went Wrong');
      showToaster(errorr, errorMessage);
      dispatch(loader(false));
    });
};

export const postInterestTestData =
  (
    data: interestTestData,
    token: string,
    navigate: { (arg0: boolean): void; (arg0: boolean): void },
    router: NextRouter
  ) =>
  (dispatch: Dispatch) => {
    axios
      .post(`${url}test/interest`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        navigate(false);
        router.replace('/test/interest');
        showToaster(success, testCreate);
        dispatch(loader(false));
        dispatch(getInterestTests(token) as unknown as AnyAction);
      })
      .catch(() => {
        navigate(true);
        console.warn('Something Went Wrong');
        showToaster(errorr, errorMessage);
        dispatch(loader(false));
      });
  };

export const getInterestTest =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .get(`${url}test/interest/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(getParticularInterestTest(res.data));
        dispatch(loader(false));
      })
      .catch(() => {
        dispatch(loader(false));
        console.warn('Something Went Wrong');
        showToaster(errorr, errorMessage);
      });
  };

export const putInterestTestData =
  (
    id: string,
    data: interestTestData,
    token: string,
    navigate: { (arg0: boolean): void; (arg0: boolean): void },
    router: NextRouter
  ) =>
  (dispatch: Dispatch) => {
    axios
      .put(`${url}test/interest/${id}`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        navigate(false);
        router.replace('/test/interest');
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

export const deleteInterestTests =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .delete(`${url}test/interests`, {
        headers: {
          Authorization: token,
        },
        data: {
          interestTestIds: id,
        },
      })
      .then(() => {
        Cookies.remove('delete');
        showToaster(success, id?.length === 1 ? testDelete : testsDelete);
        dispatch(loader(false));
        dispatch(getInterestTests(token) as unknown as AnyAction);
      })
      .catch(() => {
        console.warn('Something Went Wrong');
        Cookies.remove('delete');
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };
