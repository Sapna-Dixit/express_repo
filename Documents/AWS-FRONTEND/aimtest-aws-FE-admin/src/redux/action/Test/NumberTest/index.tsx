import axios from 'axios';
import Cookies from 'js-cookie';
import { FormikState } from 'formik';
import { SetStateAction } from 'react';
import { AnyAction, Dispatch } from 'redux';

import {
  getAllNumberTest,
  getParticularNumberTest,
} from 'redux/reducer/Test/NumberTest';
import {
  errorMessage,
  errorr,
  testCreate,
  testDelete,
  testsDelete,
  testUpdate,
  success,
  testRestore,
  testExist,
} from 'components/Toaster/ToasterMessage';
import { url } from 'components/Api/ApiUrl';
import { loader } from 'redux/reducer/Loader';
import { restoreData } from 'redux/reducer/Restore';
import showToaster from 'components/Toaster/Toaster';

export const getNumberTestRanges = (token: string) => (dispatch: Dispatch) => {
  axios
    .get(`${url}test/memory/numbers`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      dispatch(loader(false));
      dispatch(getAllNumberTest(res.data));
    })
    .catch(() => {
      showToaster(errorr, errorMessage);
      dispatch(loader(false));

      console.warn('Something Went Wrong');
    });
};

export const getNumberTestRange =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .get(`${url}test/memory/number/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(getParticularNumberTest(res.data));
        dispatch(loader(false));
      })
      .catch(() => {
        dispatch(loader(false));

        console.warn('Something Went Wrong');
        showToaster(errorr, errorMessage);
      });
  };

export const postNumberTestRange =
  (
    data: numberTestRange,
    token: string,
    navigate: { (value: SetStateAction<boolean>): void; (arg0: boolean): void },
    resetForm: {
      (nextState?: Partial<FormikState<numberTestRange>> | undefined): void;
      (): void;
    }
  ) =>
  (dispatch: Dispatch) => {
    axios
      .post(`${url}test/memory/number`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        resetForm();
        navigate(false);
        showToaster(success, testCreate);
        dispatch(loader(false));
        dispatch(getNumberTestRanges(token) as unknown as AnyAction);
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

export const putNumberTestRange =
  (
    id: string,
    data: rangeData,
    token: string,
    navigate: { (value: SetStateAction<boolean>): void; (arg0: boolean): void },
    resetForm: {
      (nextState?: Partial<FormikState<numberTestRange>> | undefined): void;
      (): void;
    }
  ) =>
  (dispatch: Dispatch) => {
    axios
      .put(`${url}test/memory/number/${id}`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        resetForm();
        navigate(false);
        showToaster(success, testUpdate);
        dispatch(loader(false));
        dispatch(getNumberTestRanges(token) as unknown as AnyAction);
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

export const restoreNumberTestData =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .patch(
        `${url}test/memory/number/${id}/restore`,
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
        dispatch(getNumberTestRanges(token) as unknown as AnyAction);
      })
      .catch(() => {
        console.warn('Something Went Wrong');
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };

export const deleteNumberTestRanges =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .delete(`${url}test/memory/numbers`, {
        headers: {
          Authorization: token,
        },
        data: {
          numberTestIds: id,
        },
      })
      .then(() => {
        Cookies.remove('delete');
        showToaster(success, id?.length === 1 ? testDelete : testsDelete);
        dispatch(loader(false));
        dispatch(getNumberTestRanges(token) as unknown as AnyAction);
      })
      .catch(() => {
        console.warn('Something Went Wrong');
        Cookies.remove('delete');
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };
