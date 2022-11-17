import axios from 'axios';
import Cookies from 'js-cookie';
import { NextRouter } from 'next/router';
import { AnyAction, Dispatch } from 'redux';

import {
  errorMessage,
  errorr,
  couponCreate,
  couponDelete,
  couponsDelete,
  couponUpdate,
  success,
} from 'components/Toaster/ToasterMessage';
import { url } from 'components/Api/ApiUrl';
import { loader } from 'redux/reducer/Loader';
import showToaster from 'components/Toaster/Toaster';
import { getAllCoupons, getParticularCoupon } from 'redux/reducer/Coupon';

export const getCoupons = (token: string) => (dispatch: Dispatch) => {
  axios
    .get(`${url}coupons`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      dispatch(loader(false));
      dispatch(getAllCoupons(res.data));
    })
    .catch(() => {
      showToaster(errorr, errorMessage);
      dispatch(loader(false));
      console.warn('Something Went Wrong');
    });
};

export const getCoupon =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .get(`${url}coupon/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(getParticularCoupon(res.data));
        dispatch(loader(false));
      })
      .catch(() => {
        dispatch(loader(false));
        console.warn('Something Went Wrong');
        showToaster(errorr, errorMessage);
      });
  };

export const postCouponData =
  (
    data: couponType,
    token: string,
    navigate: { (arg0: boolean): void; (arg0: boolean): void },
    router: NextRouter
  ) =>
  (dispatch: Dispatch) => {
    axios
      .post(`${url}coupon`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        navigate(false);
        router.replace('/coupon');
        showToaster(success, couponCreate);
        dispatch(loader(false));
        dispatch(getCoupons(token) as unknown as AnyAction);
      })
      .catch(() => {
        navigate(true);
        console.warn('Something Went Wrong');
        showToaster(errorr, errorMessage);
        dispatch(loader(false));
      });
  };

export const putCouponData =
  (
    id: string,
    data: couponType,
    token: string,
    navigate: { (arg0: boolean): void; (arg0: boolean): void },
    router: NextRouter
  ) =>
  (dispatch: Dispatch) => {
    axios
      .put(`${url}coupon/${id}`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        navigate(false);
        router.replace('/coupon');
        showToaster(success, couponUpdate);
        dispatch(loader(false));
      })
      .catch(() => {
        navigate(true);
        console.warn('Something Went Wrong');
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };

export const deleteCoupons =
  (id: string, token: string) => (dispatch: Dispatch) => {
    axios
      .delete(`${url}coupons`, {
        headers: {
          Authorization: token,
        },
        data: {
          couponIds: id,
        },
      })
      .then(() => {
        Cookies.remove('delete');
        showToaster(success, id?.length === 1 ? couponDelete : couponsDelete);
        dispatch(loader(false));
        dispatch(getCoupons(token) as unknown as AnyAction);
      })
      .catch(() => {
        console.warn('Something Went Wrong');
        Cookies.remove('delete');
        dispatch(loader(false));
        showToaster(errorr, errorMessage);
      });
  };
