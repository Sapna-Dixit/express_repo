import * as Yup from 'yup';
import { AnyAction } from 'redux';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Select, { GroupBase } from 'react-select';
import { Button, Col, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  faArrowLeft,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ErrorMessage, FieldArray, Form, Formik, FormikErrors } from 'formik';

import {
  postSegmentElementData,
  putSegmentElementData,
} from 'redux/action/SegmentElement';
import styles from './index.module.css';
import className from 'classnames/bind';
import { RootState } from 'redux/store';
import {
  percentageCounseling,
  statusOptions,
} from 'components/Select/SelectOptions';
import { loader } from 'redux/reducer/Loader';
import { Loader } from 'components/Loader/Loader';
import { SelectField } from 'components/Select/Select';
import RestoreLevelModal from 'components/Modal/RestoreLevelModal';

const ArrangeCounseling = (props: {
  setAddElement: (arg0: boolean) => void;
}) => {
  const router = useRouter();
  const query = router.query;
  const dispatch = useDispatch();
  const cx = className.bind(styles);

  const segmentData = useSelector(
    (state: RootState) => state?.segment?.segmentData?.segments
  );
  const elementData = useSelector(
    (state: RootState) => state?.element?.elementData?.elements
  );
  const particularSegmentData = useSelector(
    (state: RootState) => state?.segmentElement?.particularSegmentElementData
  );
  const load = useSelector((state: RootState) => state?.loader?.loader);
  const restore = useSelector((state: RootState) => state?.restore?.restoreId);
  const adminToken = useSelector((state: RootState) => state?.login?.loginData);

  const [count, setCount] = useState(1);
  const [restoreLevel, setRestoreLevel] = useState(false);

  const dataElement = elementData?.map((item: { name: string }) => {
    return { ...item, label: item?.name, value: item?.name };
  });

  useEffect(() => {
    if (restore?.length > 0) {
      setRestoreLevel(true);
    }
  }, [dispatch, restore]);

  useEffect(() => {
    query?.editId?.length &&
      setCount(particularSegmentData?.segment?.element?.length);
  }, [particularSegmentData?.segment?.element?.length, query?.editId?.length]);

  const dataSegment = segmentData?.map((item: { name: string }) => {
    return { ...item, label: item?.name, value: item?.name };
  });

  let startPosition: number;
  let endPosition: number;

  const dragStart = (position: number) => {
    startPosition = position;
  };

  const dragEnter = (position: number) => {
    endPosition = position;
  };
  const drop = (
    data: {
      name: string;
      status: boolean;
      percentage: never[];
      sequence: number;
      _id: string;
    }[],
    setFieldValue: {
      (
        field: string,
        value: string,
        shouldValidate?: boolean | undefined
      ): void;
      (
        arg0: string,
        arg1: {
          _id: string;
          name: string;
          status: boolean;
          percentage: never[];
          sequence: number;
        }
      ): void;
    }
  ) => {
    const copyListItems = [...data];
    const dragItemContent = copyListItems[startPosition];
    copyListItems?.splice(startPosition, 1);
    copyListItems?.splice(endPosition, 0, dragItemContent);
    copyListItems?.map((item, index) => {
      setFieldValue(`segment.element[${index}]`, {
        _id: item?._id,
        name: item?.name,
        status: item?.status,
        percentage: item?.percentage,
        sequence: index,
      });
    });
  };

  const initialValues = {
    segment: {
      _id: query?.editId?.length ? particularSegmentData?.segment?._id : '',
      name: query?.editId?.length ? particularSegmentData?.segment?.name : '',
      element: query?.editId?.length
        ? (particularSegmentData?.segment?.element as [])
        : [
            {
              _id: '',
              name: '',
              status: true,
              percentage: [],
              sequence: 0,
            },
          ],
    },
  };

  return (
    <>
      {(query?.editId === particularSegmentData?.segment?._id ||
        query?.editId === undefined) && (
        <div
          className={cx(
            'animate__animated animate__slideInRight parent-segment'
          )}
        >
          <div className={cx('parent-section')}>
            <div className={cx('card')}>
              <div className={cx('add-scroll')}>
                <Loader open={load} />
                <Formik
                  enableReinitialize={true}
                  initialValues={initialValues}
                  validationSchema={Yup.object().shape({
                    segment: Yup.object().shape({
                      name: Yup.string().required('Required'),
                      element: Yup.array().of(
                        Yup.object().shape({
                          name: Yup.string().required('Required'),
                          status: Yup.string().required('Required'),
                          percentage: Yup.array().min(1, 'Required'),
                        })
                      ),
                    }),
                  })}
                  onSubmit={(values) => {
                    dispatch(loader(true));
                    query?.editId?.length
                      ? dispatch(
                          putSegmentElementData(
                            query?.editId as string,
                            values,
                            adminToken,
                            props.setAddElement,
                            router
                          ) as unknown as AnyAction
                        )
                      : dispatch(
                          postSegmentElementData(
                            values,
                            adminToken,
                            props.setAddElement,
                            router
                          ) as unknown as AnyAction
                        );
                  }}
                >
                  {({
                    handleSubmit,
                    setFieldTouched,
                    setFieldValue,
                    errors,
                    touched,
                    handleBlur,
                    values,
                    resetForm,
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      <RestoreLevelModal
                        title='Restore Segment Element'
                        modalName='Segment Element'
                        restoreId={restore}
                        navigate={props.setAddElement}
                        resetForm={resetForm}
                        content='Segment Exist But Soft Deleted. Do You Want To Restore The Data'
                        show={restoreLevel}
                        onClose={() => setRestoreLevel(false)}
                      />
                      <div className={cx('card-table')}>
                        <div className='mb-3'>
                          <div className={cx('card-flex')}>
                            <div
                              onClick={() => {
                                resetForm(),
                                  router.replace('/segmentelement'),
                                  props.setAddElement(false);
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faArrowLeft}
                                className={cx('back-img')}
                              />
                            </div>
                            <h4 className='my-2'>
                              {query?.editId && query?.editId?.length > 0
                                ? 'Edit Segments'
                                : 'Add Segments'}
                            </h4>
                          </div>
                          <SelectField
                            name='segment.name'
                            options={dataSegment?.sort(
                              (a: { name: string }, b: { name: string }) =>
                                a?.name?.localeCompare(b.name)
                            )}
                            value={values?.segment?.name}
                            placeholder='Select Segment'
                            onChange={(e) => {
                              setFieldValue(
                                `segment.name`,
                                e &&
                                  (e as SelectType)?.label &&
                                  (e as SelectType)?.label?.length > 0
                                  ? (e as SelectType)?.label
                                  : ''
                              );
                              setFieldValue(
                                `segment._id`,
                                e &&
                                  (e as SelectType)?.label &&
                                  (e as SelectType)?.label?.length > 0
                                  ? (e as SelectType)?._id
                                  : ''
                              );
                            }}
                            onBlur={setFieldTouched}
                            error={errors?.segment?.name as string}
                            touched={touched?.segment?.name as boolean}
                          />
                        </div>
                        {values?.segment?.name?.length > 0 && (
                          <div className={cx('background-option')}>
                            <div className={cx('card-flex')}></div>
                            <FieldArray
                              name='segment.element'
                              render={(arrayHelpers) => (
                                <div>
                                  {values?.segment?.element?.map(
                                    (friend: unknown, index: number) => (
                                      <div
                                        onDragStart={() => dragStart(index)}
                                        onDragEnter={() => dragEnter(index)}
                                        onDragEnd={() =>
                                          drop(
                                            values?.segment?.element,
                                            setFieldValue
                                          )
                                        }
                                        key={index}
                                        draggable
                                        className='b-1 mb-3 rounded p-2 '
                                      >
                                        <Row>
                                          <Col>
                                            <h6 className={cx('label-style')}>
                                              Element
                                            </h6>
                                            <SelectField
                                              name={`segment.element[${index}].name`}
                                              options={dataElement?.sort(
                                                (
                                                  a: { name: string },
                                                  b: { name: string }
                                                ) =>
                                                  a?.name?.localeCompare(b.name)
                                              )}
                                              value={
                                                values?.segment?.element[
                                                  index as number
                                                ]?.name
                                              }
                                              placeholder='Select Element'
                                              onChange={(e) => {
                                                setFieldValue(
                                                  `segment.element[${index}].name`,
                                                  e &&
                                                    (e as SelectType)?.label &&
                                                    (e as SelectType)?.label
                                                      ?.length > 0
                                                    ? (e as SelectType)?.label
                                                    : ''
                                                );
                                                setFieldValue(
                                                  `segment.element[${index}]._id`,
                                                  e &&
                                                    (e as SelectType)?.label &&
                                                    (e as SelectType)?.label
                                                      ?.length > 0
                                                    ? (e as SelectType)?._id
                                                    : ''
                                                );
                                              }}
                                              onBlur={setFieldTouched}
                                              error={
                                                errors?.segment?.element !==
                                                  undefined &&
                                                (
                                                  errors?.segment.element[
                                                    index
                                                  ] as FormikErrors<{
                                                    name: boolean;
                                                  }>
                                                )?.name
                                              }
                                              touched={
                                                touched?.segment?.element !==
                                                  undefined &&
                                                touched?.segment?.element[index]
                                                  ?.name
                                              }
                                            />
                                          </Col>
                                          <Col>
                                            <h6 className={cx('label-style')}>
                                              Status
                                            </h6>
                                            <SelectField
                                              name={`segment.element[${index}].status`}
                                              options={statusOptions}
                                              isClearable={false}
                                              value={
                                                (
                                                  values?.segment?.element[
                                                    index as number
                                                  ]?.status + ''
                                                )?.toLowerCase() == 'true'
                                                  ? 'Activated'
                                                  : 'Deactivated'
                                              }
                                              placeholder='Select Status'
                                              isSearchable={false}
                                              onChange={(e) => {
                                                setFieldValue(
                                                  `segment.element[${index}].status`,
                                                  e &&
                                                    (e as SelectType)?.label &&
                                                    (e as SelectType)?.label
                                                      ?.length > 0
                                                    ? (e as SelectType)
                                                        ?.label === 'Activated'
                                                      ? true
                                                      : false
                                                    : ''
                                                );
                                              }}
                                              onBlur={setFieldTouched}
                                              error={
                                                errors?.segment?.element !==
                                                  undefined &&
                                                (
                                                  errors?.segment.element[
                                                    index
                                                  ] as FormikErrors<{
                                                    status: boolean;
                                                  }>
                                                )?.status
                                              }
                                              touched={
                                                touched?.segment?.element !==
                                                  undefined &&
                                                touched?.segment?.element[index]
                                                  ?.status
                                              }
                                            />
                                          </Col>
                                          <Col>
                                            <h6 className={cx('label-style')}>
                                              Percentage
                                            </h6>
                                            <Select
                                              name={`segment.element[${index}].percentage`}
                                              options={
                                                percentageCounseling as unknown as readonly GroupBase<never>[]
                                              }
                                              isSearchable={false}
                                              isClearable
                                              isMulti
                                              placeholder='Select Percentage'
                                              value={
                                                values?.segment?.element[
                                                  index as number
                                                ]?.percentage?.length > 0
                                                  ? values?.segment.element[
                                                      index as number
                                                    ]?.percentage?.map(
                                                      (item: string) => {
                                                        return {
                                                          label: item,
                                                          value: item,
                                                        };
                                                      }
                                                    )
                                                  : []
                                              }
                                              onChange={(e) => {
                                                if (e?.length > 0) {
                                                  const a = e?.map(
                                                    (item: {
                                                      label: string;
                                                    }) => {
                                                      return item.label;
                                                    }
                                                  );
                                                  setFieldValue(
                                                    `segment.element[${index}].percentage`,
                                                    a
                                                  );
                                                } else if (e?.length === 0) {
                                                  setFieldValue(
                                                    `segment.element[${index}].percentage`,
                                                    []
                                                  );
                                                }
                                              }}
                                              onBlur={handleBlur}
                                            />
                                            <ErrorMessage
                                              className='error-message'
                                              name={`segment.element[${index}].percentage`}
                                              component='span'
                                            />
                                          </Col>
                                          <div className='col-auto'>
                                            <h6
                                              className={cx('py-1 opacity-0')}
                                            >
                                              Pe
                                            </h6>
                                            <div className={cx('icon-style')}>
                                              {index === count - 1 ? (
                                                <>
                                                  <div
                                                    className={cx(
                                                      'addoption-icon'
                                                    )}
                                                    onClick={() => {
                                                      arrayHelpers?.insert(
                                                        index + count,
                                                        {
                                                          _id: '',
                                                          name: '',
                                                          status: true,
                                                          percentage: [],
                                                          sequence: count,
                                                        }
                                                      ),
                                                        setCount(count + 1);
                                                    }}
                                                  >
                                                    <FontAwesomeIcon
                                                      icon={faPlus}
                                                      title='Add'
                                                    />
                                                  </div>
                                                  {index === 0 && (
                                                    <div id='hidebox'></div>
                                                  )}

                                                  {count > 1 && (
                                                    <div
                                                      className={cx(
                                                        'removeoption-icon'
                                                      )}
                                                      onClick={() => {
                                                        arrayHelpers?.remove(
                                                          index as number
                                                        ),
                                                          setCount(
                                                            (count) => count - 1
                                                          );
                                                      }}
                                                    >
                                                      <FontAwesomeIcon
                                                        icon={faTrash}
                                                        title='Delete'
                                                      />
                                                    </div>
                                                  )}
                                                </>
                                              ) : (
                                                <>
                                                  <div
                                                    className={cx(
                                                      'removeoption-icon'
                                                    )}
                                                    onClick={() => {
                                                      arrayHelpers?.remove(
                                                        index as number
                                                      ),
                                                        setCount(
                                                          (count) => count - 1
                                                        );
                                                    }}
                                                  >
                                                    <FontAwesomeIcon
                                                      icon={faTrash}
                                                      title='Delete'
                                                    />
                                                  </div>
                                                  <div id='hidebox'></div>
                                                </>
                                              )}
                                            </div>
                                          </div>
                                        </Row>
                                      </div>
                                    )
                                  )}
                                </div>
                              )}
                            />
                          </div>
                        )}
                      </div>
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
                                router.replace('/segmentelement'),
                                props.setAddElement(false);
                            }}
                          >
                            Cancel
                          </Button>
                          <Button className={cx('modalsave-btn')} type='submit'>
                            Save
                          </Button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ArrangeCounseling;
