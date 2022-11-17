import Select from 'react-select';
import { useEffect, useState } from 'react';

export const SelectField = (props: SelectFieldType) => {
  const [error, setError] = useState(false);
  const handleChange = (
    e:
      | string
      | SelectType
      | { label: string | undefined; value: string | undefined }
      | null
  ) => {
    e !== null
      ? (props.onChange(e), setError(false))
      : (props.onChange(''), setError(true));
  };
  const handleBlur = () => {
    props?.onBlur && props.onBlur(props.name, true);
  };
  useEffect(() => {
    setError(false);
  }, [props.applyValidation]);

  return (
    <>
      <Select
        options={props.options}
        name={props.name}
        value={{
          label: props.value ? props.value : props.placeholder,
          value: props.value,
        }}
        isSearchable={props.isSearchable === undefined ? true : false}
        isDisabled={props.disable ? true : false}
        isClearable={props?.isClearable === undefined ? true : false}
        onChange={(e) => handleChange(e)}
        onBlur={handleBlur}
      />
      {((props?.touched && props?.value?.length === 0) ||
        (props?.value?.length === 0 && error === true)) && (
        <div className='error-message'>
          {props.error ? props.error : 'Required'}
        </div>
      )}
    </>
  );
};


