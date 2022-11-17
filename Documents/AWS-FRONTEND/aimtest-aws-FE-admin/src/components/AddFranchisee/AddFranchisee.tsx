import * as Yup from 'yup';
import Link from 'next/link';
import { AnyAction } from 'redux';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from 'react-google-places-autocomplete';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ErrorMessage, Field, Form, Formik, FormikErrors } from 'formik';

import { RootState } from 'redux/store';
import styles from './index.module.css';
import className from 'classnames/bind';
import { loader } from 'redux/reducer/Loader';
import { Loader } from 'components/Loader/Loader';
import { postFranchiseeData, putFranchiseeData } from 'redux/action/Franchisee';

const AddFranchisee = (props: {
  setAddFranchisee: (arg0: boolean) => void;
}) => {
  const router = useRouter();
  const query = router.query;
  const dispatch = useDispatch();
  const cx = className.bind(styles);

  const [address, setAddress] = useState<valueType>();
  const [addressObj, setAddressObj] = useState<addressType>();

  const token = useSelector((state: RootState) => state?.login?.loginData);
  const load = useSelector((state: RootState) => state?.loader?.loader);

  const particularFranchiseeData = useSelector(
    (state: RootState) => state?.franchisee?.particularFranchiseeData
  );

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
              noOfSubFranchisee: query?.editId?.length
                ? particularFranchiseeData?.noOfSubFranchisee
                : '',
              perReportCost: query?.editId?.length
                ? particularFranchiseeData?.perReportCost
                : '',
              noOfReport: query?.editId?.length
                ? particularFranchiseeData?.noOfReport
                : '',
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
              noOfSubFranchisee: Yup.number().required('Required'),
              perReportCost: Yup.number().required('Required'),
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
                    putFranchiseeData(
                      query?.editId as string,
                      values,
                      token,
                      props.setAddFranchisee,
                      router
                    ) as unknown as AnyAction
                  )
                : dispatch(
                    postFranchiseeData(
                      values,
                      token,
                      props.setAddFranchisee,
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
              handleBlur,
              resetForm,
            }) => (
              <Form onSubmit={handleSubmit}>
                <div className={cx('parent-section')}>
                  <div className={cx('text-btn')}>
                    <div>
                      <div className={cx('card')}>
                        <div className={cx('franchisee-scroll')}>
                          <div className={cx('card-table')}>
                            <div className={cx('gap')}>
                              <h4>
                                <Link href='/franchisee'>
                                  <FontAwesomeIcon
                                    icon={faArrowLeft}
                                    className={cx('back-img mx-2')}
                                    onClick={() => {
                                      resetForm(),
                                        router.replace('/franchisee'),
                                        props.setAddFranchisee(false);
                                    }}
                                  />
                                </Link>
                                {query?.editId && query?.editId?.length > 0
                                  ? 'Edit Franchisee'
                                  : 'Add Franchisee'}
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
                                      spellCheck='false'
                                      value={values.name}
                                      className={cx('form-control my-1')}
                                      placeholder='Name of Franchisee'
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
                                        value: values?.address?.label?.length
                                          ? values?.address
                                          : values?.address?.label,
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
                                    <div className='error-message my-1'>
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
                                          Number of Sub Franchisee
                                        </label>
                                        <Field
                                          type='number'
                                          min='0'
                                          autoComplete='off'
                                          value={values.noOfSubFranchisee}
                                          name='noOfSubFranchisee'
                                          className={cx('form-control my-1')}
                                          placeholder='Number of Sub Franchisee'
                                        />
                                        <ErrorMessage
                                          component='span'
                                          className='error-message'
                                          name='noOfSubFranchisee'
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className='row'>
                                  <div className='col-sm-12'>
                                    <div className='row'>
                                      <div className='col-6'>
                                        <label className='label-style'>
                                          Number of Report
                                        </label>
                                        <Field
                                          type='number'
                                          min='0'
                                          autoComplete='off'
                                          value={values.noOfReport}
                                          name='noOfReport'
                                          className={cx('form-control my-1')}
                                          placeholder='Number of Report'
                                        />
                                        <ErrorMessage
                                          component='span'
                                          className='error-message'
                                          name='noOfReport'
                                        />
                                      </div>
                                      <div className='col'>
                                        <label className='label-style'>
                                          Per Report Cost
                                        </label>
                                        <Field
                                          type='number'
                                          min='0'
                                          autoComplete='off'
                                          value={values.perReportCost}
                                          name='perReportCost'
                                          className={cx('form-control my-1')}
                                          placeholder='Per Report Cost'
                                        />
                                        <ErrorMessage
                                          component='span'
                                          className='error-message'
                                          name='perReportCost'
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
                                      resetForm();
                                      router.replace('/franchisee'),
                                        props.setAddFranchisee(false);
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
export default AddFranchisee;
