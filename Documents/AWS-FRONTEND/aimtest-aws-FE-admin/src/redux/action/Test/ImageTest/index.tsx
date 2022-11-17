import axios from 'axios';
import Cookies from 'js-cookie';
import { FormikState } from 'formik';
import { NextRouter } from 'next/router';
import { AnyAction, Dispatch } from 'redux';

import {
  getAllImageTest,
  getParticularImageTest,
} from 'redux/reducer/Test/ImageTest';
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

export const getImageTests = (token: string) => (dispatch: Dispatch) => {
  axios
    .get(`${url}test/memory/images`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      dispatch(loader(false));
      dispatch(getAllImageTest(res.data));
    })
    .catch(() => {
      showToaster(errorr, errorMessage);
      dispatch(loader(false));

      console.warn('Something Went Wrong');
    });
};

export const getImageTest =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .get(`${url}test/memory/image/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(getParticularImageTest(res.data));
        dispatch(loader(false));
      })
      .catch(() => {
        dispatch(loader(false));

        console.warn('Something Went Wrong');
        showToaster(errorr, errorMessage);
      });
  };

export const postImageTest =
  (
    data: FormData,
    token: string,
    navigate: { (arg0: boolean): void; (arg0: boolean): void },
    router: NextRouter,
    resetForm: {
      (nextState?: Partial<FormikState<imageTestType>> | undefined): void;
      (): void;
    }
  ) =>
  (dispatch: Dispatch) => {
    axios
      .post(`${url}test/memory/image`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        resetForm();
        navigate(false);
        router.replace('/test/imagetest');
        showToaster(success, testCreate);
        dispatch(loader(false));
        dispatch(getImageTests(token) as unknown as AnyAction);
      })
      .catch(() => {
        navigate(true);
        console.warn('Something Went Wrong');
        showToaster(errorr, errorMessage);
        dispatch(loader(false));
      });
  };

export const putImageTest =
  (
    id: string,
    data: FormData,
    token: string,
    navigate: { (arg0: boolean): void; (arg0: boolean): void },
    router: NextRouter,
    resetForm: {
      (nextState?: Partial<FormikState<imageTestType>> | undefined): void;
      (): void;
    }
  ) =>
  (dispatch: Dispatch) => {
    axios
      .put(`${url}test/memory/image/${id}`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        resetForm();
        navigate(false);
        router.replace('/test/imagetest');
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

export const deleteImageTests =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .delete(`${url}test/memory/images`, {
        headers: {
          Authorization: token,
        },
        data: {
          imageTestIds: id,
        },
      })
      .then(() => {
        Cookies.remove('delete');
        showToaster(success, id?.length === 1 ? testDelete : testsDelete);
        dispatch(loader(false));
        dispatch(getImageTests(token) as unknown as AnyAction);
      })
      .catch(() => {
        console.warn('Something Went Wrong');
        Cookies.remove('delete');
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };
