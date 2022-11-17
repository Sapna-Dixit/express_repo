import * as Yup from 'yup';
import { AnyAction } from 'redux';
import { useRouter } from 'next/router';
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from 'react-google-places-autocomplete';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ErrorMessage, Field, Form, Formik, FormikErrors } from 'formik';

import {
  postSubFranchiseeData,
  putSubFranchiseeData,
} from 'redux/action/SubFranchisee';
import styles from './index.module.css';
import className from 'classnames/bind';
import { RootState } from 'redux/store';
import { loader } from 'redux/reducer/Loader';
import { Loader } from 'components/Loader/Loader';

const AddSubFranchisee = (props: {
  setAddSubFranchisee: (arg0: boolean) => void;
}) => {
  const router = useRouter();
  const query = router.query;
  const dispatch = useDispatch();
  const cx = className.bind(styles);

  const parentFranchisee = JSON.parse(
    localStorage.getItem('parentFranchisee') as string
  );

  const token = useSelector((state: RootState) => state?.login?.loginData);
  const load = useSelector((state: RootState) => state?.loader?.loader);

  const particularFranchiseeData = useSelector(
    (state: RootState) => state?.subFranchisee?.particularSubFranchiseeData
  );

  const [address, setAddress] = useState<valueType>();
  const [addressObj, setAddressObj] = useState<addressType>();

  const getAddressObject = (
    address_components: {
      long_name: string;
      short_name: string;
      types: string[];
    }[]
  ) => {
    const ShouldBeComponent: shouldBeComponentType = {
      city: ['administrative_area_level_2', 'locality', 'political'],
      state: ['administrative_area_level_1', 'political'],
      country: ['country'],
    };

    const address: addressType = {
      city: '',
      state: '',
      country: '',
    };
    address_components.forEach(
      (component: {
        types: string[] | number[];
        short_name: string;
        long_name: string;
      }) => {
        for (const shouldBe in ShouldBeComponent) {
          if (
            ShouldBeComponent[shouldBe as keyof shouldBeComponentType].indexOf(
              component.types[0] as string
            ) !== -1
          ) {
            address[shouldBe as keyof shouldBeComponentType] =
              component.long_name;
          }
        }
      }
    );
    return address;
  };

  useEffect(() => {
    const func = async () => {
      const geocodeObj =
        address &&
        (address as valueType).value &&
        (await geocodeByPlaceId((address as valueType)?.value.place_id));
      const addressObject =
        geocodeObj && getAddressObject(geocodeObj[0].address_components);
      setAddressObj(addressObject);
    };
    func();
  }, [address]);

  return (
    <>
      {(query?.editId === particularFranchiseeData?._id ||
        query?.editId === undefined) && (
        <div className={cx('flex-style')}>
          <Loader open={load} />
          <Formik
            initialValues={{
              name: query?.editId?.length ? particularFranchiseeData?.name : '',
              address: query?.editId?.length
                ? particularFranchiseeData?.address
                : {
                    label: '',
                    value: {
                      description: '',
                      place_id: '',
                    },
                  },
              city: query?.editId?.length ? particularFranchiseeData?.city : '',
              state: query?.editId?.length
                ? particularFranchiseeData?.state
                : '',
              country: query?.editId?.length
                ? particularFranchiseeData?.country
                : '',
              category: query?.editId?.length
                ? particularFranchiseeData?.category
                : '',
              actualAmount: query?.editId?.length
                ? particularFranchiseeData?.actualAmount
                : '',
              discountedAmount: query?.editId?.length
                ? particularFranchiseeData?.discountedAmount
                : '',
              creditedAmount: query?.editId?.length
                ? particularFranchiseeData?.creditedAmount
                : '',
              debitedAmount: query?.editId?.length
                ? particularFranchiseeData?.debitedAmount
                : '',
              noOfReport: query?.editId?.length
                ? particularFranchiseeData?.noOfReport
                : '',
              franchiseeProvider: {
                _id: query?.editId?.length
                  ? particularFranchiseeData?.franchiseeProvider?._id
                  : parentFranchisee?._id,
                name: query?.editId?.length
                  ? particularFranchiseeData?.franchiseeProvider?.name
                  : parentFranchisee?.name,
              },
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required('Required'),
              address: Yup.object().shape({
                label: Yup.string().required('Required'),
              }),
              category: Yup.string().required('Required'),
              actualAmount: Yup.number().required('Required'),
              discountedAmount: Yup.number().required('Required'),
              creditedAmount: Yup.number().required('Required'),
              noOfReport: Yup.number().required('Required'),
            })}
            onSubmit={(values) => {
              values.name = values?.name?.trim();
              values.debitedAmount =
                values.actualAmount -
                (values.discountedAmount + values.creditedAmount);
              if (addressObj !== undefined) {
                values.city = addressObj?.city;
                values.state = addressObj?.state;
                values.country = addressObj?.country;
              }
              dispatch(loader(true));
              query?.editId?.length
                ? dispatch(
                    putSubFranchiseeData(
                      query?.editId as string,
                      values,
                      token,
                      props.setAddSubFranchisee,
                      router
                    ) as unknown as AnyAction
                  )
                : dispatch(
                    postSubFranchiseeData(
                      values,
                      token,
                      props.setAddSubFranchisee,
                      router
                    ) as unknown as AnyAction
                  );
            }}
          >
            {({
              handleSubmit,
              values,
              errors,
              setFieldValue,
              resetForm,
              handleBlur,
            }) => (
              <Form onSubmit={handleSubmit}>
                <div>
                  <div className={cx('text-btn')}>
                    <div>
                      <div className='mt-2'>
                        <div className='franchisee-scroll-bread'>
                          <div>
                            <div className={cx('gap')}>
                              <h4>
                                <FontAwesomeIcon
                                  icon={faArrowLeft}
                                  className={cx('back-img mx-2')}
                                  onClick={() => {
                                    resetForm(),
                                      router.replace('/sub/franchisee'),
                                      props.setAddSubFranchisee(false);
                                  }}
                                />
                                {query?.editId && query?.editId?.length > 0
                                  ? 'Edit Sub Franchisee'
                                  : 'Add Sub Franchisee'}
                              </h4>
                            </div>
                            <div className='row'>
                              <div className='col-sm-12'>
                                <div className='row'>
                                  <div className='col'>
                                    <label className='label-style'>
                                      Name of Franchisee
                                    </label>
                                    <Field
                                      type='text'
                                      autoComplete='off'
                                      name='name'
                                      value={values.name}
                                      className={cx('form-control my-1')}
                                      placeholder='Name of Franchisee'
                                      spellCheck='false'
                                    />
                                    <ErrorMessage
                                      component='span'
                                      className='error-message'
                                      name='name'
                                    />
                                  </div>
                                  <div className='col'>
                                    <label className='label-style'>
                                      Address
                                    </label>
                                    <GooglePlacesAutocomplete
                                      apiKey='AIzaSyBYZ8y8XMESY-rrKXVXahIbNmOTnvsuIhM'
                                      selectProps={{
                                        name: 'address',
                                        placeholder: 'Enter Address',
                                        isClearable: true,
                                        value:
                                          values?.address?.label?.length > 0
                                            ? values?.address
                                            : '',
                                        onChange: (e) => {
                                          setAddress(e);
                                          setFieldValue(
                                            'address',
                                            e && e?.label && e?.label.length > 0
                                              ? {
                                                  label: e?.label,
                                                  value: {
                                                    description:
                                                      e?.value?.description,
                                                    place_id:
                                                      e?.value?.place_id,
                                                  },
                                                }
                                              : ''
                                          );
                                        },
                                        onBlur: () => {
                                          handleBlur({
                                            target: {
                                              name: 'address?.label',
                                            },
                                          });
                                        },
                                      }}
                                    />
                                    <div className='error-message my-2'>
                                      {
                                        (
                                          errors?.address as FormikErrors<{
                                            label: string;
                                          }>
                                        )?.label
                                      }
                                    </div>
                                  </div>
                                </div>
                                <div className='row'>
                                  <div className='col-sm-12'>
                                    <div className='row'>
                                      <div className='col'>
                                        <label className='label-style'>
                                          Category
                                        </label>
                                        <Field
                                          type='text'
                                          value={values.category}
                                          name='category'
                                          spellCheck='false'
                                          autoComplete='off'
                                          className={cx('form-control my-1')}
                                          placeholder='Category'
                                        />
                                        <ErrorMessage
                                          component='span'
                                          className='error-message'
                                          name='category'
                                        />
                                      </div>
                                      <div className='col'>
                                        <label className='label-style'>
                                          Number Of Report
                                        </label>
                                        <Field
                                          type='number'
                                          min='0'
                                          autoComplete='off'
                                          value={values.noOfReport}
                                          name='noOfReport'
                                          className={cx('form-control my-1')}
                                          placeholder='Per Report Cost'
                                        />
                                        <ErrorMessage
                                          component='span'
                                          className='error-message'
                                          name='noOfReport'
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className='row'>
                                  <div className='col-sm-12'>
                                    <div className='row'>
                                      <div className='col'>
                                        <label className='label-style'>
                                          Actual Amount
                                        </label>
                                        <Field
                                          type='number'
                                          min='0'
                                          value={values.actualAmount}
                                          name='actualAmount'
                                          autoComplete='off'
                                          className={cx('form-control my-1')}
                                          placeholder='Actual Amount'
                                        />
                                        <ErrorMessage
                                          component='span'
                                          className='error-message'
                                          name='actualAmount'
                                        />
                                      </div>
                                      <div className='col'>
                                        <label className='label-style'>
                                          Discounted Amount
                                        </label>
                                        <Field
                                          type='number'
                                          min='0'
                                          value={values.discountedAmount}
                                          name='discountedAmount'
                                          autoComplete='off'
                                          className={cx('form-control my-1')}
                                          placeholder='Discount Amount'
                                        />
                                        <ErrorMessage
                                          component='span'
                                          className='error-message'
                                          name='discountedAmount'
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className='row'>
                                  <div className='col-sm-12'>
                                    <div className='row'>
                                      <div className='col'>
                                        <label className='label-style'>
                                          Credited Amount
                                        </label>
                                        <Field
                                          type='number'
                                          min='0'
                                          value={values.creditedAmount}
                                          name='creditedAmount'
                                          autoComplete='off'
                                          className={cx('form-control my-1')}
                                          placeholder='Credit Amount'
                                        />
                                        <ErrorMessage
                                          component='span'
                                          className='error-message'
                                          name='creditedAmount'
                                        />
                                      </div>
                                      <div className='col'>
                                        <label className='label-style'>
                                          Debit Amount
                                        </label>
                                        <Field
                                          type='number'
                                          min='0'
                                          value={
                                            values.actualAmount -
                                            (values.discountedAmount +
                                              values.creditedAmount)
                                          }
                                          name='debitedAmount'
                                          disabled
                                          autoComplete='off'
                                          className={cx('form-control my-1')}
                                          placeholder='Debit Amount'
                                        />
                                        <ErrorMessage
                                          component='span'
                                          className='error-message'
                                          name='debitedAmount'
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className={cx('submit')}>
                                  <Button
                                    style={{
                                      marginRight: '8px',
                                    }}
                                    className='warn-btn'
                                    type='button'
                                    onClick={() => {
                                      resetForm(),
                                        router.replace('/sub/franchisee'),
                                        props.setAddSubFranchisee(false);
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    className={cx('sucess-btn')}
                                    type='submit'
                                  >
                                    Submit
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
};
export default AddSubFranchisee;
