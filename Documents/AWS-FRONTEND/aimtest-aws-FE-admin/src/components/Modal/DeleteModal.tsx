import Cookies from 'js-cookie';
import { AnyAction } from 'redux';
import { MouseEventHandler } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './index.module.css';
import className from 'classnames/bind';
import { RootState } from 'redux/store';
import { propsCalling } from './ButtonModal';
import { loader } from 'redux/reducer/Loader';
import { deleteExams } from 'redux/action/Exam';
import { deleteCoupons } from 'redux/action/Coupon';
import { deleteStudents } from 'redux/action/Student';
import { deleteQuestions } from 'redux/action/Question';
import { deletePassages } from 'redux/action/Test/Passage';
import { deleteCounselings } from 'redux/action/Counseling';
import { deleteFranchisees } from 'redux/action/Franchisee';
import { deleteImageTests } from 'redux/action/Test/ImageTest';
import { deleteInterestTests } from 'redux/action/Test/Interest';
import { deleteSignTestRanges } from 'redux/action/Test/SignTest';
import { deleteWordTestRanges } from 'redux/action/Test/WordTest';
import { deleteSubFranchisees } from 'redux/action/SubFranchisee';
import { deleteSignTestLevels } from 'redux/action/Level/SignTest';
import { deleteWordTestLevels } from 'redux/action/Level/WordTest';
import { deleteWritingTests } from 'redux/action/Test/WritingTest';
import { deleteSegmentElements } from 'redux/action/SegmentElement';
import { deleteImageTestLevels } from 'redux/action/Level/ImageTest';
import { deleteAudioVideoTests } from 'redux/action/Test/AudioVideo';
import { deleteNumberTestRanges } from 'redux/action/Test/NumberTest';
import { deleteNumberTestLevels } from 'redux/action/Level/NumberTest';
import { deleteStudentFranchisees } from 'redux/action/StudentFranchisee';
import { deleteCalculationTests } from 'redux/action/Test/CalculationTest';
import { deleteCalculationTestLevels } from 'redux/action/Level/CalculationTest';
import { deleteDictionarys } from 'redux/action/Dictionary';

const DeleteModal = (props: modalType) => {
  const dispatch = useDispatch();
  const cx = className.bind(styles);

  const token = useSelector((state: RootState) => state?.login.loginData);

  const dispatchData = () => {
    dispatch(loader(true));
    dispatch(
      props.modalName === 'Exam'
        ? (deleteExams(props.deleteId as string, token) as unknown as AnyAction)
        : props.modalName === 'Question'
        ? (deleteQuestions(
            props.deleteId as string,
            token
          ) as unknown as AnyAction)
        : props.modalName === 'Writing Test'
        ? (deleteWritingTests(
            props.deleteId as string,
            token
          ) as unknown as AnyAction)
        : props.modalName === 'Number Test'
        ? (deleteNumberTestRanges(
            props.deleteId as string,
            token
          ) as unknown as AnyAction)
        : props.modalName === 'Sign Test'
        ? (deleteSignTestRanges(
            props.deleteId as string,
            token
          ) as unknown as AnyAction)
        : props.modalName === 'Word Test'
        ? (deleteWordTestRanges(
            props.deleteId as string,
            token
          ) as unknown as AnyAction)
        : props.modalName === 'Calculation Test'
        ? (deleteCalculationTests(
            props.deleteId as string,
            token
          ) as unknown as AnyAction)
        : props.modalName === 'Passage'
        ? (deletePassages(
            props.deleteId as string,
            token
          ) as unknown as AnyAction)
        : props.modalName === 'Audio/Video Test'
        ? (deleteAudioVideoTests(
            props.deleteId as string,
            token
          ) as unknown as AnyAction)
        : props.modalName === 'Coupon'
        ? (deleteCoupons(
            props.deleteId as string,
            token
          ) as unknown as AnyAction)
        : props.modalName === 'Counseling'
        ? (deleteCounselings(
            props.deleteId as string,
            token
          ) as unknown as AnyAction)
        : props.modalName === 'Segment'
        ? (deleteSegmentElements(
            props.deleteId as string,
            token
          ) as unknown as AnyAction)
        : props.modalName === 'Level Number Test'
        ? (deleteNumberTestLevels(
            props.deleteId as string,
            token
          ) as unknown as AnyAction)
        : props.modalName === 'Level Sign Test'
        ? (deleteSignTestLevels(
            props.deleteId as string,
            token
          ) as unknown as AnyAction)
        : props.modalName === 'Level Word Test'
        ? (deleteWordTestLevels(
            props.deleteId as string,
            token
          ) as unknown as AnyAction)
        : props.modalName === 'Level Image Test'
        ? (deleteImageTestLevels(
            props.deleteId as string,
            token
          ) as unknown as AnyAction)
        : props.modalName === 'Level Calculation Test'
        ? (deleteCalculationTestLevels(
            props.deleteId as string,
            token
          ) as unknown as AnyAction)
        : props.modalName === 'Franchisee'
        ? (deleteFranchisees(
            props.deleteId as string,
            token
          ) as unknown as AnyAction)
        : props.modalName === 'Sub Franchisee'
        ? (deleteSubFranchisees(
            props.deleteId as string,
            token
          ) as unknown as AnyAction)
        : props.modalName === 'Student Franchisee'
        ? (deleteStudentFranchisees(
            props.deleteId as string,
            token
          ) as unknown as AnyAction)
        : props.modalName === 'Interest Test'
        ? (deleteInterestTests(
            props.deleteId as string,
            token
          ) as unknown as AnyAction)
        : props.modalName === 'Student'
        ? (deleteStudents(
            props.deleteId as string,
            token
          ) as unknown as AnyAction)
        : props.modalName === 'Dictionary'
        ? (deleteDictionarys(
            props.deleteId as string,
            token
          ) as unknown as AnyAction)
        : (deleteImageTests(
            props.deleteId as string,
            token
          ) as unknown as AnyAction)
    );
  };

  const submitButton = () => {
    props.todo === 'delete' && dispatch(loader(true));
    if (props.todo === 'delete') {
      Cookies.set('delete', 'true');
      props.todo === 'delete' && props.deleteType === 'global'
        ? (props.setPageNumber(props.pageNumber),
          dispatchData(),
          props.onClose())
        : props.todo === 'delete' &&
          (props.setPageNumber(props.pageNumber),
          dispatchData(),
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
                  {propsCalling(
                    'Title',
                    props.modalName as string,
                    propsToSend
                  )}
                </Modal.Title>
              </div>
              <div onClick={props.onClose as MouseEventHandler<HTMLDivElement>}>
                <FontAwesomeIcon icon={faXmark} className={cx('cross-icon')} />
              </div>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className={cx('label-floating')}>
              {propsCalling('Delete', props.modalName as string, propsToSend)}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className={cx('close-btn')} onClick={props.onClose}>
              <div>
                {propsCalling(
                  'Button2',
                  props.modalName as string,
                  propsToSend
                )}
              </div>
            </Button>
            {propsCalling('Button1', props.modalName as string, propsToSend)}
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
};
export default DeleteModal;
