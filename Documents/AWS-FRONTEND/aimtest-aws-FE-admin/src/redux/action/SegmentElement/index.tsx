import axios from 'axios';
import Cookies from 'js-cookie';
import { NextRouter } from 'next/router';
import { AnyAction, Dispatch } from 'redux';

import {
  getAllSegmentElement,
  getParticularSegmentElement,
} from 'redux/reducer/SegmentElement';
import {
  errorMessage,
  errorr,
  elementCreate,
  elementUpdate,
  success,
  segmentDelete,
  segmentsDelete,
  segmentSequenceUpdate,
  segmentRestore,
  elementExist,
} from 'components/Toaster/ToasterMessage';
import { url } from 'components/Api/ApiUrl';
import { loader } from 'redux/reducer/Loader';
import { restoreData } from 'redux/reducer/Restore';
import showToaster from 'components/Toaster/Toaster';

export const getSegmentElements = (token: string) => (dispatch: Dispatch) => {
  axios
    .get(`${url}segment-elements`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      dispatch(loader(false));
      dispatch(getAllSegmentElement(res.data));
    })
    .catch(() => {
      showToaster(errorr, errorMessage);
      dispatch(loader(false));
      console.warn('Something Went Wrong');
    });
};

export const getSegmentElement =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .get(`${url}segment/${id}/element`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(getParticularSegmentElement(res.data));
        dispatch(loader(false));
      })
      .catch(() => {
        dispatch(loader(false));
        console.warn('Something Went Wrong');
        showToaster(errorr, errorMessage);
      });
  };

export const postSegmentElementData =
  (
    data: segmentElementType,
    token: string,
    navigate: { (arg0: boolean): void; (arg0: boolean): void },
    router: NextRouter
  ) =>
  (dispatch: Dispatch) => {
    axios
      .post(`${url}segment/element`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        navigate(false);
        router.replace('/segmentelement');
        showToaster(success, elementCreate);
        dispatch(loader(false));
        dispatch(getSegmentElements(token) as unknown as AnyAction);
      })
      .catch((err) => {
        navigate(true);
        console.warn('Something Went Wrong');
        err?.response?.data?._id !== undefined &&
          dispatch(restoreData(err?.response?.data?._id));
        err?.response?.status !== 409 && showToaster(errorr, errorMessage);
        err?.response?.status === 409 &&
          err?.response?.data?._id === undefined &&
          showToaster(errorr, elementExist);
        dispatch(loader(false));
      });
  };

export const putSegmentElementData =
  (
    id: string,
    data: segmentElementType,
    token: string,
    navigate: { (arg0: boolean): void; (arg0: boolean): void },
    router: NextRouter
  ) =>
  (dispatch: Dispatch) => {
    axios
      .put(`${url}segment/${id}/element`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        navigate(false);
        router.replace('/segmentelement');
        showToaster(success, elementUpdate);
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
          showToaster(errorr, elementExist);
        dispatch(loader(false));
      });
  };

export const restoreSegmentElementData =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .patch(
        `${url}segmentElement/${id}/restore`,
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
        dispatch(getSegmentElements(token) as unknown as AnyAction);
      })
      .catch((err) => {
        console.warn('Something Went Wrong');
        dispatch(restoreData(err?.response?.data?._id));
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };

export const putSegmentSequence =
  (data: segmentElementType, token: string) => (dispatch: Dispatch) => {
    axios
      .put(
        `${url}segment/elements/sequence`,
        {
          segmentElements: data,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(() => {
        showToaster(success, segmentSequenceUpdate);
        dispatch(loader(false));
        dispatch(getSegmentElements(token) as unknown as AnyAction);
      })
      .catch(() => {
        console.warn('Something Went Wrong');
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };

export const deleteSegmentElements =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .delete(`${url}segment/elements`, {
        headers: {
          Authorization: token,
        },
        data: {
          segmentElementIds: id,
        },
      })
      .then(() => {
        Cookies.remove('delete');
        showToaster(success, id?.length === 1 ? segmentDelete : segmentsDelete);
        dispatch(loader(false));
        dispatch(getSegmentElements(token) as unknown as AnyAction);
      })
      .catch(() => {
        console.warn('Something Went Wrong');
        Cookies.remove('delete');
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };
