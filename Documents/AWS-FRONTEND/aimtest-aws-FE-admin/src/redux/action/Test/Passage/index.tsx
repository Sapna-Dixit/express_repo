import axios from 'axios';
import Cookies from 'js-cookie';
import { NextRouter } from 'next/router';
import { AnyAction, Dispatch } from 'redux';

import {
  getAllPassage,
  getParticularPassage,
} from 'redux/reducer/Test/Passage';
import {
  errorr,
  errorMessage,
  success,
  passageCreate,
  passageUpdate,
  passageDelete,
  passagesDelete,
} from 'components/Toaster/ToasterMessage';
import { url } from 'components/Api/ApiUrl';
import { loader } from 'redux/reducer/Loader';
import showToaster from 'components/Toaster/Toaster';

export const getPassages = (token: string) => (dispatch: Dispatch) => {
  axios
    .get(`${url}test/passages`, {
      headers: {
        Authorization: token as unknown as string,
      },
    })
    .then((res) => {
      dispatch(loader(false));
      dispatch(getAllPassage(res.data));
    })
    .catch(() => {
      console.warn('Something Went Wrong');
      showToaster(errorr, errorMessage);
      dispatch(loader(false));
    });
};

export const postPassageData =
  (
    data: passageDataType,
    token: string,
    navigate: { (arg0: boolean): void; (arg0: boolean): void },
    router: NextRouter
  ) =>
  (dispatch: Dispatch) => {
    axios
      .post(`${url}test/passage`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        navigate(false);
        router.replace('/test/passage');
        showToaster(success, passageCreate);
        dispatch(loader(false));
        dispatch(getPassages(token) as unknown as AnyAction);
      })
      .catch(() => {
        navigate(true);
        console.warn('Something Went Wrong');
        showToaster(errorr, errorMessage);
        dispatch(loader(false));
      });
  };

export const getPassage =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .get(`${url}test/passage/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(getParticularPassage(res.data));
        dispatch(loader(false));
      })
      .catch(() => {
        dispatch(loader(false));
        console.warn('Something Went Wrong');
        showToaster(errorr, errorMessage);
      });
  };

export const putPassageData =
  (
    id: string,
    data: passageDataType,
    token: string,
    navigate: { (arg0: boolean): void; (arg0: boolean): void },
    router: NextRouter
  ) =>
  (dispatch: Dispatch) => {
    axios
      .put(`${url}test/passage/${id}`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        navigate(false);
        router.replace('/test/passage');
        showToaster(success, passageUpdate);
        dispatch(loader(false));
      })
      .catch(() => {
        navigate(true);
        console.warn('Something Went Wrong');
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };

export const deletePassages =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .delete(`${url}test/passages`, {
        headers: {
          Authorization: token,
        },
        data: {
          passageTestIds: id,
        },
      })
      .then(() => {
        Cookies.remove('delete');
        showToaster(success, id?.length === 1 ? passageDelete : passagesDelete);
        dispatch(loader(false));
        dispatch(getPassages(token) as unknown as AnyAction);
      })
      .catch(() => {
        console.warn('Something Went Wrong');
        Cookies.remove('delete');
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };
