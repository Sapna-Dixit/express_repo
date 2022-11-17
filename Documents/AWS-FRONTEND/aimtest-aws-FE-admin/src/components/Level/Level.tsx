import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useSelector } from 'react-redux';

import { RootState } from 'redux/store';
import styles from './index.module.css';
import className from 'classnames/bind';
import WordTest from './Test/WordTest';
import SignTest from './Test/SignTest';
import ImageTest from './Test/ImageTest';
import NumberTest from './Test/NumberTest';
import { Loader } from 'components/Loader/Loader';
import CalculationTest from './Test/CalculationTest';

const Level = () => {
  const cx = className.bind(styles);

  const load = useSelector((state: RootState) => state?.loader?.loader);

  const [tabName, setTabName] = useState<string>('numbertest');

  return (
    <>
      <div className={cx('flex-style')}>
        <Loader open={load} />
        <div className={cx('parent-section')}>
          <div className={cx('text-btn')}>
            <div className={cx('animate__animated animate__slideInRight')}>
              <div className={cx('card')}>
                <div className={cx('card-table')}>
                  <div className={cx('mb-2')}>
                    <h4>Levels</h4>
                  </div>
                  <div>
                    <Tabs
                      defaultActiveKey='numbertest'
                      id='justify-tab-example'
                      className='mb-3'
                      variant='tabs'
                      onSelect={(e) => {
                        setTabName(e as string);
                      }}
                    >
                      <Tab
                        className='nav-base'
                        eventKey='numbertest'
                        title='Number Test'
                      >
                        <NumberTest tabName={tabName} />
                      </Tab>
                      <Tab
                        className='nav-base'
                        eventKey='wordtest'
                        title='Word Test'
                      >
                        <WordTest tabName={tabName} />
                      </Tab>
                      <Tab
                        className='nav-base'
                        eventKey='signtest'
                        title='Sign Test'
                      >
                        <SignTest tabName={tabName} />
                      </Tab>
                      <Tab
                        className='nav-base'
                        eventKey='imagetest'
                        title='Image Test'
                      >
                        <ImageTest tabName={tabName} />
                      </Tab>
                      <Tab
                        className='nav-base'
                        eventKey='calculationtest'
                        title='Calculation Test'
                      >
                        <CalculationTest tabName={tabName} />
                      </Tab>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Level;

