import {
  ErrorMessage,
  Field,
  FieldArray,
  Form,
  Formik,
  FormikTouched,
} from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import { AnyAction } from 'redux';
import { useRouter } from 'next/router';
import {
  faArrowLeft,
  faPlus,
  faRemove,
  faTrash,
  faCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
import { Button, Col, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { ChangeEvent, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { RootState } from 'redux/store';
import className from 'classnames/bind';
import styles from '../index.module.css';
import { loader } from 'redux/reducer/Loader';
import { Loader } from 'components/Loader/Loader';
import mainLogo from '../../../Images/upload.png';
import { SelectField } from 'components/Select/Select';
import { classList } from 'components/MemoryTest/GetClassList';
import SelectTrueOption from 'components/Modal/SelectTrueModal';
import { booleanOptions } from 'components/Select/SelectOptions';
import { postImageTest, putImageTest } from 'redux/action/Test/ImageTest';

const AddImageTest = (props: { setAddImageTest: (arg0: boolean) => void }) => {
  const router = useRouter();
  const query = router.query;
  const dispatch = useDispatch();
  const cx = className.bind(styles);

  const particularImageTestData = useSelector(
    (state: RootState) => state?.imageTest?.particularImageTestData
  );
  const classData = useSelector(
    (state: RootState) => state?.class?.classData?.classes
  );
  const imageTestLevels = useSelector(
    (state: RootState) =>
      state.imageTestLevel.imageTestLevelData.imageTestLevels
  );
  const token = useSelector((state: RootState) => state?.login?.loginData);
  const load = useSelector((state: RootState) => state?.loader?.loader);

  const [optionCount, setOptionCount] = useState([
    {
      option: 1,
    },
  ]);
  const [modalShow, setModalShow] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [questionCount, setQuestionCount] = useState(1);
  const [multImage, setMultImage] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<File[] | never | FileList>(
    []
  );

  useEffect(() => {
    if (query?.editId !== undefined) {
      const a = particularImageTestData?.questions?.map(
        (item: { options: { option: number }[] }) => {
          return {
            option: item?.options?.length,
          };
        }
      );
      // setMultImage(particularImageTestData?.images);
      setSelectedImage(particularImageTestData?.images);
      setOptionCount(a);
      setQuestionCount(particularImageTestData?.questions?.length);
    }
  }, [
    particularImageTestData?.images,
    particularImageTestData?.questions,
    query?.editId,
  ]);

  const handleTrueFalse = (
    questionIndex: number,
    setFieldValue: {
      (
        field: string,
        value: string,
        shouldValidate?: boolean | undefined
      ): void;
      (arg0: string, arg1: boolean): void;
    },
    valuesOfQuestion: string | { option: string }[],
    optionsIndex: number
  ) => {
    const length = valuesOfQuestion?.length;
    for (let count = 0; count < length; count++) {
      if (count !== optionsIndex) {
        setFieldValue(
          `questions[${questionIndex}].options[${count}].isCorrect`,
          false
        );
      }
    }
  };
  const dataClass = classData?.map((item: { name: string }) => {
    return { ...item, label: item?.name, value: item?.name };
  });

  const initialValues: imageTestType = {
    questions: query?.editId?.length
      ? particularImageTestData.questions
      : [
          {
            question: '',
            options: [{ option: '', isCorrect: false }],
          },
        ],
    class: {
      _id: query?.editId?.length ? particularImageTestData?.class?._id : '',
      name: query?.editId?.length ? particularImageTestData?.class?.name : '',
    },
    images: query?.editId?.length ? particularImageTestData?.images : [],
    totalTestTime: query?.editId?.length
      ? particularImageTestData?.totalTestTime
      : '',
    level: {
      _id: query?.editId?.length ? particularImageTestData?.level?._id : '',
      level: query?.editId?.length ? particularImageTestData?.level?.level : '',
      noOfImages: 0,
    },
  };
  const imageOnChange = (
    e: File[] | FileList | null,
    setFieldValue: {
      (
        field: string,
        value: FileList,
        shouldValidate?: boolean | undefined
      ): void;
      (arg0: string, arg1: FileList[]): void;
    }
  ): void => {
    const fileArray = [];
    if (e !== null) {
      for (let i = 0; i < e?.length; i++) {
        fileArray.push(e[i]);
      }
    }
    if (fileArray && fileArray?.length > 0) {
      fileArray?.map((item) => {
        const fileFormat = item.type;
        if (fileFormat?.length) {
          setSelectedImage((prev) => [...(prev as File[]), item]);
          setFieldValue('images', [item] as unknown as FileList[]);
          file2Base64(item).then((img: string) => {
            setMultImage((picture: string[]) => [...picture, img]);
          });
        }
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
  const Remove = (
    i: number,
    setFieldValue: {
      (field: string, value: File, shouldValidate?: boolean | undefined): void;
      (arg0: string, arg1: File[]): void;
    }
  ) => {
    (selectedImage as File[]).splice(i, 1);
    multImage.splice(i, 1);
    setMultImage(multImage);
    if (selectedImage?.length === 0) setFieldValue('images', []);
    selectedImage?.length > 0 && setFieldValue('images', [selectedImage[0]]);
  };
  return (
    <>
      {(query?.editId === particularImageTestData?._id ||
        query?.editId === undefined) && (
        <div className={cx('flex-style')}>
          <div className={cx('parent-section')}>
            <Loader open={load} />
            <SelectTrueOption
              show={modalShow}
              onClose={() => setModalShow(false)}
              content={modalContent}
            />
            <div className={cx('text-btn')}>
              <Formik
                initialValues={initialValues}
                validationSchema={Yup.object().shape({
                  level: Yup.object().shape({
                    level: Yup.string().required('Required'),
                  }),
                  images: Yup.array().min(1, 'Required'),
                  class: Yup.object().shape({
                    name: Yup.string().required('Required'),
                  }),
                  totalTestTime: Yup.number().required('Required'),
                  questions: Yup.array().of(
                    Yup.object().shape({
                      question: Yup.string().required('Required'),
                      options: Yup.array().of(
                        Yup.object().shape({
                          option: Yup.string().required('Required'),
                        })
                      ),
                    })
                  ),
                })}
                onSubmit={(values, { resetForm }) => {
                  if (selectedImage?.length === values.level.noOfImages) {
                    const formData = new FormData();
                    const sampleArray = [];
                    values?.questions?.filter((item) => {
                      item?.options?.filter((dt) => {
                        if (dt?.isCorrect === true) {
                          sampleArray.push('1');
                        }
                      });
                    });
                    if (sampleArray?.length === values?.questions?.length) {
                      formData.append(
                        'totalTestTime',
                        values.totalTestTime as string
                      );
                      formData.append(
                        'level',
                        JSON.stringify(values.level) as unknown as string
                      );
                      formData.append(
                        'class',
                        JSON.stringify(values.class) as unknown as string
                      );
                      formData.append(
                        'questions',
                        JSON.stringify(values.questions) as unknown as string
                      );
                      (selectedImage as File[])?.map((image: string | Blob) => {
                        typeof image === 'object' &&
                          formData.append('images', image);
                      });
                      dispatch(loader(true));
                      query?.editId?.length
                        ? dispatch(
                            putImageTest(
                              query?.editId as string,
                              formData,
                              token,
                              props.setAddImageTest,
                              router,
                              resetForm
                            ) as unknown as AnyAction
                          )
                        : dispatch(
                            postImageTest(
                              formData,
                              token,
                              props.setAddImageTest,
                              router,
                              resetForm
                            ) as unknown as AnyAction
                          );
                    } else {
                      setModalContent('One Option Must Be True');
                      setModalShow(true);
                    }
                  } else {
                    setModalContent(
                      `Select ${values.level.noOfImages} Images As Level ${values.level.level} is Selected`
                    );
                    setModalShow(true);
                  }
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
                                      router.replace('/test/imagetest'),
                                      props.setAddImageTest(false);
                                  }}
                                />
                                <h4>
                                  {query?.editId && query?.editId?.length > 0
                                    ? 'Edit Image Test'
                                    : 'Add Image Test'}
                                </h4>
                              </div>
                            </div>
                            <div>
                              <div>
                                <h6 className={cx('label-style')}>
                                  Image Upload
                                </h6>
                                <div className={cx('relative-style')}>
                                  <div>
                                    <div className='flex gap-2 relative'>
                                      {multImage?.length > 0 ? (
                                        <div className={cx('flex-wrap')}>
                                          {multImage?.map((item, i: number) => (
                                            <div key={i} className='h-20'>
                                              <div
                                                className={cx('cursor-pointer')}
                                              >
                                                <div
                                                  className={cx('remove-top')}
                                                >
                                                  <Image
                                                    src={item}
                                                    alt='logo'
                                                    className='w-20'
                                                    width={120}
                                                    height={80}
                                                  />

                                                  <ul
                                                    className={cx(
                                                      'absolute-style'
                                                    )}
                                                  >
                                                    <li
                                                      className={cx(
                                                        'remove-style'
                                                      )}
                                                    >
                                                      <div
                                                        className={cx(
                                                          'remove-cancel'
                                                        )}
                                                      >
                                                        <button
                                                          type='button'
                                                          className={cx(
                                                            'top-absolute'
                                                          )}
                                                          onClick={() =>
                                                            Remove(
                                                              i,
                                                              setFieldValue
                                                            )
                                                          }
                                                        >
                                                          <FontAwesomeIcon
                                                            icon={faRemove}
                                                            className={cx(
                                                              'icon-cancel'
                                                            )}
                                                          />
                                                        </button>
                                                      </div>
                                                    </li>
                                                  </ul>
                                                </div>
                                              </div>
                                            </div>
                                          ))}
                                          <h1 className={cx('plus-style')}>
                                            <FontAwesomeIcon
                                              icon={faCirclePlus}
                                              className={cx('cursor-pointer')}
                                            />
                                            <div className={cx('avatar-edit')}>
                                              <input
                                                type='file'
                                                name='images'
                                                accept='image/*'
                                                multiple
                                                onChange={(
                                                  event: ChangeEvent<HTMLInputElement>
                                                ): void => {
                                                  imageOnChange(
                                                    event?.target?.files,
                                                    setFieldValue
                                                  );
                                                }}
                                                onBlur={() =>
                                                  setFieldTouched(
                                                    'images',
                                                    true
                                                  )
                                                }
                                                className={cx(
                                                  'absolute-plusssss'
                                                )}
                                              />
                                            </div>
                                          </h1>
                                        </div>
                                      ) : (
                                        <div className='flex justify-center items-center'>
                                          <div className='flex flex-col items-center '></div>

                                          <div>
                                            <label
                                              htmlFor='upload-box-photo'
                                              className={cx('cursor-pointer')}
                                            >
                                              <Image
                                                src={mainLogo}
                                                alt='loginImage'
                                                width='140px'
                                                height='110px'
                                              />
                                            </label>
                                          </div>
                                        </div>
                                      )}
                                      {multImage?.length <= 0 ||
                                      multImage?.length === 0 ? (
                                        <div className={cx('avatar-edit')}>
                                          <input
                                            id='upload-box-photo'
                                            type='file'
                                            name='images'
                                            accept='image/*'
                                            multiple
                                            onChange={(
                                              event: ChangeEvent<HTMLInputElement>
                                            ): void => {
                                              imageOnChange(
                                                event?.target?.files,
                                                setFieldValue
                                              );
                                            }}
                                            onBlur={() =>
                                              setFieldTouched('images', true)
                                            }
                                            className={cx(' d-none')}
                                          />
                                        </div>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <ErrorMessage
                                  name='images'
                                  component='span'
                                  className='error-message'
                                />
                              </div>

                              <Row className={cx('mb-2')}>
                                <Col sm={6}>
                                  <h6 className={cx('label-style')}>Class</h6>
                                  <SelectField
                                    name='class.name'
                                    options={classList(dataClass)}
                                    placeholder='Select Class'
                                    value={values?.class?.name}
                                    onChange={(e) =>
                                      setFieldValue(
                                        'class',
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
                                    error={errors?.class?.name as string}
                                    touched={
                                      touched?.class
                                        ?.name as FormikTouched<boolean>
                                    }
                                  />
                                </Col>{' '}
                                <Col sm={6}>
                                  <h6 className={cx('label-style')}>Level</h6>
                                  <SelectField
                                    name='level.level'
                                    options={imageTestLevels
                                      ?.map(
                                        (item: {
                                          level: number;
                                          _id: string;
                                          noOfImages: number;
                                        }) => {
                                          return {
                                            label: item?.level,
                                            _id: item?._id,
                                            noOfImages: item?.noOfImages,
                                          };
                                        }
                                      )
                                      ?.sort(
                                        (
                                          a: { label: number },
                                          b: { label: number }
                                        ) => Number(a?.label) - Number(b?.label)
                                      )}
                                    placeholder='Select Level'
                                    value={values?.level.level as string}
                                    onChange={(e) => {
                                      setFieldValue(
                                        'level',
                                        e &&
                                          (e as SelectType)?.label &&
                                          (e as SelectType)?._id?.length
                                          ? {
                                              _id: (e as SelectType)._id,
                                              level: (e as SelectType).label,
                                              noOfImages: (
                                                e as unknown as SelectType
                                              ).noOfImages,
                                            }
                                          : {
                                              _id: '',
                                              level: '',
                                              noOfImages: '',
                                            }
                                      );
                                    }}
                                    onBlur={setFieldTouched}
                                    error={errors?.level?.level as string}
                                    touched={
                                      touched?.level
                                        ?.level as FormikTouched<boolean>
                                    }
                                  />
                                </Col>
                              </Row>
                              <Row>
                                <Col sm={12}>
                                  <h6 className={cx('label-style')}>
                                    Total Test Time (In Min){' '}
                                  </h6>
                                  <Field
                                    type='number'
                                    min='0'
                                    name='totalTestTime'
                                    value={values?.totalTestTime}
                                    className={cx('form-control')}
                                    placeholder=' Total Test Time (In Min)'
                                  />
                                  <ErrorMessage
                                    className='error-message'
                                    name='totalTestTime'
                                    component='span'
                                  />
                                </Col>
                              </Row>
                              <FieldArray
                                name='questions'
                                render={(arrayHelpers) => (
                                  <div>
                                    {values?.questions?.map(
                                      (friend: unknown, index: number) => (
                                        <div key={index} className='mb-3'>
                                          <h6 className={cx('label-style')}>
                                            {index + 1}. Question{' '}
                                          </h6>
                                          <Row
                                            className={cx(
                                              'mb-2 align-items-start'
                                            )}
                                          >
                                            <div className={cx('col pe-0')}>
                                              <Field
                                                name={`questions[${index}].question`}
                                                className={cx('form-control ')}
                                                onChange={(e: {
                                                  target: {
                                                    value: string;
                                                  };
                                                }) => {
                                                  setFieldValue(
                                                    `questions[${index}].question`,
                                                    e?.target?.value?.replace(
                                                      /  +/g,
                                                      ' '
                                                    )
                                                  );
                                                }}
                                                autoComplete='off'
                                                placeholder='Question'
                                                value={
                                                  values?.questions[index]
                                                    ?.question
                                                }
                                              />
                                              <ErrorMessage
                                                name={`questions[${index}].question`}
                                                component='span'
                                                className='error-message'
                                              />
                                            </div>

                                            <div
                                              className={cx(
                                                'add-option col-auto'
                                              )}
                                            >
                                              {index === questionCount - 1 ? (
                                                <div
                                                  className={cx('add-plusicon')}
                                                >
                                                  <div>
                                                    <div
                                                      className={cx(
                                                        'icon-style'
                                                      )}
                                                    >
                                                      <div
                                                        className={cx(
                                                          'addoption-icon'
                                                        )}
                                                        onClick={() => {
                                                          arrayHelpers.insert(
                                                            index +
                                                              questionCount,
                                                            {
                                                              question: '',
                                                              options: [
                                                                {
                                                                  option: '',
                                                                  isCorrect:
                                                                    false,
                                                                },
                                                              ],
                                                            }
                                                          ),
                                                            setQuestionCount(
                                                              (count) =>
                                                                count + 1
                                                            );
                                                          setOptionCount(
                                                            (prev) => [
                                                              ...prev,
                                                              {
                                                                option: 1,
                                                              },
                                                            ]
                                                          );
                                                        }}
                                                      >
                                                        <FontAwesomeIcon
                                                          icon={faPlus}
                                                        />
                                                      </div>
                                                      {index === 0 && (
                                                        <div id='hidebox'></div>
                                                      )}
                                                      {index > 0 && (
                                                        <div
                                                          className={cx(
                                                            'removeoption-icon'
                                                          )}
                                                          onClick={() => {
                                                            arrayHelpers.remove(
                                                              index as number
                                                            ),
                                                              setQuestionCount(
                                                                (count) =>
                                                                  count - 1
                                                              );
                                                            optionCount?.splice(
                                                              index,
                                                              1
                                                            );
                                                          }}
                                                        >
                                                          <FontAwesomeIcon
                                                            icon={faTrash}
                                                          />
                                                        </div>
                                                      )}
                                                    </div>
                                                  </div>
                                                </div>
                                              ) : (
                                                <div
                                                  className={cx('add-plusicon')}
                                                >
                                                  <div>
                                                    <div
                                                      className={cx(
                                                        'icon-style'
                                                      )}
                                                    >
                                                      <div
                                                        className={cx(
                                                          'removeoption-icon'
                                                        )}
                                                        onClick={() => {
                                                          arrayHelpers.remove(
                                                            index as number
                                                          ),
                                                            setQuestionCount(
                                                              (count) =>
                                                                count - 1
                                                            );
                                                          optionCount?.splice(
                                                            index,
                                                            1
                                                          );
                                                        }}
                                                      >
                                                        <FontAwesomeIcon
                                                          icon={faTrash}
                                                        />
                                                      </div>
                                                      <div id='hidebox'></div>
                                                    </div>
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                          </Row>
                                          <div className={cx('option-box')}>
                                            <div className={cx('option-flex')}>
                                              <FieldArray
                                                name={`questions[${index}].options`}
                                                render={(arrayHelpers) => (
                                                  <>
                                                    <div
                                                      className={cx(
                                                        'background-option'
                                                      )}
                                                    >
                                                      <div className='row'>
                                                        <h6
                                                          className={cx(
                                                            'label-style mx-2'
                                                          )}
                                                        >
                                                          Options
                                                        </h6>

                                                        {values?.questions[
                                                          index
                                                        ]?.options?.map(
                                                          (
                                                            friend: unknown,
                                                            optionIndex: number
                                                          ) => (
                                                            <div
                                                              className={cx(
                                                                'flex-fields mb-2'
                                                              )}
                                                              key={optionIndex}
                                                            >
                                                              <div
                                                                className={cx(
                                                                  'field-size'
                                                                )}
                                                              >
                                                                <div className='col'>
                                                                  <SelectField
                                                                    name={`questions[${index}].options[${optionIndex}].isCorrect`}
                                                                    options={
                                                                      booleanOptions
                                                                    }
                                                                    placeholder='Correct'
                                                                    value={
                                                                      (
                                                                        values
                                                                          .questions[
                                                                          index
                                                                        ]
                                                                          .options[
                                                                          optionIndex
                                                                        ]
                                                                          .isCorrect +
                                                                        ''
                                                                      )?.toLowerCase() ==
                                                                      'true'
                                                                        ? 'True'
                                                                        : 'False'
                                                                    }
                                                                    onChange={(
                                                                      e
                                                                    ) => {
                                                                      setFieldValue(
                                                                        `questions[${index}].options[${optionIndex}].isCorrect`,
                                                                        e &&
                                                                          (
                                                                            e as SelectType
                                                                          )
                                                                            ?.label &&
                                                                          (
                                                                            e as SelectType
                                                                          )
                                                                            ?.label
                                                                            ?.length >
                                                                            0
                                                                          ? (
                                                                              e as SelectType
                                                                            )
                                                                              ?.label ===
                                                                            'True'
                                                                            ? true
                                                                            : false
                                                                          : ''
                                                                      );
                                                                      e &&
                                                                        (
                                                                          e as SelectType
                                                                        )
                                                                          ?.label &&
                                                                        (
                                                                          e as SelectType
                                                                        )
                                                                          ?.label ===
                                                                          'True' &&
                                                                        handleTrueFalse(
                                                                          index,
                                                                          setFieldValue,
                                                                          values
                                                                            ?.questions[
                                                                            index
                                                                          ]
                                                                            ?.options,
                                                                          optionIndex
                                                                        );
                                                                    }}
                                                                  />
                                                                </div>
                                                                <div className='col'>
                                                                  <Field
                                                                    type='text'
                                                                    className={cx(
                                                                      'form-control '
                                                                    )}
                                                                    name={`questions[${index}].options[${optionIndex}].option`}
                                                                    placeholder='Option'
                                                                    autoComplete='off'
                                                                    value={
                                                                      values
                                                                        ?.questions[
                                                                        index
                                                                      ]
                                                                        ?.options[
                                                                        optionIndex
                                                                      ]?.option
                                                                    }
                                                                    onChange={(e: {
                                                                      target: {
                                                                        value: string;
                                                                      };
                                                                    }) => {
                                                                      setFieldValue(
                                                                        `questions[${index}].options[${optionIndex}].option`,
                                                                        e?.target?.value?.replace(
                                                                          /  +/g,
                                                                          ' '
                                                                        )
                                                                      );
                                                                    }}
                                                                  />
                                                                  <ErrorMessage
                                                                    name={`questions[${index}].options[${optionIndex}].option`}
                                                                    component='span'
                                                                    className='error-message mb-2'
                                                                  />
                                                                </div>

                                                                <div>
                                                                  {optionCount !==
                                                                    undefined &&
                                                                  optionIndex ===
                                                                    optionCount[
                                                                      index
                                                                    ]?.option -
                                                                      1 ? (
                                                                    <div>
                                                                      <div>
                                                                        <div
                                                                          className={cx(
                                                                            'icon-style'
                                                                          )}
                                                                        >
                                                                          <div
                                                                            className={cx(
                                                                              'addoption-icon'
                                                                            )}
                                                                            onClick={() => {
                                                                              arrayHelpers.insert(
                                                                                optionIndex +
                                                                                  optionCount[
                                                                                    index
                                                                                  ]
                                                                                    ?.option,
                                                                                {
                                                                                  option:
                                                                                    '',
                                                                                  isCorrect:
                                                                                    false,
                                                                                }
                                                                              ),
                                                                                (optionCount[
                                                                                  index
                                                                                ].option =
                                                                                  optionCount[
                                                                                    index
                                                                                  ]
                                                                                    ?.option +
                                                                                  1);
                                                                            }}
                                                                          >
                                                                            <FontAwesomeIcon
                                                                              icon={
                                                                                faPlus
                                                                              }
                                                                            />
                                                                          </div>
                                                                          {optionIndex ===
                                                                            0 && (
                                                                            <div id='hidebox'></div>
                                                                          )}
                                                                          {optionIndex >
                                                                            0 && (
                                                                            <div
                                                                              className={cx(
                                                                                'removeoption-icon'
                                                                              )}
                                                                              onClick={() => {
                                                                                arrayHelpers.remove(
                                                                                  optionIndex as number
                                                                                ),
                                                                                  (optionCount[
                                                                                    index
                                                                                  ].option =
                                                                                    optionCount[
                                                                                      index
                                                                                    ]
                                                                                      .option -
                                                                                    1);
                                                                              }}
                                                                            >
                                                                              <FontAwesomeIcon
                                                                                icon={
                                                                                  faTrash
                                                                                }
                                                                              />
                                                                            </div>
                                                                          )}
                                                                        </div>
                                                                      </div>
                                                                    </div>
                                                                  ) : (
                                                                    <div
                                                                      className={cx(
                                                                        'add-plusicon'
                                                                      )}
                                                                    >
                                                                      <div>
                                                                        <div
                                                                          className={cx(
                                                                            'icon-style'
                                                                          )}
                                                                        >
                                                                          <div
                                                                            className={cx(
                                                                              'removeoption-icon'
                                                                            )}
                                                                            onClick={() => {
                                                                              arrayHelpers.remove(
                                                                                optionIndex as number
                                                                              ),
                                                                                (optionCount[
                                                                                  index
                                                                                ].option =
                                                                                  optionCount[
                                                                                    index
                                                                                  ]
                                                                                    .option -
                                                                                  1);
                                                                            }}
                                                                          >
                                                                            <FontAwesomeIcon
                                                                              icon={
                                                                                faTrash
                                                                              }
                                                                            />
                                                                          </div>
                                                                          <div id='hidebox'></div>
                                                                        </div>
                                                                      </div>
                                                                    </div>
                                                                  )}
                                                                </div>
                                                              </div>
                                                            </div>
                                                          )
                                                        )}
                                                      </div>
                                                    </div>
                                                  </>
                                                )}
                                              ></FieldArray>
                                            </div>
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </div>
                                )}
                              ></FieldArray>
                              <div>
                                <div className={cx('save')}>
                                  <Button
                                    style={{
                                      marginRight: '8px',
                                    }}
                                    className='warn-btn'
                                    type='button'
                                    onClick={() => {
                                      resetForm(),
                                        router.replace('/test/imagetest'),
                                        props.setAddImageTest(false);
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    className='sucess-btn ml-2'
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
export default AddImageTest;
