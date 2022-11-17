import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './index.module.css';
import { RootState } from 'redux/store';
import className from 'classnames/bind';
import SubFranchisee from './SubFranchisee';
import StudentFranchisee from 'components/StudentFranchisee/StudentFranchisee';

const Index = () => {
  const router = useRouter();
  const cx = className.bind(styles);

  const userRole = useSelector((state: RootState) => state?.login?.userRole);

  const parentFranchisee = JSON.parse(
    localStorage.getItem('parentFranchisee') as string
  );
  const franchiseeName = JSON.parse(
    localStorage.getItem('franchiseeName') as string
  );

  const previousFranchisee = (index: number) => {
    localStorage.setItem(
      'parentFranchisee',
      JSON.stringify(franchiseeName[index])
    );
    if (index > 0) {
      const dt = franchiseeName?.slice(0, index + 1);
      localStorage.setItem('franchiseeName', JSON.stringify(dt));
      router.push('/sub/franchisee');
    } else {
      localStorage.setItem(
        'franchiseeName',
        JSON.stringify([franchiseeName[0]])
      );
      router.push('/sub/franchisee');
    }
  };
  return (
    <>
      {userRole === 1 ? (
        <div className={cx('flex-style')}>
          <div className={cx('parent-section')}>
            <div className={cx('text-btn')}>
              <div className={cx('animate__animated animate__slideInRight')}>
                <div className={cx('card')}>
                  <div className={cx('card-table')}>
                    <div className='franchisee-title'>
                      <FontAwesomeIcon
                        icon={faArrowLeft}
                        className={cx('franchisee-back-img')}
                        onClick={() => {
                          localStorage.removeItem('parentFranchisee');
                          localStorage.removeItem('franchiseeName');
                          router.push('/franchisee');
                        }}
                      />
                      {franchiseeName?.map(
                        (
                          item: { _id: string; name: string },
                          index: number,
                          arr: string[]
                        ) => {
                          return (
                            <div key={index}>
                              <h2 className='franchisee-breadcrumb'>
                                <div
                                  onClick={() => previousFranchisee(index)}
                                >{`${item.name}`}</div>
                                {arr?.length !== index + 1 && (
                                  <div style={{ marginLeft: '6px' }}>{`>`}</div>
                                )}
                              </h2>
                            </div>
                          );
                        }
                      )}
                    </div>
                    <div>
                      <Tabs
                        defaultActiveKey='subfranchisee'
                        id='justify-tab-example'
                        className='mb-1'
                        variant='tabs'
                      >
                        <Tab
                          className='nav-base'
                          eventKey='subfranchisee'
                          title='Sub Franchisee'
                        >
                          <SubFranchisee />
                        </Tab>
                        <ol className='cd-breadcrumb'>
                          <li>
                            <h6
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                router.push('/franchisee');
                                localStorage.removeItem('parentFranchisee');
                                localStorage.removeItem('subFranchisee');
                              }}
                            >
                              {parentFranchisee?.nameOfFranchisee}
                            </h6>
                          </li>
                          <li
                            className='current'
                            style={{
                              marginBottom: '10px',
                              fontWeight: '100px',
                            }}
                          >
                            Student
                          </li>
                        </ol>
                        <Tab
                          className='nav-base'
                          eventKey='student'
                          title='Student'
                        >
                          <StudentFranchisee />
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
export default Index;
