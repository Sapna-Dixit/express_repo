import * as Yup from 'yup';
import moment from 'moment';
import { AnyAction } from 'redux';
import { useRouter } from 'next/router';
import { RootState } from 'redux/store';
import { Button, Col, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faGear } from '@fortawesome/free-solid-svg-icons';
import { ErrorMessage, Field, Form, Formik, FormikTouched } from 'formik';

import styles from './index.module.css';
import className from 'classnames/bind';
import { loader } from 'redux/reducer/Loader';
import { Loader } from 'components/Loader/Loader';
import { SelectField } from 'components/Select/Select';
import { statusOptions } from 'components/Select/SelectOptions';
import { postCouponData, putCouponData } from 'redux/action/Coupon';

const AddCoupon = (props: { setAddCoupon: (arg0: boolean) => void }) => {
  const router = useRouter();
  const query = router.query;
  const dispatch = useDispatch();
  const cx = className.bind(styles);

  const particularCouponData = useSelector(
    (state: RootState) => state?.coupon?.particularCouponData
  );

  const load = useSelector((state: RootState) => state?.loader?.loader);
  const token = useSelector((state: RootState) => state?.login?.loginData);

  const generateCoupon = (
    number: number,
    setFieldValue: {
      (
        field: string,
        value: string,
        shouldValidate?: boolean | undefined
      ): void;
      (arg0: string, arg1: string): void;
    }
  ) => {
    const codes = Array(number)
      .fill(0)
      .map(() => 'AIMQT' + Math.floor(Math.random() * 99999999))
      .join(',')
      .split(',');
    setFieldValue('couponCode', codes as unknown as string);
  };

  const disablePastDate = (date: string | null) => {
    return date === null || date === '' ? moment().format('YYYY-MM-DD') : date;
  };

  return (
    <>
      {(query?.editId === particularCouponData?._id ||
        query?.editId === undefined) && (
        <div
          className={cx(
            'animate__animated animate__slideInRight parent-section'
          )}
        >
          <Loader open={load} />
          <div className={cx('card')}>
            <div className={cx('add-scroll')}>
              <Formik
                enableReinitialize={true}
                initialValues={{
                  organizationName: query?.editId?.length
                    ? particularCouponData?.organizationName
                    : '',
                  amount: query?.editId?.length
                    ? particularCouponData?.amount
                    : '',
                  couponCode: query?.editId?.length
                    ? particularCouponData?.couponCode
                    : [],
                  noOfCoupon: query?.editId?.length
                    ? particularCouponData?.noOfCoupon
                    : '',
                  userPerStudent: query?.editId?.length
                    ? particularCouponData?.userPerStudent
                    : '',
                  startDate: query?.editId?.length
                    ? particularCouponData?.startDate?.substring(0, 10)
                    : '',
                  endDate: query?.editId?.length
                    ? particularCouponData?.endDate?.substring(0, 10)
                    : '',
                  status: query?.editId?.length
                    ? particularCouponData?.status
                    : true,
                  generateCoupon: query?.editId?.length
                    ? particularCouponData?.couponCode?.length > 0 && true
                    : false,
                }}
                validationSchema={Yup.object().shape({
                  endDate: Yup.date().required('Required'),
                  status: Yup.string().required('Required'),
                  amount: Yup.number().required('Required'),
                  startDate: Yup.date().required('Required'),
                  noOfCoupon: Yup.number().required('Required'),
                  userPerStudent: Yup.number().required('Required'),
                  organizationName: Yup.string().required('Required'),
                  generateCoupon: Yup.bool().oneOf([true], 'Generate Coupon'),
                })}
                onSubmit={(values) => {
                  values.organizationName =
                    values.organizationName?.charAt(0)?.toUpperCase() +
                    values.organizationName?.slice(1)?.trim();
                  values.organizationName = values.organizationName
                    ?.replace(/\s+/g, ' ')
                    ?.trim();
                  const postData = JSON.parse(JSON.stringify(values));
                  delete postData?.generateCoupon;
                  dispatch(loader(true));
                  query?.editId?.length
                    ? dispatch(
                        putCouponData(
                          query?.editId as string,
                          postData,
                          token,
                          props.setAddCoupon,
                          router
                        ) as unknown as AnyAction
                      )
                    : dispatch(
                        postCouponData(
                          postData,
                          token,
                          props.setAddCoupon,
                          router
                        ) as unknown as AnyAction
                      );
                }}
              >
                {({
                  values,
                  handleSubmit,
                  errors,
                  touched,
                  setFieldValue,
                  setFieldTouched,
                  resetForm,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <div className={cx('card-table')}>
                      <div>
                        <div className={cx('card-flex')}>
                          <FontAwesomeIcon
                            icon={faArrowLeft}
                            className={cx('back-img')}
                            onClick={() => {
                              resetForm(),
                                props.setAddCoupon(false),
                                router.replace('/coupon');
                            }}
                          />
                          <h4>
                            {query?.editId && query?.editId?.length > 0
                              ? 'Edit Coupon'
                              : 'Add Coupon'}
                          </h4>
                        </div>
                      </div>

                      <Row>
                        <Col sm={12}>
                          <div>
                            <h6 className={cx('label-style')}>
                              Name of Coupon
                            </h6>
                            <Field
                              type='text'
                              className='form-control'
                              value={values?.organizationName}
                              placeholder='Enter Coupon Name'
                              name='organizationName'
                              autoComplete='off'
                            />
                            <ErrorMessage
                              component='span'
                              className='error-message'
                              name='organizationName'
                            />
                          </div>
                        </Col>
                        <div className='col-lg-6 '>
                          <div>
                            <h6 className={cx('label-style')}>Coupon Amount</h6>
                            <Field
                              type='number'
                              min='1'
                              value={values?.amount}
                              name='amount'
                              autoComplete='off'
                              className='form-control'
                              placeholder='Coupon Amount'
                            />
                            <ErrorMessage
                              component='span'
                              className='error-message'
                              name='amount'
                            />
                          </div>
                        </div>
                        <div className='col'>
                          <div>
                            <h6 className={cx('label-style')}>No. of Coupon</h6>
                            <Field
                              type='number'
                              min='1'
                              value={values?.noOfCoupon}
                              onChange={(e: { target: { value: number } }) => {
                                setFieldValue(
                                  `noOfCoupon`,
                                  Number(e.target.value)
                                );
                                Number(e.target.value) === 0 &&
                                  setFieldValue(`couponCode`, []);
                                setFieldValue(`generateCoupon`, false);
                              }}
                              name='noOfCoupon'
                              autoComplete='off'
                              className='form-control'
                              placeholder='No Of Coupon'
                            />
                            <ErrorMessage
                              component='span'
                              className='error-message'
                              name='noOfCoupon'
                            />
                          </div>
                        </div>
                        <div className='col-auto'>
                          <h6 className={cx('text-white py-0')}>upan</h6>

                          <div className='con'>
                            <div className='con-tooltip top'>
                              <div
                                className={cx('edit-icon')}
                                style={{
                                  marginTop: '13px',
                                }}
                                onClick={() => {
                                  values?.noOfCoupon > 0 &&
                                    generateCoupon(
                                      values?.noOfCoupon as number,
                                      setFieldValue
                                    ),
                                    values?.noOfCoupon > 0 &&
                                      setFieldValue(`generateCoupon`, true);
                                }}
                              >
                                <FontAwesomeIcon icon={faGear} />
                                <div className='tooltip'>
                                  <p>
                                    Generate <br /> Coupon
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <ErrorMessage
                            component='span'
                            className='error-message'
                            name='generateCoupon'
                          />
                        </div>
                      </Row>

                      {values.couponCode?.length > 0 && (
                        <div className='border rounded p-2 my-4'>
                          <h4>Genrated Coupon</h4>
                          <div
                            className={cx(
                              values.couponCode?.length > 14 && 'coupan-scroll'
                            )}
                          >
                            <Row className=' mb-3 mx-0'>
                              {values.couponCode?.map(
                                (item: string, index: number) => (
                                  <Col sm={4} key={index} className='mb-3'>
                                    <input
                                      type='text'
                                      className='form-control'
                                      placeholder={item}
                                      disabled
                                    />
                                  </Col>
                                )
                              )}
                            </Row>
                          </div>
                        </div>
                      )}

                      <Row>
                        <Col sm={6}>
                          <div className='my-2'>
                            <h6 className={cx('label-style')}>Start Date</h6>
                            <input
                              type='Date'
                              name='startDate'
                              min={
                                query?.editId?.length
                                  ? disablePastDate(
                                      particularCouponData?.startDate?.substring(
                                        0,
                                        10
                                      )
                                    )
                                  : disablePastDate('')
                              }
                              className={cx('form-control my-1')}
                              onKeyDown={(e) => e.preventDefault()}
                              placeholder='Passage ID if any'
                              value={values?.startDate}
                              onChange={(e: { target: { value: string } }) => {
                                e.target.value?.length === 0 &&
                                  setFieldValue('endDate', '');
                                setFieldValue('startDate', e.target.value);
                              }}
                            />
                            <ErrorMessage
                              component='span'
                              className='error-message'
                              name='startDate'
                            />
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div className='my-2'>
                            <h6 className={cx('label-style')}>End Date</h6>
                            <Field
                              type='Date'
                              name='endDate'
                              min={disablePastDate(values?.startDate)}
                              disabled={
                                values.startDate?.length > 0 ? false : true
                              }
                              onKeyDown={(e: { preventDefault: () => void }) =>
                                e.preventDefault()
                              }
                              className={cx('form-control my-1')}
                              placeholder='Passage ID if any'
                              value={values?.endDate}
                            />
                            <ErrorMessage
                              component='span'
                              className='error-message'
                              name='endDate'
                            />
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div className='my-2'>
                            <h6 className={cx('label-style')}>
                              Use Per Student
                            </h6>
                            <Field
                              type='number'
                              min='0'
                              value={values?.userPerStudent}
                              name='userPerStudent'
                              className='form-control'
                              placeholder='Use Per Student'
                            />
                            <ErrorMessage
                              component='span'
                              className='error-message'
                              name='userPerStudent'
                            />
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div className='my-2'>
                            <h6 className={cx('label-style')}>Status</h6>
                            <SelectField
                              name='status'
                              options={statusOptions}
                              value={
                                (values?.status + '')?.toLowerCase() == 'true'
                                  ? 'Activated'
                                  : 'Deactivated'
                              }
                              isClearable={false}
                              placeholder='Status'
                              isSearchable={false}
                              onChange={(e) =>
                                setFieldValue(
                                  'status',
                                  e &&
                                    (e as SelectType)?.label &&
                                    (e as SelectType)?.label?.length > 0
                                    ? (e as SelectType)?.label === 'Activated'
                                      ? true
                                      : false
                                    : ''
                                )
                              }
                              onBlur={setFieldTouched}
                              error={errors?.status as string}
                              touched={
                                touched?.status as FormikTouched<boolean>
                              }
                            />
                          </div>
                        </Col>
                      </Row>
                      <div>
                        <div className={cx('save')}>
                          <Button
                            style={{
                              marginRight: '8px',
                            }}
                            className={cx('close-btn')}
                            type='button'
                            onClick={() => {
                              resetForm(),
                                router.replace('/coupon'),
                                props.setAddCoupon(false);
                            }}
                          >
                            Cancel
                          </Button>
                          <Button className={cx('modalsave-btn')} type='submit'>
                            Save
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddCoupon;
