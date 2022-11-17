import Cookies from 'js-cookie';
import { AnyAction } from 'redux';
import { Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ChangeEvent, SetStateAction, useEffect, useState } from 'react';

import { RootState } from 'redux/store';
import { getSegments } from 'redux/action/Segment';
import { getElements } from 'redux/action/Element';
import DeleteModal from 'components/Modal/DeleteModal';
import { getSegmentElement } from 'redux/action/SegmentElement';

const SegmentElementTable = (props: tablePropsType) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const elementPageTodo = Cookies.get('delete');

  const segmentElementData = useSelector(
    (state: RootState) =>
      state?.segmentElement?.segmentElementData?.segmentElements
  );
  const adminToken: string = useSelector(
    (state: RootState) => state?.login?.loginData
  );
  const load = useSelector((state: RootState) => state?.loader?.loader);
  const userRole = useSelector((state: RootState) => state?.login?.userRole);

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
    const dataToDisplay = segmentElementData?.slice(startingIndex, endingIndex);
    setPageWiseData(dataToDisplay);
  }, [startingIndex, endingIndex, segmentElementData]);

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
    let list = segmentElementData;
    if (props.searchData?.length > 0) {
      list = list?.filter((item: segmentElementType1) => {
        return Object?.keys(item)?.some(
          () =>
            (item &&
              item?.segment?.element?.some((item1) => {
                return item1.name
                  ?.toString()
                  ?.toLowerCase()
                  ?.startsWith(props.searchData?.toString()?.toLowerCase());
              })) ||
            (item?.segment.name &&
              item?.segment.name
                ?.toString()
                ?.toLowerCase()
                ?.startsWith(props.searchData?.toString()?.toLowerCase()))
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
      pageWiseData?.map((item: segmentElementType1) =>
        setSelected(((pre: string[]) => [
          ...pre,
          item.segment?._id,
        ]) as unknown as string[])
      );
      pageWiseData?.map((item: segmentElementType1) =>
        props.setValues(((pre: string[]) => [
          ...pre,
          item.segment?._id,
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

  const apiCalling = (id: string) => {
    dispatch(getSegmentElement(id, adminToken) as unknown as AnyAction);
    dispatch(getSegments(adminToken) as unknown as AnyAction);
    dispatch(getElements(adminToken) as unknown as AnyAction);
  };

  const Edit = (id: string) => {
    setTodo('edit');
    selected?.length === 1 && selected[0] === id
      ? (setSelectedType('single'),
        setId(id),
        router.replace(`/segmentelement?editId=${id}`),
        apiCalling(id))
      : selected?.length > 1
      ? setSelectedType('multiple')
      : selected?.length === 0
      ? (setSelectedType('single'),
        setId(id),
        router.replace(`/segmentelement?editId=${id}`),
        apiCalling(id))
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
  
  const handlePageChange = (e: { selected: number }) => {
    setPageNumber(e.selected + 1);
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setDataCount(Number(e.target.value));
    setPageNumber(1);
  };

  let startPosition: number;
  let endPosition: number;

  const dragStart = (position: number) => {
    startPosition = position;
  };

  const dragEnter = (position: number) => {
    endPosition = position;
  };
  const drop = (data: []) => {
    const copyListItems = [...data];
    const dragItemContent = copyListItems[startPosition];
    copyListItems?.splice(startPosition, 1);
    copyListItems?.splice(endPosition, 0, dragItemContent);
    setPageWiseData(copyListItems);
    props.pageWiseData(copyListItems);
  };
  return (
    <div>
      {mount && (
        <>
          <DeleteModal
            modalName='Segment'
            show={modalShow}
            onClose={() => setModalShow(false)}
            todo={todo}
            deleteValue={selectedType}
            editValue={selectedType}
            editId={id as string}
            deleteId={id as string}
            pageNumber={
              (pageWiseData !== undefined && pageWiseData?.length === 1
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
                  <div>Segment Name</div>
                </td>
                <td>
                  <div>Element Name</div>
                </td>
                <td>Action</td>
              </tr>
              {(props?.searchData?.length ? getSearch() : pageWiseData)?.map(
                (item: segmentElementType1, index: number) => {
                  return (
                    <>
                      <tr
                        key={item?.segment?._id}
                        className='table-data'
                        style={{ cursor: 'grabbing' }}
                      >
                        <td>
                          <input
                            type='checkbox'
                            className='select-box-table'
                            onChange={(e) =>
                              localCheck(e, item?.segment?._id as string)
                            }
                            checked={selected.includes(
                              item?.segment?._id as string
                            )}
                          />
                        </td>
                        <td>{(pageNumber - 1) * 15 + index + 1}</td>
                        <td
                          onDragStart={() =>
                            props?.editSequence && dragStart(index)
                          }
                          onDragEnter={() =>
                            props?.editSequence && dragEnter(index)
                          }
                          onDragEnd={() =>
                            props?.editSequence && drop(pageWiseData as [])
                          }
                          draggable
                        >
                          {item?.segment?.name}
                        </td>
                        <td
                          className='wrap'
                          onDragStart={() =>
                            props?.editSequence && dragStart(index)
                          }
                          onDragEnter={() =>
                            props?.editSequence && dragEnter(index)
                          }
                          onDragEnd={() =>
                            props?.editSequence && drop(pageWiseData as [])
                          }
                          draggable
                        >
                          {item?.segment?.element?.map((v, i) =>
                            i === item?.segment?.element?.length - 1
                              ? v?.name
                              : `${v?.name} | `
                          )}
                        </td>
                        <td>
                          <div className='action-btn'>
                            {userRole === 1 && (
                              <div
                                onClick={() => {
                                  Edit(item?.segment?._id as string);
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
                                Delete(item?.segment?._id as string);
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
export default SegmentElementTable;
