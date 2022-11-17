import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import ReactPlayer from 'react-player';
import Tabs from 'react-bootstrap/Tabs';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Select, { GroupBase } from 'react-select';
// import { useSpeechSynthesis } from 'react-speech-kit';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './index.module.css';
import className from 'classnames/bind';
import { RootState } from 'redux/store';
import {
  partCounseling,
  percentageCounseling1,
} from 'components/Select/SelectOptions';
import { classList } from 'components/MemoryTest/GetClassList';

let counselingDataInString: string[];

const PreviewModal = (props: {
  show: boolean | undefined;
  onClose: () => void;
  setSelectClass: (arg0: string) => void;
  setDownload: (arg0: boolean) => void;
  setPercentage: (arg0: string) => void;
  setPart: (arg0: string) => void;
  content: {
    segment: string;
    element: { name: string };
    class: { name: string };
    percentage: string;
    part: string;
    english: string;
    hindi: string;
  }[];
}) => {
  const regex = /<[^>]*>/gim;
  const cx = className.bind(styles);

  // const { speak, cancel } = useSpeechSynthesis();

  const classData = useSelector(
    (state: RootState) => state?.class?.classData?.classes
  );

  const [classNamee, setClassNamee] = useState('');
  const [speechEnglish, setSpeechEnglish] = useState(false);
  const [speechHindi, setSpeechHindi] = useState(false);

  const dataClass = classData?.map((item: { name: string }) => {
    return { ...item, label: item?.name, value: item?.name };
  });

  counselingDataInString = [];

  return (
    <>
      <Modal
        show={props.show}
        size='xl'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <div>
          <Modal.Header>
            <div className={cx('modal-close')}>
              <div>
                <Modal.Title id='contained-modal-title-vcenter'>
                  Counseling Report
                </Modal.Title>
              </div>
              <div
                onClick={() => {
                  props.onClose(),
                    props.setPart(''),
                    props.setPercentage(''),
                    setSpeechEnglish(false),
                    setSpeechHindi(false),
                    // cancel(),
                    props.setSelectClass(''),
                    props.setDownload(false),
                    setClassNamee('');
                }}
              >
                <FontAwesomeIcon icon={faXmark} className={cx('cross-icon')} />
              </div>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className='row mb-4'>
              <div className='col-4'>
                <h6 className={cx('label-style')}>Class</h6>
                <Select
                  name='class'
                  options={
                    classList(dataClass) as unknown as readonly (
                      | string
                      | GroupBase<string>
                    )[]
                  }
                  defaultValue=''
                  onChange={(e) =>
                    (e as unknown as SelectType)?.label &&
                    (e as unknown as SelectType)?.label?.length > 0
                      ? (props.setSelectClass(
                          (e as unknown as SelectType).label
                        ),
                        setClassNamee((e as unknown as SelectType).label))
                      : (props.setSelectClass(''), setClassNamee(''))
                  }
                  isClearable
                  placeholder='Select Class'
                />
              </div>
              <div className='col-4'>
                <h6 className={cx('label-style')}> Percentage </h6>
                <Select
                  name='class'
                  options={
                    percentageCounseling1 as unknown as readonly (
                      | string
                      | GroupBase<string>
                    )[]
                  }
                  defaultValue=''
                  isClearable
                  onChange={(e) =>
                    (e as unknown as SelectType)?.label &&
                    (e as unknown as SelectType)?.label?.length > 0
                      ? props.setPercentage((e as unknown as SelectType).label)
                      : props.setPercentage('')
                  }
                  placeholder='Select Percentage'
                />
              </div>
              <div className='col-4'>
                <h6 className={cx('label-style')}> Part </h6>
                <Select
                  name='class'
                  options={
                    partCounseling as unknown as readonly (
                      | string
                      | GroupBase<string>
                    )[]
                  }
                  isClearable
                  defaultValue=''
                  onChange={(e) =>
                    (e as unknown as SelectType)?.label &&
                    (e as unknown as SelectType)?.label?.length > 0
                      ? props.setPart((e as unknown as SelectType).label)
                      : props.setPart('')
                  }
                  placeholder='Select Part'
                />
              </div>
            </div>
            <div className='my-2'></div>
            {props.content?.length > 0 ? (
              <div className='preview-doc'>
                <Tabs
                  defaultActiveKey='english'
                  id='justify-tab-example'
                  className='mb-1'
                  variant='tabs'
                >
                  <Tab className='nav-base' eventKey='english' title='English'>
                    <>
                      <div className='doc-heading'>Class {classNamee}</div>
                      <div>
                        {props?.content?.map((item, index) => {
                          const aa = item?.segment?.concat(
                            ' ',
                            item?.element?.name?.concat(
                              ' ',
                              item?.percentage?.concat(
                                ' ',
                                item?.english
                                  ?.replace(regex, '')
                                  ?.replace(/\&nbsp;/g, '')
                                  ?.replace(/\§/g, '')
                                  ?.concat(
                                    ' ',
                                    item?.hindi
                                      ?.replace(regex, '')
                                      ?.replace(/\&nbsp;/g, '')
                                      ?.replace(/\§/g, '')
                                  )
                              )
                            )
                          );
                          counselingDataInString.push(aa);
                          return (
                            <>
                              <div style={{ fontSize: '24px' }}>
                                {item.segment}
                              </div>
                              <br />
                              <ul>
                                <li key={index} className='text-size'>
                                  {item.element.name} ({`${item.percentage}`})%
                                </li>
                              </ul>
                              <p
                                style={{ fontSize: '16px', marginLeft: '32px' }}
                              >
                                {item.english !== undefined &&
                                  item.english
                                    .replace(regex, '')
                                    .replace(/\&nbsp;/g, '')}
                              </p>
                              <br />
                            </>
                          );
                        })}
                      </div>
                    </>
                  </Tab>
                  <Tab className='nav-base' eventKey='hindi' title='Hindi'>
                    <>
                      <div className='doc-heading'>Class {classNamee}</div>
                      <div>
                        {props?.content?.map((item, index) => {
                          const aa = item?.segment?.concat(
                            ' ',
                            item?.element?.name?.concat(
                              ' ',
                              item?.percentage?.concat(
                                ' ',
                                item?.english
                                  ?.replace(regex, '')
                                  ?.replace(/\&nbsp;/g, '')
                                  ?.replace(/\§/g, '')
                                  ?.concat(
                                    ' ',
                                    item?.hindi
                                      ?.replace(regex, '')
                                      ?.replace(/\&nbsp;/g, '')
                                      ?.replace(/\§/g, '')
                                  )
                              )
                            )
                          );
                          counselingDataInString.push(aa);
                          return (
                            <>
                              <div style={{ fontSize: '24px' }}>
                                {item.segment}
                              </div>
                              <br />
                              <ul>
                                <li key={index} className='text-size'>
                                  {item.element.name} ({`${item.percentage}`})%
                                </li>
                              </ul>
                              <p
                                style={{ fontSize: '16px', marginLeft: '32px' }}
                              >
                                {item.hindi !== undefined &&
                                  item.hindi
                                    .replace(regex, '')
                                    .replace(/\&nbsp;/g, '')}
                              </p>
                              <br />
                            </>
                          );
                        })}
                      </div>
                    </>
                  </Tab>
                </Tabs>
              </div>
            ) : (
              <div className='no-record'>
                {' '}
                <h3>No Counseling Found</h3>
              </div>
            )}
            {speechEnglish && (
              <div className='text-to-speech'>
                <ReactPlayer
                  url={`https://res.cloudinary.com/dmf13ip2g/video/upload/v1666082566/hz0tj0dprznfregxm9cd.mp3`}
                  playing
                  controls={true}
                />
              </div>
            )}
            {speechHindi && (
              <div className='text-to-speech'>
                <ReactPlayer
                  url={`https://res.cloudinary.com/dmf13ip2g/video/upload/v1666092766/s3s42ia1sid23sialsv5.mp3`}
                  playing
                  controls={true}
                />
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              className={cx('close-btn')}
              onClick={() => {
                props.onClose(),
                  props.setPart(''),
                  // cancel(),
                  setSpeechEnglish(false),
                  setSpeechHindi(false),
                  props.setPercentage(''),
                  props.setSelectClass(''),
                  props.setDownload(false),
                  setClassNamee('');
              }}
            >
              <div>Close</div>
            </Button>
            {props.content?.length > 0 && (
              <Button
                className={cx('sucess-btn')}
                onClick={() => props.setDownload(true)}
              >
                <div>Download</div>
              </Button>
            )}{' '}
            {props.content?.length > 0 && (
              <Button
                className={cx('sucess-btn')}
                onClick={() => {
                  setSpeechEnglish(true), setSpeechHindi(false);
                }}
              >
                <div>Speech In English</div>
              </Button>
            )}{' '}
            {props.content?.length > 0 && (
              <Button
                className={cx('sucess-btn')}
                onClick={() => {
                  setSpeechHindi(true), setSpeechEnglish(false);
                }}
              >
                <div>Speech In Hindi</div>
              </Button>
            )}{' '}
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
};
export default PreviewModal;






