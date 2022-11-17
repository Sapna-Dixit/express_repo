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
import ReactPlayer from 'react-player';
import { useRouter } from 'next/router';
import {
  faArrowLeft,
  faPlus,
  faXmark,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Button, Col, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { ChangeEvent, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import mainLogo from './upload.png';
import { RootState } from 'redux/store';
import className from 'classnames/bind';
import styles from '../index.module.css';
import {
  postAudioVideoTest,
  putAudioVideoTest,
} from 'redux/action/Test/AudioVideo';
import { loader } from 'redux/reducer/Loader';
import { Loader } from 'components/Loader/Loader';
import { SelectField } from 'components/Select/Select';
import { classList } from 'components/MemoryTest/GetClassList';
import SelectTrueOption from 'components/Modal/SelectTrueModal';
import { booleanOptions } from 'components/Select/SelectOptions';

const AddAudioVideoTest = (props: {
  setAddAudioVideoTest: (arg0: boolean) => void;
}) => {
  const router = useRouter();
  const query = router.query;
  const dispatch = useDispatch();
  const cx = className.bind(styles);

  const particularAudioVideoTestData = useSelector(
    (state: RootState) => state?.audioVideoTest?.particularAudioVideoTestData
  );
  const classData = useSelector(
    (state: RootState) => state?.class?.classData?.classes
  );
  const load = useSelector((state: RootState) => state?.loader?.loader);

  const token = useSelector((state: RootState) => state?.login?.loginData);

  const [file, setFile] = useState({
    audio: '',
    video: '',
    type: '',
  });
  const [link, setLink] = useState('');
  const [optionCount, setOptionCount] = useState([
    {
      option: 1,
    },
  ]);
  const [modalShow, setModalShow] = useState(false);
  const [questionCount, setQuestionCount] = useState(1);
  const [errorMessage, setErrorMessage] = useState(false);
  const [attachment, setAttachment] = useState<File[] | File | ''>([]);

  useEffect(() => {
    if (query?.editId !== undefined) {
      const a = particularAudioVideoTestData?.questions?.map(
        (item: { options: { option: number }[] }) => {
          return {
            option: item?.options?.length,
          };
        }
      );
      setOptionCount(a);
      setQuestionCount(particularAudioVideoTestData?.questions?.length);
    }
  }, [
    particularAudioVideoTestData,
    particularAudioVideoTestData?.description,
    particularAudioVideoTestData?.question,
    particularAudioVideoTestData?.questions,
    query?.editId,
  ]);

  useEffect(() => {
    if (query?.editId !== undefined) {
      setAttachment(particularAudioVideoTestData?.file);
      particularAudioVideoTestData?.link?.length === 0 &&
      particularAudioVideoTestData?.type === 'video'
        ? setFile({
            audio: '',
            video: particularAudioVideoTestData?.file,
            type: 'video',
          })
        : setFile({
            audio: '',
            video: particularAudioVideoTestData?.file,
            type: 'audio',
          });
      particularAudioVideoTestData?.link?.length > 0 &&
        (setLink(particularAudioVideoTestData?.link),
        setFile({
          audio: '',
          video: encodeURI(particularAudioVideoTestData?.link),
          type: 'video',
        }));
    }
  }, [particularAudioVideoTestData, query?.editId]);

  const dataClass = classData?.map((item: { name: string }) => {
    return { ...item, label: item?.name, value: item?.name };
  });

  const filehandler = (e: FileList | null | File): void => {
    setErrorMessage(false);
    setLink('');
    if (e && (e as FileList)?.length !== 0) {
      setAttachment(e as File);
      (e as FileList)[0]?.type.split('/')[0] === 'video'
        ? setFile({
            audio: '',
            video: URL.createObjectURL((e as FileList)[0]),
            type: 'video',
          })
        : setFile({
            audio: URL.createObjectURL((e as FileList)[0]),
            video: '',
            type: 'audio',
          });
    }
  };
  const linkHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(false);
    setLink(e?.target?.value);
    setAttachment([]);
    setFile({
      audio: '',
      video: e?.target?.value,
      type: 'video',
    });
  };

  const removeFile = (setFieldValue: {
    (field: string, value: string, shouldValidate?: boolean | undefined): void;
    (field: string, value: string, shouldValidate?: boolean | undefined): void;
    (arg0: string, arg1: string): void;
  }) => {
    setErrorMessage(true);
    setFile({
      audio: '',
      video: '',
      type: '',
    });
    setFieldValue('link', '');
    setLink('');
  };

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

  const initialValues: audioVideoType = {
    file: attachment as File,
    link: query?.editId?.length ? particularAudioVideoTestData?.link : '',
    type: query?.editId?.length ? particularAudioVideoTestData?.type : '',
    totalTestTime: query?.editId?.length
      ? particularAudioVideoTestData?.totalTestTime
      : '',
    class: {
      _id: query?.editId?.length
        ? particularAudioVideoTestData?.class?._id
        : '',
      name: query?.editId?.length
        ? particularAudioVideoTestData?.class?.name
        : '',
    },
    questions: query?.editId?.length
      ? particularAudioVideoTestData?.questions
      : [
          {
            question: '',
            options: [{ option: '', isCorrect: false }],
          },
        ],
  };

  return (
    <>
      {(query?.editId === particularAudioVideoTestData?._id ||
        query?.editId === undefined) && (
        <div className={cx('flex-style')}>
          <div className={cx('parent-section')}>
            <Loader open={load} />
            <SelectTrueOption
              show={modalShow}
              content='One Option Must Be True'
              onClose={() => setModalShow(false)}
            />
            <div className={cx('text-btn')}>
              <Formik
                // enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={Yup.object().shape({
                  totalTestTime: Yup.number().required('Required'),
                  class: Yup.object().shape({
                    name: Yup.string().required('Required'),
                  }),
                  questions: Yup.array().of(
                    Yup.object().shape({
                      question: Yup.string().required('Required'),
                      options: Yup.array().of(
                        Yup.object().shape({
                          option: Yup.string().required('Required'),
                          isCorrect: Yup.string().required('asdf'),
                        })
                      ),
                    })
                  ),
                })}
                onSubmit={(values, { resetForm }) => {
                  values.type = file?.type;
                  const sampleArray = [];
                  values?.questions?.filter((item) => {
                    item?.options?.filter((dt) => {
                      if (dt?.isCorrect === true) {
                        sampleArray.push('1');
                      }
                    });
                  });
                  if (
                    sampleArray?.length === values?.questions?.length &&
                    file?.type?.length > 0
                  ) {
                    const formData = new FormData();
                    formData.append('link', link);
                    formData.append('class', JSON.stringify(values.class));
                    formData.append(
                      'totalTestTime',
                      values.totalTestTime as unknown as string
                    );
                    query?.editId?.length
                      ? formData.append('file', attachment as string)
                      : (attachment as File[])[0] !== undefined
                      ? formData.append('file', (attachment as File[])[0])
                      : formData.append('file', '');
                    formData.append(
                      'questions',
                      JSON.stringify(values.questions) as unknown as string
                    );
                    formData.append('type', values?.type);
                    dispatch(loader(true));
                    if (query?.editId?.length) {
                      dispatch(
                        putAudioVideoTest(
                          query?.editId as string,
                          formData,
                          token,
                          props.setAddAudioVideoTest,
                          router,
                          resetForm
                        ) as unknown as AnyAction
                      );
                    } else {
                      dispatch(
                        postAudioVideoTest(
                          formData,
                          token,
                          props.setAddAudioVideoTest,
                          router,
                          resetForm
                        ) as unknown as AnyAction
                      );
                    }
                  } else {
                    file?.type?.length > 0
                      ? setModalShow(true)
                      : setErrorMessage(true);
                  }
                }}
              >
                {({
                  values,
                  handleSubmit,
                  setFieldValue,
                  setFieldTouched,
                  errors,
                  touched,
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
                                      router.push('/test/audiovideotest'),
                                      props.setAddAudioVideoTest(false);
                                  }}
                                />
                                <h4>
                                  {query?.editId && query?.editId?.length > 0
                                    ? 'Edit Audio/Video Test'
                                    : 'Add Audio/Video Test'}
                                </h4>
                              </div>
                            </div>
                            <div>
                              <Row className={cx('mb-2')}>
                                <Col sm={6}>
                                  <h6 className={cx('label-style')}>
                                    File Upload{' '}
                                  </h6>
                                  <div className={cx('avatar-upload')}>
                                    <div className={cx('avatar-edit')}>
                                      <input
                                        type='file'
                                        accept='audio/*,video/*'
                                        id='imageUpload'
                                        onChange={(
                                          event: ChangeEvent<HTMLInputElement>
                                        ): void => {
                                          filehandler(event?.target?.files);
                                        }}
                                      />
                                    </div>

                                    <label
                                      htmlFor='imageUpload'
                                      className={cx('avatar-preview')}
                                    >
                                      <div className={cx('img-uploads')}>
                                        <div className={cx('curson-pointer')}>
                                          <Image
                                            src={mainLogo}
                                            alt='loginImage'
                                            width='140px'
                                            height='110px'
                                          />
                                        </div>
                                      </div>
                                    </label>
                                  </div>
                                  {errorMessage && file?.type?.length === 0 && (
                                    <p className='error-message'>Required</p>
                                  )}
                                  <h6 className={cx('label-style')}>
                                    Enter Link
                                  </h6>
                                  <input
                                    type='text'
                                    className={cx('form-control')}
                                    placeholder='Link'
                                    value={values?.link}
                                    name='link'
                                    onChange={(e) => {
                                      linkHandler(e);
                                      setFieldValue('link', e?.target?.value);
                                    }}
                                    autoComplete='off'
                                  />
                                  {errorMessage && file?.type?.length === 0 && (
                                    <p className='error-message'>Required</p>
                                  )}
                                </Col>
                                <Col sm={6}>
                                  {file?.type?.length &&
                                  file?.video?.length > 0 ? (
                                    <div>
                                      <h6 className={cx('label-style')}>
                                        Video
                                      </h6>

                                      <div className={cx('video-upload')}>
                                        {file?.video?.length > 0 && (
                                          <ReactPlayer
                                            url={file.video}
                                            className='w-full'
                                            width='100%'
                                            height='200px'
                                            controls
                                          />
                                        )}
                                        <div className={cx('edit-video')}>
                                          <div
                                            className={cx('remove-xmark')}
                                            onClick={() =>
                                              removeFile(setFieldValue)
                                            }
                                          >
                                            <label>
                                              <FontAwesomeIcon icon={faXmark} />
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    file?.type?.length > 0 && (
                                      <div>
                                        <h6 className={cx('label-style')}>
                                          Audio
                                        </h6>
                                        <div className={cx('audio-upload')}>
                                          {file.audio?.length > 0 && (
                                            <ReactPlayer
                                              url={file.audio}
                                              className='w-full'
                                              width='100%'
                                              height='80px'
                                              controls
                                            />
                                          )}
                                          <div className={cx('edit-video')}>
                                            <div
                                              className={cx('remove-xmark')}
                                              onClick={() =>
                                                removeFile(setFieldValue)
                                              }
                                            >
                                              <label>
                                                <FontAwesomeIcon
                                                  icon={faXmark}
                                                />
                                              </label>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  )}
                                </Col>
                              </Row>
                              <Row className={cx('mb-2')}>
                                <Col sm={6}>
                                  <h6 className={cx('label-style')}>Class</h6>
                                  <SelectField
                                    name='class.name'
                                    options={classList(dataClass)}
                                    placeholder='Select Class'
                                    value={values?.class?.name}
                                    onBlur={setFieldTouched}
                                    error={errors?.class?.name as string}
                                    touched={
                                      touched?.class
                                        ?.name as FormikTouched<boolean>
                                    }
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
                                  />
                                </Col>{' '}
                                <Col sm={6}>
                                  <h6 className={cx('label-style')}>
                                    Total Test Time (In Min)
                                  </h6>
                                  <Field
                                    type='number'
                                    min='0'
                                    value={values.totalTestTime}
                                    name='totalTestTime'
                                    className={cx('form-control')}
                                    placeholder='Total Test Time (In Min)'
                                  />
                                  <ErrorMessage
                                    name='totalTestTime'
                                    component='span'
                                    className='error-message '
                                  />
                                </Col>
                              </Row>
                              <FieldArray
                                name='questions'
                                render={(arrayHelpers) => (
                                  <div>
                                    {values?.questions?.map(
                                      (friend: unknown, index: number) => (
                                        <div key={index}>
                                          <Row className={cx('mb-2')}>
                                            <Col sm={11}>
                                              <h6 className={cx('label-style')}>
                                                {index + 1}. Question{' '}
                                              </h6>
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
                                            </Col>

                                            <Col
                                              sm={1}
                                              className={cx('add-option')}
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
                                            </Col>
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
                                                                'flex-fields'
                                                              )}
                                                              key={optionIndex}
                                                            >
                                                              <div
                                                                className={cx(
                                                                  'field-size'
                                                                )}
                                                              >
                                                                <div className='col mx-auto mb-2'>
                                                                  <SelectField
                                                                    name={`questions[${index}].options[${optionIndex}].isCorrect`}
                                                                    options={
                                                                      booleanOptions
                                                                    }
                                                                    placeholder='Correct'
                                                                    isClearable={
                                                                      false
                                                                    }
                                                                    value={
                                                                      (
                                                                        values
                                                                          .questions[
                                                                          index
                                                                        ]
                                                                          ?.options[
                                                                          optionIndex
                                                                        ]
                                                                          ?.isCorrect +
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
                                                                <div className='col mx-auto'>
                                                                  <Field
                                                                    type='text'
                                                                    className={cx(
                                                                      'form-control mb-2'
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
                                                                    <div className='col-auto'>
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
                                    className={cx('close-btn')}
                                    type='button'
                                    onClick={() => {
                                      resetForm(),
                                        router.push('/test/audiovideotest'),
                                        props.setAddAudioVideoTest(false);
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    className={cx('modalsave-btn')}
                                    type='submit'
                                    onClick={() => {
                                      file?.type?.length === 0 &&
                                        setErrorMessage(true);
                                    }}
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
export default AddAudioVideoTest;
