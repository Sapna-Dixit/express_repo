import axios from 'axios';
import Cookies from 'js-cookie';
import { FormikState } from 'formik';
import { SetStateAction } from 'react';
import { AnyAction, Dispatch } from 'redux';

import {
  getAllImageTestLevel,
  getParticularImageTestLevel,
} from 'redux/reducer/Level/ImageTest';
import {
  errorr,
  success,
  levelCreate,
  levelUpdate,
  levelDelete,
  levelsDelete,
  errorMessage,
  levelRestore,
  levelExist,
} from 'components/Toaster/ToasterMessage';
import { url } from 'components/Api/ApiUrl';
import { loader } from 'redux/reducer/Loader';
import { restoreData } from 'redux/reducer/Restore';
import showToaster from 'components/Toaster/Toaster';

export const getImageTestLevels = (token: string) => (dispatch: Dispatch) => {
  axios
    .get(`${url}test/memory/imageTest/levels`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      dispatch(loader(false));
      dispatch(getAllImageTestLevel(res.data));
    })
    .catch(() => {
      showToaster(errorr, errorMessage);
      dispatch(loader(false));

      console.warn('Something Went Wrong');
    });
};

export const getImageTestLevel =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .get(`${url}test/memory/imageTest/level/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(getParticularImageTestLevel(res.data));
        dispatch(loader(false));
      })
      .catch(() => {
        dispatch(loader(false));
        console.warn('Something Went Wrong');
        showToaster(errorr, errorMessage);
      });
  };

export const postImageTestLevel =
  (
    data: TestValues,
    token: string,
    navigate: { (value: SetStateAction<boolean>): void; (arg0: boolean): void },
    resetForm: {
      (nextState?: Partial<FormikState<TestValues>> | undefined): void;
      (): void;
    }
  ) =>
  (dispatch: Dispatch) => {
    axios
      .post(`${url}test/memory/imageTest/level`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        resetForm();
        navigate(false);
        showToaster(success, levelCreate);
        dispatch(loader(false));
        dispatch(getImageTestLevels(token) as unknown as AnyAction);
      })
      .catch((err) => {
        navigate(true);
        console.warn('Something Went Wrong');
        err?.response?.data?._id !== undefined &&
          dispatch(restoreData(err?.response?.data?._id));
        err?.response?.status !== 409 && showToaster(errorr, errorMessage);
        err?.response?.status === 409 &&
          err?.response?.data?._id === undefined &&
          showToaster(errorr, levelExist);
        dispatch(loader(false));
      });
  };

export const putImageTestLevel =
  (
    id: string,
    data: TestValues,
    token: string,
    navigate: { (value: SetStateAction<boolean>): void; (arg0: boolean): void },
    resetForm: {
      (nextState?: Partial<FormikState<TestValues>> | undefined): void;
      (): void;
    }
  ) =>
  (dispatch: Dispatch) => {
    axios
      .put(`${url}test/memory/imageTest/level/${id}`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        resetForm();
        navigate(false);
        showToaster(success, levelUpdate);
        dispatch(loader(false));
        dispatch(getImageTestLevels(token) as unknown as AnyAction);
      })
      .catch((err) => {
        navigate(true);
        console.warn('Something Went Wrong');
        err?.response?.data?._id !== undefined &&
          dispatch(restoreData(err?.response?.data?._id));
        err?.response?.status !== 409 && showToaster(errorr, errorMessage);
        err?.response?.status === 409 &&
          err?.response?.data?._id === undefined &&
          showToaster(errorr, levelExist);
        dispatch(loader(false));
      });
  };

export const restoreImageTestLevel =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .patch(
        `${url}test/memory/imageTest/level/${id}/restore`,
        { isDeleted: false },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(() => {
        showToaster(success, levelRestore);
        dispatch(loader(false));
        dispatch(getImageTestLevels(token) as unknown as AnyAction);
      })
      .catch(() => {
        console.warn('Something Went Wrong');
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };

export const deleteImageTestLevels =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .delete(`${url}test/memory/imageTest/levels`, {
        headers: {
          Authorization: token,
        },
        data: {
          imageTestLevelIds: id,
        },
      })
      .then(() => {
        Cookies.remove('delete');
        showToaster(success, id?.length === 1 ? levelDelete : levelsDelete);
        dispatch(loader(false));
        dispatch(getImageTestLevels(token) as unknown as AnyAction);
      })
      .catch(() => {
        console.warn('Something Went Wrong');
        Cookies.remove('delete');
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };
