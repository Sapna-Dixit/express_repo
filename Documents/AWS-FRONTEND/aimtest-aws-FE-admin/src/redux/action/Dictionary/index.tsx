import axios from 'axios';
import Cookies from 'js-cookie';
import { NextRouter } from 'next/router';
import { AnyAction, Dispatch } from 'redux';

import {
  getAllDictionary,
  getParticularDictionary,
} from 'redux/reducer/Dictionary';
import {
  errorMessage,
  errorr,
  dictionaryCreate,
  dictionaryDelete,
  dictionarysDelete,
  dictionaryUpdate,
  success,
} from 'components/Toaster/ToasterMessage';
import { url } from 'components/Api/ApiUrl';
import { loader } from 'redux/reducer/Loader';
import showToaster from 'components/Toaster/Toaster';

export const getDictionarys = (token: string) => (dispatch: Dispatch) => {
  axios
    .get(`${url}word/dictionarys`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      dispatch(loader(false));
      dispatch(getAllDictionary(res.data));
    })
    .catch(() => {
      showToaster(errorr, errorMessage);
      dispatch(loader(false));
      console.warn('Something Went Wrong');
    });
};

export const getDictionary =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .get(`${url}word/dictionary/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(getParticularDictionary(res.data));
        dispatch(loader(false));
      })
      .catch(() => {
        dispatch(loader(false));

        console.warn('Something Went Wrong');
        showToaster(errorr, errorMessage);
      });
  };

export const postDictionary =
  (
    data: wordDictionaryType,
    token: string,
    navigate: { (arg0: boolean): void; (arg0: boolean): void },
    router: NextRouter
  ) =>
  (dispatch: Dispatch) => {
    axios
      .post(`${url}word/dictionary`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        navigate(false);
        router.replace('/dictionary');
        showToaster(success, dictionaryCreate);
        dispatch(loader(false));
        dispatch(getDictionarys(token) as unknown as AnyAction);
      })
      .catch(() => {
        navigate(true);
        console.warn('Something Went Wrong');
        showToaster(errorr, errorMessage);
        dispatch(loader(false));
      });
  };

export const putDictionary =
  (
    id: string,
    data: wordDictionaryType,
    token: string,
    navigate: { (arg0: boolean): void; (arg0: boolean): void },
    router: NextRouter
  ) =>
  (dispatch: Dispatch) => {
    axios
      .put(`${url}word/dictionary/${id}`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        navigate(false);
        router.replace('/dictionary');
        showToaster(success, dictionaryUpdate);
        dispatch(loader(false));
      })
      .catch(() => {
        navigate(true);
        console.warn('Something Went Wrong');
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };

export const deleteDictionarys =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .delete(`${url}word/dictionarys`, {
        headers: {
          Authorization: token,
        },
        data: {
          dictionaryIds: id,
        },
      })
      .then(() => {
        Cookies.remove('delete');
        showToaster(
          success,
          id?.length === 1 ? dictionaryDelete : dictionarysDelete
        );
        dispatch(loader(false));
        dispatch(getDictionarys(token) as unknown as AnyAction);
      })
      .catch(() => {
        console.warn('Something Went Wrong');
        Cookies.remove('delete');
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };
