import { AnyAction } from 'redux';
import { saveAs } from 'file-saver';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect, FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh, faSearch } from '@fortawesome/free-solid-svg-icons';
import { AlignmentType, Document, Packer, Paragraph, TextRun } from 'docx';

import {
  getSegmentElements,
  putSegmentSequence,
} from 'redux/action/SegmentElement';
import { RootState } from 'redux/store';
import styles from './index.module.css';
import className from 'classnames/bind';
import { loader } from 'redux/reducer/Loader';
import { getClasses } from 'redux/action/Class';
import { Loader } from 'components/Loader/Loader';
import DeleteModal from 'components/Modal/DeleteModal';
import { getCounselings } from 'redux/action/Counseling';
import PreviewModal from 'components/Modal/PreviewModal';
import SegmentElementTable from 'components/Table/SegmentElementTable';
import ArrangeCounseling from 'components/AddSegmentElement/AddSegmentElement';

let dataa: {
  segment: string;
  element: { name: string };
  class: { name: string };
  percentage: string;
  part: string;
  english: string;
  hindi: string;
}[];

const SegmentElement = () => {
  const router = useRouter();
  const query = router.query;
  const regex = /<[^>]*>/gim;
  const dispatch = useDispatch();
  const cx = className.bind(styles);

  const load = useSelector((state: RootState) => state?.loader?.loader);
  const adminToken = useSelector((state: RootState) => state?.login?.loginData);
  const segmentElementData = useSelector(
    (state: RootState) =>
      state?.segmentElement?.segmentElementData?.segmentElements
  );
  const counselingData = useSelector(
    (state: RootState) => state?.counseling?.counselingData?.counselings
  );

  const [page, setPage] = useState(1);
  const [part, setPart] = useState('');
  const [todo, setTodo] = useState('');
  const [search, setSearch] = useState('');
  const [addForm, setAddForm] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [download, setDownload] = useState(false);
  const [deleteType, setDeleteType] = useState('');
  const [percentage, setPercentage] = useState('');
  const [deleteCount, setDeleteCount] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [values, setValues] = useState<string[]>([]);
  const [deleteValue, setDeleteValue] = useState('');
  const [modalShow1, setModalShow1] = useState(false);
  const [selectclass, setSelectedClass] = useState('');
  const [pageWiseData, setPageWiseData] = useState([]);
  const [editSequence, setEditSequence] = useState(false);

  const endingIndex = 15 * page;
  const startingIndex = 15 * (page - 1);

  useEffect(() => {
    const dataToDisplay = segmentElementData?.slice(startingIndex, endingIndex);
    setPageWiseData(dataToDisplay);
  }, [startingIndex, endingIndex, segmentElementData]);

  useEffect(() => {
    if (adminToken?.length > 0 && query?.editId === undefined) {
      dispatch(loader(true)),
        dispatch(getCounselings(adminToken) as unknown as AnyAction),
        dispatch(getSegmentElements(adminToken) as unknown as AnyAction),
        dispatch(getClasses(adminToken) as unknown as AnyAction);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminToken, dispatch]);

  useEffect(() => {
    if (query?.editId !== undefined && query.editId?.length > 0) {
      setAddForm(true);
    }
  }, [addForm, query.editId, router]);

  let counselingInDoc: Paragraph[] = [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: `Class ${selectclass}`,
          bold: true,
          size: 28,
        }),
      ],
    }),
    new Paragraph({
      children: [],
    }),
  ];

  dataa = [];

  const saveDocumentToFile = (doc: Document, fileName: string) => {
    const mimeType =
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    Packer.toBlob(doc).then(
      (blob: {
        slice: (arg0: number, arg1: number, arg2: string) => Blob;
        size: number;
      }) => {
        const docblob = blob?.slice(0, blob.size, mimeType);
        download && saveAs(docblob, fileName);
        if (download) {
          setDownload(false);
        }
        counselingInDoc = [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: ``,
                bold: true,
                size: 28,
              }),
            ],
          }),
          new Paragraph({
            children: [],
          }),
        ];
      }
    );
  };

  const generateWordDocument = () => {
    const doc = new Document({
      sections: [
        {
          children: counselingInDoc,
        },
      ],
    });
    saveDocumentToFile(doc, 'counseling.docx');
  };

  useEffect(() => {
    if (download) {
      generateWordDocument();
      setDownload(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [download]);

  segmentElementData?.map(
    (item: {
      segment: {
        element: { name: string; _id: string; status: boolean }[];
        name: string;
        _id: string;
      };
    }) => {
      let b = '';
      item.segment.element?.map(
        (item1: { _id: string; name: string; status: boolean }) => {
          counselingData?.map(
            (item2: {
              segment: string;
              element: { name: string; _id: string };
              class: { name: string };
              percentage: string;
              part: string;
              english: string;
              hindi: string;
              status: boolean;
            }) => {
              if (
                item1.status === true &&
                item2.element.name === item1.name &&
                item2.class.name === selectclass &&
                item2.part === part &&
                item2.percentage === percentage &&
                item2.status === true
              ) {
                const a = {
                  ...item2,
                  segment: b != item.segment.name ? item.segment.name : '',
                };
                b != item.segment.name
                  ? counselingInDoc.push(
                      new Paragraph({
                        alignment: AlignmentType.LEFT,
                        children: [
                          new TextRun({
                            text: `${item.segment.name}`,
                            bold: true,
                            size: 24,
                          }),
                        ],
                      }),
                      new Paragraph({
                        children: [],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.LEFT,
                        children: [
                          new TextRun({
                            text: `${item2.element.name} (${item2.percentage})%`,
                            bold: true,
                            size: 24,
                          }),
                        ],
                      }),
                      new Paragraph({
                        children: [],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.LEFT,
                        children: [
                          new TextRun({
                            text: item2.english
                              .replace(regex, '')
                              .replace(/\&nbsp;/g, ''),
                            bold: false,
                            size: 20,
                          }),
                        ],
                      }),
                      new Paragraph({
                        children: [],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.LEFT,
                        children: [
                          new TextRun({
                            text: item2.hindi
                              .replace(regex, '')
                              .replace(/\&nbsp;/g, ''),
                            bold: false,
                            size: 20,
                          }),
                        ],
                      })
                    )
                  : counselingInDoc.push(
                      new Paragraph({
                        alignment: AlignmentType.LEFT,
                        children: [
                          new TextRun({
                            text: `${item2.element.name} (${item2.percentage} %)`,
                            bold: true,
                            size: 24,
                          }),
                        ],
                      }),
                      new Paragraph({
                        children: [],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.LEFT,
                        children: [
                          new TextRun({
                            text: item2.english
                              .replace(regex, '')
                              .replace(/\&nbsp;/g, ''),
                            bold: false,
                            size: 20,
                          }),
                        ],
                      }),
                      new Paragraph({
                        children: [],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.LEFT,
                        children: [
                          new TextRun({
                            text: item2.hindi
                              .replace(regex, '')
                              .replace(/\&nbsp;/g, ''),
                            bold: false,
                            size: 20,
                          }),
                        ],
                      })
                    );
                b = item.segment.name;
                dataa.push(a);
              }
            }
          );
        }
      );
    }
  );

  const searchList = (e: React.FormEvent<HTMLDivElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setSearch(value);
  };

  const Delete = () => {
    setModalShow(true);
    setTodo('delete');
    setDeleteType('global');
    values?.length === 0
      ? setDeleteValue('zero')
      : values?.length >= 1 &&
        (setDeleteValue('multiple'), setDeleteCount(values?.length));
  };

  return (
    <>
      {addForm === false ? (
        <div className={cx('flex-style')}>
          <div className={cx('parent-section')}>
            <div>
              <Loader open={load} />
              <PreviewModal
                show={modalShow1}
                content={dataa}
                onClose={() => {
                  setModalShow1(false);
                }}
                setPart={setPart}
                setSelectClass={setSelectedClass}
                setPercentage={setPercentage}
                setDownload={setDownload}
              />
              <DeleteModal
                modalName='Segment'
                show={modalShow}
                onClose={() => setModalShow(false)}
                todo={todo}
                deleteValue={deleteValue}
                deleteType={deleteType}
                deleteCount={deleteCount}
                deleteId={values}
                pageNumber={
                  pageWiseData !== undefined &&
                  pageWiseData?.length === values?.length
                    ? 1
                    : page
                }
                setPageNumber={setPageNumber}
              />
              <div className={cx('animate__animated animate__slideInRight')}>
                <div className={cx('card')}>
                  <div className={cx('card-table')}>
                    <div>
                      <h4>Segment Element</h4>
                    </div>
                    <div className={cx('search-flex')}>
                      <div className={cx('flex items-center justify-center')}>
                        <div>
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
                      <div className={cx('section-btn')}>
                        <div className={cx('add-btn')}>
                          <Button
                            className={cx('sucess-btn')}
                            variant='success'
                            onClick={() => {
                              adminToken?.length > 0 && dispatch(loader(true)),
                                dispatch(
                                  getSegmentElements(
                                    adminToken
                                  ) as unknown as AnyAction
                                );
                            }}
                            title='Refresh'
                          >
                            <FontAwesomeIcon icon={faRefresh} />
                          </Button>
                        </div>
                        <div className={cx('add-btn')}>
                          <Button
                            className={cx('sucess-btn')}
                            variant='success'
                            onClick={() => {
                              setModalShow1(true);
                            }}
                          >
                            Preview Counseling
                          </Button>
                        </div>
                        {pageWiseData?.length > 1 && (
                          <div className={cx('add-btn')}>
                            <Button
                              className={cx('sucess-btn')}
                              variant='success'
                              onClick={() => {
                                editSequence && dispatch(loader(true));
                                editSequence === true &&
                                  dispatch(
                                    putSegmentSequence(
                                      pageWiseData as never,
                                      adminToken
                                    ) as unknown as AnyAction
                                  ),
                                  setEditSequence(!editSequence);
                              }}
                            >
                              {editSequence
                                ? 'Update Sequence'
                                : ' Edit Sequence'}
                            </Button>
                          </div>
                        )}
                        <div className={cx('add-btn')}>
                          <Button
                            className={cx('sucess-btn')}
                            variant='success'
                            onClick={() => {
                              setAddForm(true);
                            }}
                          >
                            Add Element
                          </Button>
                        </div>
                        <div className={cx('add-btn')}>
                          <Button
                            className={cx('delete-btn')}
                            onClick={() => Delete()}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                    <SegmentElementTable
                      setValues={setValues}
                      setPage={setPage}
                      searchData={search}
                      valueOfPage={pageNumber}
                      editSequence={editSequence}
                      pageWiseData={setPageWiseData}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ArrangeCounseling setAddElement={setAddForm} />
      )}
    </>
  );
};
export default SegmentElement;
