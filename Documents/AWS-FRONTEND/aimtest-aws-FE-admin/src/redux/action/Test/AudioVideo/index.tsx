import axios from 'axios';
import Cookies from 'js-cookie';
import { FormikState } from 'formik';
import { NextRouter } from 'next/router';
import { AnyAction, Dispatch } from 'redux';

import {
  getAllAudioVideoTest,
  getParticularAudioVideoTest,
} from 'redux/reducer/Test/AudioVideo';
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

export const getAudioVideoTests = (token: string) => (dispatch: Dispatch) => {
  axios
    .get(`${url}test/audiovideos`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      dispatch(loader(false));
      dispatch(getAllAudioVideoTest(res.data));
    })
    .catch(() => {
      showToaster(errorr, errorMessage);
      dispatch(loader(false));

      console.warn('Something Went Wrong');
    });
};

export const getAudioVideoTest =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .get(`${url}test/audiovideo/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(getParticularAudioVideoTest(res.data));
        dispatch(loader(false));
      })
      .catch(() => {
        dispatch(loader(false));

        console.warn('Something Went Wrong');
        showToaster(errorr, errorMessage);
      });
  };

export const postAudioVideoTest =
  (
    data: FormData,
    token: string,
    navigate: { (arg0: boolean): void; (arg0: boolean): void },
    router: NextRouter,
    resetForm: {
      (nextState?: Partial<FormikState<audioVideoType>> | undefined): void;
      (): void;
    }
  ) =>
  (dispatch: Dispatch) => {
    axios
      .post(`${url}test/audiovideo`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        resetForm();
        navigate(false);
        router.replace('/test/audiovideotest');
        showToaster(success, testCreate);
        dispatch(loader(false));
        dispatch(getAudioVideoTests(token) as unknown as AnyAction);
      })
      .catch(() => {
        navigate(true);
        console.warn('Something Went Wrong');
        showToaster(errorr, errorMessage);
        dispatch(loader(false));
      });
  };

export const putAudioVideoTest =
  (
    id: string,
    data: FormData,
    token: string,
    navigate: { (arg0: boolean): void; (arg0: boolean): void },
    router: NextRouter,
    resetForm: {
      (nextState?: Partial<FormikState<audioVideoType>> | undefined): void;
      (): void;
    }
  ) =>
  (dispatch: Dispatch) => {
    axios
      .put(`${url}test/audiovideo/${id}`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        resetForm();
        navigate(false);
        router.replace('/test/audiovideotest');
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

export const deleteAudioVideoTests =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .delete(`${url}test/audiovideos`, {
        headers: {
          Authorization: token,
        },
        data: {
          audiovideoIds: id,
        },
      })
      .then(() => {
        Cookies.remove('delete');
        showToaster(success, id?.length === 1 ? testDelete : testsDelete);
        dispatch(loader(false));
        dispatch(getAudioVideoTests(token) as unknown as AnyAction);
      })
      .catch(() => {
        console.warn('Something Went Wrong');
        Cookies.remove('delete');
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };
