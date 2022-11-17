import * as Yup from 'yup';
import Cookies from 'js-cookie';
import Select from 'react-select';
import { AnyAction } from 'redux';
import Modal from 'react-bootstrap/Modal';
import { MouseEventHandler } from 'react';
import Button from 'react-bootstrap/Button';
import { ErrorMessage, Form, Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  putUserRole,
  postUserRole,
  deleteUserRoles,
} from 'redux/action/UserRole';
import { RootState } from 'redux/store';
import styles from './index.module.css';
import className from 'classnames/bind';
import { propsCalling } from './ButtonModal';
import { loader } from 'redux/reducer/Loader';

const UserRoleModal = (props: modalType) => {
  const dispatch = useDispatch();
  const cx = className.bind(styles);

  const token = useSelector((state: RootState) => state?.login?.loginData);
  const particularUserRole = useSelector(
    (state: RootState) => state?.userRole?.particularUserRoleData
  );

  const userRoles = [
    {
      label: 'SuperAdmin',
      value: 'SuperAdmin',
      role: 1,
    },
    {
      label: 'Admin',
      value: 'Admin',
      role: 2,
    },
    {
      label: 'Student',
      value: 'Student',
      role: 3,
    },
  ];

  const submitButton = () => {
    if (props.todo === 'delete') {
      Cookies.set('delete', 'true');
      dispatch(loader(true));
      props.onClose();
      props.todo === 'delete' && props.deleteType === 'global'
        ? (props.setPageNumber(props.pageNumber),
          dispatch(
            deleteUserRoles(
              props.deleteId as string,
              token
            ) as unknown as AnyAction
          ))
        : props.todo === 'delete' &&
          (props.setPageNumber(props.pageNumber),
          dispatch(
            deleteUserRoles(
              props.deleteId as string,
              token
            ) as unknown as AnyAction
          ));
    }
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
      {(props.editId === particularUserRole?._id ||
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
              initialValues={{
                name:
                  props.todo === 'create'
                    ? ''
                    : particularUserRole &&
                      (particularUserRole?.name as string),
                role:
                  props.todo === 'create'
                    ? ''
                    : particularUserRole &&
                      (particularUserRole?.role as string),
              }}
              validationSchema={Yup.object().shape({
                name: Yup.string()
                  .required('Required')
                  .max(30, '30 Characters Allowed'),
              })}
              onSubmit={(values, { resetForm }) => {
                values.name =
                  values.name?.charAt(0)?.toUpperCase() +
                  values.name?.slice(1)?.trim();
                values.name = values.name?.replace(/\s+/g, ' ')?.trim();
                resetForm();
                dispatch(loader(true));
                props.onClose();
                props.todo === 'create' &&
                  dispatch(postUserRole(values, token) as unknown as AnyAction);
                props.todo === 'edit' &&
                  dispatch(
                    putUserRole(
                      props.editId as string,
                      values,
                      token
                    ) as unknown as AnyAction
                  );
              }}
            >
              {({ handleSubmit, values, handleBlur, setFieldValue }) => (
                <Form onSubmit={handleSubmit}>
                  <Modal.Header>
                    <div className={cx('modal-close')}>
                      <div>
                        <Modal.Title id='contained-modal-title-vcenter'>
                          {propsCalling('Title', 'Userrole', propsToSend)}
                        </Modal.Title>
                      </div>
                      <div
                        onClick={
                          props.onClose as MouseEventHandler<HTMLDivElement>
                        }
                      >
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
                        {propsCalling('Delete', 'Userrole', propsToSend)}
                      </div>
                    </Modal.Body>
                  ) : (
                    <Modal.Body>
                      {props.editValue === 'single' ||
                      props.todo === 'create' ? (
                        <>
                          <div>
                            <label className={cx('label-style')}>
                              {' '}
                              Role Name
                            </label>
                            <Select
                              name='name'
                              options={userRoles}
                              value={{
                                label: values.name?.length
                                  ? values.name
                                  : 'Select Role',
                              }}
                              onChange={(e) => {
                                setFieldValue(
                                  'name',
                                  e &&
                                    (e as SelectType)?.label &&
                                    (e as SelectType)?.label?.length > 0
                                    ? (e as SelectType)?.label
                                    : ''
                                ),
                                  setFieldValue(
                                    'role',
                                    e &&
                                      (e as SelectType)?.label &&
                                      (e as SelectType)?.label?.length > 0
                                      ? (e as unknown as { role: string })?.role
                                      : ''
                                  );
                              }}
                              isClearable
                              placeholder='Role Name'
                              onBlur={() =>
                                handleBlur({ target: { name: 'name' } })
                              }
                            />
                          </div>
                          <div>
                            <ErrorMessage
                              name='name'
                              component='span'
                              className={cx('error-message')}
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
                    <Button className={cx('close-btn')} onClick={props.onClose}>
                      <div>
                        {propsCalling('Button2', 'Userrole', propsToSend)}
                      </div>
                    </Button>
                    {propsCalling('Button1', 'Userrole', propsToSend)}
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
export default UserRoleModal;
