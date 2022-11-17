import axios from 'axios';
import Cookies from 'js-cookie';
import { AnyAction, Dispatch } from 'redux';

import {
  errorr,
  success,
  errorMessage,
  segmentDelete,
  segmentCreate,
  segmentRestore,
  segmentsDelete,
  segmentUpdate,
  segmentExist,
} from 'components/Toaster/ToasterMessage';
import { url } from 'components/Api/ApiUrl';
import { loader } from 'redux/reducer/Loader';
import { restoreData } from 'redux/reducer/Restore';
import showToaster from 'components/Toaster/Toaster';
import { getAllSegment, getParticularSegment } from 'redux/reducer/Segment';

export const getSegments = (token: string) => (dispatch: Dispatch) => {
  axios
    .get(`${url}segments`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      dispatch(loader(false));
      dispatch(getAllSegment(res.data));
    })
    .catch(() => {
      showToaster(errorr, errorMessage);
      dispatch(loader(false));

      console.warn('Something Went Wrong');
    });
};

export const getSegment =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .get(`${url}segment/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(getParticularSegment(res.data));
        dispatch(loader(false));
      })
      .catch(() => {
        dispatch(loader(false));

        console.warn('Something Went Wrong');
        showToaster(errorr, errorMessage);
      });
  };

export const postSegmentData =
  (data: { name: string }, token: string) => (dispatch: Dispatch) => {
    axios
      .post(`${url}segment`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        showToaster(success, segmentCreate);
        dispatch(loader(false));
        dispatch(getSegments(token) as unknown as AnyAction);
      })
      .catch((err) => {
        console.warn('Something Went Wrong');
        err?.response?.data?._id !== undefined &&
          dispatch(restoreData(err?.response?.data?._id));
        err?.response?.status !== 409 && showToaster(errorr, errorMessage);
        err?.response?.status === 409 &&
          err?.response?.data?._id === undefined &&
          showToaster(errorr, segmentExist);
        dispatch(loader(false));
      });
  };

export const putSegmentData =
  (id: string, data: { name: string }, token: string) =>
  (dispatch: Dispatch) => {
    axios
      .put(`${url}segment/${id}`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        showToaster(success, segmentUpdate);
        dispatch(loader(false));
        dispatch(getSegments(token) as unknown as AnyAction);
      })
      .catch((err) => {
        console.warn('Something Went Wrong');
        err?.response?.data?._id !== undefined &&
          dispatch(restoreData(err?.response?.data?._id));
        err?.response?.status !== 409 && showToaster(errorr, errorMessage);
        err?.response?.status === 409 &&
          err?.response?.data?._id === undefined &&
          showToaster(errorr, segmentExist);
        dispatch(loader(false));
      });
  };

export const restoreSegmentData =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .patch(
        `${url}segment/${id}/restore`,
        { isDeleted: false },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(() => {
        showToaster(success, segmentRestore);
        dispatch(loader(false));
        dispatch(getSegments(token) as unknown as AnyAction);
      })
      .catch((err) => {
        console.warn('Something Went Wrong');
        dispatch(restoreData(err?.response?.data?._id));
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };

export const deleteSegments =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .delete(`${url}segments`, {
        headers: {
          Authorization: token,
        },
        data: {
          segmentIds: id,
        },
      })
      .then(() => {
        Cookies.remove('delete');
        showToaster(success, id?.length === 1 ? segmentDelete : segmentsDelete);
        dispatch(loader(false));
        dispatch(getSegments(token) as unknown as AnyAction);
      })
      .catch(() => {
        console.warn('Something Went Wrong');
        Cookies.remove('delete');
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };
