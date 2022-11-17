import { Button } from 'react-bootstrap';

import styles from './index.module.css';
import className from 'classnames/bind';

export const propsCalling = (
  type: string,
  heading: string,
  props: {
    todo?: string;
    deleteValue?: string;
    editValue?: string;
    deleteCount: number;
    deleteType: string;
    submitButton: () => void;
  }
) => {
  const cx = className.bind(styles);
  switch (type) {
    case 'Title':
      return props.todo === 'create'
        ? `Add ${heading}`
        : props.todo === 'edit' && props.editValue === 'single'
        ? `Edit ${heading}`
        : props.editValue === 'multiple'
        ? 'Warning'
        : props.editValue === 'incorrect'
        ? 'Warning'
        : `Delete ${heading}`;

    case 'Delete':
      return props.deleteType === 'global' ? (
        props.deleteValue === 'zero' ? (
          <h6>Select Record To Delete</h6>
        ) : (
          <h6>Are You Sure Want To Delete {props.deleteCount} Record </h6>
        )
      ) : props?.deleteValue === 'single' ? (
        <h6>Are You Sure Want To Delete 1 Record </h6>
      ) : props?.deleteValue === 'multiple' ? (
        <h6>Can Not Delete Multiple Records Use Global Delete Option</h6>
      ) : (
        props.deleteValue === 'incorrect' && (
          <h6>Action Forbidden (Ids Not Matched)</h6>
        )
      );
    case 'Button1':
      return (
        (props.todo === 'create' ||
          (props.todo === 'edit' && props.editValue === 'single') ||
          (props.todo === 'delete' &&
            ((props.deleteType === 'global' &&
              props.deleteValue === 'multiple') ||
              props.deleteValue === 'single'))) && (
          <Button
            className={cx(
              props.todo === 'delete' ? 'modaldelete-btn' : 'modalsave-btn'
            )}
            variant="success"
            type="submit"
            onClick={props.submitButton}
          >
            <div>
              {props.todo === 'create'
                ? 'Save'
                : props.todo === 'edit'
                ? 'Update'
                : props.todo === 'delete' && 'Yes'}
            </div>
          </Button>
        )
      );
    case 'Button2':
      return props.todo === 'create'
        ? 'Close'
        : props.todo === 'edit' && props.editValue === 'single'
        ? 'Cancel'
        : props.editValue === 'zero' ||
          props.editValue === 'multiple' ||
          props.editValue === 'incorrect'
        ? 'Close'
        : props.todo === 'delete' &&
          (props.deleteValue === 'single' ||
            (props.deleteType === 'global' && props.deleteValue === 'multiple'))
        ? 'No'
        : 'Close';
  }
};
