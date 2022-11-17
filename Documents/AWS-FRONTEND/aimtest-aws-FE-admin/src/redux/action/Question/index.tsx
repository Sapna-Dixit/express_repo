import axios from 'axios';
import Cookies from 'js-cookie';
import { NextRouter } from 'next/router';
import { AnyAction, Dispatch } from 'redux';

import {
  errorr,
  success,
  errorMessage,
  questionCreate,
  questionUpdate,
  questionDelete,
  questionsDelete,
} from 'components/Toaster/ToasterMessage';
import { url } from 'components/Api/ApiUrl';
import { loader } from 'redux/reducer/Loader';
import showToaster from 'components/Toaster/Toaster';
import { getAllQuestion, getParticularQuestion } from 'redux/reducer/Question';

export const getQuestions =
  (token: string, limit?: number, skip?: number) => (dispatch: Dispatch) => {
    axios
      .get(`${url}questions?limit=${limit}&skip=${skip}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(loader(false));
        dispatch(getAllQuestion(res.data));
      })
      .catch(() => {
        showToaster(errorr, errorMessage);
        dispatch(loader(false));
      });
  };

export const getQuestion =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .get(`${url}question/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(getParticularQuestion(res.data));
        dispatch(loader(false));
      })
      .catch(() => {
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };

export const addQuestion =
  (
    data: addQuestionType | FormData,
    token: string,
    navigate: { (arg0: boolean): void; (arg0: boolean): void },
    router: NextRouter
  ) =>
  (dispatch: Dispatch) => {
    axios
      .post(`${url}question`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        navigate(false);
        router.push('/question');
        showToaster(success, questionCreate);
        dispatch(loader(false));
        dispatch(getQuestions(token, 15, 0) as unknown as AnyAction);
      })
      .catch(() => {
        navigate(true);
        showToaster(errorr, errorMessage);
        dispatch(loader(false));
      });
  };

export const putQuestionData =
  (
    id: string,
    data: addQuestionType | FormData,
    token: string,
    navigate: { (arg0: boolean): void; (arg0: boolean): void },
    router: NextRouter
  ) =>
  (dispatch: Dispatch) => {
    axios
      .put(`${url}question/${id}`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        navigate(false);
        router.push('/question');
        showToaster(success, questionUpdate);
        dispatch(loader(false));
      })
      .catch(() => {
        navigate(true);
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };

export const deleteQuestions =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .delete(`${url}questions`, {
        headers: {
          Authorization: token,
        },
        data: {
          questionIds: id,
        },
      })
      .then(() => {
        Cookies.remove('delete');
        showToaster(
          success,
          id?.length === 1 ? questionDelete : questionsDelete
        );
        dispatch(loader(false));
        dispatch(getQuestions(token, 15, 0) as unknown as AnyAction);
      })
      .catch(() => {
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };
