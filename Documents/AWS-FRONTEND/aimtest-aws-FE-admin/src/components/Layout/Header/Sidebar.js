import {
  faAddressCard,
  faCartShopping,
  faChalkboardUser,
  faQuestion,
  faUser,
  faUserPen,
  faChartLine,
  faUserFriends,
  faLayerGroup,
} from '@fortawesome/free-solid-svg-icons';

export const items = [
  {
    title: 'Standard',
    icon: faUserFriends,
    childrens: [
      {
        title: 'Class',
        path: '/class',
      },
      {
        title: 'Section',
        path: '/section',
      },
    ],
  },
  {
    title: 'Element',
    icon: faLayerGroup,
    path: '/element',
  },
  {
    title: 'Buy',
    icon: faCartShopping,
    childrens: [
      {
        title: 'Package',
        path: '/package',
      },
      {
        title: 'Coupon',
        path: '/coupon',
      },
    ],
  },
  {
    title: 'Questions',
    icon: faQuestion,
    path: '/question',
  },
  {
    title: 'Test',
    icon: faUserPen,
    childrens: [
      {
        title: 'Level',
        path: '/level',
      },
      {
        title: 'Memory Test',
        childrens: [
          {
            title: 'Number Test',
            path: '/test/numbertest',
          },
          {
            title: 'Word Test',
            path: '/test/wordtest',
          },
          {
            title: 'Sign Test',
            path: '/test/signtest',
          },
          {
            title: 'Image Test',
            path: '/test/imagetest',
          },
        ],
      },
      {
        title: 'Passage',
        path: '/test/passage',
      },
      {
        title: 'Calculation',
        path: '/test/calculationtest',
      },
      {
        title: 'Writting',
        path: '/test/writingtest',
      },
      {
        title: 'Audio/Video',
        path: '/test/audiovideotest',
      },
      {
        title: 'Interest Test',
        path: '/test/interest',
      },
    ],
  },
  {
    title: 'Exam',
    icon: faAddressCard,
    childrens: [
      {
        title: 'Exam List',
        path: '/exam',
      },
      {
        title: 'Result',
        path: '/result',
      },
      {
        title: 'Instruction',
        path: '/instruction',
      },
      {
        title: 'Formula',
        path: '/formula',
      },
    ],
  },
  {
    title: 'User',
    icon: faUser,
    childrens: [
      {
        title: 'System User',
        path: '/user',
      },
      {
        title: 'User Role',
        path: '/user/userrole',
      },
      {
        title: 'Franchisee',
        path: '/franchisee',
      },
      {
        title: 'Student',
        path: '/student',
      },
    ],
  },
  {
    title: 'Report',
    icon: faChartLine,
    childrens: [
      {
        title: 'Transaction Report',
        path: '/transactionreport',
      },
      {
        title: 'Sales Report',
        path: '/sales-report',
      },
      {
        title: 'Pdf Editor',
        path: '/pdfeditor',
      },
    ],
  },
  {
    title: 'Counselings',
    icon: faChalkboardUser,
    childrens: [
      {
        title: 'Segment',
        path: '/segment',
      },
      {
        title: 'Segment Element',
        path: '/segmentelement',
      },
      {
        title: 'Counseling',
        path: '/counseling',
      },
    ],
  },
];
