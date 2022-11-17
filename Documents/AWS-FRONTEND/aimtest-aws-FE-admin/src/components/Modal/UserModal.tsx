import * as Yup from 'yup';
import Cookies from 'js-cookie';
import Select from 'react-select';
import { AnyAction } from 'redux';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, SetStateAction } from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ErrorMessage, Field, Form, Formik, FormikTouched } from 'formik';

import { RootState } from 'redux/store';
import styles from './index.module.css';
import className from 'classnames/bind';
import { propsCalling } from './ButtonModal';
import { loader } from 'redux/reducer/Loader';
import { SelectField } from 'components/Select/Select';
import { phoneRegExp } from 'components/Validation/Validation';
import { statusOptions } from 'components/Select/SelectOptions';
import { deleteUsers, postUser, putUser } from 'redux/action/User';

const UserModal = (props: modalType) => {
  const dispatch = useDispatch();
  const cx = className.bind(styles);

  const particularUserData = useSelector(
    (state: RootState) => state?.user?.particularUserData
  );
  const userRoleData = useSelector(
    (state: RootState) => state?.userRole?.userRoleData?.roles
  );
  const sectionData = useSelector(
    (state: RootState) => state?.section?.sectionData?.sections
  );
  const token = useSelector((state: RootState) => state?.login.loginData);

  const [errorMessage2, setErrorMessage2] = useState(false);
  const [editSectionValue, setEditSectionValue] = useState([]);
  const [intitialSection, setInitialSection] = useState<MultiSelectType[]>([]);
  const [selectedSection, setSelectedSection] = useState<MultiSelectType[]>([]);

  useEffect(() => {
    if (selectedSection?.length > 0) {
      setErrorMessage2(false);
    }
  }, [selectedSection?.length]);

  useEffect(() => {
    if (particularUserData && particularUserData.sections) {
      setEditSectionValue(particularUserData.sections);
    }
  }, [particularUserData]);

  useEffect(() => {
    setSelectedSection(
      filteredSectionValue as SetStateAction<MultiSelectType[]>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editSectionValue]);

  const messageBlurEffect = (check: string) => {
    if (check === 'section') {
      if (
        props.todo === 'create' &&
        (intitialSection?.length === 0 || selectedSection?.length === 0)
      ) {
        setErrorMessage2(true);
      }
      if (props.todo === 'edit' && selectedSection?.length === 0) {
        setErrorMessage2(true);
      }
    }
  };

  const submitButton = () => {
    if (props.todo === 'create') {
      if (intitialSection?.length === 0) {
        setErrorMessage2(true);
      }
    }
    if (props.todo === 'edit') {
      if (selectedSection?.length === 0) {
        setErrorMessage2(true);
      }
    }
    if (props.todo === 'delete') {
      Cookies.set('delete', 'true');
      dispatch(loader(true));
      props.onClose();
      props.todo === 'delete' && props.deleteType === 'global'
        ? (props.setPageNumber(props.pageNumber),
          dispatch(
            deleteUsers(props.deleteId as string, token) as unknown as AnyAction
          ))
        : props.todo === 'delete' &&
          (props.setPageNumber(props.pageNumber),
          dispatch(
            deleteUsers(props.deleteId as string, token) as unknown as AnyAction
          ));
    }
  };
  const closeButton = () => {
    setSelectedSection([]);
    setInitialSection([]);
    setErrorMessage2(false);
    props.onClose();
  };

  const initialValues: userInitialValue = {
    userName: props?.todo === 'edit' ? particularUserData?.userName : '',
    name: props?.todo === 'edit' ? particularUserData?.name : '',
    sections: [],
    role: {
      _id: props?.todo === 'edit' ? particularUserData?.role?._id : '',
      name: props?.todo === 'edit' ? particularUserData?.role?.name : '',
    },
    email: props?.todo === 'edit' ? particularUserData?.email : '',
    mobile: props?.todo === 'edit' ? particularUserData?.mobile : '',
    status:
      props?.todo === 'create'
        ? 'Activated'
        : particularUserData?.status === true
        ? 'Activated'
        : 'Deactivated',
  };

  const dataUserRole = userRoleData?.map((item: { name: string }) => {
    return { ...item, label: item.name, value: item.name };
  });
  const dataSection = sectionData?.map((item: { name: string }) => {
    return { ...item, label: item.name, value: item.name };
  });

  const filteredSectionValue = editSectionValue?.map(
    (item: { name: string }) => {
      return {
        ...item,
        label: item.name,
        value: item.name,
      };
    }
  );

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
      {(props.editId === particularUserData?._id ||
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
              initialValues={initialValues}
              validationSchema={Yup.object().shape({
                userName: Yup.string()
                  .required('Required')
                  .matches(
                    /^([a-zA-Z0-9_.-]+\s?)*$/,
                    'Special Characters , Multi Spaces , Blank Spaces Not Allowed Use Underscore'
                  )
                  .max(30, '30 Characters Allowed'),
                role: Yup.object().shape({
                  name: Yup.string().required('Required'),
                }),
                name: Yup.string()
                  .required('Required')
                  .max(30, '30 Characters Allowed'),
                email: Yup.string()
                  .email('Must Be Valid Email')
                  .required('Required'),
                mobile: Yup.string()
                  .required('Required')
                  .matches(phoneRegExp, 'Phone number is not valid')
                  .min(10, 'Must Be 10 Digits')
                  .max(10, 'Must Be 10 Digits'),
              })}
              onSubmit={(values, { resetForm }) => {
                values.name =
                  values.name?.charAt(0)?.toUpperCase() +
                  values.name?.slice(1)?.trim();
                values.name = values.name?.replace(/\s+/g, ' ')?.trim();
                const finalSectionValue = selectedSection.map((item) => {
                  return {
                    _id: item._id,
                    name: item.name,
                  };
                });
                values?.status === 'Activated'
                  ? (values.status = true as boolean)
                  : (values.status = false as boolean);
                values.sections = finalSectionValue as [];
                if (props.todo === 'delete' || values.sections?.length) {
                  resetForm();
                  dispatch(loader(true));
                  props.onClose();
                  props.todo === 'create' &&
                    dispatch(postUser(values, token) as unknown as AnyAction);
                  props.todo === 'edit' &&
                    dispatch(
                      putUser(
                        props.editId as string,
                        values,
                        token
                      ) as unknown as AnyAction
                    );
                  setInitialSection([]);
                  setSelectedSection([]);
                }
              }}
            >
              {({
                handleSubmit,
                values,
                setFieldTouched,
                setFieldValue,
                errors,
                touched,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Modal.Header>
                    <div className={cx('modal-close')}>
                      <div>
                        <Modal.Title id='contained-modal-title-vcenter'>
                          {propsCalling('Title', 'User', propsToSend)}
                        </Modal.Title>
                      </div>
                      <div onClick={closeButton}>
                        <FontAwesomeIcon
                          icon={faXmark}
                          className={cx('cross-icon')}
                        />
                      </div>
                    </div>
                  </Modal.Header>
                  {props.todo === 'delete' ? (
                    <Modal.Body>
                      <div className={cx('label-floating')}>
                        {propsCalling('Delete', 'User', propsToSend)}
                      </div>
                    </Modal.Body>
                  ) : (
                    <Modal.Body>
                      {props.editValue === 'single' ||
                      props.todo === 'create' ? (
                        <>
                          <Row>
                            <Col sm={6}>
                              <div className='my-2'>
                                <label className={cx('label-style')}>
                                  {' '}
                                  Select Userrole
                                </label>
                                <SelectField
                                  name='role.name'
                                  options={dataUserRole}
                                  value={values.role.name}
                                  placeholder='Select Userrole'
                                  onChange={(e) =>
                                    setFieldValue(
                                      'role',
                                      e &&
                                        (e as SelectType)?.label &&
                                        (e as SelectType)?.label?.length > 0
                                        ? {
                                            _id: (e as SelectType)._id,
                                            name: (e as SelectType).label,
                                          }
                                        : {
                                            _id: '',
                                            name: '',
                                          }
                                    )
                                  }
                                  onBlur={setFieldTouched}
                                  error={errors?.role?.name as string}
                                  touched={
                                    touched?.role
                                      ?.name as FormikTouched<boolean>
                                  }
                                />
                              </div>
                            </Col>
                            <Col sm={6}>
                              <div className='my-2'>
                                <label className={cx('label-style')}>
                                  {' '}
                                  Section Name
                                </label>

                                <Select
                                  placeholder='Section Name'
                                  name='sectionName'
                                  isClearable
                                  isMulti
                                  isSearchable={false}
                                  options={dataSection?.sort(
                                    (
                                      a: {
                                        label: string;
                                      },
                                      b: {
                                        label: string;
                                      }
                                    ) => a?.label?.localeCompare(b?.label)
                                  )}
                                  onChange={(e) => {
                                    if (e?.length > 0) {
                                      setErrorMessage2(false);
                                      setSelectedSection(
                                        e as MultiSelectType[]
                                      ),
                                        setInitialSection(
                                          e as MultiSelectType[]
                                        );
                                    } else if (e?.length === 0) {
                                      setSelectedSection([]);
                                      setInitialSection([]);
                                      setErrorMessage2(true);
                                    }
                                  }}
                                  value={
                                    props.todo === 'edit'
                                      ? selectedSection
                                      : intitialSection
                                  }
                                  onBlur={() => messageBlurEffect('section')}
                                />
                              </div>
                              {errorMessage2 && (
                                <p className={cx('error-message')}>Required</p>
                              )}
                            </Col>

                            <Col sm={6}>
                              <div className='my-2'>
                                <label className={cx('label-style')}>
                                  {' '}
                                  User Name
                                </label>
                                <Field
                                  className='form-control'
                                  type='text'
                                  name='userName'
                                  value={values.userName}
                                  autoComplete='off'
                                  placeholder='Username'
                                />
                              </div>
                              <div>
                                <ErrorMessage
                                  name='userName'
                                  component='p'
                                  className={cx('error-message')}
                                />
                              </div>
                            </Col>

                            <Col sm={6}>
                              <div className='my-2'>
                                <label className={cx('label-style')}>
                                  {' '}
                                  Name
                                </label>
                                <Field
                                  className='form-control'
                                  type='text'
                                  name='name'
                                  value={values.name}
                                  autoComplete='off'
                                  placeholder='Name'
                                />
                              </div>
                              <div>
                                <ErrorMessage
                                  name='name'
                                  component='p'
                                  className={cx('error-message')}
                                />
                              </div>
                            </Col>
                            <Col sm={6}>
                              <div className='my-2'>
                                <label className={cx('label-style')}>
                                  {' '}
                                  Email
                                </label>
                                <Field
                                  className='form-control'
                                  type='text'
                                  name='email'
                                  value={values.email}
                                  autoComplete='off'
                                  placeholder='Email'
                                />
                              </div>
                              <div>
                                <ErrorMessage
                                  name='email'
                                  component='p'
                                  className={cx('error-message')}
                                />
                              </div>
                            </Col>
                            <Col sm={6}>
                              <div className='my-2'>
                                <label className={cx('label-style')}>
                                  {' '}
                                  Mobile Number
                                </label>
                                <Field
                                  className='form-control'
                                  type='text'
                                  name='mobile'
                                  value={values.mobile}
                                  autoComplete='off'
                                  placeholder='Mobile Number'
                                />
                              </div>
                              <div>
                                <ErrorMessage
                                  name='mobile'
                                  component='p'
                                  className={cx('error-message')}
                                />
                              </div>
                            </Col>

                            <Col sm={12}>
                              <div>
                                <label className={cx('label-style')}>
                                  {' '}
                                  Status
                                </label>
                                <SelectField
                                  name='status'
                                  placeholder='Select Status'
                                  isSearchable={false}
                                  options={statusOptions}
                                  value={values.status as string}
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
                      <div>{propsCalling('Button2', 'User', propsToSend)}</div>
                    </Button>
                    {propsCalling('Button1', 'User', propsToSend)}
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
export default UserModal;








