import { MouseEventHandler } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './index.module.css';
import className from 'classnames/bind';

const SelectTrueOption = (props: modalType) => {
  const cx = className.bind(styles);

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
                  Warning
                </Modal.Title>
              </div>
              <div onClick={props.onClose as MouseEventHandler<HTMLDivElement>}>
                <FontAwesomeIcon icon={faXmark} className={cx('cross-icon')} />
              </div>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div style={{ fontWeight: 'bold' }}>{props.content}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button className={cx('close-btn')} onClick={props.onClose}>
              <div>
                <FontAwesomeIcon icon={faXmark} className={cx('text-white')} />{' '}
                Close
              </div>
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
};

export default SelectTrueOption;
