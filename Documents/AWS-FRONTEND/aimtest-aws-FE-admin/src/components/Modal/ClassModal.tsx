import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { AnyAction } from 'redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ErrorMessage, Field, Form, Formik, FormikTouched } from 'formik';

import { RootState } from 'redux/store';
import styles from './index.module.css';
import className from 'classnames/bind';
import { propsCalling } from './ButtonModal';
import { loader } from 'redux/reducer/Loader';
import { SelectField } from 'components/Select/Select';
import { classOptions } from 'components/Select/SelectOptions';
import { deleteClasses, postClassData, putClassData } from 'redux/action/Class';

const ClassModal = (props: modalType) => {
  const dispatch = useDispatch();
  const cx = className.bind(styles);

  const token = useSelector((state: RootState) => state?.login?.loginData);

  const [otherClass, setOtherClass] = useState(false);

  const submitButton = () => {
    if (props.todo === 'delete') {
      props.onClose();
      Cookies.set('delete', 'true');
      dispatch(loader(true));
      props?.todo === 'delete' && props?.deleteType === 'global'
        ? (props.setPageNumber(props.pageNumber),
          dispatch(
            deleteClasses(
              props.deleteId as string,
              token
            ) as unknown as AnyAction
          ))
        : props.todo === 'delete' &&
          (props.setPageNumber(props.pageNumber),
          dispatch(
            deleteClasses(
              props.deleteId as string,
              token
            ) as unknown as AnyAction
          ));
    }
  };

  const closeButton = () => {
    props.onClose();
    setOtherClass(false);
  };

  const propsToSend = {
    todo: props.todo,
    deleteCount: props.deleteCount as number,
    deleteValue: props.deleteValue,
    deleteType: props.deleteType as string,
    editValue: props.editValue,
    submitButton: submitButton,
  };
  let editOptionData;
  editOptionData = classOptions?.filter(
    (item) => item.label === props.editData?.label
  );
  return (
    <>
      <Modal
        show={props.show}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <div>
          <Formik
            initialValues={{
              name:
                props.todo === 'create'
                  ? ''
                  : editOptionData?.length === 0
                  ? 'Other'
                  : props?.editData?.label,
              otherName:
                props.todo === 'create'
                  ? ''
                  : editOptionData?.length === 0
                  ? props?.editData?.label
                  : '',
            }}
            validationSchema={
              otherClass === true
                ? Yup.object().shape({
                    otherName: Yup.string()
                      .required('Required')
                      .max(25, '25 Characters Allowed'),
                  })
                : Yup.object().shape({
                    name: Yup.string().required('Required'),
                  })
            }
            onSubmit={(values, { resetForm }) => {
              if (
                (otherClass && values.otherName?.length) ||
                (props.todo === 'edit' &&
                  values.otherName?.length &&
                  values.name === 'Other')
              ) {
                values.name =
                  values.otherName?.charAt(0)?.toUpperCase() +
                  values.otherName?.slice(1)?.trim();
                values.name = values.name?.replace(/\s+/g, ' ')?.trim();
              }
              const postData = JSON.parse(JSON.stringify(values));
              delete postData.otherName;
              resetForm();
              dispatch(loader(true));
              props.onClose();
              props.todo === 'create' &&
                dispatch(
                  postClassData(postData, token) as unknown as AnyAction
                );
              props.todo === 'edit' &&
                dispatch(
                  putClassData(
                    props.editId as string,
                    postData,
                    token
                  ) as unknown as AnyAction
                );
              setOtherClass(false);
            }}
          >
            {({
              values,
              handleSubmit,
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
                        {propsCalling('Title', 'Class', propsToSend)}
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
                      {propsCalling('Delete', 'Class', propsToSend)}
                    </div>
                  </Modal.Body>
                ) : (
                  <Modal.Body>
                    {props.editValue === 'single' || props.todo === 'create' ? (
                      <>
                        <div className={cx(' mb-0')}>
                          <label className={cx('label-style')}>
                            Enter Class Name
                          </label>
                          <SelectField
                            name='name'
                            options={classOptions}
                            value={values.name as string}
                            onChange={(e) => {
                              (e as SelectType).label === 'Other'
                                ? (setOtherClass(true), (editOptionData = []))
                                : (setOtherClass(false),
                                  (editOptionData = ['allow edit'])),
                                setFieldValue(
                                  'name',
                                  e &&
                                    (e as SelectType)?.label &&
                                    (e as SelectType).label?.length > 0
                                    ? (e as SelectType).label
                                    : ''
                                );
                            }}
                            placeholder='Select Name'
                            onBlur={setFieldTouched}
                            error={errors?.name as string}
                            touched={touched?.name as FormikTouched<boolean>}
                          />
                        </div>
                        {(otherClass ||
                          (props.todo === 'edit' &&
                            editOptionData?.length === 0)) && (
                          <div>
                            <Field
                              className={cx('form-control mt-3')}
                              type='text'
                              name='otherName'
                              value={values.otherName}
                              autoComplete='off'
                              placeholder='Enter Class Name'
                            />
                            <ErrorMessage
                              className='error-message'
                              name='otherName'
                              component='p'
                            />
                          </div>
                        )}
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
                    <div>{propsCalling('Button2', 'Class', propsToSend)}</div>
                  </Button>
                  {propsCalling('Button1', 'Class', propsToSend)}
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </>
  );
};
export default ClassModal;
