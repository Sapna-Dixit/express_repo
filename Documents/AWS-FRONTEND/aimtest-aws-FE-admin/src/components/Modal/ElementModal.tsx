import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { AnyAction } from 'redux';
import className from 'classnames/bind';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ErrorMessage, Field, Form, Formik, FormikTouched } from 'formik';

import {
  deleteElements,
  postElementData,
  putElementData,
} from 'redux/action/Element';
import { RootState } from 'redux/store';
import styles from './index.module.css';
import { propsCalling } from './ButtonModal';
import { loader } from 'redux/reducer/Loader';
import { SelectField } from 'components/Select/Select';

const ElementModal = (props: modalType) => {
  const dispatch = useDispatch();
  const cx = className.bind(styles);

  const particularElementData = useSelector(
    (state: RootState) => state?.element?.particularElementData
  );
  const token = useSelector((state: RootState) => state?.login?.loginData);

  const sectionData = useSelector(
    (state: RootState) => state?.section?.sectionData?.sections
  );

  const dataSection = sectionData?.map((item: { name: string }) => {
    return { ...item, label: item.name, value: item.name };
  });

  const submitButton = () => {
    if (props.todo === 'delete') {
      props.onClose();
      Cookies.set('delete', 'true');
      dispatch(loader(true));
      props?.todo === 'delete' && props?.deleteType === 'global'
        ? (props.setPageNumber(props.pageNumber),
          dispatch(
            deleteElements(
              props.deleteId as string,
              token
            ) as unknown as AnyAction
          ))
        : props.todo === 'delete' &&
          (props.setPageNumber(props.pageNumber),
          dispatch(
            deleteElements(
              props.deleteId as string,
              token
            ) as unknown as AnyAction
          ));
    }
  };

  const closeButton = () => {
    props.onClose();
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
      {(props.editId === particularElementData?._id ||
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
                    : particularElementData &&
                      (particularElementData?.name as string),
                section: {
                  _id:
                    props.todo === 'create'
                      ? ''
                      : particularElementData?.section?._id,
                  name:
                    props.todo === 'create'
                      ? ''
                      : particularElementData?.section?.name,
                },
                displayInReport:
                  props.todo === 'create'
                    ? true
                    : particularElementData?.displayInReport,
              }}
              validationSchema={Yup.object().shape({
                name: Yup.string()
                  .required('Required')
                  .max(50, '50 Characters Allowed'),
                section: Yup.object().shape({
                  name: Yup.string().required('Required'),
                }),
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
                  dispatch(
                    postElementData(values, token) as unknown as AnyAction
                  );
                props.todo === 'edit' &&
                  dispatch(
                    putElementData(
                      props.editId as string,
                      values,
                      token
                    ) as unknown as AnyAction
                  );
              }}
            >
              {({
                handleSubmit,
                handleChange,
                values,
                setFieldTouched,
                setFieldValue,
                touched,
                errors,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Modal.Header>
                    <div className={cx('modal-close')}>
                      <div>
                        <Modal.Title id='contained-modal-title-vcenter'>
                          {propsCalling('Title', 'Element', propsToSend)}
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
                        {propsCalling('Delete', 'Element', propsToSend)}
                      </div>
                    </Modal.Body>
                  ) : (
                    <Modal.Body>
                      {props.editValue === 'single' ||
                      props.todo === 'create' ? (
                        <>
                          <div>
                            <label className={cx('label-style')}>
                              Element Name
                            </label>

                            <Field
                              className='form-control my-1'
                              type='text'
                              name='name'
                              value={values?.name}
                              autoComplete='off'
                              placeholder='Element Name'
                            />
                          </div>
                          <div>
                            <ErrorMessage
                              name='name'
                              component='span'
                              className={cx('error-message')}
                            />
                          </div>
                          <div>
                            <label className={cx('label-style')}>
                              Section Name
                            </label>

                            <SelectField
                              name='section.name'
                              options={dataSection?.sort(
                                (a: { name: string }, b: { name: string }) =>
                                  a?.name?.localeCompare(b.name)
                              )}
                              placeholder='Select Section'
                              value={values?.section?.name}
                              onChange={(e) =>
                                setFieldValue(
                                  'section',
                                  e &&
                                    (e as SelectType)?.label &&
                                    (e as SelectType).label?.length > 0
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
                              error={errors?.section?.name as string}
                              touched={
                                touched?.section?.name as FormikTouched<boolean>
                              }
                            />
                          </div>
                          <div className='mt-3 d-flex gap-3 align-items-center'>
                            <label className='form-check-label custom-label'>
                              Display In Report
                            </label>
                            <div className='form-check form-switch form-switch-lg'>
                              <input
                                name='displayInReport'
                                className='form-check-input'
                                type='checkbox'
                                id='flexSwitchCheckChecked'
                                checked={values.displayInReport}
                                onChange={handleChange}
                              />
                            </div>
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
                        {propsCalling('Button2', 'Element', propsToSend)}
                      </div>
                    </Button>
                    {propsCalling('Button1', 'Element', propsToSend)}
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
export default ElementModal;
