import axios from 'axios';
import * as XLSX from 'xlsx';
import Cookies from 'js-cookie';
import { AnyAction } from 'redux';
import { saveAs } from 'file-saver';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { faRefresh, faSearch } from '@fortawesome/free-solid-svg-icons';

import { RootState } from 'redux/store';
import styles from './index.module.css';
import className from 'classnames/bind';
import { url } from 'components/Api/ApiUrl';
import { loader } from 'redux/reducer/Loader';
import { Loader } from 'components/Loader/Loader';
import showToaster from 'components/Toaster/Toaster';
import { getQuestions } from 'redux/action/Question';
import DeleteModal from 'components/Modal/DeleteModal';
import QuestionTable from 'components/Table/QuestionTable';
import AddQuestion from 'components/AddQuestion/AddQuestion';
import { exportFile, success } from 'components/Toaster/ToasterMessage';

const Question = () => {
  const router = useRouter();
  const query = router.query;
  const dispatch = useDispatch();
  const cx = className.bind(styles);
  const sectionId = Cookies.get('sectionId');

  const questionData = useSelector(
    (state: RootState) => state?.question?.questionData?.questions
  );
  const load = useSelector((state: RootState) => state?.loader?.loader);
  const adminToken = useSelector((state: RootState) => state?.login?.loginData);

  const [page, setPage] = useState(1);
  const [todo, setTodo] = useState('');
  const [search, setSearch] = useState('');
  const [addForm, setAddForm] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [deleteType, setDeleteType] = useState('');
  const [deleteCount, setDeleteCount] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [values, setValues] = useState<string[]>([]);
  const [deleteValue, setDeleteValue] = useState('');
  const [pageWiseData, setPageWiseData] = useState([]);

  const endingIndex = 15 * page;
  const startingIndex = 15 * (page - 1);

  useEffect(() => {
    const dataToDisplay = questionData?.slice(startingIndex, endingIndex);
    setPageWiseData(dataToDisplay);
  }, [startingIndex, endingIndex, questionData]);

  useEffect(() => {
    if (query?.editId === undefined && adminToken?.length > 0) {
      dispatch(loader(true)),
        dispatch(getQuestions(adminToken, 15, 0) as unknown as AnyAction);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminToken, dispatch]);

  useEffect(() => {
    if (
      (query?.editId !== undefined && query.editId?.length > 0) ||
      (sectionId !== undefined && sectionId?.length > 0)
    ) {
      setAddForm(true);
    }
  }, [addForm, query.editId, router, sectionId]);

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

  const importToExcel = (e: FileList | (string | Blob)[] | null) => {
    const formData = new FormData();
    e !== null && formData.append('file', e[0]);
    axios
      .post(`${url}question/import`, formData, {
        headers: {
          Authorization: adminToken,
        },
      })
      .then(() => {
        dispatch(getQuestions(adminToken, 15, 0) as unknown as AnyAction);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const getSheetData = async (questionData: DataSheetType[]) => {
    const a: HeaderType[] = [];
    questionData?.map((item: DataSheetType, key: number) => {
      const object: HeaderType = {};
      object.sno = key + 1;
      object.class = item?.class?.name;
      object.section = item?.section?.name;
      object.element = item?.element?.name;
      object.difficultyLevel = item?.difficultyLevel;
      object.question = item?.question;
      object.type = item?.type;
      object.option1 = item?.options[0].title;
      object.percentage1 = item?.options[0].percentage;
      object.option2 = item.options[1]?.title;
      object.percentage2 = item?.options[1]?.percentage;
      object.option3 = item?.options[2]?.title;
      object.percentage3 = item?.options[2]?.percentage;
      object.option4 = item?.options[3]?.title;
      object.percentage4 = item?.options[3]?.percentage;
      object.marks = item.marks;
      a.push(object);
    });
    return a;
  };

  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  const dt = new Date().getTime();
  const Heading = [
    {
      sno: 'sno',
      class: 'class',
      section: 'section',
      element: 'element',
      difficultyLevel: 'difficultyLevel',
      question: 'question',
      type: 'type',
      option1: 'option1',
      percentage1: 'percentage1',
      option2: 'option2',
      percentage2: 'percentage2',
      option3: 'option3',
      percentage3: 'percentage3',
      option4: 'option4',
      percentage4: 'percentage4',
      marks: 'marks',
    },
  ];
  const exportToExcel = async (wscols?: XLSX.ColInfo[]) => {
    const sheetData = await getSheetData(questionData);
    const ws = XLSX.utils.json_to_sheet(Heading, {
      header: [
        'sno',
        'class',
        'section',
        'element',
        'difficultyLevel',
        'question',
        'type',
        'option1',
        'percentage1',
        'option2',
        'percentage2',
        'option3',
        'percentage3',
        'option4',
        'percentage4',
        'marks',
      ],
      skipHeader: true,
    });

    ws['!cols'] = wscols;
    XLSX.utils.sheet_add_json(ws, sheetData, {
      skipHeader: true,
      origin: -1,
    });

    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    showToaster(success, exportFile);
    saveAs(data, 'question_' + dt + fileExtension);
  };

  return (
    <>
      {addForm === false ? (
        <div className={cx('flex-style')}>
          <div className={cx('parent-section')}>
            <div>
              <Loader open={load} />
              <DeleteModal
                modalName='Question'
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
                    <div className={cx('pt-2')}>
                      <h4>Question</h4>
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
                              spellCheck='false'
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
                                  getQuestions(
                                    adminToken,
                                    15,
                                    0
                                  ) as unknown as AnyAction
                                );
                            }}
                            title='Refresh'
                          >
                            <FontAwesomeIcon icon={faRefresh} />
                          </Button>
                        </div>
                        <div className={cx('add-btn')}>
                          <label htmlFor='main' className={cx(' sucess-btn')}>
                            Import Excel
                          </label>
                          <input
                            type='file'
                            className='d-none'
                            name=''
                            accept='application/vnd.oasis.opendocument.spreadsheet, application/vnd.ms-excel, application/vnd.ms-excel.sheet.macroEnabled.12, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                            id='main'
                            onChange={(
                              event: ChangeEvent<HTMLInputElement>
                            ): void => {
                              importToExcel(event.target.files);
                            }}
                          />
                        </div>
                        <div className={cx('add-btn')}>
                          <Button
                            className={cx('sucess-btn')}
                            variant='success'
                            onClick={() => exportToExcel()}
                          >
                            Export Excel
                          </Button>
                        </div>
                        <div className={cx('add-btn')}>
                          <Button
                            className={cx('sucess-btn')}
                            variant='success'
                            onClick={() => setAddForm(true)}
                          >
                            Add Question
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
                    <QuestionTable
                      setValues={setValues}
                      setPage={setPage}
                      searchData={search}
                      valueOfPage={pageNumber}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <AddQuestion setAddQuestion={setAddForm} />
      )}
    </>
  );
};
export default Question;
