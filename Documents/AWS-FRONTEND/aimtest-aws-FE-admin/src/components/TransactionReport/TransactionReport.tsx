import ReactPaginate from 'react-paginate';
import { Button, Form } from 'react-bootstrap';

import styles from './index.module.css';
import className from 'classnames/bind';

const dt = [
  {
    id: 1,
    level: 'Administrator',
    username: 'admin',
    name: 'Administrator',
    email: 'root@localhost.com',
    mobile: '0000000002',
    groups:
      'Science | Logic | Knowledge | Psychology | Interest | Research | Humanity | Test | CRM | DURGESH',

    role: 'developer',
  },
  {
    id: 2,
    level: 'varun',
    username: 'admin',
    name: 'Administrator',
    email: 'root@localhost.com',
    mobile: '0000000006',
    groups:
      'Science | Logic | Knowledge | Psychology | Interest | Research | Humanity | Test | CRM ',

    role: 'developer',
  },
  {
    id: 3,
    level: 'tarun',
    username: 'admin',
    name: 'Administrator',
    email: 'root@localhost.com',
    mobile: '0000000005',
    groups:
      'Science | Logic | Knowledge | Psychology | Interest | Research | Humanity | Test | CRM ',

    role: 'developer',
  },
  {
    id: 4,
    level: 'akash',
    username: 'admin',
    name: 'Administrator',
    email: 'root@localhost.com',
    mobile: 'root@localhost.com',
    groups:
      'Science | Logic | Knowledge | Psychology | Interest | Research | Humanity | Test | CRM ',

    role: 'developer',
  },
  {
    id: 5,
    level: 'yash',
    username: 'admin',
    name: 'Administrator',
    email: 'root@localhost.com',
    mobile: '0000000003',
    groups:
      'Science | Logic | Knowledge | Psychology | Interest | Research | Humanity | Test | CRM ',

    role: 'developer',
  },
];
const TransactionReport = () => {
  const cx = className.bind(styles);

  return (
    <>
      <div className={cx('flex-style')}>
        <div className={cx('parent-section')}>
          <div>
            <div className={cx('animate__animated animate__slideInRight')}>
              <div className={cx('card')}>
                <div className={cx('card-table')}>
                  <div className={cx('mb-2')}>
                    <h4>Transaction Report</h4>
                  </div>
                  <div className={cx('search-flex')}>
                    <div className={cx('transaction-field')}>
                      <div className={cx('left-field')}>
                        <div>
                          <input
                            type="text"
                            className={cx('form-control mb-3 ')}
                            placeholder="Cart Ammount"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            className={cx('form-control mb-3')}
                            placeholder="TRN Ammount"
                          />
                        </div>
                        <div>
                          <input
                            type="date"
                            className={cx('form-control mb-3')}
                            placeholder="Date From"
                          />
                        </div>
                        <div>
                          <Form.Group className={cx('mb-3')}>
                            <Form.Control
                              type="text"
                              placeholder="Transction ID"
                            />
                          </Form.Group>
                        </div>
                      </div>
                      <div className={cx('section-btn')}>
                        <div className={cx('add-btn')}>
                          <Button className={cx('sucess-btn')}>Search</Button>
                        </div>
                        <div className={cx('add-btn')}>
                          <Button className={cx('sucess-btn')}>
                            Export in Excel
                          </Button>
                        </div>
                      </div>
                      {/* <div className={cx('section-btn')}>
                        <Col className={cx('')}>
                          <Button className={cx('close-btn')}>
                            <FontAwesomeIcon
                              icon={faSearch}
                              className={cx('text-white')}
                            />
                            Search
                          </Button>
                        </Col>
                        <Col className={cx('')}>
                          <div className={cx('add-btn')}>
                            <Button className={cx('sucess-btn')}>
                              <FontAwesomeIcon
                                icon={faFileExcel}
                                className={cx('text-white')}
                              />
                              Export in Excel
                            </Button>
                          </div>
                        </Col>
                      </div> */}
                    </div>
                  </div>
                  <div className={cx('table-scroll-height')}>
                    <table className={cx('customers')}>
                      <tr className={cx('table-heading')}>
                        <td>#</td>

                        <td>
                          <div>Transaction Status</div>
                        </td>
                        <td>
                          <div>Payment Mode</div>
                        </td>
                        <td>
                          <div>User Name</div>
                        </td>
                        <td>
                          <div>User Email</div>
                        </td>
                        <td>
                          <div>User Phone No.</div>
                        </td>
                        <td>Transaction ID</td>
                        <td>Package Purchase</td>
                        <td>Payment Gateway Transaction ID</td>
                        <td>Cart Amount</td>
                        <td>Transition Amount</td>
                        <td>Transition Date and Time</td>
                      </tr>
                      {dt?.map((item) => {
                        return (
                          <>
                            <tr key={item.id} className={cx('table-data')}>
                              <td>{item.id}</td>

                              <td>
                                <span className={cx('badge badge-success')}>
                                  Success
                                </span>
                              </td>
                              <td>{item.username}</td>
                              <td>{item.name}</td>
                              <td>{item.email}</td>
                              <td>{item.mobile}</td>
                              <td>{item.groups}</td>
                              <td>{item.name}</td>
                              <td>{item.name}</td>
                              <td>{item.name}</td>
                              <td>{item.name}</td>
                              <td>{item.name}</td>
                              <td></td>
                            </tr>
                          </>
                        );
                      })}
                    </table>
                  </div>
                  <div className={cx('py-2')}>
                    <ReactPaginate
                      previousLabel="Previous"
                      nextLabel="Next"
                      pageClassName="page-item"
                      pageLinkClassName="page-link"
                      previousClassName="page-item"
                      previousLinkClassName="page-link"
                      nextClassName="page-item"
                      nextLinkClassName="page-link"
                      breakLabel="..."
                      breakClassName="page-item"
                      breakLinkClassName="page-link"
                      pageCount={3}
                      marginPagesDisplayed={3}
                      pageRangeDisplayed={5}
                      containerClassName="pagination"
                      activeClassName="active"
                    />
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

export default TransactionReport;
