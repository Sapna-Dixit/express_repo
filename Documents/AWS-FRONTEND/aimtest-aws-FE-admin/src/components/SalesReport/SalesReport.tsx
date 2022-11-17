import React from 'react';
import dynamic from 'next/dynamic';
import {
  faDollarSign,
  faUser,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

import className from 'classnames/bind';
import styles from './index.module.css';

const dt = [
  {
    id: 1,
    passageid: 'Physics',
    passage: 'science',
  },
  {
    id: 2,
    passageid: 'Physics',
    passage: 'science',
  },
  {
    id: 3,
    passageid: 'Physics',
    passage: 'science',
  },
  {
    id: 4,
    passageid: 'Physics',
    passage: 'science',
  },
  {
    id: 5,
    passageid: 'Physics',
    passage: 'science',
  },
];

const options = {
  stroke: {
    show: true,
    curve: 'smooth',
    lineCap: 'butt',
    colors: undefined,
    width: 2,
    dashArray: 0,
  },
  dataLabels: {
    enabled: false,
  },
  chart: {
    id: 'area',
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
  },
};

const series = [
  {
    name: 'series-1',
    data: [30, 40, 45, 50, 49, 60, 70, 91],
  },
  {
    name: 'series-2',
    data: [10, 70, 35, 70, 29, 80, 90, 61],
  },
];
const SalesReport = () => {
  const cx = className.bind(styles);

  return (
    <>
      <div className={cx('animate__animated animate__slideInRight')}>
        <div className={cx('card m-4')}>
          <div className={cx('add-scroll')}>
            <div className={cx('card-table')}>
              <h4>Sales Report </h4>

              
              <div className={cx('flex-style')}>
                <div>
                  <div>
                    <div className="row">
                      <div className="col-xl-4 col-sm-6 col-12 mb-3">
                        <div className={cx('card-border')}>
                          <div className="card-content">
                            <div className="card-body">
                              <div className="media d-flex justify-content-between">
                                <div className="align-self-center">
                                  <FontAwesomeIcon
                                    icon={faWallet}
                                    className={cx(
                                      'text-success dashborad-box-icon'
                                    )}
                                  />
                                </div>
                                <div className="media-body text-end">
                                  <h3 className="danger">278</h3>
                                  <span>Total Sales</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-4 col-sm-6 col-12 mb-3">
                        <div className={cx('card-border')}>
                          <div className="card-content">
                            <div className="card-body">
                              <div className="media d-flex justify-content-between">
                                <div className="align-self-center">
                                  <FontAwesomeIcon
                                    icon={faDollarSign}
                                    className={cx(
                                      'text-primary dashborad-box-icon'
                                    )}
                                  />
                                </div>
                                <div className="media-body text-end">
                                  <h3 className="danger">278</h3>
                                  <span>Total Collection</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-4 col-sm-6 col-12 mb-3">
                        <div className={cx('card-border')}>
                          <div className="card-content">
                            <div className="card-body">
                              <div className="media d-flex justify-content-between">
                                <div className="align-self-center">
                                  <FontAwesomeIcon
                                    icon={faUser}
                                    className={cx(
                                      'text-warning dashborad-box-icon'
                                    )}
                                  />
                                </div>
                                <div className="media-body text-end">
                                  <h3 className="danger">564</h3>
                                  <span>Total User</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={cx('card-border')}>
                      <div className={cx('card-table')}>
                        <div className={cx('search-flex')}>
                          <Chart
                            options={options as unknown as undefined}
                            series={series}
                            type="area"
                            width="500"
                            height={400}
                          />
                        </div>
                      </div>
                    </div>

                    <div className={cx('card-border my-3')}>
                      <table className={cx('customers')}>
                        <tr className={cx('table-heading')}>
                          <td>
                            <div>Month</div>
                          </td>
                          <td>
                            <div>Sales Count</div>
                          </td>
                          <td>
                            <div>Earning</div>
                          </td>
                        </tr>
                        {dt?.map((item) => {
                          return (
                            <>
                              <tr key={item.id} className={cx('table-data')}>
                                <td>{item.id}</td>
                                <td>{item.passageid}</td>
                                <td>{item.passage}</td>
                              </tr>
                            </>
                          );
                        })}
                      </table>
                    </div>
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
export default SalesReport;
