import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useState, FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons';

import { RootState } from 'redux/store';
import styles from './index.module.css';
import className from 'classnames/bind';
import { Loader } from 'components/Loader/Loader';
import StudentExamTable from 'components/Table/StudentExam';

const StudentExam = () => {
  const router = useRouter();
  const cx = className.bind(styles);

  const load = useSelector((state: RootState) => state?.loader?.loader);
  const userRole = useSelector((state: RootState) => state?.login?.userRole);

  const [search, setSearch] = useState('');
  const studentName = JSON.parse(localStorage.getItem('studentName') as string);

  const searchList = (e: React.FormEvent<HTMLDivElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setSearch(value);
  };

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
                    <div className={cx('card-flex')}>
                      <Button
                        className={cx('btn-icon-breadcrumb')}
                        type='button'
                        onClick={() => {
                          router.push('/student'),
                            localStorage.removeItem('reportExamName'),
                            localStorage.removeItem('studentName');
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faArrowLeft}
                          className={cx('back-img')}
                        />
                      </Button>
                      <div className='mb-2'>
                        <h4>
                          {studentName === 'NaN NaN' ? '' : studentName} Exams
                        </h4>
                      </div>
                    </div>

                    <div className={cx('search-flex')}>
                      <div className={cx('flex items-center justify-center')}>
                        <div className='mb-2'>
                          <div
                            className={cx('search')}
                            onChange={(e: FormEvent<HTMLDivElement>) =>
                              searchList(e)
                            }
                          >
                            <FontAwesomeIcon
                              icon={faSearch}
                              className={cx('has-search')}
                            />
                            <input
                              className={cx('icon-box')}
                              placeholder='Search term'
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <StudentExamTable searchData={search} />
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
export default StudentExam;
