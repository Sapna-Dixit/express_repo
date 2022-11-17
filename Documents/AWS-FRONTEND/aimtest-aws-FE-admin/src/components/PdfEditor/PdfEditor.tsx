import { AnyAction } from 'redux';
import parse from 'html-react-parser';
import { useDispatch, useSelector } from 'react-redux';
import React, { LegacyRef, useEffect, useState } from 'react';

import EditorOfPdf from './Editor';
import { RootState } from 'redux/store';
import { getElements } from 'redux/action/Element';
import { elementCss, elementCss1 } from './PdfElementCss';
import { displayButton, postPdfData } from 'redux/reducer/PdfEditor';

let a: string[];
let dataaa: string[];
let initialData: string;
let pdfWithSegment: string;

const PdfEditor = React.forwardRef(({}, ref) => {
  const dispatch = useDispatch();

  const pdfInitalValue = useSelector(
    (state: RootState) => state?.pdf?.pdfInitalValue
  );

  const displayPrint = useSelector(
    (state: RootState) => state?.pdf?.displayPrint
  );

  const elementData = useSelector(
    (state: RootState) => state?.element?.elementData?.elements
  );

  const spliceElementData = elementData?.slice(
    0,
    Math.ceil(elementData?.length / 10)
  );

  const segmentElementData = useSelector(
    (state: RootState) =>
      state?.segmentElement?.segmentElementData?.segmentElements
  );
  const userRole = useSelector((state: RootState) => state?.login?.userRole);

  const token = useSelector((state: RootState) => state?.login?.loginData);

  const [mount, setMount] = useState(false);
  const [saveBtn, setSaveBtn] = useState(false);
  const [data, setData] = useState(pdfInitalValue);

  useEffect(() => {
    setMount(true);
  }, []);

  useEffect(() => {
    userRole === 1 &&
      token?.length > 0 &&
      dispatch(getElements(token) as unknown as AnyAction);
  }, [token, dispatch, userRole]);

  a = [];

  dataaa = [];

  useEffect(() => {
    if (
      pdfInitalValue?.indexOf(`elementsadd`) === -1 &&
      pdfInitalValue?.includes(`elementsadd`) === false
    ) {
      const a = spliceElementData?.map((item: unknown, index: number) => {
        return `
        <div class='rela'>
        <div class='px-0'>
         <div size='A4'>
            <img
            // width="200px"
            // height="800px"
            class='third-img'
            src='https://res.cloudinary.com/dgimekhep/image/upload/v1666961648/Swot_Analysis_l7urhk.jpg'
            />
         </div>
      </div>
      <div class='row'>
         <div class='col-12'>
            <div class='text-absolute'>
               <div class='logo-text'>
                  <div class='strength'>
                     <h1 class='str-text'>STRENGTH</h1>
                  </div>
               </div>
               <div class='dynamic${index + 1}'></div>
               <div class='dynamicparent${index + 1}'></div>
            </div>
         </div>
      </div>
      </div>`;
      });
      const data = `<div class='elementsadd'>` + a.join('') + '</div>';
      const index = pdfInitalValue?.indexOf(`<div class='dynamic0'>`);
      const txt =
        pdfInitalValue?.slice(0, index + 22) +
        data +
        pdfInitalValue?.slice(index + 22);
      initialData = txt;
    } else {
      if (
        spliceElementData?.length >=
        (data?.split('dynamic')?.length - 1 - 2) / 2
      ) {
        // add page
        const a = spliceElementData?.map((item: unknown, index: number) => {
          if (pdfInitalValue?.includes(`dynamic${index + 1}`) === false) {
            return `
        <div class='rela'>
        <div class='px-0'>
         <div size='A4'>
            <img
            // width="200px"
            // height="800px"
            class='third-img'
            src='https://res.cloudinary.com/dgimekhep/image/upload/v1666961648/Swot_Analysis_l7urhk.jpg'
            />
         </div>
      </div>
      <div class='row'>
         <div class='col-12'>
            <div class='text-absolute'>
               <div class='logo-text'>
                  <div class='strength'>
                     <h1 class='str-text'>STRENGTH</h1>
                  </div>
               </div>
               <div class='dynamic${index + 1}'></div>
               <div class='dynamicparent${index + 1}'></div>
            </div>
         </div>
      </div>
      </div>`;
          }
        });
        const b = a?.filter((item: string) => item !== undefined);
        const parentIndex = data?.indexOf(`dynamicparent0`);
        const txt =
          pdfInitalValue?.slice(0, parentIndex - 25) +
          b?.join('') +
          pdfInitalValue?.slice(parentIndex - 25);
        initialData = txt;
      } else {
        //remove page
        const a = pdfInitalValue?.indexOf(
          `dynamic${spliceElementData.length + 1}`
        );
        const b = pdfInitalValue?.indexOf('dynamicparent0');
        const c = `<div class='rela'>`;
        const indexes = [...pdfInitalValue?.matchAll(new RegExp(c, 'gi'))]?.map(
          (a) => a.index
        );
        const d = Math.max(...indexes?.filter((num) => num <= a));
        const e = pdfInitalValue?.substring(d, b - 25);
        const txt = pdfInitalValue?.replace(e, '');
        initialData = txt;
      }
    }
  });

  useEffect(() => {
    if (
      initialData?.indexOf(`table-stylee`) === -1 &&
      initialData?.includes(`table-stylee`) === false
    ) {
      segmentElementData?.map(
        (
          item: { segment: { name: string; element: { name: string }[] } },
          index1: number
        ) => {
          const k = `<div class='table-nogap'><div class='table-engineering'><table class='pdf-result'><tr class='tableresult-data'>
          <th class='head-center'>${item.segment.name}</th>
          <th></th>
          </tr>`;
          const p = `<div class='table-engineering'><table class='pdf-result'><tr class='tableresult-data'>
          <th class='head-center'></th>
          <th></th>
          </tr>`;
          let b = '';
          let c = '';
          let d = '';
          let e = '';
          let dt = '';
          item?.segment?.element?.map((item1: { name: string }, index, arr) => {
            if (index < 10) {
              if (arr?.length - 1 === index || index === 9) {
                if (arr?.length - 1 === index) {
                  const extra = `<tr className='tableresult-data'>
                  <td>
                  </td>
                  <td></td>
                  </tr>`;

                  b =
                    k +
                    b +
                    `<tr className='tableresult-data'>
                <td>${index + 1}. ${item1.name}
                </td>
                <td></td>
                </tr>` +
                    extra.repeat(
                      index1 === 6 ? 2 : index1 === 5 ? 0 : 10 - arr?.length
                    ) +
                    `</table></div></div>`;
                  dataaa.push(b);
                } else {
                  b =
                    k +
                    b +
                    `<tr className='tableresult-data'>
                <td>${index + 1}. ${item1.name}
                </td>
                <td></td>
                </tr></table></div>`;
                  d = b;
                }
              } else {
                b =
                  b +
                  `<tr className='tableresult-data'>
                <td>${index + 1}. ${item1.name}
                </td>
                <td></td>
                </tr>`;
              }
            } else if (index >= 10 && index < 20) {
              if (arr?.length - 1 === index || index === 19) {
                if (arr?.length - 1 === index) {
                  const extra = `<tr className='tableresult-data'>
                  <td>
                  </td>
                  <td></td>
                  </tr>`;

                  c =
                    p +
                    c +
                    `<tr className='tableresult-data'>
                <td>${index + 1}. ${item1.name}
                </td>
                <td></td>
                </tr>` +
                    extra.repeat(20 - arr?.length) +
                    `</table></div></div>`;
                  const m = d + c;
                  dataaa.push(m);
                } else {
                  c =
                    p +
                    c +
                    `<tr className='tableresult-data'>
                <td>${index + 1}. ${item1.name}
                </td>
                <td></td>
                </tr></table></div>`;
                  dt = d + c;
                  // dataaa.push(dt);
                }
              } else {
                c =
                  c +
                  `<tr className='tableresult-data'>
                <td>${index + 1}. ${item1.name}
                </td>
                <td></td>
                </tr>`;
              }
            } else if (index >= 20 && index < 30) {
              if (arr?.length - 1 === index || index === 29) {
                if (arr?.length - 1 === index) {
                  const extra = `<tr className='tableresult-data'>
                  <td>
                  </td>
                  <td></td>
                  </tr>`;
                  e =
                    p +
                    e +
                    `<tr className='tableresult-data'>
                <td>${index + 1}. ${item1.name}
                </td>
                <td></td>
                </tr>` +
                    extra.repeat(30 - arr?.length) +
                    `</table></div></div>`;
                  const k = dt + e;
                  dataaa.push(k);
                } else {
                  e =
                    p +
                    e +
                    `<tr className='tableresult-data'>
                <td>${index + 1}. ${item1.name}
                </td>
                <td></td>
                </tr></table></div>`;
                  dt = dt + e;
                  // dataaa.push(dt);
                }
              } else {
                e =
                  e +
                  `<tr className='tableresult-data'>
                <td>${index + 1}. ${item1.name}
                </td>
                <td></td>
                </tr>`;
              }
            }
          });
        }
      );
      const firstArr = dataaa?.slice(0, 3);
      const secondArr = dataaa?.slice(3, 4);
      const thirdArr = dataaa?.slice(4, 5);
      const fourthArr = dataaa?.slice(5, 7);
      const newFirstArr =
        `<div class='table-stylee'>` +
        firstArr.join().replace(/\,/g, '') +
        `</div><br>`;
      const newFourthArr =
        `<div class='half-width'>` + fourthArr.join().replace(/\,/g, '');
      const newThirdFourthArr =
        `<div class='full-width'>` +
        thirdArr.join().replace(/\,/g, '') +
        newFourthArr +
        `</div></div>`;
      const insertData =
        newFirstArr +
        secondArr.join().replace(/\,/g, '') +
        `<br>` +
        newThirdFourthArr;
      const index = initialData?.indexOf(`<div class='segment1'>`);
      const txt =
        initialData?.slice(0, index + 22) +
        insertData +
        initialData?.slice(index + 22);
      pdfWithSegment = txt;
      dispatch(postPdfData(txt));
      setData(txt);
    } else {
      segmentElementData?.map(
        (
          item: { segment: { name: string; element: { name: string }[] } },
          index1: number
        ) => {
          const k = `<div class='table-nogap'><div class='table-engineering'><table class='pdf-result'><tr class='tableresult-data'>
          <th class='head-center'>${item.segment.name}</th>
          <th></th>
          </tr>`;
          const p = `<div class='table-engineering'><table class='pdf-result'><tr class='tableresult-data'>
          <th class='head-center'></th>
          <th></th>
          </tr>`;
          let b = '';
          let c = '';
          let d = '';
          let e = '';
          let dt = '';
          item?.segment?.element?.map((item1: { name: string }, index, arr) => {
            if (index < 10) {
              if (arr?.length - 1 === index || index === 9) {
                if (arr?.length - 1 === index) {
                  const extra = `<tr className='tableresult-data'>
                  <td>
                  </td>
                  <td></td>
                  </tr>`;
                  b =
                    k +
                    b +
                    `<tr className='tableresult-data'>
                  <td>${index + 1}. ${item1.name}
                  </td>
                  <td></td>
                  </tr>` +
                    extra.repeat(
                      index1 === 6 ? 2 : index1 === 5 ? 0 : 10 - arr?.length
                    ) +
                    `</table></div></div>`;
                  dataaa.push(b);
                } else {
                  b =
                    k +
                    b +
                    `<tr className='tableresult-data'>
                <td>${index + 1}. ${item1.name}
                </td>
                <td></td>
                </tr></table></div>`;
                  d = b;
                }
              } else {
                b =
                  b +
                  `<tr className='tableresult-data'>
                <td>${index + 1}. ${item1.name}
                </td>
                <td></td>
                </tr>`;
              }
            } else if (index >= 10 && index < 20) {
              if (arr?.length - 1 === index || index === 19) {
                if (arr?.length - 1 === index) {
                  const extra = `<tr className='tableresult-data'>
                  <td>
                  </td>
                  <td></td>
                  </tr>`;

                  c =
                    p +
                    c +
                    `<tr className='tableresult-data'>
                <td>${index + 1}. ${item1.name}
                </td>
                <td></td>
                </tr>` +
                    extra.repeat(20 - arr?.length) +
                    `</table></div></div>`;
                  const m = d + c;
                  dataaa.push(m);
                } else {
                  c =
                    p +
                    c +
                    `<tr className='tableresult-data'>
                <td>${index + 1}. ${item1.name}
                </td>
                <td></td>
                </tr></table></div>`;
                  dt = d + c;
                  // dataaa.push(dt);
                }
              } else {
                c =
                  c +
                  `<tr className='tableresult-data'>
                <td>${index + 1}. ${item1.name}
                </td>
                <td></td>
                </tr>`;
              }
            } else if (index >= 20 && index < 30) {
              if (arr?.length - 1 === index || index === 29) {
                if (arr?.length - 1 === index) {
                  const extra = `<tr className='tableresult-data'>
                  <td>
                  </td>
                  <td></td>
                  </tr>`;
                  e =
                    p +
                    e +
                    `<tr className='tableresult-data'>
                <td>${index + 1}. ${item1.name}
                </td>
                <td></td>
                </tr>` +
                    extra.repeat(30 - arr?.length) +
                    `</table></div></div>`;
                  const k = dt + e;
                  dataaa.push(k);
                } else {
                  e =
                    p +
                    e +
                    `<tr className='tableresult-data'>
                <td>${index + 1}. ${item1.name}
                </td>
                <td></td>
                </tr></table></div>`;
                  dt = dt + e;
                  // dataaa.push(dt);
                }
              } else {
                e =
                  e +
                  `<tr className='tableresult-data'>
                <td>${index + 1}. ${item1.name}
                </td>
                <td></td>
                </tr>`;
              }
            }
          });
        }
      );
      const firstArr = dataaa?.slice(0, 3);
      const secondArr = dataaa?.slice(3, 4);
      const thirdArr = dataaa?.slice(4, 5);
      const fourthArr = dataaa?.slice(5, 7);
      const newFirstArr =
        `<div class='table-stylee'>` +
        firstArr.join().replace(/\,/g, '') +
        `</div><br>`;
      const newFourthArr =
        `<div class='half-width'>` + fourthArr.join().replace(/\,/g, '');
      const newThirdFourthArr =
        `<div class='full-width'>` +
        thirdArr.join().replace(/\,/g, '') +
        newFourthArr +
        `</div></div>`;
      const insertData =
        newFirstArr +
        secondArr.join().replace(/\,/g, '') +
        `<br>` +
        newThirdFourthArr;
      const index = initialData?.indexOf(`segment1`);
      const parentIndex = initialData?.indexOf(`segmentparent1`);
      const newElementData = `${insertData}</div>`;
      const txt =
        initialData?.slice(0, index + 10) +
        newElementData +
        initialData?.slice(parentIndex - 13);
      pdfWithSegment = txt;
      dispatch(postPdfData(txt));
      setData(txt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      pdfWithSegment.indexOf(`strength-top`) === -1 &&
      pdfWithSegment.includes(`strength-top`) === false
    ) {
      elementData?.map((item: unknown, index1: number) => {
        if (index1 % 10 === 0) {
          const elementName = elementData?.map(
            (item: { name: string }, index: number) => {
              if (index === index1) {
                return `
                <div class='strength-top'>
                <div class='position-style'>
              <div>
                 <div class=${elementCss[index]}>
                  ${item.name}
                 </div>
                 <div>
                 <div class=${elementCss1[index]}></div>
              </div>
              </div>
             </div>
           </div>`;
              } else if (index > index1 && index < index1 + 10) {
                return `
                <div class='strength-next'>
                <div class='position-style'>
                 <div class=${elementCss[index]}>
                  ${item.name}
                 </div>
                 <div>
                 <div class=${elementCss1[index]}></div>
              </div>
              </div>
           </div>`;
              }
            }
          );

          if (index1 / 10 + 1 === 1) {
            const newData = elementName?.filter(
              (item: string) => item !== undefined
            );
            const namingData = newData?.join('');
            const index = pdfWithSegment?.indexOf(
              `<div class='dynamic${index1 / 10 + 1}'>`
            );
            const txt =
              pdfWithSegment?.slice(0, index + 22) +
              namingData +
              pdfWithSegment?.slice(index + 22);
            a.push(txt);
            dispatch(postPdfData(txt));
            setData(txt);
          } else {
            const newData = elementName?.filter(
              (item: string) => item !== undefined
            );
            const namingData = newData?.join('');
            // if (index1 / 10 + 1 < 8) {
            const index = a[index1 / 10 - 1]?.indexOf(
              `<div class='dynamic${index1 / 10 + 1}'>`
            );
            const txt =
              a[index1 / 10 - 1]?.slice(0, index + 22) +
              namingData +
              a[index1 / 10 - 1]?.slice(index + 22);
            a.push(txt);
            dispatch(postPdfData(txt));
            setData(txt);
            // }
          }
        }
      });
    } else {
      elementData?.map((item: unknown, index1: number) => {
        if (index1 % 10 === 0) {
          const elementName = elementData?.map(
            (item: { name: string }, index: number) => {
              if (index === index1) {
                return `
                <div class='strength-top'>
              <div class='position-style'>
                 <div class=${elementCss[index]}>
                  ${item.name}
                 </div>
                 <div class=${elementCss1[index]}></div>
              </div>
             
           </div>`;
              } else if (index > index1 && index < index1 + 10) {
                return `
                <div class='strength-next'>
                <div class='position-style'>
                 <div class=${elementCss[index]}>
                  ${item.name}
                 </div>
                 <div class=${elementCss1[index]}></div>
              </div>
            
           </div>`;
              }
            }
          );
          if (index1 / 10 + 1 === 1) {
            const newData = elementName?.filter(
              (item: string) => item !== undefined
            );
            const namingData = newData.join('');
            const index = pdfWithSegment.indexOf(`dynamic${index1 / 10 + 1}`);
            const parentIndex = pdfWithSegment.indexOf(
              `dynamicparent${index1 / 10 + 1}`
            );
            const newElementData = `${namingData}</div>`;
            const txt =
              pdfWithSegment?.slice(0, index + 10) +
              newElementData +
              pdfWithSegment?.slice(parentIndex - 13);
            a.push(txt);
            dispatch(postPdfData(txt));
            setData(txt);
          } else {
            const newData = elementName?.filter(
              (item: string) => item !== undefined
            );
            const namingData = newData.join('');
            // if (index1 / 10 + 1 < 8) {
            const index = a[index1 / 10 - 1].indexOf(
              `dynamic${index1 / 10 + 1}`
            );
            const parentIndex = a[index1 / 10 - 1].indexOf(
              `dynamicparent${index1 / 10 + 1}`
            );
            const newElementData = `${namingData}</div>`;
            const txt =
              a[index1 / 10 - 1]?.slice(0, index + 10) +
              newElementData +
              a[index1 / 10 - 1]?.slice(parentIndex - 13);
            a.push(txt);
            dispatch(postPdfData(txt));
            setData(txt);
            // }
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {mount && (
        <div>
          <div>
            <div className='pdf-btn'>
              <div>
                <button
                  onClick={() => dispatch(displayButton(!displayPrint))}
                  className='sucess-btn'
                >
                  {displayPrint === false ? 'Preview' : 'Edit PDF'}
                </button>
              </div>
              {saveBtn && displayPrint && (
                <div>
                  <button
                    onClick={() => dispatch(postPdfData(data))}
                    className='sucess-btn'
                  >
                    Save Changes
                  </button>
                </div>
              )}
              {saveBtn && displayPrint && (
                <div>
                  <button
                    onClick={() => setData(pdfInitalValue)}
                    className='sucess-btn'
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
            <div className='edit-style'>
              {displayPrint ? (
                ''
              ) : (
                <EditorOfPdf setData={setData} setSaveBtn={setSaveBtn} />
              )}
            </div>
          </div>
          <div className='edit-style'>
            {displayPrint === true && (
              <div
                ref={ref as unknown as LegacyRef<HTMLDivElement> | undefined}
              >
                {parse(data)}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
});
PdfEditor.displayName = 'PdfEditor';
export default PdfEditor;
