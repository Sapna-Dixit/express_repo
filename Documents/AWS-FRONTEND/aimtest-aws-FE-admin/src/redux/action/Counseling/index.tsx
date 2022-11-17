import axios from 'axios';
import Cookies from 'js-cookie';
import { NextRouter } from 'next/router';
import { AnyAction, Dispatch } from 'redux';

import {
  getAllCounselings,
  getParticularCounseling,
} from 'redux/reducer/Counseling';
import {
  errorMessage,
  errorr,
  counselingCreate,
  counselingsDelete,
  counselingDelete,
  counselingUpdate,
  success,
  counselingExist,
  counselingRestore,
} from 'components/Toaster/ToasterMessage';
import { url } from 'components/Api/ApiUrl';
import { loader } from 'redux/reducer/Loader';
import { restoreData } from 'redux/reducer/Restore';
import showToaster from 'components/Toaster/Toaster';

export const getCounselings = (token: string) => (dispatch: Dispatch) => {
  axios
    .get(`${url}counselings`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      dispatch(loader(false));
      dispatch(getAllCounselings(res.data));
    })
    .catch(() => {
      showToaster(errorr, errorMessage);
      dispatch(loader(false));
      console.warn('Something Went Wrong');
    });
};

export const getCounseling =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .get(`${url}counseling/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(getParticularCounseling(res.data));
        dispatch(loader(false));
      })
      .catch(() => {
        dispatch(loader(false));
        console.warn('Something Went Wrong');
        showToaster(errorr, errorMessage);
      });
  };

export const postCounselingData =
  (
    data: counselingType,
    token: string,
    navigate: { (arg0: boolean): void; (arg0: boolean): void },
    router: NextRouter
  ) =>
  (dispatch: Dispatch) => {
    axios
      .post(`${url}counseling`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        navigate(false);
        router.replace('/counseling');
        showToaster(success, counselingCreate);
        dispatch(loader(false));
        dispatch(getCounselings(token) as unknown as AnyAction);
      })
      .catch((err) => {
        navigate(true);
        console.warn('Something Went Wrong');
        err?.response?.data?._id !== undefined &&
          dispatch(restoreData(err?.response?.data?._id));
        err?.response?.status !== 409 && showToaster(errorr, errorMessage);
        err?.response?.status === 409 &&
          err?.response?.data?._id === undefined &&
          showToaster(errorr, counselingExist);
        dispatch(loader(false));
      });
  };

export const putCounselingData =
  (
    id: string,
    data: counselingType,
    token: string,
    navigate: { (arg0: boolean): void; (arg0: boolean): void },
    router: NextRouter
  ) =>
  (dispatch: Dispatch) => {
    axios
      .put(`${url}counseling/${id}`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        navigate(false);
        router.replace('/counseling');
        showToaster(success, counselingUpdate);
        dispatch(loader(false));
        dispatch(getCounselings(token) as unknown as AnyAction);
      })
      .catch((err) => {
        navigate(true);
        console.warn('Something Went Wrong');
        err?.response?.data?._id !== undefined &&
          dispatch(restoreData(err?.response?.data?._id));
        err?.response?.status !== 409 && showToaster(errorr, errorMessage);
        err?.response?.status === 409 &&
          err?.response?.data?._id === undefined &&
          showToaster(errorr, counselingExist);
        dispatch(loader(false));
      });
  };

export const restoreCounselingData =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .patch(
        `${url}counseling/${id}/restore`,
        { isDeleted: false },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(() => {
        showToaster(success, counselingRestore);
        dispatch(loader(false));
        dispatch(getCounselings(token) as unknown as AnyAction);
      })
      .catch(() => {
        console.warn('Something Went Wrong');
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };

export const deleteCounselings =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .delete(`${url}counselings`, {
        headers: {
          Authorization: token,
        },
        data: {
          counselingIds: id,
        },
      })
      .then(() => {
        Cookies.remove('delete');
        showToaster(
          success,
          id?.length === 1 ? counselingDelete : counselingsDelete
        );
        dispatch(loader(false));
        dispatch(getCounselings(token) as unknown as AnyAction);
      })
      .catch(() => {
        console.warn('Something Went Wrong');
        Cookies.remove('delete');
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };
