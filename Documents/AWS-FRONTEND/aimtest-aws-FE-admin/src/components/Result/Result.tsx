import React from 'react';
// import dynamic from 'next/dynamic';
import Tab from 'react-bootstrap/Tab';
import { useRouter } from 'next/router';
import Tabs from 'react-bootstrap/Tabs';
import { useSelector } from 'react-redux';
import { Button, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';

import styles from './index.module.css';
import className from 'classnames/bind';
import { RootState } from 'redux/store';
import { Loader } from 'components/Loader/Loader';
// import { options, series, doughnatOptions } from './reportData';

// let totalOfAllElement: number;

const Result = () => {
  const router = useRouter();
  const cx = className.bind(styles);

  const reportData = useSelector((state: RootState) =>
    state?.student?.studentExamQuestions?.questionResult
      ?.slice()
      ?.sort((a: { name: string }, b: { name: string }) =>
        a?.name.localeCompare(b?.name)
      )
  );
  const testReportData = useSelector(
    (state: RootState) => state?.student?.studentExamTest
  );
  const userRole = useSelector((state: RootState) => state?.login?.userRole);

  const filteredTestList = testReportData?.filter((item: { name: string }) => {
    return item.name?.toLowerCase()?.includes('test');
  });

  // if (reportData?.length > 0) {
  //   const initialValue = 0;
  //   totalOfAllElement = reportData?.reduce(
  //     (a: number, b: { score: number }) => a + b.score,
  //     initialValue
  //   );
  // } else {
  //   totalOfAllElement = 0;
  // }

  const load = useSelector((state: RootState) => state?.loader.loader);
  const objj = reportData?.filter(
    (
      value: { section: { name: string } },
      index: number,
      self: { section: { name: string } }[]
    ) =>
      index ===
      self?.findIndex(
        (t: { section: { name: string } }) =>
          t.section?.name === value.section?.name
      )
  );
  const studentName =
    (localStorage.getItem('studentName') as string) !== undefined &&
    JSON?.parse(localStorage.getItem('studentName') as string);
  const examName =
    (localStorage.getItem('studentName') as string) !== undefined &&
    JSON?.parse(localStorage.getItem('reportExamName') as string);

  const getTestName = (name: string) => {
    const dt = name?.toLowerCase();
    const a =
      dt?.substring(0, dt?.indexOf('test')) +
      ' ' +
      dt?.substring(dt?.indexOf('test'), dt?.length);

    return a?.toUpperCase();
  };

  return (
    <>
      {userRole === 1 ? (
        <div className={cx('flex-style')}>
          <Loader open={load} />
          <div className={cx('parent-section')}>
            <div className={cx('animate__animated animate__slideInRight')}>
              <div className={cx('card')}>
                <div>
                  <div className={cx('text-btn')}>
                    <div className={cx('p-3')}>
                      <div className={cx('card-flex')}>
                        <Button
                          className={cx('btn-icon-breadcrumb')}
                          type='button'
                          onClick={() => {
                            router.push('/student-exam'),
                              localStorage.removeItem('reportExamName');
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faArrowLeft}
                            className={cx('back-img')}
                          />
                        </Button>
                        <div className={cx('mb-2')}>
                          <h4>{studentName} Result</h4>
                        </div>
                      </div>
                      <div className={cx('col-sm-6')}>
                        <div className={cx('section-btn')}></div>
                      </div>

                      <Tabs
                        defaultActiveKey='subject'
                        id='uncontrolled-tab-example'
                        className='mb-3'
                      >
                        {/* <Tab
                          eventKey='score'
                          title='Score Card'
                          className='tab-result-table'
                        >
                          <div className='row mb-3'>
                            <div className='col-sm-12'>
                              <div>
                                <div className={cx('card-table m-0')}>
                                  <div className='pt-3'>
                                    <h6 className={cx('mx-3')}>
                                      Score Card For {examName}{' '}
                                    </h6>
                                    <hr className='mb-0' />
                                  </div>
                                  <div>
                                    <Table hover>
                                      <tbody>
                                        <tr>
                                          <td>Total No. of Student</td>
                                          <td>
                                            <strong className='text-primary'>
                                              11
                                            </strong>
                                          </td>
                                          <td>My Marks</td>
                                          <td>
                                            <strong className='text-primary'>
                                              69.32%
                                            </strong>
                                          </td>
                                          <td>Correct Question</td>
                                          <td>
                                            <strong className='text-primary'>
                                              33
                                            </strong>
                                          </td>
                                          <td>Incorrect Question</td>
                                          <td>
                                            <strong className='text-danger'>
                                              117
                                            </strong>
                                          </td>
                                          <td></td>
                                          <td></td>
                                        </tr>
                                        <tr>
                                          <td>Total Marks of Test</td>
                                          <td>
                                            <strong className='text-primary'>
                                              187.50
                                            </strong>
                                          </td>
                                          <td>My Percentile</td>
                                          <td>
                                            <strong className='text-primary'>
                                              90.91%
                                            </strong>
                                          </td>
                                          <td>Right Marks</td>
                                          <td>
                                            <strong className='text-primary'>
                                              69.32
                                            </strong>
                                          </td>
                                          <td></td>
                                          <td></td>
                                          <td></td>
                                        </tr>
                                        <tr>
                                          <td>Total Question in Test</td>
                                          <td>
                                            <strong className='text-primary'>
                                              150
                                            </strong>
                                          </td>
                                          <td>
                                            Total Answered Question in Test
                                          </td>
                                          <td>
                                            <strong className='text-primary'>
                                              150
                                            </strong>
                                          </td>
                                          <td>Left Question</td>
                                          <td>
                                            <strong className='text-danger'>
                                              0
                                            </strong>
                                          </td>
                                          <td>Left Question Marks</td>
                                          <td>
                                            <strong className='text-danger'>
                                              0
                                            </strong>
                                          </td>
                                          <td></td>
                                          <td></td>
                                        </tr>
                                        <tr>
                                          <td>Total Time of Test</td>
                                          <td>
                                            <strong className='text-primary'>
                                              3 Hours{' '}
                                            </strong>
                                          </td>
                                          <td>My Time</td>
                                          <td>
                                            <strong className='text-primary'>
                                              1 Hours 52 Mins 52 Sec
                                            </strong>
                                          </td>
                                          <td>My Rank</td>
                                          <td>
                                            <strong className='text-primary'>
                                              1<sup>st</sup>
                                            </strong>
                                          </td>
                                          <td></td>
                                          <td></td>
                                        </tr>
                                      </tbody>
                                    </Table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='row mb-3'>
                            <div className='col-sm-6 mb-3'>
                              <div className={cx('card')}>
                                <div className={cx('card-table m-0')}>
                                  <div className='pt-3'>
                                    <h6 className={cx('mx-3')}>
                                      Performance Report For {examName}{' '}
                                    </h6>
                                    <hr />
                                  </div>
                                  <Chart
                                    options={options as unknown as undefined}
                                    series={series}
                                    type='bar'
                                    height={300}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className='col-sm-6 mb-3'>
                              <div className={cx('card')}>
                                <div className={cx('card-table m-0')}>
                                  <div className='pt-3'>
                                    <h6 className={cx('mx-3')}>
                                      {' '}
                                      Question Marks Wise Report For {
                                        examName
                                      }{' '}
                                    </h6>
                                    <hr />
                                  </div>
                                  <Chart
                                    options={doughnatOptions}
                                    series={doughnatOptions.series}
                                    type='donut'
                                    // width='500'
                                    height={310}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </Tab> */}
                        <Tab
                          eventKey='subject'
                          title=' Subject Report'
                          className='tab-result-table'
                        >
                          <div className='row mb-3'>
                            <div className='col-sm-12'>
                              <div>
                                <div className={cx('card-table m-0')}>
                                  <div className='pt-3'>
                                    <h6 className={cx('mx-3')}>
                                      Subject Report For {examName}{' '}
                                    </h6>
                                    <hr className='mb-0' />
                                  </div>
                                  <div>
                                    <Table hover>
                                      <thead className='thead-box'>
                                        <tr>
                                          <th>Group / Section</th>
                                          <th>Name</th>
                                          <th>Total Questions</th>

                                          <th>Marks Scored</th>
                                        </tr>
                                      </thead>
                                      <tbody className='height-box-table'>
                                        {reportData?.length > 0 &&
                                          reportData !== undefined &&
                                          reportData?.map(
                                            (
                                              item: {
                                                section: {
                                                  name: string;
                                                };
                                                name: string;
                                                totalQuestion: string | number;
                                                score: string | number;
                                              },
                                              index: number
                                            ) => {
                                              return (
                                                <>
                                                  <tr key={index}>
                                                    <td className='text-primary-group'>
                                                      <strong>
                                                        {item?.section?.name}{' '}
                                                      </strong>
                                                    </td>
                                                    <td className='text-primary'>
                                                      <strong>
                                                        {item?.name}
                                                      </strong>
                                                    </td>
                                                    <td>
                                                      {item?.totalQuestion}
                                                    </td>
                                                    <td>
                                                      <span className='text-success'>
                                                        {item?.score}%
                                                      </span>
                                                    </td>
                                                  </tr>
                                                </>
                                              );
                                            }
                                          )}
                                      </tbody>
                                    </Table>
                                    {(reportData === undefined ||
                                      reportData?.length === 0) && (
                                      <div className='no-record'>
                                        {' '}
                                        <h3>No Question Data Found</h3>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* <div className='row mb-3'>
                          <div className='col-sm-12'>
                            <div className={cx('card')}>
                              <div className={cx('card-table m-0')}>
                                <div className='pt-3'>
                                  <h6 className={cx('mx-3')}>
                                    Performance Report For className 7th test 1{' '}
                                  </h6>
                                  <hr />
                                </div>
                                <Chart
                                  options={options as unknown as undefined}
                                  series={series}
                                  type='bar'
                                  // width='500'
                                  height={300}
                                />
                              </div>
                            </div>
                          </div>
                        </div> */}
                        </Tab>
                        <Tab
                          eventKey='time'
                          title='Time Management'
                          className='tab-result-table'
                        >
                          <div className='row mb-3'>
                            <div className='col-sm-12'>
                              <div>
                                <div className={cx('card-table m-0')}>
                                  <div className='pt-3'>
                                    <h6 className={cx('mx-3')}>
                                      Time Management Report For {examName}{' '}
                                    </h6>
                                    <hr className='mb-0' />
                                  </div>
                                  <div>
                                    <Table hover>
                                      <thead className='thead-box'>
                                        <tr>
                                          <th>Name</th>
                                          <th>Total Questions</th>
                                          <th>Marks Scored</th>
                                          <th>Average (%)</th>
                                          <th>Unattempted Questions / Marks</th>
                                          <th>Total Time</th>
                                        </tr>
                                      </thead>
                                      <tbody className='height-box-table'>
                                        {reportData?.length > 0 &&
                                          reportData !== undefined &&
                                          reportData?.map(
                                            (
                                              item: {
                                                section: {
                                                  name: string;
                                                };
                                                name: string;
                                                totalQuestion: number;

                                                score: number;
                                                totalTime: number;
                                              },
                                              index: number
                                            ) => {
                                              return (
                                                <tr key={index}>
                                                  <td className='text-primary'>
                                                    <strong>
                                                      {item?.name}
                                                    </strong>
                                                  </td>
                                                  <td>{item.totalQuestion}</td>
                                                  <td>
                                                    <span className='text-success'>
                                                      {item.score}%
                                                    </span>
                                                  </td>
                                                  <td>{item.score}%</td>

                                                  <td>
                                                    <span className='text-warning'>
                                                      0
                                                    </span>
                                                    /
                                                    <span className='text-danger'>
                                                      0
                                                    </span>
                                                  </td>
                                                  <td>{item.totalTime}0 Sec</td>
                                                </tr>
                                              );
                                            }
                                          )}
                                      </tbody>
                                    </Table>
                                    {(reportData === undefined ||
                                      reportData?.length === 0) && (
                                      <div className='no-record'>
                                        {' '}
                                        <h3>No Question Data Found</h3>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* <div className='row'>
                          <div className='col-sm-12'>
                            <div className={cx('card')}>
                              <div className={cx('card-table m-0')}>
                                <div className='pt-3'>
                                  <h6 className={cx('mx-3')}>
                                    Performance Report For className 7th test 1{' '}
                                  </h6>
                                  <hr />
                                </div>
                                <Chart
                                  options={options as unknown as undefined}
                                  series={series}
                                  type='bar'
                                  // width='500'
                                  height={300}
                                />
                              </div>
                            </div>
                          </div>
                        </div> */}
                        </Tab>
                        {/* <Tab
                          eventKey='compare'
                          title='Compare Report'
                          className='tab-result-table'
                        >
                          <div>
                            <div className='row mb-3'>
                              <div className='col-sm-12'>
                                <div>
                                  <div className={cx('card-table m-0')}>
                                    <div className='pt-3'>
                                      <h6 className={cx('mx-3')}>
                                        Compare Report For {examName}
                                      </h6>
                                      <hr className='mb-0' />
                                    </div>
                                    <div className='row'>
                                      <div className='col-sm-6'>
                                        <div>
                                          <Table hover>
                                            <tbody>
                                              <tr>
                                                <td>Total Questions</td>
                                                <td>
                                                  <strong>150</strong>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>Maximum Marks</td>
                                                <td>
                                                  <strong>187.50</strong>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>Attempted Questions</td>
                                                <td>
                                                  <strong className='text-success'>
                                                    150
                                                  </strong>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>Unattempted Questions</td>
                                                <td>
                                                  <strong className='text-danger'>
                                                    0
                                                  </strong>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>Correct Questions</td>
                                                <td>
                                                  <strong className='text-success'>
                                                    33
                                                  </strong>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>Incorrect Questions</td>
                                                <td>
                                                  <strong className='text-danger'>
                                                    117
                                                  </strong>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>Total Score</td>
                                                <td>
                                                  <strong className='text-primary'>
                                                    69.32 /187.50
                                                  </strong>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>score</td>
                                                <td>
                                                  <strong>69.32%</strong>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>Percentile</td>
                                                <td>
                                                  <strong>90.91%</strong>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>Total Time</td>
                                                <td>
                                                  <strong>
                                                    1 Hours 52 Mins 52 Sec
                                                  </strong>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>Rank</td>
                                                <td valign='top'>
                                                  <div className='rank'>
                                                    1<sup>st</sup>
                                                  </div>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </Table>
                                        </div>
                                      </div>
                                      <div className='col-sm-6'>
                                        <div>
                                          <Table hover>
                                            <tbody>
                                              <tr>
                                                <td>Total Questions</td>
                                                <td>
                                                  <strong>150</strong>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>Maximum Marks</td>
                                                <td>
                                                  <strong>187.50</strong>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>Attempted Questions</td>
                                                <td>
                                                  <strong className='text-success'>
                                                    150
                                                  </strong>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>Unattempted Questions</td>
                                                <td>
                                                  <strong className='text-danger'>
                                                    0
                                                  </strong>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>Correct Questions</td>
                                                <td>
                                                  <strong className='text-success'>
                                                    33
                                                  </strong>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>Incorrect Questions</td>
                                                <td>
                                                  <strong className='text-danger'>
                                                    117
                                                  </strong>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>Total Score</td>
                                                <td>
                                                  <strong className='text-primary'>
                                                    69.32 /187.50
                                                  </strong>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>score</td>
                                                <td>
                                                  <strong>69.32%</strong>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>Percentile</td>
                                                <td>
                                                  <strong>90.91%</strong>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>Total Time</td>
                                                <td>
                                                  <strong>
                                                    1 Hours 52 Mins 52 Sec
                                                  </strong>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>Rank</td>
                                                <td valign='top'>
                                                  <div className='rank'>
                                                    2<sup>nd</sup>
                                                  </div>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </Table>
                                        </div>
                                      </div>
                                    </div>
                                    <hr className='mb-0' />
                                    <div className='py-3'>
                                      <div
                                        className={cx(
                                          'action-btn justify-content-end me-4'
                                        )}
                                      >
                                        <div>
                                          <div className='con'>
                                            <div className='con-tooltip top'>
                                              <div className={cx('edit-icon')}>
                                                <FontAwesomeIcon
                                                  icon={faArrowLeft}
                                                />
                                                <div className='tooltip '>
                                                  <p>Previous</p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        <div>
                                          <div className='con'>
                                            <div className='con-tooltip top'>
                                              <div className={cx('edit-icon')}>
                                                <FontAwesomeIcon
                                                  icon={faArrowRight}
                                                />
                                                <div className='tooltip '>
                                                  <p>Next </p>
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
                          </div>
                          <div className='row mb-3'>
                          <div className='col-sm-12'>
                            <div className={cx('card')}>
                              <div className={cx('card-table m-0')}>
                                <div className='pt-3'>
                                  <h6 className={cx('mx-3')}>
                                    Compare Report For className 7th test 1{' '}
                                  </h6>
                                  <hr />
                                </div>
                                <Chart
                                  options={options as unknown as undefined}
                                  series={series}
                                  type='bar'
                                  // width='500'
                                  height={300}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        </Tab> */}
                        <Tab
                          eventKey='group'
                          title=' Group Total'
                          className='tab-result-table'
                        >
                          <div className='row mb-3'>
                            <div className='col-sm-12'>
                              <div>
                                <div className={cx('card-table m-0')}>
                                  <div className='pt-3'>
                                    <h6 className={cx('mx-3')}>
                                      Group Wise Total For {examName}
                                    </h6>
                                    <hr className='mb-0' />
                                  </div>
                                  <div>
                                    <Table hover>
                                      <thead>
                                        <tr>
                                          <td>S.No</td>
                                          <td>Group Name </td>
                                          <th>Group Percentage</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {objj != undefined &&
                                          objj?.map(
                                            (
                                              item: {
                                                section: {
                                                  name: string;
                                                  score: string;
                                                };
                                              },
                                              index: number
                                            ) => {
                                              return (
                                                <tr key={index}>
                                                  <td>{index + 1}</td>
                                                  <td>{item?.section?.name}</td>
                                                  <th>
                                                    {item?.section?.score}%
                                                  </th>
                                                </tr>
                                              );
                                            }
                                          )}
                                      </tbody>
                                    </Table>
                                    {(reportData === undefined ||
                                      reportData?.length === 0) && (
                                      <div className='no-record'>
                                        {' '}
                                        <h3>No Question Data Found</h3>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Tab>
                        <Tab
                          eventKey='memory'
                          title='Test Report'
                          className='tab-result-table'
                        >
                          <div className='row mb-3'>
                            <div className='col-sm-12'>
                              <div>
                                <div className={cx('card-table m-0')}>
                                  <div className='pt-3'>
                                    <h6 className={cx('mx-3')}>
                                      Test Report {examName}{' '}
                                    </h6>
                                    <hr className='mb-0' />
                                  </div>
                                  <div>
                                    <Table hover>
                                      <thead>
                                        <tr>
                                          <th>Test Name</th>
                                          <th>No. of Questions</th>
                                          <th>Correct Answers</th>
                                          <th>Wrong Answers</th>
                                          <th>Not Answered</th>
                                          <th>Your Score</th>
                                          {/* <th>Action</th> */}
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {filteredTestList?.length > 0 &&
                                          filteredTestList != undefined &&
                                          filteredTestList?.map(
                                            (
                                              item: {
                                                name: string;
                                                totalQuestion: number;
                                                correctAnsCount: number;
                                                incorrectAnsCount: number;
                                                notAnsCount: number;
                                                score: string;
                                              },
                                              index: number
                                            ) => {
                                              return (
                                                <tr key={index}>
                                                  <td className='text-danger'>
                                                    <strong>
                                                      {getTestName(item.name)}
                                                    </strong>
                                                  </td>
                                                  <td>
                                                    {item?.totalQuestion
                                                      ? item?.totalQuestion
                                                      : '0'}
                                                  </td>
                                                  <td>
                                                    {item?.correctAnsCount
                                                      ? item?.correctAnsCount
                                                      : getTestName(
                                                          item.name
                                                        ) === 'WORD TEST'
                                                      ? '0 Words'
                                                      : '0'}
                                                  </td>
                                                  <td>
                                                    {item?.incorrectAnsCount
                                                      ? item?.incorrectAnsCount
                                                      : getTestName(
                                                          item.name
                                                        ) === 'WORD TEST'
                                                      ? '0 Words'
                                                      : '0'}
                                                  </td>
                                                  <td>
                                                    {item?.notAnsCount
                                                      ? getTestName(
                                                          item.name
                                                        ) === 'WORD TEST'
                                                        ? item?.notAnsCount + 'Words'
                                                        : item?.notAnsCount
                                                      : getTestName(
                                                          item.name
                                                        ) === 'WORD TEST'
                                                      ? '0 Words'
                                                      : '0'}
                                                  </td>
                                                  <td>{item?.score}</td>
                                                  {/* <td>
                                                  <div className='con'>
                                                    <div className='con-tooltip top'>
                                                      <div
                                                        className={cx(
                                                          'edit-icon'
                                                        )}
                                                      >
                                                        <FontAwesomeIcon
                                                          icon={faEye}
                                                        />
                                                        <div className='tooltip '>
                                                          <p>View</p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </td> */}
                                                </tr>
                                              );
                                            }
                                          )}
                                      </tbody>
                                    </Table>
                                    {(filteredTestList === undefined ||
                                      filteredTestList?.length === 0) && (
                                      <div className='no-record'>
                                        {' '}
                                        <h3>No Test Data Found</h3>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Tab>
                        {/* <Tab
                          eventKey='student'
                          title=' Student Compare Report'
                          className='tab-result-table'
                        >
                          <div className='row mb-3'>
                            <div className='col-sm-12'>
                              <div>
                                <div className={cx('card-table m-0')}>
                                  <div className='pt-3'>
                                    <h6 className={cx('mx-3')}>
                                      Student Compare Report For {examName}{' '}
                                    </h6>
                                    <hr className='mb-0' />
                                  </div>
                                  <div>
                                    <Table hover>
                                      <thead className='thead-box'>
                                        <tr>
                                          <th>Name</th>
                                          <th>Current</th>
                                          <th>1st</th>
                                          <th>2nd</th>
                                          <th>3rd</th>
                                          <th>4th</th>
                                          <th>5th</th>
                                          <th>Total Score</th>
                                        </tr>
                                      </thead>
                                      <tbody className='height-box-table'>
                                        {reportData?.length > 0 &&
                                          reportData !== undefined &&
                                          reportData?.map(
                                            (
                                              item: {
                                                section: {
                                                  name: string;
                                                };
                                                name: string;
                                                totalQuestion: number;

                                                score: number;
                                                totalTime: number;
                                              },
                                              index: number
                                            ) => {
                                              return (
                                                <tr key={index}>
                                                  <td className='text-primary'>
                                                    <strong>
                                                      {item?.name}
                                                    </strong>
                                                  </td>
                                                  <td>{item?.score} %</td>
                                                  <td>0%</td>
                                                  <td>0%</td>
                                                  <td>0%</td>
                                                  <td>0%</td>
                                                  <td>0%</td>
                                                  <td>{item.score} % </td>
                                                </tr>
                                              );
                                            }
                                          )}
                                        <tr>
                                          <td>
                                            <strong>
                                              Total of All Element
                                            </strong>
                                          </td>
                                          <td>
                                            {reportData?.length === 1
                                              ? (
                                                  totalOfAllElement as unknown as {
                                                    score: number;
                                                  }
                                                )?.score
                                              : totalOfAllElement}{' '}
                                            %
                                          </td>
                                          <td>0%</td>
                                          <td>0%</td>
                                          <td>0%</td>
                                          <td>0%</td>
                                          <td>0%</td>
                                          <td>
                                            {reportData?.length === 1
                                              ? (
                                                  totalOfAllElement as unknown as {
                                                    score: number;
                                                  }
                                                )?.score
                                              : totalOfAllElement}{' '}
                                            %
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <strong>Overall %</strong>
                                          </td>
                                          <td>
                                            {reportData?.length === 1
                                              ? (
                                                  totalOfAllElement as unknown as {
                                                    score: number;
                                                  }
                                                )?.score
                                              : totalOfAllElement}{' '}
                                            %
                                          </td>
                                          <td>0%</td>
                                          <td>0%</td>
                                          <td>0%</td>
                                          <td>0%</td>
                                          <td>0%</td>
                                          <td>
                                            {reportData?.length === 1
                                              ? (
                                                  totalOfAllElement as unknown as {
                                                    score: number;
                                                  }
                                                )?.score
                                              : totalOfAllElement}{' '}
                                            %
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <strong>Average %</strong>
                                          </td>
                                          <td>
                                            {reportData?.length === 1
                                              ? (
                                                  totalOfAllElement as unknown as {
                                                    score: number;
                                                  }
                                                )?.score / 1
                                              : reportData?.length === 0
                                              ? 0
                                              : Math.ceil(
                                                  totalOfAllElement /
                                                    reportData?.length
                                                )}{' '}
                                            %
                                          </td>
                                          <td>0%</td>
                                          <td>0%</td>
                                          <td>0%</td>
                                          <td>0%</td>
                                          <td>0%</td>
                                          <td>
                                            {reportData?.length === 1
                                              ? (
                                                  totalOfAllElement as unknown as {
                                                    score: number;
                                                  }
                                                )?.score / 1
                                              : reportData?.length === 0
                                              ? 0
                                              : Math.ceil(
                                                  totalOfAllElement /
                                                    reportData?.length
                                                )}{' '}
                                            %
                                          </td>
                                        </tr>
                                      </tbody>
                                    </Table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Tab> */}
                        <Tab
                          eventKey='contact'
                          title='Formula Value'
                          className='tab-result-table'
                        >
                          <div className='row mb-3  '>
                            <div className='col-sm-12'>
                              <div>
                                <div className={cx('card-table m-0')}>
                                  <div className='pt-3'>
                                    <h6 className={cx('mx-3')}>
                                      Formula Value Report For {examName}{' '}
                                    </h6>
                                    <hr className='mb-0' />
                                  </div>
                                  <div>
                                    <Table hover>
                                      <thead className='thead-box'>
                                        <tr>
                                          <th>Element</th>
                                          <th>Formula</th>
                                          <th>Score</th>
                                        </tr>
                                      </thead>
                                      <tbody className='height-box-table'>
                                        {reportData?.length > 0 &&
                                          reportData !== undefined &&
                                          reportData?.map(
                                            (
                                              item: {
                                                name: string;
                                                formula: string;
                                                score: number;
                                              },
                                              index: number
                                            ) => {
                                              return (
                                                <tr key={index}>
                                                  <td>{item?.name}</td>
                                                  <td>{item?.formula}</td>
                                                  <td>{item?.score}%</td>
                                                </tr>
                                              );
                                            }
                                          )}
                                      </tbody>
                                    </Table>
                                    {(reportData === undefined ||
                                      reportData?.length === 0) && (
                                      <div className='no-record'>
                                        {' '}
                                        <h3>No Question Data Found</h3>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Tab>
                      </Tabs>
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
export default Result;
