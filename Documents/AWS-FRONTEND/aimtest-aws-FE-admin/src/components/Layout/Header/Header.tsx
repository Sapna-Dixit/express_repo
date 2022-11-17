import Link from 'next/link';
import Image from 'next/image';
import { AnyAction } from 'redux';
import { Key, useState } from 'react';
import { useRouter } from 'next/router';
import {
  faAddressCard,
  faCartShopping,
  faChalkboardUser,
  faCircleInfo,
  faQuestion,
  faRightFromBracket,
  faUser,
  faUserPen,
  faBars,
  faChartLine,
  faUserFriends,
  faLayerGroup,
} from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import { Dropdown, ButtonToolbar } from 'rsuite';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { items } from './Sidebar';
import logo from 'Images/logo.png';
import SidebarItem from './SidebarItem';
import { RootState } from 'redux/store';
import { loader } from 'redux/reducer/Loader';
import { resetLogin } from 'redux/reducer/Login';
import showToaster from 'components/Toaster/Toaster';
import { logoutSuccess, success } from 'components/Toaster/ToasterMessage';

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const userRole = useSelector((state: RootState) => state?.login?.userRole);
  const userData = useSelector((state: RootState) => state?.login?.userData);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow((prev) => !prev);

  const logout = () => {
    showToaster(success, logoutSuccess);
    dispatch(resetLogin() as unknown as AnyAction);
    localStorage.clear();
    setTimeout(async () => {
      (await router.push('/')) && router.reload();
    }, 1000);
  };

  return (
    <>
      <div>
        <div className='bg-header'>
          <Button variant='primary'>Launch</Button>
          <>
            <div className='menu '>
              <div className='logo-style headerLeft'>
                <Link href='/dashboard'>
                  <div className='logo-size'>
                    <Image src={logo} alt='logo' />
                  </div>
                </Link>
              </div>
              <div className='nav-bar'>
                <ul className='nav level-one'>
                  <div className='icon-hover'>
                    <ButtonToolbar className='animate__animated animate__fadeInUp'>
                      <div className='vertical-line'>
                        <Dropdown
                          activeKey={router.pathname}
                          title='Standard'
                          className={`animate__animated animate__fadeInUp ${
                            router.pathname === '/class' ||
                            router.pathname === '/section'
                              ? 'active-dropdown'
                              : ''
                          }`}
                          icon={<FontAwesomeIcon icon={faUserFriends} />}
                        >
                          <div>
                            <Dropdown.Item
                              eventKey='/class'
                              onClick={() => {
                                router.push('/class');
                              }}
                            >
                              Class
                            </Dropdown.Item>
                            <Dropdown.Item
                              eventKey='/section'
                              onClick={() => {
                                router.push('/section');
                              }}
                            >
                              Section
                            </Dropdown.Item>
                          </div>
                        </Dropdown>
                      </div>
                    </ButtonToolbar>
                  </div>
                  <ButtonToolbar className='animate__animated animate__fadeInUp'>
                    <div className='vertical-line'>
                      <Link href='/element'>
                        <div
                          className={`dash ${
                            router.pathname === '/element'
                              ? 'active-dropdown'
                              : ''
                          } `}
                        >
                          <div className='element'>
                            <FontAwesomeIcon icon={faLayerGroup} />
                            <span>Elements</span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </ButtonToolbar>
                  {userRole === 1 && (
                    <div className='icon-hover'>
                      <ButtonToolbar className='animate__animated animate__fadeInUp'>
                        <div className='vertical-line'>
                          <Dropdown
                            activeKey={router.pathname}
                            title='Buy'
                            className={`animate__animated animate__fadeInUp ${
                              router.pathname === '/coupon' ||
                              router.pathname === '/package'
                                ? 'active-dropdown'
                                : ''
                            }`}
                            icon={<FontAwesomeIcon icon={faCartShopping} />}
                          >
                            <Dropdown.Item
                              eventKey='/package'
                              onClick={() => {
                                router.push('/package');
                              }}
                            >
                              Packages
                            </Dropdown.Item>
                            <Dropdown.Item
                              eventKey='/coupon'
                              onClick={() => {
                                router.push('/coupon');
                              }}
                            >
                              Coupons
                            </Dropdown.Item>
                          </Dropdown>
                        </div>
                      </ButtonToolbar>
                    </div>
                  )}
                  <ButtonToolbar className='animate__animated animate__fadeInUp'>
                    <div className='vertical-line'>
                      <Link href='/question'>
                        <div
                          className={`dash ${
                            router.pathname === '/question'
                              ? 'active-dropdown'
                              : ''
                          } `}
                        >
                          <div className='element'>
                            <FontAwesomeIcon icon={faQuestion} />
                            <span>Questions</span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </ButtonToolbar>
                  <div className='icon-hover'>
                    <ButtonToolbar className='animate__animated animate__fadeInUp'>
                      <div className='vertical-line'>
                        <Dropdown
                          title='Test'
                          activeKey={router.pathname}
                          className={`animate__animated animate__fadeInUp ${
                            router.pathname === '/level' ||
                            router.pathname === '/test/passage' ||
                            router.pathname === '/test/calculationtest' ||
                            router.pathname === '/test/writingtest' ||
                            router.pathname === '/test/audiovideotest' ||
                            router.pathname === '/test/numbertest' ||
                            router.pathname === '/test/wordtest' ||
                            router.pathname === '/test/signtest' ||
                            router.pathname === '/test/interest' ||
                            router.pathname === '/test/imagetest'
                              ? 'active-dropdown'
                              : ''
                          }`}
                          icon={<FontAwesomeIcon icon={faUserPen} />}
                        >
                          <Dropdown.Item
                            eventKey='/level'
                            onClick={() => router.push('/level')}
                          >
                            Level
                          </Dropdown.Item>
                          <Dropdown.Menu
                            title='Memory Test'
                            className={
                              router.pathname === '/test/numbertest' ||
                              router.pathname === '/test/wordtest' ||
                              router.pathname === '/test/signtest' ||
                              router.pathname === '/test/imagetest'
                                ? 'sidebar-navbox'
                                : ''
                            }
                            activeKey={router.pathname}
                          >
                            <Dropdown.Item
                              eventKey='/test/numbertest'
                              onClick={() => router.push('/test/numbertest')}
                            >
                              Number Test
                            </Dropdown.Item>
                            <Dropdown.Item
                              eventKey='/test/wordtest'
                              onClick={() => router.push('/test/wordtest')}
                            >
                              Word Test
                            </Dropdown.Item>
                            <Dropdown.Item
                              eventKey='/test/signtest'
                              onClick={() => router.push('/test/signtest')}
                            >
                              Sign Test
                            </Dropdown.Item>{' '}
                            <Dropdown.Item
                              eventKey='/test/imagetest'
                              onClick={() => router.push('/test/imagetest')}
                            >
                              Image Test
                            </Dropdown.Item>
                          </Dropdown.Menu>
                          <Dropdown.Item
                            eventKey={'/test/passage'}
                            onClick={() => {
                              router.push('/test/passage');
                            }}
                          >
                            Passage
                          </Dropdown.Item>
                          {/* <Dropdown.Item
                            eventKey='f'
                            onClick={() =>
                              router.push('/test/concentrationtest')
                            }
                          >
                            Concentration
                          </Dropdown.Item> */}
                          <Dropdown.Item
                            eventKey={'/test/calculationtest'}
                            onClick={() => {
                              router.push('/test/calculationtest');
                            }}
                          >
                            Calculation
                          </Dropdown.Item>
                          <Dropdown.Item
                            eventKey={'/test/writingtest'}
                            onClick={() => {
                              router.push('/test/writingtest');
                            }}
                          >
                            Writting
                          </Dropdown.Item>{' '}
                          <Dropdown.Item
                            eventKey={'/test/audiovideotest'}
                            onClick={() => {
                              router.push('/test/audiovideotest');
                            }}
                          >
                            Audio/Video
                          </Dropdown.Item>
                          <Dropdown.Item
                            eventKey={'/test/interest'}
                            onClick={() => {
                              router.push('/test/interest');
                            }}
                          >
                            Interest Test
                          </Dropdown.Item>
                        </Dropdown>
                      </div>
                    </ButtonToolbar>
                  </div>
                  <div className='icon-hover'>
                    <ButtonToolbar className='animate__animated animate__fadeInUp'>
                      <div className='vertical-line'>
                        <Dropdown
                          title='Exam'
                          activeKey={router.pathname}
                          className={`animate__animated animate__fadeInUp ${
                            router.pathname === '/exam' ||
                            router.pathname === '/instructions' ||
                            router.pathname === '/formula'
                              ? 'active-dropdown'
                              : ''
                          }`}
                          icon={<FontAwesomeIcon icon={faAddressCard} />}
                        >
                          <Dropdown.Item
                            eventKey='/exam'
                            onClick={() => router.push('/exam')}
                          >
                            Exam List
                          </Dropdown.Item>
                          {/* {userRole === 1 && (
                            <Dropdown.Item
                              eventKey='/result'
                              onClick={() => router.push('/result')}
                            >
                              Result
                            </Dropdown.Item>
                          )} */}
                          <Dropdown.Item
                            eventKey='/instructions'
                            onClick={() => {
                              dispatch(loader(true));
                              router.push('/instructions');
                            }}
                          >
                            Instructions
                          </Dropdown.Item>
                          {userRole === 1 && (
                            <Dropdown.Item
                              eventKey='/formula'
                              onClick={() => {
                                dispatch(loader(true)), router.push('/formula');
                              }}
                            >
                              Formula
                            </Dropdown.Item>
                          )}
                        </Dropdown>
                      </div>
                    </ButtonToolbar>
                  </div>
                  <div className='icon-hover'>
                    <ButtonToolbar className='animate__animated animate__fadeInUp'>
                      {userRole === 1 && (
                        <div className='vertical-line'>
                          <Dropdown
                            title='User'
                            activeKey={router.pathname}
                            className={`animate__animated animate__fadeInUp ${
                              router.pathname === '/user' ||
                              router.pathname === '/user/userrole' ||
                              router.pathname === '/student' ||
                              router.pathname === '/franchisee' ||
                              router.pathname === '/student-exam' ||
                              router.pathname === '/result' ||
                              router.pathname === '/sub/franchisee'
                                ? 'active-dropdown'
                                : ''
                            }`}
                            icon={<FontAwesomeIcon icon={faUser} />}
                          >
                            <Dropdown.Item
                              eventKey='/user'
                              onClick={() => router.push('/user')}
                            >
                              System User
                            </Dropdown.Item>
                            <Dropdown.Item
                              eventKey='/user/userrole'
                              onClick={() => router.push('/user/userrole')}
                            >
                              User Role
                            </Dropdown.Item>
                            <Dropdown.Item
                              eventKey={
                                router.pathname === '/sub/franchisee'
                                  ? '/sub/franchisee'
                                  : '/franchisee'
                              }
                              onClick={() => router.push('/franchisee')}
                            >
                              Franchisee
                            </Dropdown.Item>
                            <Dropdown.Item
                              eventKey={
                                router.pathname === '/student'
                                  ? '/student'
                                  : router.pathname === '/student-exam'
                                  ? '/student-exam'
                                  : '/result'
                              }
                              onClick={() => router.push('/student')}
                            >
                              Student
                            </Dropdown.Item>
                          </Dropdown>
                        </div>
                      )}
                    </ButtonToolbar>
                  </div>
                  <div className='icon-hover'>
                    <ButtonToolbar className='animate__animated animate__fadeInUp'>
                      {userRole === 1 && (
                        <div className='vertical-line'>
                          <Dropdown
                            title='Reports'
                            activeKey={router.pathname}
                            className={`animate__animated animate__fadeInUp ${
                              router.pathname === '/transactionreport' ||
                              router.pathname === '/sales-report' ||
                              router.pathname === '/pdfeditor'
                                ? 'active-dropdown'
                                : ''
                            }`}
                            icon={<FontAwesomeIcon icon={faChartLine} />}
                          >
                            <Dropdown.Item
                              eventKey='/transactionreport'
                              onClick={() => router.push('/transactionreport')}
                            >
                              Transaction Report
                            </Dropdown.Item>
                            <Dropdown.Item
                              eventKey='/sales-report'
                              onClick={() => router.push('/sales-report')}
                            >
                              Sales Report
                            </Dropdown.Item>
                            <Dropdown.Item
                              eventKey='/pdfeditor'
                              onClick={() => router.push('/pdfeditor')}
                            >
                              Pdf Editor
                            </Dropdown.Item>
                          </Dropdown>
                        </div>
                      )}
                    </ButtonToolbar>
                  </div>
                  <div className='icon-hover'>
                    <ButtonToolbar className='animate__animated animate__fadeInUp'>
                      <Dropdown
                        title='Counselings'
                        activeKey={router.pathname}
                        className={`animate__animated animate__fadeInUp ${
                          router.pathname === '/segmentelement' ||
                          router.pathname === '/segment' ||
                          router.pathname === '/counseling'
                            ? 'active-dropdown'
                            : ''
                        }`}
                        icon={<FontAwesomeIcon icon={faChalkboardUser} />}
                      >
                        <Dropdown.Item
                          eventKey={'/segment'}
                          onClick={() => {
                            router.push('/segment');
                          }}
                        >
                          Segment
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey={'/segmentelement'}
                          onClick={() => {
                            router.push('/segmentelement');
                          }}
                        >
                          Segment Element
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey={'/counseling'}
                          onClick={() => {
                            router.push('/counseling');
                          }}
                        >
                          Counseling
                        </Dropdown.Item>
                      </Dropdown>
                    </ButtonToolbar>
                  </div>
                </ul>
              </div>
              <div className='toggle-flex'>
                {/* <div className='mail-relative'>
                  <FontAwesomeIcon icon={faEnvelope} className='mail' />
                </div> */}
                {/* <div>
                  <div className='notification'>
                    <p>3</p>
                  </div>
                </div> */}
                <FontAwesomeIcon
                  icon={faBars}
                  className='text-black hidetoggle'
                  onClick={handleShow}
                />
                <div className='icon-hover'>
                  <ButtonToolbar className='animate__animated animate__fadeInUp'>
                    <div>
                      <Dropdown
                        icon={<FontAwesomeIcon icon={faUser} />}
                        activeKey={router.pathname}
                        className={`animate__animated animate__fadeInUp box-drop ${
                          router.pathname === '/profile' ||
                          router.pathname === '/help'
                            ? 'active-dropdown'
                            : ''
                        }`}
                      >
                        <Dropdown.Item>
                          <div className='user-detail'>
                            {userData?.userName?.charAt(0)?.toUpperCase() +
                              userData?.userName?.slice(1)}
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey='/profile'
                          onClick={() => router.push('/profile')}
                        >
                          <FontAwesomeIcon
                            icon={faUser}
                            className='text-black mx-2'
                          />
                          Profile
                        </Dropdown.Item>
                        <Link href='/help'>
                          <Dropdown.Item eventKey='/help'>
                            <FontAwesomeIcon
                              icon={faCircleInfo}
                              className='text-black mx-2'
                            />
                            Help
                          </Dropdown.Item>
                        </Link>
                        <Dropdown.Item eventKey='y' onClick={() => logout()}>
                          <FontAwesomeIcon
                            icon={faRightFromBracket}
                            className='text-black mx-2'
                          />
                          Logout
                        </Dropdown.Item>
                      </Dropdown>
                    </div>
                  </ButtonToolbar>
                </div>
              </div>
            </div>
          </>
        </div>
        <div>
          {' '}
          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Body className='p-0'>
              <div className='sidebar'>
                {items?.map((item: unknown, index: Key | null | undefined) => (
                  <SidebarItem key={index} item={item} setShow={setShow} />
                ))}
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      </div>
    </>
  );
};

export default Header;
