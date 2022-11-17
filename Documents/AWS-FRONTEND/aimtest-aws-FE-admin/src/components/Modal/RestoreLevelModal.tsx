import { AnyAction } from 'redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { RootState } from 'redux/store';
import styles from './index.module.css';
import className from 'classnames/bind';
import { loader } from 'redux/reducer/Loader';
import { restoreData } from 'redux/reducer/Restore';
import { restoreExamData } from 'redux/action/Exam';
import { restoreClassData } from 'redux/action/Class';
import { restoreElementData } from 'redux/action/Element';
import { restoreSectionData } from 'redux/action/Section';
import { restoreSegmentData } from 'redux/action/Segment';
import { restoreCounselingData } from 'redux/action/Counseling';
import { restoreWordTestData } from 'redux/action/Test/WordTest';
import { restoreSignTestData } from 'redux/action/Test/SignTest';
import { restoreSignTestLevel } from 'redux/action/Level/SignTest';
import { restoreWordTestLevel } from 'redux/action/Level/WordTest';
import { restoreImageTestLevel } from 'redux/action/Level/ImageTest';
import { restoreNumberTestData } from 'redux/action/Test/NumberTest';
import { restoreNumberTestLevel } from 'redux/action/Level/NumberTest';
import { restoreSegmentElementData } from 'redux/action/SegmentElement';
import { restoreCalculationTest } from 'redux/action/Test/CalculationTest';
import { restoreCalculationTestLevel } from 'redux/action/Level/CalculationTest';

const RestoreLevelModal = (props: modalType) => {
  const dispatch = useDispatch();
  const cx = className.bind(styles);

  const token = useSelector((state: RootState) => state?.login?.loginData);

  const handleRestore = () => {
    dispatch(loader(true));
    props.modalName === 'Element'
      ? dispatch(
          restoreElementData(
            props.restoreId as string,
            token
          ) as unknown as AnyAction
        )
      : props.modalName === 'Section'
      ? dispatch(
          restoreSectionData(
            props.restoreId as string,
            token
          ) as unknown as AnyAction
        )
      : props.modalName === 'Segment'
      ? dispatch(
          restoreSegmentData(
            props.restoreId as string,
            token
          ) as unknown as AnyAction
        )
      : props.modalName === 'Class'
      ? dispatch(
          restoreClassData(
            props.restoreId as string,
            token
          ) as unknown as AnyAction
        )
      : props.modalName === 'Exam'
      ? dispatch(
          restoreExamData(
            props.restoreId as string,
            token
          ) as unknown as AnyAction
        )
      : props.modalName === 'Segment Element'
      ? dispatch(
          restoreSegmentElementData(
            props.restoreId as string,
            token
          ) as unknown as AnyAction
        )
      : props.modalName === 'Level Calculation Test'
      ? dispatch(
          restoreCalculationTestLevel(
            props.restoreId as string,
            token
          ) as unknown as AnyAction
        )
      : props.modalName === 'Level Image Test'
      ? dispatch(
          restoreImageTestLevel(
            props.restoreId as string,
            token
          ) as unknown as AnyAction
        )
      : props.modalName === 'Level Number Test'
      ? dispatch(
          restoreNumberTestLevel(
            props.restoreId as string,
            token
          ) as unknown as AnyAction
        )
      : props.modalName === 'Level Sign Test'
      ? dispatch(
          restoreSignTestLevel(
            props.restoreId as string,
            token
          ) as unknown as AnyAction
        )
      : props.modalName === 'Level Word Test'
      ? dispatch(
          restoreWordTestLevel(
            props.restoreId as string,
            token
          ) as unknown as AnyAction
        )
      : props.modalName === 'Word Test'
      ? dispatch(
          restoreWordTestData(
            props.restoreId as string,
            token
          ) as unknown as AnyAction
        )
      : props.modalName === 'Number Test'
      ? dispatch(
          restoreNumberTestData(
            props.restoreId as string,
            token
          ) as unknown as AnyAction
        )
      : props.modalName === 'Sign Test'
      ? dispatch(
          restoreSignTestData(
            props.restoreId as string,
            token
          ) as unknown as AnyAction
        )
      : props.modalName === 'Calculation Test'
      ? dispatch(
          restoreCalculationTest(
            props.restoreId as string,
            token
          ) as unknown as AnyAction
        )
      : props.modalName === 'Counseling'
      ? dispatch(
          restoreCounselingData(
            props.restoreId as string,
            token
          ) as unknown as AnyAction
        )
      : '';
    dispatch(restoreData(''));
    props?.navigate !== undefined && props?.navigate(false);
    props?.resetForm !== undefined && props?.resetForm();
    props.onClose();
  };
  return (
    <>
      <Modal
        show={props.show}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <div>
          <Modal.Header>
            <div className={cx('modal-close')}>
              <div>
                <Modal.Title id='contained-modal-title-vcenter'>
                  {props.title}
                </Modal.Title>
              </div>
              <div
                onClick={() => {
                  props.onClose(), dispatch(restoreData(''));
                }}
              >
                <FontAwesomeIcon icon={faXmark} className={cx('cross-icon')} />
              </div>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div style={{ fontWeight: 'bold' }}>{props.content}?</div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className={cx('close-btn')}
              onClick={() => {
                props.onClose(), dispatch(restoreData(''));
              }}
            >
              <div>Close</div>
            </Button>
            <Button
              className={cx('sucess-btn')}
              onClick={() => handleRestore()}
            >
              <div>Restore</div>
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
};
export default RestoreLevelModal;
