import * as Yup from 'yup';
import { AnyAction } from 'redux';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ErrorMessage, Form, Formik, FormikTouched } from 'formik';

import { RootState } from 'redux/store';
import styles from './index.module.css';
import className from 'classnames/bind';
import {
  partCounseling,
  statusOptions,
  percentageCounseling,
} from 'components/Select/SelectOptions';
import { loader } from 'redux/reducer/Loader';
import TextEditor from 'components/Editor/Editor';
import { Loader } from 'components/Loader/Loader';
import { SelectField } from 'components/Select/Select';
import { classList } from 'components/MemoryTest/GetClassList';
import RestoreLevelModal from 'components/Modal/RestoreLevelModal';
import { putCounselingData, postCounselingData } from 'redux/action/Counseling';

const AddCounseling = (props: {
  setAddCounseling: (arg0: boolean) => void;
}) => {
  const router = useRouter();
  const query = router.query;
  const dispatch = useDispatch();
  const cx = className.bind(styles);

  const classData = useSelector(
    (state: RootState) => state?.class?.classData?.classes
  );
  const elementData = useSelector(
    (state: RootState) => state?.element?.elementData?.elements
  );
  const load = useSelector((state: RootState) => state?.loader?.loader);
  const particularCounselingData = useSelector(
    (state: RootState) => state?.counseling?.particularCounselingData
  );
  const restore = useSelector((state: RootState) => state?.restore?.restoreId);

  const token = useSelector((state: RootState) => state?.login?.loginData);

  const [restoreLevel, setRestoreLevel] = useState(false);

  useEffect(() => {
    if (restore?.length > 0) {
      setRestoreLevel(true);
    }
  }, [dispatch, restore]);

  const dataClass = classData?.map((item: { name: string }) => {
    return { ...item, label: item?.name, value: item?.name };
  });

  const dataElement = elementData?.map((item: { name: string }) => {
    return { ...item, label: item?.name, value: item?.name };
  });

  const initialValues: counselingType = {
    class: {
      _id: query?.editId?.length ? particularCounselingData?.class?._id : '',
      name: query?.editId?.length ? particularCounselingData?.class?.name : '',
    },
    element: {
      _id: query?.editId?.length ? particularCounselingData?.element?._id : '',
      name: query?.editId?.length
        ? particularCounselingData?.element?.name
        : '',
    },
    status: query?.editId?.length ? particularCounselingData?.status : true,
    percentage: query?.editId?.length
      ? particularCounselingData?.percentage
      : '',
    part: query?.editId?.length ? particularCounselingData?.part : '',
    english: query?.editId?.length ? particularCounselingData?.english : '',
    hindi: query?.editId?.length ? particularCounselingData?.hindi : '',
  };

  return (
    <>
      {(query?.editId === particularCounselingData?._id ||
        query?.editId === undefined) && (
        <div className={cx('flex-style')}>
          <div className={cx('parent-section')}>
            <Loader open={load} />
            <div className={cx('text-btn')}>
              <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={Yup.object().shape({
                  class: Yup.object().shape({
                    name: Yup.string().required('Required'),
                  }),
                  element: Yup.object().shape({
                    name: Yup.string().required('Required'),
                  }),
                  status: Yup.string().required('Required'),
                  percentage: Yup.string().required('Required'),
                  part: Yup.string().required('Required'),
                  english: Yup.string().required('Required'),
                })}
                onSubmit={(values) => {
                  dispatch(loader(true));
                  query?.editId?.length
                    ? dispatch(
                        putCounselingData(
                          query?.editId as string,
                          values,
                          token,
                          props.setAddCounseling,
                          router
                        ) as unknown as AnyAction
                      )
                    : dispatch(
                        postCounselingData(
                          values,
                          token,
                          props.setAddCounseling,
                          router
                        ) as unknown as AnyAction
                      );
                }}
              >
                {({
                  values,
                  handleSubmit,
                  setFieldTouched,
                  setFieldValue,
                  touched,
                  errors,
                  resetForm,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <RestoreLevelModal
                      title='Restore Counseling'
                      modalName='Counseling'
                      restoreId={restore}
                      navigate={props.setAddCounseling}
                      resetForm={resetForm}
                      content='Counseling Exist But Soft Deleted. Do You Want To Restore The Data'
                      show={restoreLevel}
                      onClose={() => setRestoreLevel(false)}
                    />
                    <div
                      className={cx('animate__animated animate__slideInRight')}
                    >
                      <div className={cx('card')}>
                        <div className={cx('add-scroll')}>
                          <div className={cx('card-table')}>
                            <div>
                              <div className={cx('card-flex')}>
                                <FontAwesomeIcon
                                  icon={faArrowLeft}
                                  className={cx('back-img')}
                                  onClick={() => {
                                    resetForm(),
                                      router.replace('/counseling'),
                                      props.setAddCounseling(false);
                                  }}
                                />
                                <h4>
                                  {' '}
                                  {query?.editId && query?.editId?.length > 0
                                    ? 'Edit Counseling'
                                    : 'Add Counseling'}
                                </h4>
                              </div>
                            </div>
                            <div>
                              <Row className={cx('mb-2')}>
                                <Col sm={6}>
                                  <h6 className={cx('label-style')}>Class</h6>
                                  <SelectField
                                    name='class.name'
                                    options={classList(dataClass)}
                                    placeholder='Select Class'
                                    value={values?.class?.name as string}
                                    onChange={(e) =>
                                      setFieldValue(
                                        'class',
                                        e &&
                                          (e as SelectType)?.label &&
                                          (e as SelectType)?.label?.length > 0
                                          ? {
                                              _id: (e as SelectType)?._id,
                                              name: (e as SelectType)?.label,
                                            }
                                          : {
                                              _id: '',
                                              name: '',
                                            }
                                      )
                                    }
                                    onBlur={setFieldTouched}
                                    error={
                                      (
                                        errors?.class as unknown as {
                                          name: string;
                                        }
                                      )?.name
                                    }
                                    touched={
                                      (
                                        touched?.class as unknown as {
                                          name: boolean;
                                        }
                                      )?.name as FormikTouched<boolean>
                                    }
                                  />
                                </Col>{' '}
                                <Col sm={6}>
                                  <h6 className={cx('label-style')}>Element</h6>
                                  <SelectField
                                    name='element'
                                    options={dataElement?.sort(
                                      (
                                        a: { name: string },
                                        b: { name: string }
                                      ) => a?.name?.localeCompare(b.name)
                                    )}
                                    placeholder='Select Element'
                                    value={values?.element?.name as string}
                                    onChange={(e) =>
                                      setFieldValue(
                                        'element',
                                        e &&
                                          (e as SelectType)?.label &&
                                          (e as SelectType)?.label?.length > 0
                                          ? {
                                              _id: (e as SelectType)?._id,
                                              name: (e as SelectType)?.label,
                                            }
                                          : {
                                              _id: '',
                                              name: '',
                                            }
                                      )
                                    }
                                    onBlur={setFieldTouched}
                                    error={
                                      (
                                        errors?.element as unknown as {
                                          name: string;
                                        }
                                      )?.name
                                    }
                                    touched={
                                      (
                                        touched?.element as unknown as {
                                          name: boolean;
                                        }
                                      )?.name as FormikTouched<boolean>
                                    }
                                  />
                                </Col>{' '}
                                <Col sm={4}>
                                  <h6 className={cx('label-style')}>
                                    Percentage
                                  </h6>
                                  <SelectField
                                    name='percentage'
                                    options={percentageCounseling}
                                    placeholder='Select Percentage'
                                    value={values?.percentage as string}
                                    onChange={(e) =>
                                      setFieldValue(
                                        'percentage',
                                        e &&
                                          (e as SelectType)?.label &&
                                          (e as SelectType)?.label?.length > 0
                                          ? (e as SelectType)?.label
                                          : ''
                                      )
                                    }
                                    onBlur={setFieldTouched}
                                    error={errors?.percentage as string}
                                    touched={
                                      touched?.percentage as FormikTouched<boolean>
                                    }
                                  />
                                </Col>{' '}
                                <Col sm={4}>
                                  <h6 className={cx('label-style')}>Part</h6>
                                  <SelectField
                                    name='part'
                                    options={partCounseling}
                                    placeholder='Select Part'
                                    value={values?.part as string}
                                    onChange={(e) =>
                                      setFieldValue(
                                        'part',
                                        e &&
                                          (e as SelectType)?.label &&
                                          (e as SelectType)?.label?.length > 0
                                          ? (e as SelectType)?.label
                                          : ''
                                      )
                                    }
                                    onBlur={setFieldTouched}
                                    error={errors?.part as string}
                                    touched={
                                      touched?.part as FormikTouched<boolean>
                                    }
                                  />
                                </Col>{' '}
                                <Col sm={4}>
                                  <div>
                                    <h6 className={cx('label-style')}>
                                      {' '}
                                      Status{' '}
                                    </h6>
                                    <SelectField
                                      name='status'
                                      options={statusOptions}
                                      value={
                                        (values?.status + '')?.toLowerCase() ==
                                        'true'
                                          ? 'Activated'
                                          : 'Deactivated'
                                      }
                                      isClearable={false}
                                      isSearchable={false}
                                      placeholder='Status'
                                      onChange={(e) =>
                                        setFieldValue(
                                          'status',
                                          e &&
                                            (e as SelectType)?.label &&
                                            (e as SelectType)?.label?.length > 0
                                            ? (e as SelectType)?.label ===
                                              'Activated'
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
                              <Row className={cx('mb-2')}>
                                <Col sm={12}>
                                  <h6 className={cx('label-style')}>
                                    Counseling Description In English
                                  </h6>
                                  <div>
                                    <TextEditor
                                      name='english'
                                      cookiesValue='packageDescription'
                                      placeholder='Enter Description In English'
                                      todo='create'
                                      editorValue={values?.english}
                                      onChange={setFieldValue}
                                    />
                                  </div>
                                  <ErrorMessage
                                    name='english'
                                    component='span'
                                    className='error-message'
                                  />
                                </Col>
                              </Row>
                              <Row className={cx('mb-2')}>
                                <Col sm={12}>
                                  <h6 className={cx('label-style')}>
                                    Counseling Description In Hindi
                                  </h6>
                                  <div>
                                    <TextEditor
                                      name='hindi'
                                      cookiesValue='packageDescription'
                                      placeholder='Enter Description In Hindi'
                                      todo='create'
                                      editorValue={values?.hindi}
                                      onChange={setFieldValue}
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
                                        router.replace('/counseling'),
                                        props.setAddCounseling(false);
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    className={cx('modalsave-btn')}
                                    type='submit'
                                  >
                                    Save
                                  </Button>
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
          </div>
        </div>
      )}
    </>
  );
};
export default AddCounseling;
