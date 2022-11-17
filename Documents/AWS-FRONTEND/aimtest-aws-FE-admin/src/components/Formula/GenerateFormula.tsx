import React from 'react';

const GenerateFormula = (props: { value: formulaType }) => {
  return (
    <h5 className='mb-1'>
      Formula = (
      {props?.value?.extraPerOfValue?.length > 0 &&
      props?.value?.extraPerOfValue !== 'Nill'
        ? props?.value?.extraPerOfValue +
          `${
            props?.value?.formulaData[0]?.operation
              ?.split('(')[1]
              ?.split(')')[0]
          }` +
          props?.value?.formulaData
            ?.map((item, index) => {
              if (index === 0) {
                if (item?.group?.name === 'Nill') {
                  return `${item?.perOfValue}  ${item?.element?.name}`;
                } else if (item?.element?.name === 'Nill') {
                  return `${item?.perOfValue}  ${item?.group?.name}`;
                }
              } else {
                if (item?.group?.name === 'Nill') {
                  return `${item?.operation?.split('(')[1]?.split(')')[0]} 
                  ${item?.perOfValue} 
                  ${item?.element?.name}`;
                } else if (item?.element?.name === 'Nill')
                  return `${item?.operation?.split('(')[1]?.split(')')[0]} 
                  ${item?.perOfValue} 
                  ${item?.group?.name}`;
              }
            })
            .join('')
        : props?.value?.formulaData
            ?.map((item, index) => {
              if (index === 0) {
                if (item?.group?.name === 'Nill') {
                  return `${item?.perOfValue}  ${item?.element?.name}`;
                } else if (item?.element?.name === 'Nill') {
                  return `${item?.perOfValue}  ${item?.group?.name}`;
                }
              } else {
                if (item?.group?.name === 'Nill') {
                  return `${item?.operation?.split('(')[1]?.split(')')[0]} 
                  ${item?.perOfValue} 
                  ${item?.element?.name}`;
                } else if (item.element.name === 'Nill')
                  return `${item?.operation?.split('(')[1]?.split(')')[0]} 
                  ${item?.perOfValue} 
                  ${item?.group?.name}`;
              }
            })
            ?.join('')}
      ) {props?.value?.divide?.length > 0 && `/ ${props?.value?.divide}`}
    </h5>
  );
};

export default GenerateFormula;
