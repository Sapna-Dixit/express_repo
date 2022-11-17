import { useRef } from 'react';
// import Tab from 'react-bootstrap/Tab';
// import Tabs from 'react-bootstrap/Tabs';
import ReactToPrint from 'react-to-print';
import { useDispatch, useSelector } from 'react-redux';
import { displayButton } from 'redux/reducer/PdfEditor';

import PdfEditor from './PdfEditor';
import { RootState } from 'redux/store';

const MainFile = () => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const displayPrint = useSelector(
    (state: RootState) => state?.pdf?.displayPrint
  );
  const userRole = useSelector((state: RootState) => state?.login?.userRole);

  return (
    <>
      {userRole === 1 ? (
        // <Tabs
        //   defaultActiveKey='english'
        //   id='justify-tab-example'
        //   className='mb-1'
        //   variant='tabs'
        // >
        //   <Tab className='nav-base' eventKey='english' title='3 Hour Pdf'>
        //     <div className='pdf-scroll'>
        //       <div className='printto-pdf'>
        //         {displayPrint && (
        //           <div>
        //             <ReactToPrint
        //               content={() => ref.current}
        //               trigger={() => (
        //                 <button className='print-pdf'>Print to PDF!</button>
        //               )}
        //               onAfterPrint={() => dispatch(displayButton(true))}
        //             />
        //           </div>
        //         )}
        //       </div>
        //       <PdfEditor ref={ref} />
        //     </div>
        //   </Tab>
        //   <Tab className='nav-base' eventKey='hindi' title='1/2 Hour Pdf'>
            <div className='pdf-scroll'>
              <div className='printto-pdf'>
                {displayPrint && (
                  <div>
                    <ReactToPrint
                      content={() => ref.current}
                      trigger={() => (
                        <button className='print-pdf'>Print to PDF!</button>
                      )}
                      onAfterPrint={() => dispatch(displayButton(true))}
                    />
                  </div>
                )}
              </div>
              <PdfEditor ref={ref} />
            </div>
        //   </Tab>
        // </Tabs>
      ) : (
        <div className='no-record'>
          {' '}
          <h3>Access Denied</h3>
        </div>
      )}
    </>
  );
};

export default MainFile;
