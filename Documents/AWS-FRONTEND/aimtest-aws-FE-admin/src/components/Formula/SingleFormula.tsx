import * as Yup from 'yup';
import { AnyAction } from 'redux';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FieldArray, Form, Formik, FormikErrors } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import { RootState } from 'redux/store';
import className from 'classnames/bind';
import styles from './index.module.css';
import {
  divideOptions,
  formulaOperations,
  perOfValue,
} from 'components/Select/SelectOptions';
import { loader } from 'redux/reducer/Loader';
import GenerateFormula from './GenerateFormula';
import { SelectField } from 'components/Select/Select';
import { postFormulaData, putFormulaData } from 'redux/action/Formula';

const SingleFormula = ({ label }: { label: string }) => {
  const dispatch = useDispatch();
  const cx = className.bind(styles);

  const adminToken = useSelector((state: RootState) => state?.login?.loginData);

  const sectionData = useSelector(
    (state: RootState) => state?.section?.sectionData?.sections
  );
  const elementData = useSelector(
    (state: RootState) => state?.element?.elementData?.elements
  );
  const formulaData = useSelector(
    (state: RootState) => state?.formula?.formulaData?.formulas
  );

  const elementFormula: formulaType = formulaData?.find(
    (item: { label: string }) =>
      item?.label?.trim()?.toLowerCase() === label?.trim()?.toLowerCase()
  );

  const [count, setCount] = useState(1);
  const [disableGroup, setDisableGroup] = useState([false]);
  const [disableElement, setDisableElement] = useState([false]);
  const [disableFirstValue, setDisableFirstValue] = useState(true);

  useEffect(() => {
    if (elementFormula !== undefined) {
      setCount(elementFormula?.formulaData?.length);
      elementFormula?.extraPerOfValue?.length > 0 &&
        setDisableFirstValue(false);
      elementFormula?.formulaData?.map(
        (
          item: { group: { name: string }; element: { name: string } },
          index: number
        ) => {
          if (item.group.name === 'Nill') {
            disableGroup[index] = true;
          }
          if (item.element.name === 'Nill') {
            disableElement[index] = true;
          }
        }
      );
    }
  }, [disableElement, disableGroup, elementFormula]);

  const dataSection = sectionData?.map((item: { name: string }) => {
    return { ...item, label: item?.name, value: item?.name };
  });
  const dataElement = elementData?.map((item: { name: string }) => {
    return { ...item, label: item?.name, value: item?.name };
  });

  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={{
          label: label,
          extraPerOfValue:
            elementFormula === undefined ? '' : elementFormula?.extraPerOfValue,
          divide: elementFormula === undefined ? '' : elementFormula?.divide,
          formulaData:
            elementFormula === undefined
              ? [
                  {
                    operation: '',
                    perOfValue: '',
                    group: { _id: '', name: '' },
                    element: { _id: '', name: '' },
                  },
                ]
              : (elementFormula?.formulaData as []),
        }}
        validationSchema={Yup.object().shape({
          divide: Yup.string().required('Required'),
          extraPerOfValue: Yup.string().required('Required'),
          formulaData: Yup.array().of(
            Yup.object().shape({
              group: Yup.object().shape({
                name: Yup.string().required('Required'),
              }),
              element: Yup.object().shape({
                name: Yup.string().required('Required'),
              }),
              operation: Yup.string().required('Required'),
              perOfValue: Yup.string().required('Required'),
            })
          ),
        })}
        onSubmit={(values) => {
          dispatch(loader(true));
          elementFormula === undefined
            ? dispatch(
                postFormulaData(values, adminToken) as unknown as AnyAction
              )
            : dispatch(
                putFormulaData(
                  elementFormula._id as string,
                  values,
                  adminToken
                ) as unknown as AnyAction
              );
        }}
      >
        {({
          values,
          setFieldTouched,
          setFieldValue,
          errors,
          touched,
          resetForm,
        }) => (
          <Form>
            <GenerateFormula value={values} />
            <div className='row'>
              <div className='col'>
                <div className='row mob-block'>
                  <div className='col-2 width-field'>
                    <div>
                      <div className={cx('my-2')}>
                        <label htmlFor='color'>% OF VALUE</label>
                      </div>
                      <SelectField
                        name='extraPerOfValue'
                        options={perOfValue}
                        value={values?.extraPerOfValue}
                        onChange={(e) => {
                          e &&
                          (e as SelectType)?.label &&
                          (e as SelectType)?.label?.length > 0
                            ? (e as SelectType)?.label === 'Nill'
                              ? (setDisableFirstValue(true),
                                setFieldValue(
                                  `formulaData.${0}.operation`,
                                  'Nill'
                                ))
                              : (setDisableFirstValue(false),
                                setFieldValue(
                                  `formulaData.${0}.operation`,
                                  'Add ( + )'
                                ))
                            : (setDisableFirstValue(true),
                              setFieldValue(
                                `formulaData.${0}.operation`,
                                'Nill'
                              ));
                          setFieldValue(
                            'extraPerOfValue',
                            e &&
                              (e as SelectType)?.label &&
                              (e as SelectType)?.label?.length > 0
                              ? (e as SelectType).label
                              : 'Nill'
                          );
                        }}
                        placeholder='Select % Value'
                        onBlur={setFieldTouched}
                        error={errors?.extraPerOfValue as string}
                        touched={touched?.extraPerOfValue as boolean}
                      />
                    </div>
                  </div>
                  <FieldArray
                    name='formulaData'
                    render={(arrayHelpers) => (
                      <div>
                        {values?.formulaData?.map(
                          (friend: unknown, index: number) => (
                            <div key={index}>
                              <div>
                                <div className='row'>
                                  <div className='col-11'>
                                    <div className='row'>
                                      <div className='col'>
                                        <div className='col'>
                                          <div
                                            className={`${
                                              disableFirstValue && 'disable'
                                            }`}
                                          >
                                            <div className={cx('my-2')}>
                                              <label htmlFor='color'>
                                                OPERATION
                                              </label>
                                            </div>
                                            <SelectField
                                              name={`formulaData.${index}.operation`}
                                              options={formulaOperations}
                                              value={
                                                values?.formulaData[index]
                                                  ?.operation
                                              }
                                              disable={
                                                index > 0
                                                  ? false
                                                  : disableFirstValue
                                              }
                                              isClearable={
                                                index === 0 ? true : undefined
                                              }
                                              onChange={(e) =>
                                                setFieldValue(
                                                  `formulaData.${index}.operation`,
                                                  e &&
                                                    (e as SelectType)?.label &&
                                                    (e as SelectType)?.label
                                                      ?.length > 0
                                                    ? (e as SelectType).label
                                                    : ''
                                                )
                                              }
                                              placeholder='Select Operation'
                                              onBlur={setFieldTouched}
                                              error={
                                                errors?.formulaData !==
                                                  undefined &&
                                                (
                                                  errors?.formulaData[
                                                    index
                                                  ] as FormikErrors<{
                                                    operation: string;
                                                  }>
                                                )?.operation
                                              }
                                              touched={
                                                touched?.formulaData !==
                                                  undefined &&
                                                touched?.formulaData[index]
                                                  ?.operation
                                              }
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className='col'>
                                        <div className='col'>
                                          <div>
                                            <div className={cx('my-2')}>
                                              <label htmlFor='color'>
                                                % OF VALUE
                                              </label>
                                            </div>
                                            <SelectField
                                              name={`formulaData.${index}.perOfValue`}
                                              options={perOfValue}
                                              value={
                                                values?.formulaData[index]
                                                  ?.perOfValue
                                              }
                                              onChange={(e) =>
                                                setFieldValue(
                                                  `formulaData.${index}.perOfValue`,
                                                  e &&
                                                    (e as SelectType)?.label &&
                                                    (e as SelectType)?.label
                                                      ?.length > 0
                                                    ? (e as SelectType).label
                                                    : ''
                                                )
                                              }
                                              placeholder='Select % Value'
                                              onBlur={setFieldTouched}
                                              error={
                                                errors?.formulaData !==
                                                  undefined &&
                                                (
                                                  errors?.formulaData[
                                                    index
                                                  ] as FormikErrors<{
                                                    perOfValue: string;
                                                  }>
                                                )?.perOfValue
                                              }
                                              touched={
                                                touched?.formulaData !==
                                                  undefined &&
                                                touched?.formulaData[index]
                                                  ?.perOfValue
                                              }
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className='col'>
                                        <div className='col'>
                                          <div
                                            className={`${
                                              values?.formulaData[index]?.group
                                                .name === 'Nill' && 'disable'
                                            }`}
                                          >
                                            <div className='my-2'>
                                              <label htmlFor='color'>
                                                Group {index + 1}
                                              </label>
                                            </div>
                                            <SelectField
                                              name={`formulaData.${index}.group.name`}
                                              options={dataSection?.sort(
                                                (
                                                  a: { name: string },
                                                  b: { name: string }
                                                ) =>
                                                  a?.name?.localeCompare(b.name)
                                              )}
                                              disable={disableGroup[index]}
                                              value={
                                                values?.formulaData[index]
                                                  ?.group.name
                                              }
                                              placeholder='Select Group'
                                              onChange={(e) => {
                                                (e as SelectType).label
                                                  ? ((disableElement[index] =
                                                      true),
                                                    setFieldValue(
                                                      `formulaData.${index}.element.name`,
                                                      'Nill'
                                                    ))
                                                  : ((disableElement[index] =
                                                      false),
                                                    setFieldValue(
                                                      `formulaData.${index}.element.name`,
                                                      ''
                                                    ));
                                                setFieldValue(
                                                  `formulaData.${index}.group`,
                                                  e &&
                                                    (e as SelectType)?.label &&
                                                    (e as SelectType).label
                                                      ?.length > 0
                                                    ? {
                                                        _id: (e as SelectType)
                                                          ?._id,
                                                        name: (e as SelectType)
                                                          ?.label,
                                                      }
                                                    : {
                                                        _id: '',
                                                        name: '',
                                                      }
                                                );
                                              }}
                                              onBlur={setFieldTouched}
                                              error={
                                                errors?.formulaData !==
                                                  undefined &&
                                                (
                                                  errors?.formulaData[
                                                    index
                                                  ] as FormikErrors<{
                                                    group: {
                                                      _id: string;
                                                      name: string;
                                                    };
                                                  }>
                                                )?.group?.name
                                              }
                                              touched={
                                                touched?.formulaData !==
                                                  undefined &&
                                                touched?.formulaData[index]
                                                  ?.group?.name
                                              }
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className='col ps-0'>
                                        {' '}
                                        <div className='col'>
                                          <div
                                            className={`${
                                              values?.formulaData[index]
                                                ?.element.name === 'Nill' &&
                                              'disable'
                                            }`}
                                          >
                                            <div className={cx('my-2')}>
                                              <label htmlFor='color'>
                                                Element {index + 1}
                                              </label>
                                            </div>
                                            <SelectField
                                              name={`formulaData.${index}.element.name`}
                                              options={dataElement?.sort(
                                                (
                                                  a: { name: string },
                                                  b: { name: string }
                                                ) =>
                                                  a?.name?.localeCompare(b.name)
                                              )}
                                              value={
                                                values?.formulaData[index]
                                                  ?.element.name
                                              }
                                              disable={disableElement[index]}
                                              placeholder='Select Element'
                                              onChange={(e) => {
                                                (e as SelectType).label
                                                  ? ((disableGroup[index] =
                                                      true),
                                                    setFieldValue(
                                                      `formulaData.${index}.group.name`,
                                                      'Nill'
                                                    ))
                                                  : ((disableGroup[index] =
                                                      false),
                                                    setFieldValue(
                                                      `formulaData.${index}.group.name`,
                                                      ''
                                                    ));
                                                setFieldValue(
                                                  `formulaData.${index}.element`,
                                                  e &&
                                                    (e as SelectType)?.label &&
                                                    (e as SelectType).label
                                                      ?.length > 0
                                                    ? {
                                                        _id: (e as SelectType)
                                                          ?._id,
                                                        name: (e as SelectType)
                                                          ?.label,
                                                      }
                                                    : {
                                                        _id: '',
                                                        name: '',
                                                      }
                                                );
                                              }}
                                              onBlur={setFieldTouched}
                                              error={
                                                errors?.formulaData !==
                                                  undefined &&
                                                (
                                                  errors?.formulaData[
                                                    index
                                                  ] as FormikErrors<{
                                                    element: {
                                                      _id: string;
                                                      name: string;
                                                    };
                                                  }>
                                                )?.element?.name
                                              }
                                              touched={
                                                touched?.formulaData !==
                                                  undefined &&
                                                touched?.formulaData[index]
                                                  ?.element?.name
                                              }
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className='col-1 d-flex align-items-center mt-4 pt-2'>
                                    <div className='row'>
                                      <div className='col'>
                                        <div className={cx('icon-style')}>
                                          {index === count - 1 ? (
                                            <>
                                              <div
                                                className={cx('addoption-icon')}
                                                onClick={() => {
                                                  disableElement.push(false),
                                                    disableGroup.push(false);
                                                  arrayHelpers?.insert(
                                                    index + count,
                                                    {
                                                      operation: '',
                                                      perOfValue: '',
                                                      group: {
                                                        _id: '',
                                                        name: '',
                                                      },
                                                      element: {
                                                        _id: '',
                                                        name: '',
                                                      },
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
                                              {count > 1 && (
                                                <div
                                                  className={cx(
                                                    'removeoption-icon'
                                                  )}
                                                  onClick={() => {
                                                    disableGroup.splice(0, 1);
                                                    disableElement.splice(0, 1);
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
                                                  disableGroup.splice(index, 1);
                                                  setDisableGroup(disableGroup);
                                                  disableElement.splice(
                                                    index,
                                                    1
                                                  );
                                                  setDisableElement(
                                                    disableElement
                                                  );
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
                                            </>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-2 width-field'>
                <div>
                  <div className={cx('my-2')}>
                    <label htmlFor='color'>DIVIDE</label>
                  </div>
                  <SelectField
                    name='divide'
                    options={divideOptions}
                    value={values?.divide}
                    onChange={(e) =>
                      setFieldValue(
                        'divide',
                        e &&
                          (e as SelectType)?.label &&
                          (e as SelectType)?.label?.length > 0
                          ? (e as SelectType).label
                          : ''
                      )
                    }
                    placeholder='Select'
                    onBlur={setFieldTouched}
                    error={errors?.divide as string}
                    touched={touched?.divide as boolean}
                  />
                </div>
              </div>
            </div>
            <div className={cx('btn-end')}>
              <div className={cx('save')}>
                <Button
                  className={cx('delete-btn')}
                  onClick={() => {
                    resetForm(),
                      setCount(
                        elementFormula?.formulaData?.length
                          ? elementFormula?.formulaData?.length
                          : 1
                      );
                  }}
                >
                  Cancel
                </Button>
              </div>
              <div className={cx('save')}>
                <Button className={cx('sucess-btn')} type='submit'>
                  Update
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SingleFormula;
