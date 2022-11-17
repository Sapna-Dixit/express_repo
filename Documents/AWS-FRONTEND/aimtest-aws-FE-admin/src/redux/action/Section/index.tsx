import axios from 'axios';
import Cookies from 'js-cookie';
import { AnyAction, Dispatch } from 'redux';

import {
  errorMessage,
  errorr,
  sectionCreate,
  sectionDelete,
  sectionExist,
  sectionRestore,
  sectionsDelete,
  sectionUpdate,
  success,
} from 'components/Toaster/ToasterMessage';
import { url } from 'components/Api/ApiUrl';
import { loader } from 'redux/reducer/Loader';
import { restoreData } from 'redux/reducer/Restore';
import showToaster from 'components/Toaster/Toaster';
import { getAllSection, getParticularSection } from 'redux/reducer/Section';

export const getSections = (token: string) => (dispatch: Dispatch) => {
  axios
    .get(`${url}sections`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      dispatch(loader(false));
      dispatch(getAllSection(res.data));
    })
    .catch(() => {
      showToaster(errorr, errorMessage);
      dispatch(loader(false));

      console.warn('Something Went Wrong');
    });
};

export const getSection =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .get(`${url}section/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(getParticularSection(res.data));
        dispatch(loader(false));
      })
      .catch(() => {
        dispatch(loader(false));

        console.warn('Something Went Wrong');
        showToaster(errorr, errorMessage);
      });
  };

export const postSectionData =
  (data: { name: string }, token: string) => (dispatch: Dispatch) => {
    axios
      .post(`${url}section`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        showToaster(success, sectionCreate);
        dispatch(loader(false));
        dispatch(getSections(token) as unknown as AnyAction);
      })
      .catch((err) => {
        console.warn('Something Went Wrong');
        err?.response?.data?._id !== undefined &&
          dispatch(restoreData(err?.response?.data?._id));
        err?.response?.status !== 409 && showToaster(errorr, errorMessage);
        err?.response?.status === 409 &&
          err?.response?.data?._id === undefined &&
          showToaster(errorr, sectionExist);
        dispatch(loader(false));
      });
  };

export const putSectionData =
  (id: string, data: { name: string }, token: string) =>
  (dispatch: Dispatch) => {
    axios
      .put(`${url}section/${id}`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        showToaster(success, sectionUpdate);
        dispatch(loader(false));
        dispatch(getSections(token) as unknown as AnyAction);
      })
      .catch((err) => {
        console.warn('Something Went Wrong');
        err?.response?.data?._id !== undefined &&
          dispatch(restoreData(err?.response?.data?._id));
        err?.response?.status !== 409 && showToaster(errorr, errorMessage);
        err?.response?.status === 409 &&
          err?.response?.data?._id === undefined &&
          showToaster(errorr, sectionExist);
        dispatch(loader(false));
      });
  };

export const restoreSectionData =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .patch(
        `${url}section/${id}/restore`,
        { isDeleted: false },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(() => {
        showToaster(success, sectionRestore);
        dispatch(loader(false));
        dispatch(getSections(token) as unknown as AnyAction);
      })
      .catch(() => {
        console.warn('Something Went Wrong');
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };

export const deleteSections =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .delete(`${url}sections`, {
        headers: {
          Authorization: token,
        },
        data: {
          sectionIds: id,
        },
      })
      .then(() => {
        Cookies.remove('delete');
        showToaster(success, id?.length === 1 ? sectionDelete : sectionsDelete);
        dispatch(loader(false));
        dispatch(getSections(token) as unknown as AnyAction);
      })
      .catch(() => {
        console.warn('Something Went Wrong');
        Cookies.remove('delete');
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };
