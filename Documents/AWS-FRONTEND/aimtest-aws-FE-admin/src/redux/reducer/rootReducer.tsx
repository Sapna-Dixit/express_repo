import { combineReducers } from '@reduxjs/toolkit';

import userLevelSlice from './UserRole/index';
import userSlice from '../reducer/User/index';
import examSlice from '../reducer/Exam/index';
import loginSlice from '../reducer/Login/index';
import classSlice from '../reducer/Class/index';
import loaderSlice from '../reducer/Loader/index';
import couponSlice from '../reducer/Coupon/index';
import pdfSlice from '../reducer/PdfEditor/index';
import sideBarSlice from '../reducer/Sidebar/index';
import packageSlice from '../reducer/Package/index';
import sectionSlice from '../reducer/Section/index';
import studentSlice from '../reducer/Student/index';
import restoreSlice from '../reducer/Restore/index';
import elementSlice from '../reducer/Element/index';
import segmentSlice from '../reducer/Segment/index';
import formulaSlice from '../reducer/Formula/index';
import questionSlice from '../reducer/Question/index';
import passageSlice from '../reducer/Test/Passage/index';
import franchiseeSlice from '../reducer/Franchisee/index';
import counselingSlice from '../reducer/Counseling/index';
import dictionarySlice from '../reducer/Dictionary/index';
import wordTestSlice from '../reducer/Test/WordTest/index';
import signTestSlice from '../reducer/Test/SignTest/index';
import instructionSlice from '../reducer/Instruction/index';
import imageTestSlice from '../reducer/Test/ImageTest/index';
import studentFranchiseeSlice from './StudentFranchisee/index';
import audioVideoSlice from '../reducer/Test/AudioVideo/index';
import numberTestSlice from '../reducer/Test/NumberTest/index';
import subFranchiseeSlice from '../reducer/SubFranchisee/index';
import writingTestSlice from '../reducer/Test/WritingTest/index';
import signTestLevelSlice from '../reducer/Level/SignTest/index';
import wordTestLevelSlice from '../reducer/Level/WordTest/index';
import segmentElementSlice from '../reducer/SegmentElement/index';
import interestTestSlice from '../reducer/Test/InterestTest/index';
import imageTestLevelSlice from '../reducer/Level/ImageTest/index';
import numberTestLevelSlice from '../reducer/Level/NumberTest/index';
import arrangeCounselingSlice from '../reducer/ArrangeCounseling/index';
import calculationTestSlice from '../reducer/Test/CalculationTest/index';
import calculationTestLevelSlice from '../reducer/Level/CalculationTest/index';
export const rootReducer = combineReducers({
  login: loginSlice,
  loader: loaderSlice,
  section: sectionSlice,
  restore: restoreSlice,
  element: elementSlice,
  userLevel: userLevelSlice,
  user: userSlice,
  sideBar: sideBarSlice,
  package: packageSlice,
  class: classSlice,
  passage: passageSlice,
  question: questionSlice,
  numberTest: numberTestSlice,
  student: studentSlice,
  signTest: signTestSlice,
  wordTest: wordTestSlice,
  writingTest: writingTestSlice,
  coupon: couponSlice,
  counseling: counselingSlice,
  calculationTest: calculationTestSlice,
  imageTest: imageTestSlice,
  audioVideoTest: audioVideoSlice,
  studentFranchisee: studentFranchiseeSlice,
  exam: examSlice,
  segment: segmentSlice,
  formula: formulaSlice,
  franchisee: franchiseeSlice,
  subFranchisee: subFranchiseeSlice,
  interestTest: interestTestSlice,
  segmentElement: segmentElementSlice,
  arrangeCounseling: arrangeCounselingSlice,
  instruction: instructionSlice,
  numberTestLevel: numberTestLevelSlice,
  signTestLevel: signTestLevelSlice,
  wordTestLevel: wordTestLevelSlice,
  imageTestLevel: imageTestLevelSlice,
  calculationTestLevel: calculationTestLevelSlice,
  pdf: pdfSlice,
  dictionary: dictionarySlice,
});
