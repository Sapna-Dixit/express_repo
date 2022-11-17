interface childrenType {
  children: ReactNode;
}

interface sectionModalType {
  show: boolean;
  onClose: () => void;
  content?: string;
  todo?: string;
  deleteCount?: number;
  deleteValue?: string;
  deleteType?: string;
  editValue?: string;
  editId?: string;
  deleteId?: string | string[];
  pageNumber?: number;
  setPageNumber?: Dispatch<SetStateAction<number>>;
}
interface sectionDataType {
  _id: string;
  sectionName: string;
}
interface headerProps {
  setShowSideBar: Dispatch<SetStateAction<boolean>>;
}

interface loginState {
  loginData: [];
}

interface storeType {
  loginSlice: loginState;
}

interface loginType {
  userName: string;
  password: string;
}

interface forgotType {
  email: string;
}

interface resetPasswordType {
  password: string;
  confirmPassword?: string;
  email?: string;
  token?: string;
}

interface modalType {
  resetForm?: {
    (nextState?: Partial<FormikState<TestValues>> | undefined): void;
    (): void;
  };
  navigate?: Dispatch<SetStateAction<boolean>>;
  title?: string;
  modalName?: string;
  show: boolean;
  onClose: () => void;
  content?: string;
  todo?: string;
  deleteCount?: number;
  deleteValue?: string;
  deleteType?: string;
  editValue?: string;
  restoreId?: string;
  editId?: string;
  deleteId?: string | string[];
  pageNumber?: number;
  setPageNumber?: Dispatch<SetStateAction<number>>;
  editData?: {
    _id: string;
    name: string;
    label: string;
  };
}

interface sectionDataType {
  _id: string;
  name: string;
}
interface elementDataType {
  _id: string;
  section: {
    _id: string;
    name: string;
  };
  name: string;
  questionBank: number;
}
interface classDataType {
  _id: string;
  name: string;
}
interface userDataType {
  _id: string;
  sections: [
    {
      _id: string;
      name: string;
    }
  ];
  role: {
    _id: string;
    name: string;
  };
  userName: string;
  password: string;
  name: string;
  mobile: string;
  email: string;
  status?: boolean;
}

interface loaderState {
  loader: boolean;
}
interface sectionState {
  sectionData: [];
  particularSectionData: [];
}
interface userLevelState {
  userRoleData: [];
  particularUserRoleData: [];
}
interface userState {
  userData: [];
  particularUserData: [];
}
interface elementState {
  elementData?: [];
  particularElementData?: [];
}
interface classState {
  classData?: [];
  particularClassData?: [];
}

interface SelectType {
  _id?: string;
  label: string;
  attemptCount?: number;
  noOfImages?: number;
  value?: string;
}

interface SelectType1 {
  _id: string;
  label: string;
}
interface MultiSelectType {
  label: string;
  value?: string;
  _id?: string;
  name?: string;
  __v?: number;
}

interface userRoleDataType {
  _id: string;
  name: string;
}

interface postUserData {
  role: {
    _id?: string;
    name: string;
  };
  sections: never[];
  userName: string;
  name: string;
  email: string;
  mobile: string;
  status?: string | boolean;
}

interface packageDataType {
  _id?: string;
  name: string;
  type: string;
  amount: string | number;
  discountAmount: string | number;
  logo: string;
  days: number;
  description: string;
  status?: string | boolean;
  attemptCount?: string | number;
}

interface tablePropsType {
  setValues: (arg0: string[]) => void;
  setAddForm?: (arg0: boolean) => void;
  setPage: Dispatch<SetStateAction<number>>;
  searchData: string;
  todo?: string;
  editSequence?: Dispatch<SetStateAction<boolean>>;
  valueOfPage?: number;
  pageWiseData?: Dispatch<SetStateAction<never[]>>;
}

interface classData {
  _id: string;
  name: string;
}
interface passageDataType {
  _id?: string;
  title: string;
  description: string;
  class: {
    _id: string;
    name: string;
  };
  passageDisplayTime: string | number;
  totalTestTime: string | number;
  questions: {
    question: string;
    options: { option: string; isCorrect: boolean | string }[];
  }[];
}
// ------Question add type =======
interface formsType {
  menuName: string;
}
interface setObjectValue {
  e: { label: string; _id: string };
  setFieldValue: (arg0: string, arg1: { _id: string; name: string }) => void;
  fieldName: string;
}
interface setSingleValue {
  e: { label: string; _id: string };
  setFieldValue: (arg0: string, arg1: string) => void;
  fieldName: string;
}

interface SelectFieldType {
  isSearchable?: boolean;
  isClearable?: boolean;
  placeholder: string;
  applyValidation?: string;
  disable?: boolean;
  name: string;
  value: string;
  error?: string | boolean;
  isMulti?: boolean;

  options:
    | OptionsOrGroups<
        {
          label: string;
          value: string;
        },
        GroupBase<{
          label: string;
          value: string;
        }>
      >
    | undefined;
  onChange: (
    arg0:
      | SelectType
      | string
      | {
          label: string | undefined;
          value: string | undefined;
        }
  ) => void;
  onBlur?: (arg0: string, arg1: boolean) => void;
  touched?: boolean;
}
interface editorType {
  placeholder: string;
  hindi?: boolean;
  hindiValue?: (arg0: React.SetStateAction<string>) => void;
  todo: string;
  editorValue?: string | undefined;
  cookiesValue?: string;
  name?: string;
  onChange: (
    field: string,
    value: sting,
    shouldValidate?: boolean | undefined
  ) => void;
  onBlur?: (arg0: string, arg1: boolean) => void;
  setId?: (
    field: string,
    value: string,
    shouldValidate?: boolean | undefined
  ) => void;
}

interface questionDataType {
  _id: string;
  question: string;
  type: string;
  section: {
    _id: string;
    name: string;
  };
  element: {
    _id: string;
    name: string;
  };
  difficultyLevel: string;
  class: {
    _id: string;
    name: string;
  };
}

interface userInitialValue {
  userName: string;
  name: string;
  sections: [];
  role: {
    _id: string;
    name: string;
  };
  email: string;
  mobile: string;
  status: string | boolean;
}

interface TestSelectType {
  label: string;
  marks?: string;
  noOfDigits?: string;
  noOfSigns?: string;
  noOfWords?: string;
  value: string;
  timeDuration?: string;
}

interface TestValues {
  marks?: string | number;
  noOfDigits?: string | number;
  noOfSigns?: string | number;
  noOfWords?: string | number;
  noOfImages?: string | number;
  noOfOperations?: string | number;
  level?: string | number;
  timeDuration?: string | number;
  totalTestTime?: string | number;
}
interface TestDataType {
  _id?: string | number;
  marks?: string | number;
  noOfDigits?: string | number;
  noOfOperations?: string | number;
  noOfImages?: string | number;
  noOfSigns?: string | number;
  noOfWords?: string | number;
  level?: string;
  timeDuration?: string | number;
  totalTestTime?: string | number;
}
interface AssignTestLevel {
  class: {
    _id: string;
    name: string;
  };
}

interface examValues {
  difficultyLevel: string;
  status: string | boolean;
  _id?: string;
  mode: string;
  package: {
    name: string;
    _id: string;
  };
  class: {
    _id: string;
    name: string;
  };
  name: string;
  options: [
    {
      section: {
        _id: string;
        name: string;
      };
      element: {
        _id: string;
        name: string;
      };
      noOfQuestions: string;
      questionType: string;
    }
  ];
  sendReport: [];
  sendAudioReport: [];
  showAnswerSheet: string | boolean;
  randomQuestion: string | boolean;
  browserTolerence: string | boolean;
  optionShuffle: string | boolean;
  examDuration: string;
  attemptCount: string;
  startDate: string;
  endDate: string;
  testSequence: string[];
}

interface writingTestType {
  title: string;
  timeDuration: string | number;
  class: {
    _id: string;
    name: string;
  };
  words:
    | {
        word: string;
      }[]
    | string[];
  _id?: string;
}

interface wordDictionaryType {
  title: string;
  words:
    | {
        word: string;
      }[]
    | string[];
  _id?: string;
}
interface calculationTestType {
  _id?: string;
  class: {
    _id: string;
    name: string;
  };
  level: {
    _id: string;
    level: number | string;
  };
  noOfQuestions: number | string;
  number: string;
  calculation: [{ operations: string; brackets: string; number: string }];
}
interface operationsSelectType {
  label: string;
  value: string;
  noOfOperations: number;
  timeDuration: number;
}
interface audioVideoType {
  _id?: string;
  questions: {
    question: string;
    options: { option: string; isCorrect: boolean | string }[];
  }[];
  class: {
    _id: string;
    name: string;
  };
  file: File;
  link: string;
  type: string;
  totalTestTime?: number | string;
}

interface imageTestType {
  _id?: string;
  level: {
    _id: string;
    level: number | string;
    noOfImages: number;
  };
  class: {
    _id: string;
    name: string;
  };
  totalTestTime: string | number;
  questions: {
    question: string;
    options: { option: string; isCorrect: boolean | string }[];
  }[];
  images: Blob | File[] | ArrayBuffer | stream | text | FileList;
}

interface couponType {
  _id?: string;
  organizationName: string;
  amount: number | string;
  couponCode: string[];
  noOfCoupon: number | string;
  userPerStudent: number | string;
  startDate: string;
  endDate: string;
  status: string | boolean;
}

interface counselingType {
  _id?: string;
  class?: {
    _id?: string;
    name?: string;
  };
  element?: {
    _id?: string;
    name?: string;
  };
  percentage?: string | number;
  part?: string;
  status?: string | boolean;
  english?: string;
  hindi?: string;
}

interface segmentElementState {
  segmentElementData?: [];
  particularSegmentElementData?: [];
}

interface segmentState {
  segmentData: [];
  particularSegmentData: [];
}

interface segmentType {
  _id: string;
  segment: {
    _id: string;
    name: string;
  };
  name: string;
}

interface segmentElementType {
  segment: {
    _id: string;
    name: string;
    element:
      | {
          name: string;
          _id?: string;
          status: boolean;
          percentage: [] | string[];
          sequence?: number;
        }
      | {
          name: string;
          _id?: string;
          status?: boolean;
          percentage?: [] | string[];
          sequence?: number;
        }[];
  };
}

interface segmentElementType1 {
  segment: {
    _id: string;
    name: string;
    element: {
      name: string;
      _id?: string;
      status?: boolean;
      percentage?: [] | string[];
      sequence?: number;
    }[];
  };
}

interface arrangeCounselingType {
  segment: {
    _id: string;
    name: string;
  };
  element: {
    _id?: string;
    name: string;
    status: boolean;
    percentage: string[] | [];
  }[];
}
interface instructionDataType {
  instruction: { testPage: string; content: string; _id: string }[];
}

interface elementSegmentType {
  name: string;
  _id?: string;
  status?: boolean;
  percentage?: [] | string[];
  sequence?: number;
}

interface rangeData {
  _id: string;
  class: {
    _id: string;
    name: string;
  };
  from: {
    _id: string;
    level: string;
  };
  to: {
    _id: string;
    level: string;
  };
}

interface numberRangePostData {
  numberTestDetail: [
    {
      _id: string;
      class: {
        _id: string;
        name: string;
      };
      level: {
        from: string | number;
        to: string | number;
      };
    }
  ];
}

interface numberTestRange {
  numberTestDetail: {
    _id?: string;
    class: {
      _id: string;
      name: string;
    };
    from: {
      _id: string;
      level: string;
    };
    to: {
      _id: string;
      level: string;
    };
  }[];
}

interface signTestRange {
  signTestDetail: {
    _id?: string;
    class: {
      _id: string;
      name: string;
    };
    from: {
      _id: string;
      level: string;
    };
    to: {
      _id: string;
      level: string;
    };
  }[];
}

interface wordTestRange {
  wordTestDetail: {
    _id?: string;
    class: {
      _id: string;
      name: string;
    };
    from: {
      _id: string;
      level: string;
    };
    to: {
      _id: string;
      level: string;
    };
  }[];
}

interface addQuestionType {
  class: {
    name: string;
    _id: string;
  };
  difficultyLevel: string;
  element: {
    _id: string;
    name: string;
  };
  section: {
    name: string;
    _id: string;
  };
  type: string;
  options?: {
    title: string;
    percentage: string;
  }[];
}
interface HeaderType {
  [x: string]: unknown;
  sno?: number;
  class?: {
    name?: string;
  };
  section?: {
    name?: string;
  };
  element?: {
    name?: string;
  };
  difficultyLevel?: string;
  question?: string;
  type?: string;
  option1?: string;
  percentage1?: string;
  option2?: string;
  percentage2?: string;
  option3?: string;
  percentage3?: string;
  option4?: string;
  percentage4?: string;
  marks?: string;
}
interface DataSheetType {
  sno: number;
  class: { name: { name?: string | undefined } | undefined };
  section: { name: { name?: string | undefined } | undefined };
  element: { name: { name?: string | undefined } | undefined };
  difficultyLevel: string | undefined;
  question: string | undefined;
  type: string | undefined;
  options: { percentage: string; title: string }[];
  marks: string | undefined;
}

interface formulaType {
  _id?: string;
  label: string;
  extraPerOfValue: string;
  divide: string;
  formulaData: {
    operation: string;
    perOfValue: string;
    group: { _id: string; name: string };
    element: { _id: string; name: string };
  }[];
}

interface franchiseeType {
  _id?: string;
  Date?: string;
  name: string;
  address: {
    label: string;
    value: {
      description: string;
      place_id: string;
    };
  };
  city: string;
  state: string;
  country: string;
  category: string;
  actualAmount: string | number;
  discountedAmount: string | number;
  creditedAmount: string | number;
  debitedAmount: string | number;
  noOfSubFranchisee: string | number;
  perReportCost: string | number;
  noOfReport: string | number;
}

interface subfranchiseeType {
  _id?: string;
  date?: string;
  name: string;
  address: {
    label: string;
    value: {
      description: string;
      place_id: string;
    };
  };
  city: string;
  state: string;
  country: string;
  category: string;
  actualAmount: string | number;
  discountedAmount: string | number;
  creditedAmount: string | number;
  debitedAmount: string | number;
  noOfReport: string | number;
  franchiseeProvider: {
    _id: string;
    name: string;
  };
}

interface studentfranchiseeType {
  _id?: string;
  name: string;
  parentsName: string;
  address: {
    label: string;
    value: {
      description: string;
      place_id: string;
    };
  };
  city: string;
  state: string;
  country: string;
  class: {
    _id: string;
    name: string;
  };
  phoneNumber: number | string;
  fees: number;
  dateOfExam: string;
  actualAmount: string | number;
  discountedAmount: string | number;
  creditedAmount: string | number;
  debitedAmount: string | number;
  attempt: number;
  franchiseeProvider?: {
    _id: string;
    name: string;
  };
}

interface interestTestData {
  _id?: string;
  interest: string[];
  questions: {
    question: string;
    options: { option: string; percentage: string }[];
  }[];
  totalTestTime: string | number;
  minOptions: string | number;
  maxOptions: string | number;
}
interface valueType {
  value: {
    place_id: string;
  };
}
interface addressType {
  city: string;
  state: string;
  country: string;
}
interface shouldBeComponentType {
  city: string[];
  state: string[];
  country: string[];
}

interface studentType {
  _id?: string;
  fname: string;
  lname: string;
  email: string;
  phone: string;
  userName: string;
  fatherName: string;
  motherName: string;
  class: {
    _id: string;
    name: string;
  };
  school: string;
  dob: string;
  password: string;
  isWeb: boolean;
}

interface studentExamType {
  documentId?: string;
  userId: string;
  examName: string;
  date: string;
}
