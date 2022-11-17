import axios from 'axios';
import { AnyAction, Dispatch } from 'redux';

import {
  errorMessage,
  errorr,
  success,
  instructionUpdate,
  instructionCreate,
  instructionDelete,
} from 'components/Toaster/ToasterMessage';
import { url } from 'components/Api/ApiUrl';
import { loader } from 'redux/reducer/Loader';
import showToaster from 'components/Toaster/Toaster';
import { getAllInstructions } from 'redux/reducer/Instruction';

export const getInstructions = (token: string) => (dispatch: Dispatch) => {
  axios
    .get(`${url}instructions`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      dispatch(loader(false));
      dispatch(getAllInstructions(res.data));
    })
    .catch(() => {
      showToaster(errorr, errorMessage);
      dispatch(loader(false));
      console.warn('Something Went Wrong');
    });
};

export const postInstructionData =
  (data: { testPage: string; _id: string; content: string }, token: string) =>
  (dispatch: Dispatch) => {
    axios
      .post(`${url}instruction`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        showToaster(success, instructionCreate);
        dispatch(loader(false));
        dispatch(getInstructions(token) as unknown as AnyAction);
      })
      .catch(() => {
        console.warn('Something Went Wrong');
        showToaster(errorr, errorMessage);
        dispatch(loader(false));
      });
  };

export const putInstructionData =
  (
    id: string,
    data: { testPage: string; _id: string; content: string },
    token: string
  ) =>
  (dispatch: Dispatch) => {
    axios
      .put(`${url}instruction/${id}`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        showToaster(success, instructionUpdate);
        dispatch(loader(false));
        dispatch(getInstructions(token) as unknown as AnyAction);
      })
      .catch(() => {
        console.warn('Something Went Wrong');
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };

export const deleteInstructionData =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .delete(`${url}instruction/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        showToaster(success, instructionDelete);
        dispatch(loader(false));
        dispatch(getInstructions(token) as unknown as AnyAction);
      })
      .catch(() => {
        console.warn('Something Went Wrong');
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };
