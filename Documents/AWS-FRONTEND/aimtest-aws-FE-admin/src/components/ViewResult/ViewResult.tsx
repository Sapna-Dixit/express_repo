import React from 'react';
import dynamic from 'next/dynamic';
import { Table } from 'react-bootstrap';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

import styles from './index.module.css';
import className from 'classnames/bind';

const options = {
  chart: {
    type: 'bar',
    height: 350,
    stacked: true,
    toolbar: {
      show: true,
    },
    zoom: {
      enabled: true,
    },
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
          offsetX: -10,
          offsetY: 0,
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 10,
    },
  },
  xaxis: {
    type: 'datetime',
    categories: [
      '01/01/2011 GMT',
      '01/02/2011 GMT',
      '01/03/2011 GMT',
      '01/04/2011 GMT',
      '01/05/2011 GMT',
      '01/06/2011 GMT',
    ],
  },
  legend: {
    position: 'right',
    offsetY: 40,
  },
  fill: {
    opacity: 1,
  },
};
const series = [
  {
    name: 'PRODUCT A',
    data: [44, 55, 41, 67, 22, 43],
  },
  {
    name: 'PRODUCT B',
    data: [13, 23, 20, 8, 13, 27],
  },
  {
    name: 'PRODUCT C',
    data: [11, 17, 15, 15, 21, 14],
  },
  {
    name: 'PRODUCT D',
    data: [21, 7, 25, 13, 22, 8],
  },
];

const doughnatOptions = {
  dataLabels: {
    enabled: true,
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
          offsetX: -10,
          offsetY: 0,
        },
      },
    },
  ],
  plotOptions: {
    pie: {
      donut: {
        size: '0%',
        labels: {
          // show: true,
          name: {
            show: true,
            fontSize: '22px',
            fontFamily: 'Rubik',
            color: '#dfsda',
            offsetY: -10,
          },
        },
      },
    },
  },

  series: [44, 55, 41, 17, 15],
  labels: ['A', 'B', 'C', 'D', 'E'],
};

const ViewResult = () => {
  const cx = className.bind(styles);

  return (
    <>
      <div className={cx('animate__animated animate__slideInRight')}>
        <div className={cx('card m-3')}>
          <div className={cx('add-scroll')}>
            <div className={cx('card-table')}>
              <h4>View Result </h4>

              <div className={cx('flex-style')}>
                <div>
                  <div className={cx('text-btn')}>
                    <div>
                      <div>
                        <div className="total-score mb-3">
                          <h3 className={cx('px-3 pt-3')}>Total Score</h3>
                          <hr className={cx('my-2')} />
                          <h5 className={cx('px-3 pb-3')}>95% out of 100%</h5>
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-12">
                        <div className={cx('card')}>
                          <div className={cx('card-table m-0')}>
                            <div className="pt-3">
                              <h6 className={cx('mx-1')}>
                                Assessment Report For Class 5th Class 1{' '}
                              </h6>
                              <hr className="mb-0" />
                            </div>
                            <Table>
                              <tbody>
                                <tr>
                                  <td>Email ID</td>
                                  <td>demo@gmail.com</td>
                                </tr>
                                <tr>
                                  <td>Taken Date</td>
                                  <td>01-01-2022</td>
                                </tr>
                                <tr>
                                  <td>Percentage</td>
                                  <td>86.43%</td>
                                </tr>
                                <tr>
                                  <td>Time Taken</td>
                                  <td>26 Mins 47 Sec</td>
                                </tr>
                                <tr>
                                  <td>Total Time</td>
                                  <td>3 Hours</td>
                                </tr>
                                <tr>
                                  <td>No. of Browser Tolerance Attempt</td>
                                  <td>0</td>
                                </tr>
                                <tr>
                                  <td>Result</td>
                                  <td>
                                    <div className="badge badge-success">
                                      Passed
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-6 col-sm-12 mb-3">
                        <div className={cx('card')}>
                          <div className={cx('card-table m-0')}>
                            <div className="pt-3">
                              <h6 className={cx('mx-3')}> Score of Student </h6>
                              <hr />
                            </div>
                            <Chart
                              options={options as unknown as undefined}
                              series={series}
                              type="bar"
                              // width='500'
                              height={300}
                            />
                          </div>
                        </div>
                      </div>
                      <div className=" col-lg-6 col-sm-12 mb-3">
                        <div className={cx('card')}>
                          <div className={cx('card-table m-0')}>
                            <div className="pt-3">
                              <h6 className={cx('mx-3')}> FeedBack Student </h6>
                              <hr />
                            </div>
                            <Chart
                              options={doughnatOptions}
                              series={doughnatOptions.series}
                              type="donut"
                              // width='500'
                              height={310}
                            />
                          </div>
                        </div>
                      </div>
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
export default ViewResult;
