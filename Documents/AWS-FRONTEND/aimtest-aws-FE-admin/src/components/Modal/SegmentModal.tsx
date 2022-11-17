import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { AnyAction } from 'redux';
import className from 'classnames/bind';
import { MouseEventHandler } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  deleteSegments,
  postSegmentData,
  putSegmentData,
} from 'redux/action/Segment';
import styles from './index.module.css';
import { RootState } from 'redux/store';
import { propsCalling } from './ButtonModal';
import { loader } from 'redux/reducer/Loader';

const SegmentModal = (props: modalType) => {
  const dispatch = useDispatch();
  const cx = className.bind(styles);

  const token = useSelector((state: RootState) => state?.login.loginData);
  const particularSegmentData = useSelector(
    (state: RootState) => state?.segment?.particularSegmentData
  );

  const submitButton = () => {
    props.todo === 'delete' && dispatch(loader(true));
    if (props.todo === 'delete') {
      Cookies.set('delete', 'true');
      props.todo === 'delete' && props.deleteType === 'global'
        ? (props.setPageNumber(props.pageNumber),
          dispatch(
            deleteSegments(
              props.deleteId as string,
              token
            ) as unknown as AnyAction
          ),
          props.onClose())
        : props.todo === 'delete' &&
          (props.setPageNumber(props.pageNumber),
          dispatch(
            deleteSegments(
              props.deleteId as string,
              token
            ) as unknown as AnyAction
          ),
          props.onClose());
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
      {(props.editId === particularSegmentData?._id ||
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
                    : particularSegmentData &&
                      (particularSegmentData?.name as string),
              }}
              validationSchema={Yup.object().shape({
                name: Yup.string()
                  .required('Required')
                  .max(50, '50 Characters Allowed'),
              })}
              onSubmit={(values, { resetForm }) => {
                values.name =
                  values.name?.charAt(0)?.toUpperCase() +
                  values.name?.slice(1)?.trim();
                resetForm();
                dispatch(loader(true));
                props.onClose();
                props.todo === 'create' &&
                  dispatch(
                    postSegmentData(values, token) as unknown as AnyAction
                  );
                props.todo === 'edit' &&
                  dispatch(
                    putSegmentData(
                      props.editId as string,
                      values,
                      token
                    ) as unknown as AnyAction
                  );
              }}
            >
              {({ handleSubmit, values }) => (
                <Form onSubmit={handleSubmit}>
                  <Modal.Header>
                    <div className={cx('modal-close')}>
                      <div>
                        <Modal.Title id='contained-modal-title-vcenter'>
                          {propsCalling('Title', 'Segment', propsToSend)}
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
                        {propsCalling('Delete', 'Segment', propsToSend)}
                      </div>
                    </Modal.Body>
                  ) : (
                    <Modal.Body>
                      {props.editValue === 'single' ||
                      props.todo === 'create' ? (
                        <>
                          <label className={cx('label-style')}>
                            {' '}
                            Segment Name
                          </label>
                          <div>
                            <Field
                              className='form-control my-1'
                              type='text'
                              name='name'
                              value={values.name}
                              autoComplete='off'
                              placeholder='Group Name'
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
                        {propsCalling('Button2', 'Segment', propsToSend)}
                      </div>
                    </Button>
                    {propsCalling('Button1', 'Segment', propsToSend)}
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
export default SegmentModal;
