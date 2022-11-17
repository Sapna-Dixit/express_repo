import * as Yup from 'yup';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { AnyAction } from 'redux';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { useState, ChangeEvent, useEffect } from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ErrorMessage, Field, Form, Formik, FormikTouched } from 'formik';

import {
  deletePackages,
  postPackageData,
  putPackageData,
} from 'redux/action/Package';
import { RootState } from 'redux/store';
import styles from './index.module.css';
import className from 'classnames/bind';
import uploadImg from 'Images/images.png';
import { propsCalling } from './ButtonModal';
import { loader } from 'redux/reducer/Loader';
import TextEditor from 'components/Editor/Editor';
import { SelectField } from 'components/Select/Select';
import { packageType, statusOptions } from 'components/Select/SelectOptions';

const PackageModal = (props: modalType) => {
  const dispatch = useDispatch();
  const cx = className.bind(styles);

  const particularPackageData = useSelector(
    (state: RootState) => state?.package?.particularPackageData
  );
  const token = useSelector((state: RootState) => state?.login?.loginData);

  const [picture, setPicture] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [hide, setHide] = useState(true);
  const [inputField, setInputField] = useState(true);

  useEffect(() => {
    setInputField(true);
  }, [picture?.length]);

  useEffect(() => {
    if (
      particularPackageData &&
      particularPackageData?.logo &&
      props.todo === 'edit'
    ) {
      particularPackageData?.type === 'Free' && setHide(false);
      setLogoFile(particularPackageData?.logo);
      setPicture(particularPackageData?.logo);
    }
  }, [particularPackageData, props.todo]);

  const submitButton = () => {
    if (props.todo === 'delete') {
      Cookies.set('delete', 'true');
      props.onClose();
      dispatch(loader(true));
      props.todo === 'delete' && props.deleteType === 'global'
        ? (props.setPageNumber(props.pageNumber),
          dispatch(
            deletePackages(
              props.deleteId as string,
              token
            ) as unknown as AnyAction
          ))
        : props.todo === 'delete' &&
          (props.setPageNumber(props.pageNumber),
          dispatch(
            deletePackages(
              props.deleteId as string,
              token
            ) as unknown as AnyAction
          ));
    }
  };

  const closeButton = () => {
    setLogoFile(null);
    setHide(true);
    props.onClose();
    setPicture('');
    Cookies.remove('packageDescription');
  };

  const imageOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e?.target.files && e?.target.files?.length > 0) {
      setLogoFile(e.target.files[0]);
      file2Base64(e.target.files[0]).then((img: string) => {
        setPicture(img);
      });
    }
  };
  const file2Base64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result?.toString() || '');
      reader.onerror = (error) => reject(error);
    });
  };

  const intialValues: packageDataType = {
    name:
      props?.todo === 'create'
        ? ''
        : particularPackageData && (particularPackageData?.name as string),
    type: props?.todo === 'create' ? '' : particularPackageData?.type,
    amount:
      props?.todo === 'create'
        ? ''
        : particularPackageData && (particularPackageData?.amount as string),
    attemptCount:
      props.todo === 'create'
        ? ''
        : particularPackageData &&
          (particularPackageData?.attemptCount as string),
    discountAmount:
      props?.todo === 'create'
        ? ''
        : particularPackageData &&
          (particularPackageData?.discountAmount as string),
    logo: '',
    days:
      props?.todo === 'create'
        ? ''
        : particularPackageData && particularPackageData?.days,
    description: '',
    status:
      props?.todo === 'create'
        ? 'Activated'
        : particularPackageData?.status === true
        ? 'Activated'
        : 'Deactivated',
  };

  const RemoveLogo = () => {
    setInputField(false);
    setPicture('');
    setLogoFile(null);
  };

  const propsToSend = {
    todo: props.todo,
    deleteCount: props.deleteCount as number,
    deleteValue: props.deleteValue,
    deleteType: props.deleteType as string,
    editValue: props.editValue,
    submitButton: submitButton,
  };

  return (
    <>
      {(props.editId === particularPackageData?._id ||
        props.todo === 'create' ||
        props.todo === 'delete') && (
        <Modal
          show={props.show}
          size='lg'
          aria-labelledby='contained-modal-title-vcenter'
          centered
        >
          <div>
            <Formik
              enableReinitialize={true}
              initialValues={intialValues}
              validationSchema={
                hide
                  ? Yup.object().shape({
                      name: Yup.string()
                        .required('Required')
                        .max(30, '30 Characters Allowed'),
                      type: Yup.string().required('Required'),
                      status: Yup.string().required('Required'),
                      amount: Yup.string().required('Required'),
                      discountAmount: Yup.string().required('Required'),
                      attemptCount: Yup.string().required('Required'),
                      days: Yup.number().required('Required'),
                    })
                  : Yup.object().shape({
                      name: Yup.string()
                        .required('Required')
                        .max(30, '30 Characters Allowed'),
                      days: Yup.number().required('Required'),
                      attemptCount: Yup.string().required('Required'),
                    })
              }
              onSubmit={(values, { resetForm }) => {
                values.name =
                  values.name?.charAt(0)?.toUpperCase() +
                  values.name?.slice(1)?.trim();
                values.name = values.name?.replace(/\s+/g, ' ')?.trim();
                if (values.type === 'Free') {
                  (values.amount = 0), (values.discountAmount = 0);
                }
                values?.status === 'Activated'
                  ? (values.status = true)
                  : (values.status = false);
                const formData = new FormData();
                formData.append('name', values.name);
                formData.append('type', values.type);
                formData.append('amount', values.amount as string);
                formData.append(
                  'discountAmount',
                  values.discountAmount as string
                );
                formData.append(
                  'attemptCount',
                  values.attemptCount as unknown as string
                );
                formData.append('logo', logoFile || values.logo);
                formData.append('days', values.days as unknown as string);
                formData.append('description', values.description);
                formData.append('status', values.status as unknown as string);
                dispatch(loader(true));
                props.todo === 'create' &&
                  dispatch(
                    postPackageData(values, token) as unknown as AnyAction
                  );
                props.todo === 'edit' &&
                  dispatch(
                    putPackageData(
                      props.editId as string,
                      values,
                      token
                    ) as unknown as AnyAction
                  );
                setHide(true);
                setPicture('');
                setLogoFile(null);
                resetForm();
                props.onClose();
                Cookies.remove('packageDescription');
              }}
            >
              {({
                handleSubmit,
                values,
                setFieldValue,
                touched,
                errors,
                setFieldTouched,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Modal.Header>
                    <div className={cx('modal-close')}>
                      <div>
                        <Modal.Title id='contained-modal-title-vcenter'>
                          {propsCalling('Title', 'Package', propsToSend)}
                        </Modal.Title>
                      </div>
                      <div onClick={() => closeButton()}>
                        <FontAwesomeIcon
                          icon={faXmark}
                          className={cx('cross-icon')}
                        />
                      </div>
                    </div>
                  </Modal.Header>
                  {props?.todo === 'delete' ? (
                    <Modal.Body>
                      <div className={cx('label-floating')}>
                        {propsCalling('Delete', 'Package', propsToSend)}
                      </div>
                    </Modal.Body>
                  ) : (
                    <Modal.Body className={cx('modal-height')}>
                      {props?.editValue === 'single' ||
                      props?.todo === 'create' ? (
                        <>
                          <Row>
                            <Col sm={6}>
                              <div>
                                <label className={cx('label-style')}>
                                  {' '}
                                  Package Name
                                </label>

                                <Field
                                  className={cx('form-control my-1')}
                                  type='text'
                                  name='name'
                                  value={values.name}
                                  autoComplete='off'
                                  placeholder='Package Name'
                                />
                              </div>
                              <div>
                                <ErrorMessage
                                  name='name'
                                  component='span'
                                  className={cx('error-message')}
                                />
                              </div>
                            </Col>
                            <Col sm={6}>
                              <div>
                                <div>
                                  <label className={cx('label-style')}>
                                    {' '}
                                    Package Type
                                  </label>

                                  <SelectField
                                    name='type'
                                    options={packageType}
                                    value={values.type}
                                    isSearchable={false}
                                    onChange={(e) => {
                                      setFieldValue(
                                        'type',
                                        e &&
                                          (e as SelectType)?.label &&
                                          (e as SelectType)?.label?.length > 0
                                          ? (e as SelectType).label
                                          : ''
                                      );
                                      if ((e as SelectType)?.label === 'Free') {
                                        setHide(false);
                                      } else {
                                        setHide(true);
                                      }
                                    }}
                                    placeholder='Select Package Type'
                                    onBlur={setFieldTouched}
                                    error={errors?.type as string}
                                    touched={
                                      touched?.type as FormikTouched<boolean>
                                    }
                                  />
                                </div>
                              </div>
                            </Col>
                            {hide && (
                              <>
                                <Col sm={6}>
                                  <div>
                                    <label className={cx('label-style')}>
                                      {' '}
                                      Package Ammount
                                    </label>

                                    <Field
                                      className={cx('form-control my-1')}
                                      type='number'
                                      name='amount'
                                      min='0'
                                      value={values.amount}
                                      autoComplete='off'
                                      placeholder='Package Amount'
                                    />
                                  </div>

                                  <div>
                                    <ErrorMessage
                                      name='amount'
                                      component='span'
                                      className={cx('error-message')}
                                    />
                                  </div>
                                </Col>

                                <Col sm={6}>
                                  <div>
                                    <label className={cx('label-style')}>
                                      {' '}
                                      Package Discount
                                    </label>

                                    <Field
                                      className={cx('form-control my-1')}
                                      type='number'
                                      name='discountAmount'
                                      min='0'
                                      value={values.discountAmount}
                                      autoComplete='off'
                                      placeholder='Package Discount'
                                    />
                                  </div>
                                  <div>
                                    <ErrorMessage
                                      name='discountAmount'
                                      component='span'
                                      className={cx('error-message')}
                                    />
                                  </div>
                                </Col>
                              </>
                            )}
                            <Col sm={6}>
                              <div>
                                <div>
                                  <label className={cx('label-style')}>
                                    Expiry Days (0 for unlimited)
                                  </label>

                                  <Field
                                    className={cx('form-control my-1')}
                                    type='number'
                                    name='days'
                                    min='0'
                                    value={values.days}
                                    autoComplete='off'
                                    placeholder='Expiry Days (0 for unlimited)'
                                  />
                                  <div>
                                    <ErrorMessage
                                      name='days'
                                      component='span'
                                      className={cx('error-message')}
                                    />
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col sm={6}>
                              <div>
                                <label className={cx('label-style')}>
                                  Attempt Count{' '}
                                </label>
                                <Field
                                  className={cx('form-control my-1')}
                                  type='number'
                                  min='0'
                                  name='attemptCount'
                                  value={values.attemptCount}
                                  autoComplete='off'
                                  placeholder='Attempt Count'
                                />
                              </div>
                              <div>
                                <ErrorMessage
                                  name='attemptCount'
                                  component='span'
                                  className={cx('error-message')}
                                />
                              </div>
                            </Col>
                            <Col sm={12}>
                              <div className='mt-1'>
                                <label className={cx('label-style')}>
                                  Status{' '}
                                </label>

                                <SelectField
                                  name='status'
                                  options={statusOptions}
                                  value={values.status as string}
                                  placeholder='Select Status'
                                  isSearchable={false}
                                  onChange={(e) =>
                                    setFieldValue(
                                      'status',
                                      e &&
                                        (e as SelectType)?.label &&
                                        (e as SelectType)?.label?.length > 0
                                        ? (e as SelectType).label
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
                          {hide && (
                            <div className={cx('modal-flex')}>
                              <div className={cx('field-size')}></div>
                              <div className={cx('field-size')}></div>
                            </div>
                          )}
                          <div className='mt-2'>
                            <label className={cx('label-style')}>
                              Package Image{' '}
                            </label>
                            <label
                              htmlFor='main-file'
                              className={cx('upload-btn')}
                            >
                              {
                                <div className='image-uppar'>
                                  {picture && picture?.length && (
                                    <Button
                                      className={cx('button-image-removee')}
                                      onClick={() => RemoveLogo()}
                                    >
                                      <FontAwesomeIcon
                                        icon={faXmark}
                                        className={cx('image-delete')}
                                        title='Remove Image'
                                      />
                                    </Button>
                                  )}
                                  <Image
                                    src={picture ? picture : uploadImg}
                                    className={cx('img-upload')}
                                    alt='logo'
                                    height={picture && '150px'}
                                    width={picture && '200px'}
                                  />
                                </div>
                              }
                              {inputField && (
                                <>
                                  {!picture && (
                                    <p>
                                      Drag your documents, photos, or <br />
                                      videos here to start uploading.{' '}
                                    </p>
                                  )}
                                  <input
                                    type='file'
                                    id='main-file'
                                    name='logo'
                                    className={cx('d-none')}
                                    onChange={(
                                      event: ChangeEvent<HTMLInputElement>
                                    ): void => {
                                      if (!!event.currentTarget?.files?.[0]) {
                                        setFieldValue(
                                          'file',
                                          event.currentTarget?.files[0]
                                        );
                                      }
                                      imageOnChange(event);
                                    }}
                                  />
                                </>
                              )}
                            </label>
                          </div>
                          <div>
                            <label className={cx('label-style')}>
                              Package Description{' '}
                            </label>
                            <TextEditor
                              name='description'
                              cookiesValue='packageDescription'
                              placeholder='Enter Package Description'
                              todo={props.todo === 'edit' ? 'edit' : 'create'}
                              editorValue={values.description}
                              onChange={setFieldValue}
                            />
                          </div>
                        </>
                      ) : props.editValue === 'multiple' ? (
                        <h6>Can Not Edit Multiple Records</h6>
                      ) : props.editValue === 'zero' ? (
                        <h6>Select Record To Edit</h6>
                      ) : (
                        props.editValue === 'incorrect' && (
                          <h6>Action Forbidden</h6>
                        )
                      )}
                    </Modal.Body>
                  )}
                  <Modal.Footer>
                    <Button
                      className={cx('close-btn')}
                      onClick={() => closeButton()}
                    >
                      <div>
                        {propsCalling('Button2', 'Package', propsToSend)}
                      </div>
                    </Button>
                    {propsCalling('Button1', 'Package', propsToSend)}
                  </Modal.Footer>
                </Form>
              )}
            </Formik>
          </div>
        </Modal>
      )}
    </>
  );
};
export default PackageModal;
