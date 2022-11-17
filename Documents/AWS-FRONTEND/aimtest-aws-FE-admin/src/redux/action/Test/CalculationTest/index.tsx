import axios from 'axios';
import Cookies from 'js-cookie';
import { NextRouter } from 'next/router';
import { AnyAction, Dispatch } from 'redux';

import {
  getAllCalculationTest,
  getParticularCalculationTest,
} from 'redux/reducer/Test/CalculationTest';
import {
  errorr,
  success,
  testCreate,
  testDelete,
  testsDelete,
  testUpdate,
  errorMessage,
  testRestore,
  testExist,
} from 'components/Toaster/ToasterMessage';
import { url } from 'components/Api/ApiUrl';
import { loader } from 'redux/reducer/Loader';
import { restoreData } from 'redux/reducer/Restore';
import showToaster from 'components/Toaster/Toaster';

export const getCalculationTests = (token: string) => (dispatch: Dispatch) => {
  axios
    .get(`${url}test/calculations`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      dispatch(loader(false));
      dispatch(getAllCalculationTest(res.data));
    })
    .catch(() => {
      showToaster(errorr, errorMessage);
      dispatch(loader(false));

      console.warn('Something Went Wrong');
    });
};

export const getCalculationTest =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .get(`${url}test/calculation/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(getParticularCalculationTest(res.data));
        dispatch(loader(false));
      })
      .catch(() => {
        dispatch(loader(false));

        console.warn('Something Went Wrong');
        showToaster(errorr, errorMessage);
      });
  };

export const postCalculationTest =
  (
    data: calculationTestType,
    token: string,
    navigate: { (arg0: boolean): void; (arg0: boolean): void },
    router: NextRouter
  ) =>
  (dispatch: Dispatch) => {
    axios
      .post(`${url}test/calculation`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        navigate(false);
        router.replace('/test/calculationtest');
        showToaster(success, testCreate);
        dispatch(loader(false));
        dispatch(getCalculationTests(token) as unknown as AnyAction);
      })
      .catch((err) => {
        navigate(true);
        console.warn('Something Went Wrong');
        err?.response?.data?._id !== undefined &&
          dispatch(restoreData(err?.response?.data?._id));
        err?.response?.status !== 409 && showToaster(errorr, errorMessage);
        err?.response?.status === 409 &&
          err?.response?.data?._id === undefined &&
          showToaster(errorr, testExist);
        dispatch(loader(false));
      });
  };

export const putCalculationTest =
  (
    id: string,
    data: calculationTestType,
    token: string,
    navigate: { (arg0: boolean): void; (arg0: boolean): void },
    router: NextRouter
  ) =>
  (dispatch: Dispatch) => {
    axios
      .put(`${url}test/calculation/${id}`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        navigate(false);
        router.replace('/test/calculationtest');
        showToaster(success, testUpdate);
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
          showToaster(errorr, testExist);
        dispatch(loader(false));
      });
  };

export const restoreCalculationTest =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .patch(
        `${url}test/calculation/${id}/restore`,
        { isDeleted: false },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(() => {
        showToaster(success, testRestore);
        dispatch(loader(false));
        dispatch(getCalculationTests(token) as unknown as AnyAction);
      })
      .catch(() => {
        console.warn('Something Went Wrong');
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };

export const deleteCalculationTests =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .delete(`${url}test/calculations`, {
        headers: {
          Authorization: token,
        },
        data: {
          calculationTestIds: id,
        },
      })
      .then(() => {
        Cookies.remove('delete');
        showToaster(success, id?.length === 1 ? testDelete : testsDelete);
        dispatch(loader(false));
        dispatch(getCalculationTests(token) as unknown as AnyAction);
      })
      .catch(() => {
        console.warn('Something Went Wrong');
        Cookies.remove('delete');
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };
