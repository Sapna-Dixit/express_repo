import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FormikErrors,
} from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { AnyAction } from 'redux';
import Tab from 'react-bootstrap/Tab';
import ReactPlayer from 'react-player';
import { useRouter } from 'next/router';
import Tabs from 'react-bootstrap/Tabs';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {
  faArrowLeft,
  faCirclePlus,
  faPlus,
  faRemove,
  faTrash,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';

import { RootState } from 'redux/store';
import styles from './index.module.css';
import className from 'classnames/bind';
import {
  forms,
  level,
  mediaType,
  options,
  optionsMarks,
} from 'components/Select/SelectOptions';
import { loader } from 'redux/reducer/Loader';
import mainLogo from '../../Images/upload.png';
import { Loader } from 'components/Loader/Loader';
import TextEditor from 'components/Editor/Editor';
import { SelectField } from 'components/Select/Select';
import { classList } from 'components/MemoryTest/GetClassList';
import { addQuestion, putQuestionData } from 'redux/action/Question';

let previousSelect: string | null = 'Objective';

const AddQuestion = (props: { setAddQuestion: (arg0: boolean) => void }) => {
  const router = useRouter();
  const query = router.query;
  const dispatch = useDispatch();
  const sectionId = Cookies.get('sectionId');
  const elementId = Cookies.get('elementId');
  const sectionName = Cookies.get('sectionName');
  const elementName = Cookies.get('elementName');

  const cx = className.bind(styles);

  const sectionData = useSelector(
    (state: RootState) => state?.section?.sectionData?.sections
  );

  const classData = useSelector(
    (state: RootState) => state?.class?.classData?.classes
  );
  const elementData = useSelector(
    (state: RootState) => state?.element?.elementData?.elements
  );
  const load = useSelector((state: RootState) => state?.loader?.loader);

  const particularQuestionData = useSelector(
    (state: RootState) => state?.question?.particularQuestionData
  );
  const token = useSelector((state: RootState) => state?.login?.loginData);

  const [file, setFile] = useState({
    audio: '',
    video: '',
    type: '',
  });
  const [link, setLink] = useState('');
  const [count, setCount] = useState(1);
  const [showInput, setShowInput] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const [multImage, setMultImage] = useState<string[]>([]);
  const [attachment, setAttachment] = useState<File[] | File | ''>([]);
  const [selectForm, setSelectForm] = useState<string | null>('Objective');
  const [selectedImage, setSelectedImage] = useState<File[] | never | FileList>(
    []
  );

  useEffect(() => {
    if (query?.editId?.length) {
      setCount(particularQuestionData?.options?.length);
      setSelectForm(
        particularQuestionData?.type?.charAt(0)?.toUpperCase() +
          particularQuestionData?.type?.slice(1)
      );
      if (particularQuestionData?.type === 'Media') {
        if (
          particularQuestionData?.fileType === 'audio' ||
          particularQuestionData?.fileType === 'video'
        ) {
          setAttachment(particularQuestionData?.files);
          setShowInput('Audio/Video');
          if (particularQuestionData?.fileType === 'audio') {
            setFile({
              audio: particularQuestionData?.files,
              video: '',
              type: 'audio',
            });
          } else {
            particularQuestionData?.link?.length &&
              setLink(particularQuestionData?.link);
            setFile({
              audio: '',
              video: particularQuestionData?.link?.length
                ? particularQuestionData?.link
                : particularQuestionData?.files,
              type: 'video',
            });
          }
        } else if (particularQuestionData?.fileType === 'image') {
          setShowInput('Image');
          setMultImage(particularQuestionData?.image?.slice());
          setSelectedImage(particularQuestionData?.image?.slice());
        }
      }
    }
  }, [
    particularQuestionData.file,
    particularQuestionData?.fileType,
    particularQuestionData?.files,
    particularQuestionData?.image,
    particularQuestionData?.link,
    particularQuestionData?.options?.length,
    particularQuestionData?.type,
    query?.editId?.length,
  ]);

  const dataClass = classData?.map((item: { name: string }) => {
    return { ...item, label: item?.name, value: item?.name };
  });

  const dataSection = sectionData?.map((item: { name: string }) => {
    return { ...item, label: item?.name, value: item?.name };
  });

  const dataElement = elementData?.map((item: { name: string }) => {
    return { ...item, label: item?.name, value: item?.name };
  });

  const validation = () => {
    if (selectForm === 'Subjective') {
      return Yup.object().shape({
        section: Yup.object().shape({
          name: Yup.string().required('Required'),
        }),
        element: Yup.object().shape({
          name: Yup.string().required('Required'),
        }),
        class: Yup.object().shape({
          name: Yup.string().required('Required'),
        }),
        difficultyLevel: Yup.string().required('Required'),
        question: Yup.string().required('Required'),
      });
    } else if (selectForm === 'Objective') {
      return Yup.object().shape({
        options: Yup.array().of(
          Yup.object().shape({
            title: Yup.string().required('Required'),
            percentage: Yup.string().required('Required'),
          })
        ),
        section: Yup.object().shape({
          name: Yup.string().required('Required'),
        }),
        element: Yup.object().shape({
          name: Yup.string().required('Required'),
        }),
        class: Yup.object().shape({
          name: Yup.string().required('Required'),
        }),
        difficultyLevel: Yup.string().required('Required'),
        question: Yup.string().required('Required'),
      });
    } else if (selectForm === 'Media') {
      if (file?.type?.length > 0) {
        return Yup.object().shape({
          options: Yup.array().of(
            Yup.object().shape({
              title: Yup.string().required('Required'),
              percentage: Yup.string().required('Required'),
            })
          ),
          section: Yup.object().shape({
            name: Yup.string().required('Required'),
          }),
          element: Yup.object().shape({
            name: Yup.string().required('Required'),
          }),
          class: Yup.object().shape({
            name: Yup.string().required('Required'),
          }),
          difficultyLevel: Yup.string().required('Required'),
          mediaType: Yup.string().required('Reuired'),
          question: Yup.string().required('Required'),
        });
      } else {
        return Yup.object().shape({
          options: Yup.array().of(
            Yup.object().shape({
              title: Yup.string().required('Required'),
              percentage: Yup.string().required('Required'),
            })
          ),
          section: Yup.object().shape({
            name: Yup.string().required('Required'),
          }),
          element: Yup.object().shape({
            name: Yup.string().required('Required'),
          }),
          class: Yup.object().shape({
            name: Yup.string().required('Required'),
          }),
          difficultyLevel: Yup.string().required('Required'),
          mediaType: Yup.string().required('Reuired'),
          question: Yup.string().required('Required'),
          image: Yup.array().min(1, 'Required'),
        });
      }
    } else if (selectForm === 'True/False') {
      return Yup.object().shape({
        options: Yup.array().of(
          Yup.object().shape({
            title: Yup.string().required('Required'),
            percentage: Yup.string().required('Required'),
          })
        ),
        section: Yup.object().shape({
          name: Yup.string().required('Required'),
        }),
        element: Yup.object().shape({
          name: Yup.string().required('Required'),
        }),
        class: Yup.object().shape({
          name: Yup.string().required('Required'),
        }),
        difficultyLevel: Yup.string().required('Required'),
        question: Yup.string().required('Required'),
      });
    }
  };

  const setSelectObjectValue = useCallback(
    (
      event: { label: string; _id: string },
      setFieldValue: (
        arg0: string,
        arg1: { _id: string; name: string }
      ) => void,
      fieldName: string
    ) => {
      if (event && event?.label && event.label?.length > 0) {
        setFieldValue(`${fieldName}`, { _id: event._id, name: event.label });
      } else {
        setFieldValue(`${fieldName}`, { _id: '', name: '' });
      }
    },
    []
  );

  const setSelectSingleValue = useCallback(
    (
      event: { label: string },
      setFieldValue: (arg0: string, arg1: string) => void,
      fieldName: string
    ) => {
      if (event && event?.label && event?.label?.length > 0) {
        setFieldValue(`${fieldName}`, event.label);
      } else {
        setFieldValue(`${fieldName}`, '');
      }
    },
    []
  );

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
        const fileFormat = item?.type;
        if (fileFormat?.length) {
          setSelectedImage((prev) => [...(prev as File[]), item]);
          setFieldValue('image', [item] as unknown as FileList[]);
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
    multImage?.splice(i, 1);
    setMultImage(multImage);
    if (selectedImage?.length === 0) setFieldValue('image', []);
    selectedImage?.length > 0 && setFieldValue('image', [selectedImage[0]]);
  };

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
  
  return (
    <>
      {(query?.editId === particularQuestionData?._id ||
        query?.editId === undefined) && (
        <div className={cx('flex-style')}>
          <Loader open={load} />
          <div className={cx('parent-section')}>
            <div className={cx('text-btn')}>
              <Formik
                enableReinitialize={selectForm === 'Media' ? false : true}
                initialValues={{
                  type: query?.editId?.length
                    ? particularQuestionData?.type
                    : '',
                  question: query?.editId?.length
                    ? particularQuestionData?.question
                    : '',
                  section: {
                    _id: query?.editId?.length
                      ? particularQuestionData?.section?._id
                      : sectionId
                      ? sectionId
                      : '',
                    name: query?.editId?.length
                      ? particularQuestionData?.section?.name
                      : sectionName
                      ? sectionName
                      : '',
                  },
                  element: {
                    _id: query?.editId?.length
                      ? particularQuestionData?.element?._id
                      : elementId
                      ? elementId
                      : '',
                    name: query?.editId?.length
                      ? particularQuestionData?.element?.name
                      : elementName
                      ? elementName
                      : '',
                  },
                  difficultyLevel: query?.editId?.length
                    ? particularQuestionData?.difficultyLevel
                    : '',
                  class: {
                    _id: query?.editId?.length
                      ? particularQuestionData?.class?._id
                      : '',
                    name: query?.editId?.length
                      ? particularQuestionData?.class?.name
                      : '',
                  },
                  options: query?.editId?.length
                    ? particularQuestionData?.options?.length === 0
                      ? [{ title: '', percentage: '' }]
                      : (particularQuestionData?.options as [])
                    : [{ title: '', percentage: '' }],
                  mediaType: query?.editId?.length
                    ? particularQuestionData?.fileType
                        ?.charAt(0)
                        .toUpperCase() +
                      particularQuestionData?.fileType?.slice(1)
                    : '',
                  link: query?.editId?.length
                    ? particularQuestionData?.link
                    : '',
                  files: attachment as File,
                  fileType: query?.editId?.length
                    ? particularQuestionData?.fileType
                    : '',
                  image: query?.editId?.length
                    ? particularQuestionData?.image
                    : [],
                }}
                validationSchema={validation()}
                onSubmit={(values) => {
                  Cookies.remove('elementId');
                  Cookies.remove('sectionId');
                  Cookies.remove('sectionName');
                  Cookies.remove('elementName');
                  values.type = selectForm as string;
                  values.fileType = file?.type;
                  if (selectForm === 'Objective') {
                    const formData = new FormData();
                    formData.append('type', values?.type);
                    formData.append('question', values?.question);
                    formData.append(
                      'options',
                      JSON.stringify(values?.options as unknown as string)
                    );
                    formData.append('section', JSON.stringify(values?.section));
                    formData.append('element', JSON.stringify(values?.element));
                    formData.append('difficultyLevel', values?.difficultyLevel);
                    formData.append('class', JSON.stringify(values?.class));
                    query?.editId?.length
                      ? dispatch(
                          putQuestionData(
                            query?.editId as string,
                            formData,
                            token,
                            props.setAddQuestion,
                            router
                          ) as unknown as AnyAction
                        )
                      : dispatch(
                          addQuestion(
                            formData,
                            token,
                            props.setAddQuestion,
                            router
                          ) as unknown as AnyAction
                        );
                  } else if (selectForm === 'Subjective') {
                    const formData = new FormData();
                    formData.append('type', values?.type);
                    formData.append('question', values?.question);
                    formData.append('section', JSON.stringify(values?.section));
                    formData.append('element', JSON.stringify(values?.element));
                    formData.append('difficultyLevel', values?.difficultyLevel);
                    formData.append('class', JSON.stringify(values?.class));
                    query?.editId?.length
                      ? dispatch(
                          putQuestionData(
                            query?.editId as string,
                            formData,
                            token,
                            props.setAddQuestion,
                            router
                          ) as unknown as AnyAction
                        )
                      : dispatch(
                          addQuestion(
                            formData,
                            token,
                            props.setAddQuestion,
                            router
                          ) as unknown as AnyAction
                        );
                  } else if (selectForm === 'Media') {
                    const formData = new FormData();
                    formData.append('type', values?.type);
                    formData.append('question', values?.question);
                    formData.append('section', JSON.stringify(values?.section));
                    formData.append('element', JSON.stringify(values?.element));
                    formData.append('difficultyLevel', values?.difficultyLevel);
                    formData.append('class', JSON.stringify(values?.class));
                    formData.append(
                      'options',
                      JSON.stringify(values?.options as unknown as string)
                    );
                    if (values?.mediaType === 'Image') {
                      formData.append('fileType', 'image');
                      formData.append('link', '');
                    } else {
                      formData.append('link', link);
                      formData.append('fileType', values?.fileType);
                    }
                    if (showInput !== 'Image') {
                      query?.editId?.length
                        ? formData.append('files', attachment as string)
                        : (attachment as File[])[0] !== undefined
                        ? formData.append('files', (attachment as File[])[0])
                        : formData.append('files', '');
                    } else {
                      formData.append('files', '');
                      (selectedImage as File[])?.map((image: string | Blob) => {
                        formData.append('image', image);
                      });
                    }
                    dispatch(loader(true));
                    query?.editId?.length
                      ? dispatch(
                          putQuestionData(
                            query?.editId as string,
                            formData,
                            token,
                            props.setAddQuestion,
                            router
                          ) as unknown as AnyAction
                        )
                      : dispatch(
                          addQuestion(
                            formData,
                            token,
                            props.setAddQuestion,
                            router
                          ) as unknown as AnyAction
                        );
                  } else if (selectForm === 'True/False') {
                    const formData = new FormData();
                    formData.append('type', values?.type);
                    formData.append('question', values?.question);
                    formData.append(
                      'options',
                      JSON.stringify(values?.options as unknown as string)
                    );
                    formData.append('section', JSON.stringify(values?.section));
                    formData.append('element', JSON.stringify(values?.element));
                    formData.append('difficultyLevel', values?.difficultyLevel);
                    formData.append('class', JSON.stringify(values?.class));
                    query?.editId?.length
                      ? dispatch(
                          putQuestionData(
                            query?.editId as string,
                            formData,
                            token,
                            props.setAddQuestion,
                            router
                          ) as unknown as AnyAction
                        )
                      : dispatch(
                          addQuestion(
                            formData,
                            token,
                            props.setAddQuestion,
                            router
                          ) as unknown as AnyAction
                        );
                  }
                }}
              >
                {({
                  setFieldValue,
                  setFieldTouched,
                  resetForm,
                  values,
                  errors,
                  touched,
                }) => (
                  <Form>
                    <div
                      className={cx('animate__animated animate__slideInRight')}
                    >
                      <div className={cx('card')}>
                        <div className={cx('add-scroll')}>
                          <div className={cx('card-table')}>
                            <div className={cx('card-flex')}>
                              <FontAwesomeIcon
                                icon={faArrowLeft}
                                className={cx('back-img')}
                                onClick={() => {
                                  resetForm();
                                  setAttachment([]);
                                  setSelectedImage([]);
                                  setMultImage([]);
                                  setLink('');
                                  props.setAddQuestion(false),
                                    router.push('/question'),
                                    Cookies.remove('elementId'),
                                    Cookies.remove('sectionId'),
                                    Cookies.remove('sectionName'),
                                    Cookies.remove('elementName');
                                }}
                              />

                              <h4>
                                {' '}
                                {query?.editId && query?.editId?.length > 0
                                  ? 'Edit Question'
                                  : 'Add Question'}
                              </h4>
                            </div>
                            <div className='label-floating my-1'>
                              <Tabs
                                defaultActiveKey={
                                  query?.editId?.length
                                    ? particularQuestionData?.type
                                        ?.charAt(0)
                                        ?.toUpperCase() +
                                        particularQuestionData?.type?.slice(
                                          1
                                        ) ===
                                      'Image'
                                      ? 'Media'
                                      : particularQuestionData?.type
                                          ?.charAt(0)
                                          ?.toUpperCase() +
                                          particularQuestionData?.type?.slice(
                                            1
                                          ) ===
                                        'Audio'
                                      ? 'Media'
                                      : particularQuestionData?.type
                                          ?.charAt(0)
                                          ?.toUpperCase() +
                                          particularQuestionData?.type?.slice(
                                            1
                                          ) ===
                                        'Video'
                                      ? 'Media'
                                      : particularQuestionData?.type
                                          ?.charAt(0)
                                          ?.toUpperCase() +
                                        particularQuestionData?.type?.slice(1)
                                    : 'Objective'
                                }
                                transition={false}
                                onSelect={(e) => {
                                  setSelectForm(e);
                                  e !== previousSelect &&
                                  previousSelect !== undefined
                                    ? ((previousSelect = e), resetForm())
                                    : (previousSelect = e);
                                  setCount(1);
                                }}
                                id='noanim-tab-example'
                                className={`${
                                  query?.editId &&
                                  query?.editId?.length &&
                                  'disable'
                                }`}
                              >
                                {forms?.map(({ menuName }, index) => (
                                  <Tab
                                    eventKey={menuName}
                                    title={menuName}
                                    key={index}
                                    disabled={
                                      query?.editId?.length ? true : false
                                    }
                                  >
                                    {(selectForm === 'Media' ||
                                      selectForm === 'Video' ||
                                      selectForm === 'Image' ||
                                      selectForm === 'Audio') && (
                                      <>
                                        <Row className={cx('mob-style my-2')}>
                                          <Col>
                                            <h6 className={cx('my-2')}>
                                              Media Type
                                            </h6>
                                            <SelectField
                                              name='mediaType'
                                              options={mediaType}
                                              value={
                                                query?.editId?.length
                                                  ? values?.mediaType ===
                                                    'Audio'
                                                    ? 'Audio/Video'
                                                    : values.mediaType ===
                                                      'Video'
                                                    ? 'Audio/Video'
                                                    : 'Image'
                                                  : values.mediaType
                                              }
                                              onChange={(e) => {
                                                (e as SelectType)?.label ===
                                                'Image'
                                                  ? (setAttachment([]),
                                                    setLink(''),
                                                    setFile({
                                                      audio: '',
                                                      video: '',
                                                      type: '',
                                                    }))
                                                  : (setMultImage([]),
                                                    setSelectedImage([])),
                                                  setFieldValue(
                                                    'mediaType',
                                                    e &&
                                                      (e as SelectType)
                                                        ?.label &&
                                                      (e as SelectType)?.label
                                                        ?.length > 0
                                                      ? (e as SelectType).label
                                                      : ''
                                                  );
                                                e &&
                                                (e as SelectType)?.label &&
                                                (e as SelectType)?.label
                                                  ?.length > 0
                                                  ? setShowInput(
                                                      (e as SelectType).label
                                                    )
                                                  : setShowInput('');
                                              }}
                                              placeholder='Select MediaType'
                                              onBlur={setFieldTouched}
                                              applyValidation={
                                                previousSelect as string
                                              }
                                              error={
                                                errors?.mediaType as string
                                              }
                                              touched={
                                                touched?.mediaType as boolean
                                              }
                                            />
                                          </Col>
                                        </Row>
                                        {showInput && showInput === 'Image' ? (
                                          <>
                                            <div
                                              className={cx('relative-style')}
                                            >
                                              <div>
                                                <div className='flex gap-2 relative'>
                                                  {multImage?.length > 0 ? (
                                                    <div
                                                      className={cx(
                                                        'flex-wrap'
                                                      )}
                                                    >
                                                      {multImage?.map(
                                                        (item, i: number) => (
                                                          <div
                                                            key={i}
                                                            className='h-20'
                                                          >
                                                            <div
                                                              className={cx(
                                                                'cursor-pointer'
                                                              )}
                                                            >
                                                              <div
                                                                className={cx(
                                                                  'remove-top'
                                                                )}
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
                                                                          icon={
                                                                            faRemove
                                                                          }
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
                                                        )
                                                      )}
                                                      <h1
                                                        className={cx(
                                                          'plus-style'
                                                        )}
                                                      >
                                                        <FontAwesomeIcon
                                                          icon={faCirclePlus}
                                                          className={cx(
                                                            'cursor-pointer'
                                                          )}
                                                        />
                                                        <div
                                                          className={cx(
                                                            'avatar-edit'
                                                          )}
                                                        >
                                                          <input
                                                            type='file'
                                                            name='image'
                                                            accept='image/*'
                                                            multiple
                                                            onChange={(
                                                              event: ChangeEvent<HTMLInputElement>
                                                            ): void => {
                                                              imageOnChange(
                                                                event?.target
                                                                  ?.files,
                                                                setFieldValue
                                                              );
                                                            }}
                                                            onBlur={() =>
                                                              setFieldTouched(
                                                                'image',
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
                                                          className={cx(
                                                            'cursor-pointer'
                                                          )}
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
                                                    <div
                                                      className={cx(
                                                        'avatar-edit'
                                                      )}
                                                    >
                                                      <input
                                                        id='upload-box-photo'
                                                        type='file'
                                                        name='image'
                                                        accept='image/*'
                                                        multiple
                                                        onChange={(
                                                          event: ChangeEvent<HTMLInputElement>
                                                        ): void => {
                                                          imageOnChange(
                                                            event?.target
                                                              ?.files,
                                                            setFieldValue
                                                          );
                                                        }}
                                                        onBlur={() =>
                                                          setFieldTouched(
                                                            'image',
                                                            true
                                                          )
                                                        }
                                                        className={cx(
                                                          ' d-none'
                                                        )}
                                                      />
                                                    </div>
                                                  ) : (
                                                    <></>
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                            <ErrorMessage
                                              name='image'
                                              component='span'
                                              className='error-message'
                                            />
                                          </>
                                        ) : showInput === 'Audio/Video' ? (
                                          <>
                                            <Row className={cx('mb-2')}>
                                              <Col sm={6}>
                                                <h6
                                                  className={cx('label-style')}
                                                >
                                                  File Upload{' '}
                                                </h6>
                                                <div
                                                  className={cx(
                                                    'avatar-upload'
                                                  )}
                                                >
                                                  <div
                                                    className={cx(
                                                      'avatar-edit'
                                                    )}
                                                  >
                                                    <input
                                                      type='file'
                                                      accept='audio/*,video/*'
                                                      id='imageUpload'
                                                      onChange={(
                                                        event: ChangeEvent<HTMLInputElement>
                                                      ): void => {
                                                        filehandler(
                                                          event?.target?.files
                                                        );
                                                      }}
                                                    />
                                                  </div>

                                                  <label
                                                    htmlFor='imageUpload'
                                                    className={cx(
                                                      'avatar-preview'
                                                    )}
                                                  >
                                                    <div
                                                      className={cx(
                                                        'img-uploads'
                                                      )}
                                                    >
                                                      <div
                                                        className={cx(
                                                          'curson-pointer'
                                                        )}
                                                      >
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
                                                {errorMessage &&
                                                  file?.type?.length === 0 && (
                                                    <p className='error-message'>
                                                      Required
                                                    </p>
                                                  )}
                                                <h6
                                                  className={cx('label-style')}
                                                >
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
                                                    setFieldValue(
                                                      'link',
                                                      e?.target?.value
                                                    );
                                                  }}
                                                  autoComplete='off'
                                                />
                                                {errorMessage &&
                                                  file?.type?.length === 0 && (
                                                    <p className='error-message'>
                                                      Required
                                                    </p>
                                                  )}
                                              </Col>
                                              <Col sm={6}>
                                                {file?.type?.length &&
                                                file?.video?.length > 0 ? (
                                                  <div>
                                                    <h6
                                                      className={cx(
                                                        'label-style'
                                                      )}
                                                    >
                                                      Video
                                                    </h6>

                                                    <div
                                                      className={cx(
                                                        'video-upload'
                                                      )}
                                                    >
                                                      {file?.video?.length >
                                                        0 && (
                                                        <ReactPlayer
                                                          url={file.video}
                                                          className='w-full'
                                                          width='100%'
                                                          height='200px'
                                                          controls
                                                        />
                                                      )}
                                                      <div
                                                        className={cx(
                                                          'edit-video'
                                                        )}
                                                      >
                                                        <div
                                                          className={cx(
                                                            'remove-xmark'
                                                          )}
                                                          onClick={() =>
                                                            removeFile(
                                                              setFieldValue
                                                            )
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
                                                ) : (
                                                  file?.type?.length > 0 && (
                                                    <div>
                                                      <h6
                                                        className={cx(
                                                          'label-style'
                                                        )}
                                                      >
                                                        Audio
                                                      </h6>
                                                      <div
                                                        className={cx(
                                                          'audio-upload'
                                                        )}
                                                      >
                                                        {file.audio?.length >
                                                          0 && (
                                                          <ReactPlayer
                                                            url={file.audio}
                                                            className='w-full'
                                                            width='100%'
                                                            height='80px'
                                                            controls
                                                          />
                                                        )}
                                                        <div
                                                          className={cx(
                                                            'edit-video'
                                                          )}
                                                        >
                                                          <div
                                                            className={cx(
                                                              'remove-xmark'
                                                            )}
                                                            onClick={() =>
                                                              removeFile(
                                                                setFieldValue
                                                              )
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
                                          </>
                                        ) : (
                                          ''
                                        )}
                                      </>
                                    )}
                                    <h6 className={cx('my-2')}> Question</h6>
                                    <div>
                                      <TextEditor
                                        name='question'
                                        placeholder='Enter Question'
                                        todo='create'
                                        editorValue={
                                          query?.editId && query?.editId?.length
                                            ? particularQuestionData?.question
                                            : values?.question
                                        }
                                        onChange={setFieldValue}
                                        onBlur={setFieldTouched}
                                      />
                                      {errors?.question && (
                                        <p className='error-message'>{` ${`${errors?.question}`}`}</p>
                                      )}
                                    </div>
                                    <div>
                                      {(menuName === 'Objective' ||
                                        menuName === 'Media') && (
                                        <div className={cx('my-2')}>
                                          <h6>Options</h6>
                                        </div>
                                      )}
                                      {(selectForm === 'Objective' ||
                                        selectForm === 'Media' ||
                                        selectForm === 'Audio' ||
                                        selectForm === 'Video' ||
                                        selectForm === 'Image') && (
                                        <FieldArray
                                          name='options'
                                          render={(arrayHelpers) => (
                                            <div>
                                              {values?.options?.map(
                                                (
                                                  friend: unknown,
                                                  index: number
                                                ) => (
                                                  <div key={index}>
                                                    <div className='row'>
                                                      <div className='col-sm-6'>
                                                        <div className='row'>
                                                          <div className='col-auto'></div>
                                                          <div className='col ps-0'>
                                                            {' '}
                                                            <Field
                                                              name={`options[${index}].title`}
                                                              className={cx(
                                                                'form-control '
                                                              )}
                                                              placeholder='Enter Option'
                                                              onChange={(e: {
                                                                target: {
                                                                  value: string;
                                                                };
                                                              }) => {
                                                                setFieldValue(
                                                                  `options[${index}].title`,
                                                                  e?.target?.value?.replace(
                                                                    /  +/g,
                                                                    ' '
                                                                  )
                                                                );
                                                              }}
                                                              autoComplete='off'
                                                            />
                                                            <ErrorMessage
                                                              name={`options[${index}].title`}
                                                              component='span'
                                                              className='error-message '
                                                            />
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div className='col-sm-6'>
                                                        <div className='row'>
                                                          <div className='col pe-0'>
                                                            <SelectField
                                                              name={`options[${index}].percentage`}
                                                              options={
                                                                optionsMarks
                                                              }
                                                              value={
                                                                values?.options[
                                                                  index as number
                                                                ]?.percentage
                                                              }
                                                              placeholder='Select Percentage'
                                                              onChange={(e) => {
                                                                setFieldValue(
                                                                  `options[${index}].percentage`,
                                                                  e &&
                                                                    (
                                                                      e as SelectType
                                                                    )?.label &&
                                                                    (
                                                                      e as SelectType
                                                                    )?.label
                                                                      ?.length >
                                                                      0
                                                                    ? (
                                                                        e as SelectType
                                                                      )?.label
                                                                    : ''
                                                                );
                                                              }}
                                                              onBlur={
                                                                setFieldTouched
                                                              }
                                                              error={
                                                                errors?.options !==
                                                                  undefined &&
                                                                (
                                                                  errors
                                                                    ?.options[
                                                                    index
                                                                  ] as FormikErrors<{
                                                                    percentage: string;
                                                                  }>
                                                                )?.percentage
                                                              }
                                                              touched={
                                                                touched?.options !==
                                                                  undefined &&
                                                                touched
                                                                  ?.options[
                                                                  index
                                                                ]?.percentage
                                                              }
                                                            />
                                                          </div>
                                                          <div className='col-auto'>
                                                            <div
                                                              className={cx(
                                                                'icon-style'
                                                              )}
                                                            >
                                                              {index ===
                                                                count - 1 &&
                                                              count < 6 ? (
                                                                <>
                                                                  <div
                                                                    className={cx(
                                                                      'addoption-icon'
                                                                    )}
                                                                    onClick={() => {
                                                                      arrayHelpers?.insert(
                                                                        index +
                                                                          count,
                                                                        {
                                                                          title:
                                                                            '',
                                                                          percentage:
                                                                            '',
                                                                        }
                                                                      ),
                                                                        setCount(
                                                                          count +
                                                                            1
                                                                        );
                                                                    }}
                                                                  >
                                                                    <FontAwesomeIcon
                                                                      icon={
                                                                        faPlus
                                                                      }
                                                                      title='Add'
                                                                    />
                                                                  </div>
                                                                  {index ===
                                                                    0 && (
                                                                    <div id='hidebox'></div>
                                                                  )}
                                                                  {count >
                                                                    1 && (
                                                                    <div
                                                                      className={cx(
                                                                        'removeoption-icon'
                                                                      )}
                                                                      onClick={() => {
                                                                        arrayHelpers?.remove(
                                                                          index as number
                                                                        ),
                                                                          setCount(
                                                                            (
                                                                              count
                                                                            ) =>
                                                                              count -
                                                                              1
                                                                          );
                                                                      }}
                                                                    >
                                                                      <FontAwesomeIcon
                                                                        icon={
                                                                          faTrash
                                                                        }
                                                                        title='Delete'
                                                                      />
                                                                    </div>
                                                                  )}{' '}
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
                                                                          (
                                                                            count
                                                                          ) =>
                                                                            count -
                                                                            1
                                                                        );
                                                                    }}
                                                                  >
                                                                    <FontAwesomeIcon
                                                                      icon={
                                                                        faTrash
                                                                      }
                                                                      title='Delete'
                                                                    />
                                                                  </div>
                                                                  <div id='hidebox'></div>
                                                                </>
                                                              )}
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>

                                                    <Row
                                                      className={cx(
                                                        ' mt-1 mb-2'
                                                      )}
                                                    >
                                                      <Col
                                                        className={cx(
                                                          'flex-icon-1'
                                                        )}
                                                      >
                                                        <div className='col'></div>
                                                        <div className='col'></div>
                                                      </Col>
                                                    </Row>
                                                  </div>
                                                )
                                              )}
                                            </div>
                                          )}
                                        />
                                      )}
                                    </div>
                                  </Tab>
                                ))}
                              </Tabs>
                              {selectForm === 'True/False' && (
                                <Row className='my-3'>
                                  <Col>
                                    <h6>True/False</h6>
                                    <SelectField
                                      name='answer'
                                      options={options}
                                      value={values?.options[0].title}
                                      onChange={(e) =>
                                        (e as SelectType).label?.length > 0
                                          ? (e as SelectType).label === 'True'
                                            ? setFieldValue(`options`, [
                                                {
                                                  title: 'True',
                                                  percentage: '100%',
                                                },
                                                {
                                                  title: 'False',
                                                  percentage: '0%',
                                                },
                                              ])
                                            : setFieldValue(`options`, [
                                                {
                                                  title: 'False',
                                                  percentage: '100%',
                                                },
                                                {
                                                  title: 'True',
                                                  percentage: '0%',
                                                },
                                              ])
                                          : setFieldValue(`options`, [
                                              {
                                                title: '',
                                                percentage: '',
                                              },
                                            ])
                                      }
                                      placeholder='True/False'
                                      applyValidation={previousSelect as string}
                                      onBlur={setFieldTouched}
                                      error={
                                        errors?.options !== undefined &&
                                        (
                                          errors?.options[0] as FormikErrors<{
                                            title: string;
                                          }>
                                        )?.title
                                      }
                                      touched={
                                        touched?.options !== undefined &&
                                        touched?.options[0]?.title
                                      }
                                    />
                                  </Col>
                                </Row>
                              )}
                              <Row className='my-3'>
                                <Col>
                                  <h6> Section</h6>
                                  <SelectField
                                    name='section.name'
                                    options={dataSection?.sort(
                                      (
                                        a: { name: string },
                                        b: { name: string }
                                      ) => a?.name?.localeCompare(b?.name)
                                    )}
                                    value={values?.section?.name}
                                    placeholder='Select Section'
                                    onChange={(e) => {
                                      setFieldValue(
                                        `section`,
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
                                      );
                                      setFieldValue(
                                        `element`,
                                        e &&
                                          (e as SelectType)?.label &&
                                          (e as SelectType)?.label?.length > 0
                                          ? {
                                              _id: '',
                                              name: '',
                                            }
                                          : {
                                              _id: '',
                                              name: '',
                                            }
                                      );
                                    }}
                                    onBlur={setFieldTouched}
                                    error={errors?.section?.name as string}
                                    touched={touched?.section?.name as boolean}
                                  />
                                </Col>
                                <Col>
                                  <h6> Elements</h6>
                                  <SelectField
                                    name='element.name'
                                    options={dataElement
                                      ?.filter(
                                        (e: { section: { _id: string } }) => {
                                          return (
                                            e?.section?._id ===
                                              values?.section?._id ||
                                            !values?.section?._id
                                          );
                                        }
                                      )
                                      ?.sort(
                                        (
                                          a: { name: string },
                                          b: { name: string }
                                        ) => a?.name?.localeCompare(b?.name)
                                      )}
                                    value={values?.element?.name}
                                    placeholder='Select Element'
                                    onChange={(e) => {
                                      setFieldValue(
                                        `element`,
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
                                      );
                                      e &&
                                        (e as unknown as elementDataType)
                                          ?.section &&
                                        (e as unknown as elementDataType)
                                          ?.section?.name?.length > 0 &&
                                        setFieldValue(
                                          `section`,
                                          e &&
                                            (e as unknown as elementDataType)
                                              ?.section &&
                                            (e as unknown as elementDataType)
                                              ?.section?.name?.length > 0 && {
                                              _id: (
                                                e as unknown as elementDataType
                                              )?.section?._id,
                                              name: (
                                                e as unknown as elementDataType
                                              )?.section?.name,
                                            }
                                        );
                                    }}
                                    onBlur={setFieldTouched}
                                    error={errors?.element?.name as string}
                                    touched={touched?.element?.name as boolean}
                                  />
                                </Col>
                              </Row>

                              <Row className='my-3'>
                                <Col>
                                  <h6> Difficulty Level</h6>
                                  <SelectField
                                    name='difficultyLevel'
                                    options={level}
                                    value={values?.difficultyLevel}
                                    onChange={(e) =>
                                      setSelectSingleValue(
                                        e as SelectType,
                                        setFieldValue,
                                        'difficultyLevel'
                                      )
                                    }
                                    placeholder='Select Difficulty Level'
                                    applyValidation={previousSelect as string}
                                    onBlur={setFieldTouched}
                                    error={errors?.difficultyLevel as string}
                                    touched={
                                      touched?.difficultyLevel as boolean
                                    }
                                  />
                                </Col>
                                <Col>
                                  <h6>Class</h6>
                                  <SelectField
                                    name='class.name'
                                    options={classList(dataClass)}
                                    value={values?.class?.name}
                                    onChange={(e) =>
                                      setSelectObjectValue(
                                        e as SelectType1,
                                        setFieldValue,
                                        'class'
                                      )
                                    }
                                    placeholder='Select Class'
                                    onBlur={setFieldTouched}
                                    applyValidation={previousSelect as string}
                                    error={errors?.class?.name as string}
                                    touched={touched?.class?.name as boolean}
                                  />
                                </Col>
                              </Row>

                              <div className={cx('save-close')}>
                                <Button
                                  className={cx('close-btn')}
                                  onClick={() => {
                                    resetForm();
                                    setAttachment([]);
                                    setSelectedImage([]);
                                    setMultImage([]);
                                    setLink('');
                                    props.setAddQuestion(false);
                                    router.push('/question');
                                    Cookies.remove('elementId');
                                    Cookies.remove('sectionId');
                                    Cookies.remove('sectionName');
                                    Cookies.remove('elementName');
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
export default AddQuestion;
