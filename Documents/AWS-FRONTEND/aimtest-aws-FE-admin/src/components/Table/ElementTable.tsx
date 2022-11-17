import Cookies from 'js-cookie';
import { AnyAction } from 'redux';
import { Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, SetStateAction, useEffect, useState } from 'react';
import { faEdit, faTrash, faQuestion } from '@fortawesome/free-solid-svg-icons';

import { RootState } from 'redux/store';
import { getElement } from 'redux/action/Element';
import { getSections } from 'redux/action/Section';
import ElementModal from 'components/Modal/ElementModal';

const ElementTable = (props: tablePropsType) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const elementPageTodo = Cookies.get('delete');

  const elementData = useSelector(
    (state: RootState) => state?.element?.elementData?.elements
  );
  const adminToken: string = useSelector(
    (state: RootState) => state?.login.loginData
  );
  const userRole = useSelector((state: RootState) => state?.login?.userRole);
  const load = useSelector((state: RootState) => state?.loader?.loader);

  const [todo, setTodo] = useState('');
  const [mount, setMount] = useState(false);
  const [dataCount, setDataCount] = useState(15);
  const [checkAll, setCheckAll] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [modalShow, setModalShow] = useState(false);
  const [id, setId] = useState<string | string[]>('');
  const [pageWiseData, setPageWiseData] = useState([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');

  const endingIndex = dataCount * pageNumber;
  const startingIndex = dataCount * (pageNumber - 1);

  useEffect(() => {
    const dataToDisplay = elementData?.slice(startingIndex, endingIndex);
    setPageWiseData(dataToDisplay);
  }, [startingIndex, endingIndex, elementData]);

  useEffect(() => {
    setMount(true);
  }, []);

  useEffect(() => {
    props.setPage(pageNumber);
  }, [pageNumber, props]);

  useEffect(() => {
    if (load === true) {
      setSelected([]);
      setCheckAll(false);
      props.setValues([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [load]);

  useEffect(() => {
    props.valueOfPage === 1 && setPageNumber(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.valueOfPage, elementPageTodo !== undefined]);

  const getSearch = () => {
    let list = elementData;
    if (props.searchData?.length > 0) {
      list = list?.filter((item: elementDataType) => {
        return Object?.keys(item)?.some(
          () =>
            item &&
            ((item.name &&
              item.name
                ?.toString()
                ?.toLowerCase()
                ?.startsWith(props.searchData?.toString()?.toLowerCase())) ||
              (item.section.name &&
                item.section.name
                  ?.toString()
                  ?.toLowerCase()
                  ?.startsWith(props.searchData?.toString()?.toLowerCase())))
        );
      });
    }
    return list;
  };

  const globalCheck = (e: ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.checked) {
      setSelected([]);
      props.setValues([]);
      setCheckAll(e.target.checked);
      pageWiseData?.map((item: elementDataType) =>
        setSelected(((pre: string[]) => [
          ...pre,
          item._id,
        ]) as unknown as string[])
      );
      pageWiseData?.map((item: elementDataType) =>
        props.setValues(((pre: string[]) => [
          ...pre,
          item._id,
        ]) as unknown as string[])
      );
    } else {
      setSelected([]);
      setCheckAll(e.target.checked);
      props.setValues([]);
    }
  };

  const localCheck = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    if (e?.target?.checked) {
      setSelected((prev) => [...prev, id]);
      props.setValues(((prev: string[]) => [
        ...prev,
        id,
      ]) as unknown as string[]);
    } else {
      const a = selected?.filter((dt) => dt != id);
      setSelected(a);
      props.setValues(a);
    }
  };

  const Edit = (id: string) => {
    setModalShow(true);
    setTodo('edit');
    dispatch(getSections(adminToken) as unknown as AnyAction);
    selected?.length === 1 && selected[0] === id
      ? (setSelectedType('single'),
        setId(id),
        dispatch(getElement(id, adminToken) as unknown as AnyAction))
      : selected?.length > 1
      ? setSelectedType('multiple')
      : selected?.length === 0
      ? (setSelectedType('single'),
        setId(id),
        dispatch(getElement(id, adminToken) as unknown as AnyAction))
      : setSelectedType('incorrect');
  };

  const Delete = (id: SetStateAction<string>) => {
    setModalShow(true);
    setTodo('delete');
    selected?.length === 1 && selected[0] === id
      ? (setSelectedType('single'), setId([id]))
      : selected?.length > 1
      ? setSelectedType('multiple')
      : selected?.length === 0
      ? (setSelectedType('single'), setId([id as string]))
      : setSelectedType('incorrect');
  };

  const AddQuestion = (
    elementId: string,
    elementName: string,
    sectionId: string,
    sectionName: string
  ) => {
    Cookies.set('elementId', elementId);
    Cookies.set('elementName', elementName);
    Cookies.set('sectionId', sectionId);
    Cookies.set('sectionName', sectionName);
    router.push('/question');
  };

  const handlePageChange = (e: { selected: number }) => {
    setPageNumber(e.selected + 1);
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setDataCount(Number(e.target.value));
    setPageNumber(1);
  };
  
  return (
    <div>
      {mount && (
        <>
          <ElementModal
            show={modalShow}
            onClose={() => setModalShow(false)}
            todo={todo}
            deleteValue={selectedType}
            editValue={selectedType}
            editId={id as string}
            deleteId={id as string}
            pageNumber={
              (pageWiseData && pageWiseData?.length === 1
                ? 1
                : pageNumber) as number
            }
            setPageNumber={setPageNumber}
          />
          <div className='table-scroll-height'>
            <table className='customers'>
              <tr className='table-heading'>
                <td>
                  <input
                    type='checkbox'
                    className='select-box-table'
                    onChange={(e) => globalCheck(e)}
                    checked={checkAll}
                  />{' '}
                </td>
                <td>
                  <div>S.No</div>
                </td>
                <td>
                  <div>Section Name</div>
                </td>
                <td>
                  <div>Element Name</div>
                </td>
                <td>
                  <div>Question Bank</div>
                </td>
                <td>Action</td>
              </tr>
              {(props?.searchData?.length ? getSearch() : pageWiseData)?.map(
                (item: elementDataType, index: number) => {
                  return (
                    <>
                      <tr key={item._id} className='table-data'>
                        <td>
                          <input
                            type='checkbox'
                            className='select-box-table'
                            onChange={(e) => localCheck(e, item._id as string)}
                            checked={selected?.includes(item._id as string)}
                          />
                        </td>
                        <td>{(pageNumber - 1) * 15 + index + 1}</td>
                        <td>{item?.section?.name}</td>
                        <td>{item?.name}</td>
                        <td>{item?.questionBank}</td>
                        <td>
                          <div className='action-btn'>
                            <div
                              onClick={() =>
                                AddQuestion(
                                  item?._id,
                                  item?.name,
                                  item?.section?._id,
                                  item?.section?.name
                                )
                              }
                            >
                              <div className='con'>
                                <div className='con-tooltip top'>
                                  <div className='sucess-icon'>
                                    <div className='view-icon'>
                                      <FontAwesomeIcon icon={faQuestion} />
                                      <div className='tooltip '>
                                        <p>Add Question</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {userRole === 1 && (
                              <div
                                onClick={() => {
                                  Edit(item._id as string);
                                }}
                              >
                                <div className='con'>
                                  <div className='con-tooltip top'>
                                    <div className='sucess-icon'>
                                      <div className='edit-icon'>
                                        <FontAwesomeIcon icon={faEdit} />
                                        <div className='tooltip '>
                                          <p>Edit</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>{' '}
                              </div>
                            )}
                            <div
                              onClick={() => {
                                Delete(item._id as string);
                              }}
                            >
                              <div className='con'>
                                <div className='con-tooltip top'>
                                  <div className='sucess-icon'>
                                    <div className='delete-icon'>
                                      <FontAwesomeIcon icon={faTrash} />
                                      <div className='tooltip '>
                                        <p>Delete</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>{' '}
                            </div>
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                }
              )}
            </table>
            {(pageWiseData === undefined ||
              pageWiseData?.length === 0 ||
              getSearch()?.length === 0) && (
              <div className='no-record'>
                {' '}
                <h3>No Record Found</h3>
              </div>
            )}
          </div>
          <div className='py-2'>
            <div className='d-flex  justify-content-end'>
              {props?.searchData?.length === 0 && (
                <div className='me-3'>
                  <Form.Select
                    size='sm'
                    className='entites-box'
                    onChange={(e) => handleChange(e)}
                  >
                    <option selected>15</option>
                    <option>30</option>
                    <option>60</option>
                    <option>100</option>
                    <option>150</option>
                    <option>200</option>
                  </Form.Select>
                </div>
              )}
              <ReactPaginate
                initialPage={0}
                previousLabel='Previous'
                nextLabel='Next'
                forcePage={pageNumber - 1}
                pageClassName='page-item'
                pageLinkClassName='page-link'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                breakLabel='...'
                breakClassName='page-item'
                breakLinkClassName='page-link'
                pageCount={Math.ceil(getSearch()?.length / dataCount)}
                marginPagesDisplayed={3}
                pageRangeDisplayed={5}
                onPageChange={(event) => {
                  handlePageChange(event);
                }}
                containerClassName='pagination'
                activeClassName='active'
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default ElementTable;
