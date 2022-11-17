import axios from 'axios';
import { AnyAction, Dispatch } from 'redux';

import {
  errorMessage,
  errorr,
  formulaUpdate,
  success,
} from 'components/Toaster/ToasterMessage';
import { url } from 'components/Api/ApiUrl';
import { loader } from 'redux/reducer/Loader';
import showToaster from 'components/Toaster/Toaster';
import { getAllFormula } from 'redux/reducer/Formula';

export const getFormulas = (token: string) => (dispatch: Dispatch) => {
  axios
    .get(`${url}formulas`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      dispatch(loader(false));
      dispatch(getAllFormula(res.data));
    })
    .catch(() => {
      showToaster(errorr, errorMessage);
      dispatch(loader(false));
      console.warn('Something Went Wrong');
    });
};

export const postFormulaData =
  (data: formulaType, token: string) => (dispatch: Dispatch) => {
    axios
      .post(`${url}formula`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        showToaster(success, formulaUpdate, 3000);
        dispatch(loader(false));
        dispatch(getFormulas(token) as unknown as AnyAction);
      })
      .catch(() => {
        console.warn('Something Went Wrong');
        showToaster(errorr, errorMessage);
        dispatch(loader(false));
      });
  };

export const putFormulaData =
  (id: string, data: formulaType, token: string) => (dispatch: Dispatch) => {
    axios
      .put(`${url}formula/${id}`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        showToaster(success, formulaUpdate, 3000);
        dispatch(loader(false));
        dispatch(getFormulas(token) as unknown as AnyAction);
      })
      .catch(() => {
        console.warn('Something Went Wrong');
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };
