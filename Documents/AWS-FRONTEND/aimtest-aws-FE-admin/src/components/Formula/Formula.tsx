import { useEffect } from 'react';
import { AnyAction } from 'redux';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { RootState } from 'redux/store';
import styles from './index.module.css';
import className from 'classnames/bind';
import SingleFormula from './SingleFormula';
import { loader } from 'redux/reducer/Loader';
import { Loader } from 'components/Loader/Loader';
import Accordion from 'react-bootstrap/Accordion';
import { getElements } from 'redux/action/Element';
import { getSections } from 'redux/action/Section';
import { getFormulas } from 'redux/action/Formula';

const Formula = () => {
  const dispatch = useDispatch();
  const cx = className.bind(styles);

  const elementData = useSelector(
    (state: RootState) => state?.element?.elementData?.elements
  );
  const formulaData = useSelector(
    (state: RootState) => state?.formula?.formulaData?.formulas
  );
  const adminToken = useSelector((state: RootState) => state?.login?.loginData);
  const userRole = useSelector((state: RootState) => state?.login?.userRole);

  const load = useSelector((state: RootState) => state?.loader?.loader);

  const dataElement = elementData?.map((item: { name: string }) => {
    return { ...item, label: item?.name, value: item?.name };
  });
  
  dataElement?.sort((a: { name: string }, b: { name: string }) =>
    a?.name?.localeCompare(b.name)
  );

  useEffect(() => {
    userRole === 1 &&
      adminToken?.length > 0 &&
      dispatch(getFormulas(adminToken) as unknown as AnyAction),
      dispatch(getElements(adminToken) as unknown as AnyAction),
      dispatch(getSections(adminToken) as unknown as AnyAction);
  }, [dispatch, adminToken, userRole]);

  return (
    <>
      {userRole === 1 ? (
        <div className={cx('flex-style')}>
          <div className={cx('parent-section')}>
            <div>
              <Loader open={load} />
              <div className={cx('animate__animated animate__slideInRight')}>
                <div className={cx('card')}>
                  <div className={cx('card-table')}>
                    <div className='formula-refresh'>
                      <div className={cx('mb-2')}>
                        <h4>Elements Calculation</h4>
                      </div>
                      <div className={cx('section-btn')}>
                        <div className={cx('add-btn')}>
                          <Button
                            className={cx('sucess-btn')}
                            variant='success'
                            onClick={() => {
                              adminToken?.length > 0 && dispatch(loader(true)),
                                dispatch(
                                  getFormulas(
                                    adminToken
                                  ) as unknown as AnyAction
                                );
                            }}
                            title='Refresh'
                          >
                            <FontAwesomeIcon icon={faRefresh} />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className='formula-scroll'>
                      <Accordion>
                        {dataElement?.map(
                          (item: { name: string }, index: number) => {
                            return (
                              <Accordion.Item
                                eventKey={String(index)}
                                key={index}
                              >
                                <Accordion.Header>
                                  <span
                                    style={{
                                      color:
                                        formulaData?.find(
                                          (dt: { label: string }) =>
                                            dt?.label?.trim()?.toLowerCase() ===
                                            item?.name?.trim()?.toLowerCase()
                                        ) !== undefined
                                          ? 'green'
                                          : 'red',
                                    }}
                                  >
                                    {item.name}
                                  </span>
                                </Accordion.Header>
                                <Accordion.Body
                                  className={cx('formula-accordion')}
                                >
                                  <SingleFormula label={item.name} />
                                </Accordion.Body>
                              </Accordion.Item>
                            );
                          }
                        )}
                      </Accordion>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='no-record'>
          {' '}
          <h3>Access Denied</h3>
        </div>
      )}
    </>
  );
};
export default Formula;
