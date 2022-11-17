import * as Yup from 'yup';
import moment from 'moment';
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

import styles from './index.module.css';
import className from 'classnames/bind';
import { RootState } from 'redux/store';
import {
  postStudentFranchiseeData,
  putStudentFranchiseeData,
} from 'redux/action/StudentFranchisee';
import { loader } from 'redux/reducer/Loader';
import { Loader } from 'components/Loader/Loader';
import { SelectField } from 'components/Select/Select';

const AddStudentFranchisee = (props: {
  setAddStudentFranchisee: (arg0: boolean) => void;
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

  const particularStudentFranchiseeData = useSelector(
    (state: RootState) =>
      state?.studentFranchisee?.particularStudentFranchiseeData
  );
  const classData = useSelector(
    (state: RootState) => state?.class?.classData?.classes
  );
  
  const [address, setAddress] = useState<valueType>();
  const [addressObj, setAddressObj] = useState<addressType>();

  const dataClass = classData?.map((item: { name: string }) => {
    return { ...item, label: item?.name, value: item?.name };
  });

  const disablePastDate = (date: string | null) => {
    return date === null || date === '' ? moment().format('YYYY-MM-DD') : date;
  };

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
      {(query?.editId === particularStudentFranchiseeData?._id ||
        query?.editId === undefined) && (
        <div className={cx('flex-style')}>
          <Loader open={load} />
          <Formik
            enableReinitialize={true}
            initialValues={{
              name: query?.editId?.length
                ? particularStudentFranchiseeData?.name
                : '',
              parentsName: query?.editId?.length
                ? particularStudentFranchiseeData?.parentsName
                : '',
              address: query?.editId?.length
                ? particularStudentFranchiseeData?.address
                : {
                    label: '',
                    value: {
                      description: '',
                      place_id: '',
                    },
                  },
              city: query?.editId?.length
                ? particularStudentFranchiseeData?.city
                : '',
              state: query?.editId?.length
                ? particularStudentFranchiseeData?.state
                : '',
              country: query?.editId?.length
                ? particularStudentFranchiseeData?.country
                : '',
              class: {
                _id: query?.editId?.length
                  ? particularStudentFranchiseeData?.class?._id
                  : '',
                name: query?.editId?.length
                  ? particularStudentFranchiseeData?.class?.name
                  : '',
              },
              actualAmount: query?.editId?.length
                ? particularStudentFranchiseeData?.actualAmount
                : '',
              discountedAmount: query?.editId?.length
                ? particularStudentFranchiseeData?.discountedAmount
                : '',
              creditedAmount: query?.editId?.length
                ? particularStudentFranchiseeData?.creditedAmount
                : '',
              debitedAmount: query?.editId?.length
                ? particularStudentFranchiseeData?.debitedAmount
                : '',
              phoneNumber: query?.editId?.length
                ? particularStudentFranchiseeData?.phoneNumber
                : '',
              fees: query?.editId?.length
                ? particularStudentFranchiseeData?.fees
                : '',
              dateOfExam: query?.editId?.length
                ? particularStudentFranchiseeData?.dateOfExam?.substring(0, 10)
                : '',
              attempt: query?.editId?.length
                ? particularStudentFranchiseeData?.attempt
                : '',
              franchiseeProvider: {
                _id: query?.editId?.length
                  ? particularStudentFranchiseeData?.franchiseeProvider?._id
                  : parentFranchisee?._id,
                name: query?.editId?.length
                  ? particularStudentFranchiseeData?.franchiseeProvider?.name
                  : parentFranchisee?.name,
              },
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required('Required'),
              address: Yup.object().shape({
                label: Yup.string().required('Required'),
              }),
              parentsName: Yup.string().required('Required'),
              class: Yup.object().shape({
                name: Yup.string().required('Required'),
              }),
              actualAmount: Yup.number().required('Required'),
              discountedAmount: Yup.number().required('Required'),
              creditedAmount: Yup.number().required('Required'),
              phoneNumber: Yup.number().required('Required'),
              fees: Yup.number().required('Required'),
              dateOfExam: Yup.string().required('Required'),
              attempt: Yup.number().required('Required'),
            })}
            onSubmit={(values) => {
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
                    putStudentFranchiseeData(
                      query?.editId as string,
                      values,
                      token,
                      props.setAddStudentFranchisee,
                      router
                    ) as unknown as AnyAction
                  )
                : dispatch(
                    postStudentFranchiseeData(
                      values,
                      token,
                      props.setAddStudentFranchisee,
                      router
                    ) as unknown as AnyAction
                  );
            }}
          >
            {({
              handleSubmit,
              values,
              setFieldValue,
              errors,
              touched,
              setFieldTouched,
              resetForm,
              handleBlur,
            }) => (
              <Form onSubmit={handleSubmit}>
                <div>
                  <div className={cx('text-btn')}>
                    <div className={cx('franchisee-scroll-bread')}>
                      <div className={cx('')}>
                        <div>
                          <div className={cx('')}>
                            <div className={cx('gap')}>
                              <h4>
                                <FontAwesomeIcon
                                  icon={faArrowLeft}
                                  className={cx('back-img')}
                                  onClick={() => {
                                    resetForm(),
                                      router.replace('/sub/franchisee'),
                                      props.setAddStudentFranchisee(false);
                                  }}
                                />
                                Add Student
                              </h4>
                            </div>
                            <div className='row'>
                              <div className='col-sm-12'>
                                <div className='row'>
                                  <div className='col'>
                                    <label className='label-style'>
                                      Name of Student
                                    </label>
                                    <Field
                                      type='text'
                                      autoComplete='off'
                                      name='name'
                                      value={values.name}
                                      className={cx('form-control my-1')}
                                      placeholder='Name of Student'
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
                                      Parents Name
                                    </label>
                                    <div>
                                      <Field
                                        type='text'
                                        autoComplete='off'
                                        name='parentsName'
                                        value={values.parentsName}
                                        className={cx('form-control my-1')}
                                        placeholder='Parents Name'
                                        spellCheck='false'
                                      />
                                      <ErrorMessage
                                        component='span'
                                        className='error-message'
                                        name='parentsName'
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className='row'>
                                  <div className='col-sm-12'>
                                    <div className='row'>
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
                                            value: values?.address?.label
                                              ?.length
                                              ? values?.address
                                              : values?.address?.label,
                                            onChange: (e) => {
                                              setAddress(e);
                                              setFieldValue(
                                                'address',
                                                e &&
                                                  e?.label &&
                                                  e?.label.length > 0
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
                                      <div className='col '>
                                        <label className='label-style'>
                                          Class
                                        </label>
                                        <SelectField
                                          name='class.name'
                                          options={dataClass}
                                          value={values?.class?.name}
                                          onChange={(e) =>
                                            setFieldValue(
                                              `class`,
                                              e &&
                                                (e as SelectType)?.label &&
                                                (e as SelectType).label
                                                  ?.length > 0
                                                ? {
                                                    _id: (e as SelectType)._id,
                                                    name: (e as SelectType)
                                                      .label,
                                                  }
                                                : {
                                                    _id: '',
                                                    name: '',
                                                  }
                                            )
                                          }
                                          placeholder='Select Class'
                                          onBlur={setFieldTouched}
                                          error={errors?.class?.name as string}
                                          touched={
                                            touched?.class?.name as boolean
                                          }
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
                                          Phone Number
                                        </label>
                                        <div>
                                          <Field
                                            type='number'
                                            min='0'
                                            value={values.phoneNumber}
                                            autoComplete='off'
                                            name='phoneNumber'
                                            spellCheck='false'
                                            className={cx('form-control my-1')}
                                            placeholder='Phone Number'
                                          />
                                          <ErrorMessage
                                            component='span'
                                            className='error-message'
                                            name='phoneNumber'
                                          />
                                        </div>
                                      </div>
                                      <div className='col'>
                                        <label className='label-style'>
                                          Fees
                                        </label>
                                        <Field
                                          type='text'
                                          value={values.fees}
                                          name='fees'
                                          spellCheck='false'
                                          autoComplete='off'
                                          className={cx('form-control my-1')}
                                          placeholder='Fees'
                                        />
                                        <ErrorMessage
                                          component='span'
                                          className='error-message'
                                          name='fees'
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
                                          Date Of Exam
                                        </label>
                                        <Field
                                          type='date'
                                          value={values.dateOfExam}
                                          min={disablePastDate(
                                            values.dateOfExam
                                          )}
                                          name='dateOfExam'
                                          autoComplete='off'
                                          className={cx('form-control my-1')}
                                          placeholder='Date Of Exam'
                                        />
                                        <ErrorMessage
                                          component='span'
                                          className='error-message'
                                          name='dateOfExam'
                                        />
                                      </div>
                                      <div className='col'>
                                        <label className='label-style'>
                                          Attempt
                                        </label>
                                        <Field
                                          type='number'
                                          min='0'
                                          autoComplete='off'
                                          value={values.attempt}
                                          name='attempt'
                                          className={cx('form-control my-1')}
                                          placeholder='Attempt'
                                        />
                                        <ErrorMessage
                                          component='span'
                                          className='error-message'
                                          name='attempt'
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
                                        props.setAddStudentFranchisee(false);
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
export default AddStudentFranchisee;
