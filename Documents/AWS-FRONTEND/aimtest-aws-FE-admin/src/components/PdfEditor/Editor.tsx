import { useSelector } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';

import { RootState } from 'redux/store';

const EditorOfPdf = (props: {
  setSaveBtn: (arg0: boolean) => void;
  setData: (arg0: string) => void;
}) => {
  const pdfInitalValue = useSelector(
    (state: RootState) => state?.pdf?.pdfInitalValue
  );

  const handleChange = (e: string) => {
    props.setSaveBtn(true);
    props?.setData(e);
  };

  const pdfStyles = `.App {
    text-align: center;
  }
  
  .App-logo {
    height: 40vmin;
    pointer-events: none;
  }
  
  @media (prefers-reduced-motion: no-preference) {
    .App-logo {
      animation: App-logo-spin infinite 20s linear;
    }
  }
  
  .App-header {
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
  }
  
  .App-link {
    color: #61dafb;
  }
  
  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  .text-content {
    font-size: 24px;
    margin: 12px 0px;
  }
  .big-img {
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    height: 100%;
    position: relative;
    width: 100%;
  }
  .second-img {
    background-repeat: no-repeat;
    background-image: url('https://res.cloudinary.com/dgimekhep/image/upload/v1664349746/Untitled-7_z1zhyl.jpg');
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    height: 100vh;
    position: relative;
    width: 100%;
  }
  .third-img {
    background-repeat: no-repeat;
    background-image: url('https://res.cloudinary.com/dgimekhep/image/upload/v1664349746/Untitled-7_z1zhyl.jpg');
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    position: relative;
    width: 100%;
    height: 100%;
  }
  .bg-img {
    background-repeat: no-repeat;
    background-image: url('https://res.cloudinary.com/dgimekhep/image/upload/v1664349746/Untitled-7_z1zhyl.jpg');
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    height: 100vh;
    position: relative;
    width: 100%;
  }
  .top-space {
    margin-top: 5rem;
  }
  .top-space-sec {
    margin-top: 12rem;
  }
  .left-space {
    margin-left: 9rem;
  }
  .rela {
    position: relative;
  }
  .margin {
    margin: 10px 0px;
    font-size: 40px;
  }
  .margin-text {
    padding: 6px 10px;
    margin: 10px;
    background: red;
    color: #fff;
    border-radius: 7px;
    width: 30%;
    background: linear-gradient(to right, #0071af, #5fa3ca);
    border-radius: 50px;
  }
  .detail-text {
    padding: 6px 10px;
    margin: 10px;
    color: #000;
    border-radius: 7px;
    width: 70%;
    background: linear-gradient(to right, #c9dae3, #b4c0c7);
    font-family: 'Abyssinica SIL', serif;
    font-style: italic;
    letter-spacing: 2px;
    border-radius: 60px;
  }
  .heading {
    display: flex;
    justify-content: center;
    font-size: 24px;
  }
  .heading-pdf {
    display: flex;
    justify-content: center;
    font-size: 24px;
    margin-top: 30px;
  }
  .img-center {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .top-heading {
    margin: 15px 0px;
    font-size: 30px;
    font-size: 35px;
    color: rgb(6 86 176);
  }
  
  .text-absolute {
    position: absolute;
    top: 4rem;
    width: 100%;
  }
  .absolute-text {
    position: absolute;
    top: 0px;
    width: 95%;
  }
  .logo-text {
    display: flex;
    flex-direction: column;
    width: 87%;
    margin: 0 auto;
    padding-top: 6rem;
  }
  .analysis-text {
    display: flex;
    flex-direction: column;
    width: 87%;
    margin: 0 auto;
    padding-top: 2rem;
  }
  .container {
    width: 100%;
    height: 100%;
    margin: auto;
    position: relative;
  }
  
  img.logo {
    width: 120px;
    margin: 10px;
  }
  img.big-logo {
    width: 300px;
  }
  .logotype {
    position: fixed;
    bottom: 60px;
  }
  
  .logo-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .fixed {
    display: flex;
    flex-direction: column;
    width: 85%;
    margin: 0 auto;
    height: 82vh;
    justify-content: flex-end;
  }
  .text-center {
    color: #fff;
  }
  h1.text-size {
    font-size: 42px;
    font-weight: 600;
  }
  .text-white {
    color: #fff;
  }
  #overlay {
    width: 100%;
    height: 100%;
    position: fixed;
  }
  
  .container {
    width: 100%;
    margin: auto;
    position: relative;
  }
  /* add new latest-css */
  .text-space {
    display: flex;
    justify-content: flex-start;
  }
  .text-style {
    font-size: 25px;
  }
  .sign-heading {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-top: 2rem;
  }
  img.signification-img {
    width: 50%;
  }
  img.logo {
    width: 120px;
    margin: 10px;
  }
  .bold-style {
    font-size: 20px;
    font-weight: 600;
    font-style: italic;
    padding-bottom: 20px;
  }
  .head-center {
    display: flex;
    justify-content: flex-start;
  }
  .pdf-table th {
    background-color: #0071ae;
    padding: 0.55rem;
    height: 41px;
    white-space: nowrap;
    color: #fff;
  }
  
  .space-number {
    width: 65px !important;
  }
  .pdf-table {
    border-collapse: collapse;
    width: 100%;
  }
  
  .pdf-table td {
    border: 1px solid #ddd;
    padding: 0.55rem;
    color: #000;
    /* width: 40px; */
  }
  .pdf-result th {
    background-color: #0071ae;
    padding: 0.55rem;
    height: 41px;
    white-space: nowrap;
    color: #fff;
  }
  .pdf-result td {
    border: 1px solid #ddd;
    padding: 0.55rem;
    color: #000;
    width: 40px;
  }
  table.pdf-result {
    width: 100%;
  }
  .table-width {
    width: 100%;
  }
  .full-width {
    width: 100%;
    display: flex;
  }
  .half-width {
    width: 50%;
    margin-left: 20px;
  }
  .table-flex {
    display: flex;
    gap: 20px;
  }
  .table-stylee {
    display: flex;
    width: 100%;
    gap: 20px;
  }
  .table-nogap {
    width: 100%;
    display: flex;
  }
  .table-engineering {
    width: 100%;
  }
  .strength {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding-top: 63px;
  }
  .str-text {
    font-size: 80px;
    color: #000;
  }
  img.reading-img {
    width: 65%;
    height: 290px;
  }
  
  .strength-top {
    margin-top: -2rem;
    display: flex;
    text-align: center;
    justify-content: center;
  }
  
  .strength-next {
    margin-top: 3rem;
    display: flex;
    text-align: center;
    justify-content: center;
  }
  
  .position-style {
    position: relative;
  }
  .management-heading {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-top: 0rem;
  }
  .sport-heading {
    margin: 15px 0px 0px 0px;
    font-size: 30px;
    font-size: 35px;
    color: rgb(6 86 176);
    display: flex;
    justify-content: center;
  }
  .first-skill-percent {
    height: 6rem;
    border-radius: 6px;
    background: #20002c;
    background: linear-gradient(to right, #cbb4d4, #20002c);
    color: #fff;
    display: flex;
    align-items: center;
    width: 780px;
    border-radius: 60px;
    position: relative;
    padding-left: 20px;
    font-size: 25px;
    justify-content: flex-start;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  .first-skill {
    height: 6rem;
    border-radius: 6px;
    background: linear-gradient(to right, hsl(0, 0%, 96%), #cfc9d1);
    color: #030303;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 180px;
    border-radius: 200px;
    position: absolute;
    right: -4px;
    top: 0px;
    font-weight: 600;
  }
  .second-skill-percent {
    height: 6rem;
    border-radius: 6px;
    color: #fff;
    display: flex;
    align-items: center;
    width: 780px;
    border-radius: 60px;
    position: relative;
    background: #fc4a1a;
    background: -webkit-linear-gradient(to right, #f7b733, #fc4a1a);
    background: linear-gradient(to right, #f7b733, #fc4a1a);
    padding-left: 20px;
    font-size: 25px;
    justify-content: flex-start;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  .second-skill {
    height: 6rem;
    border-radius: 6px;
    background: linear-gradient(to right, #f4f4f4, #cfc9d1);
    color: #030303;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    justify-content: center;
    width: 180px;
    border-radius: 200px;
    position: absolute;
    right: -4px;
    top: 0px;
    font-weight: 600;
  }
  .third-skill-percent {
    height: 6rem;
    border-radius: 6px;
    color: #fff;
    display: flex;
    align-items: center;
    width: 780px;
    border-radius: 60px;
    position: relative;
    background: #36d1dc;
    background: -webkit-linear-gradient(to right, #5b86e5, #36d1dc);
    background: linear-gradient(to right, #5b86e5, #36d1dc);
    padding-left: 20px;
    font-size: 25px;
    justify-content: flex-start;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  .third-skill {
    height: 6rem;
    border-radius: 6px;
    background: linear-gradient(to right, #f4f4f4, #cfc9d1);
    color: #030303;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    justify-content: center;
    width: 180px;
    border-radius: 200px;
    position: absolute;
    right: -4px;
    top: 0px;
    font-weight: 600;
  }
  .fourth-skill-percent {
    height: 6rem;
    border-radius: 6px;
    color: #fff;
    display: flex;
    align-items: center;
    width: 780px;
    border-radius: 60px;
    position: relative;
    background: #52c234;
    background: -webkit-linear-gradient(to right, #061700, #52c234);
    background: linear-gradient(to right, #061700, #52c234);
    padding-left: 20px;
    font-size: 25px;
    justify-content: flex-start;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  .fourth-skill {
    height: 6rem;
    border-radius: 6px;
    background: linear-gradient(to right, #f4f4f4, #cfc9d1);
    color: #030303;
    color: #fff;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    justify-content: center;
    width: 180px;
    border-radius: 200px;
    position: absolute;
    right: -4px;
    top: 0px;
    font-weight: 600;
  }
  .fifth-skill-percent {
    height: 6rem;
    border-radius: 6px;
    color: #fff;
    display: flex;
    align-items: center;
    width: 780px;
    border-radius: 60px;
    position: relative;
    background: #ee9ca7;
    background: linear-gradient(to right, #d0949b, #ee9ca7);
    padding-left: 20px;
    font-size: 25px;
    justify-content: flex-start;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  .fifth-skill {
    height: 6rem;
    border-radius: 6px;
    background: linear-gradient(to right, #f4f4f4, #cfc9d1);
    color: #030303;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    justify-content: center;
    width: 180px;
    border-radius: 200px;
    position: absolute;
    right: -4px;
    top: 0px;
    font-weight: 600;
  }
  
  .six-skill-percent {
    height: 6rem;
    border-radius: 6px;
    color: #fff;
    display: flex;
    align-items: center;
    width: 780px;
    border-radius: 60px;
    position: relative;
    background: #9cecfb;
    background: -webkit-linear-gradient(to right, #0052d4, #65c7f7, #9cecfb);
    background: linear-gradient(to right, #0052d4, #65c7f7, #9cecfb);
    padding-left: 20px;
    font-size: 25px;
    justify-content: flex-start;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  .six-skill {
    height: 6rem;
    border-radius: 6px;
    background: linear-gradient(to right, #f4f4f4, #cfc9d1);
    color: #030303;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 173px;
    justify-content: center;
    width: 180px;
    border-radius: 200px;
    position: absolute;
    right: -4px;
    top: 0px;
    font-weight: 600;
  }
  
  .seven-skill-percent {
    height: 6rem;
    border-radius: 6px;
    color: #fff;
    display: flex;
    align-items: center;
    width: 780px;
    border-radius: 60px;
    position: relative;
    background: -webkit-linear-gradient(to right, #3a6073, #16222a);
    background: linear-gradient(to right, #3a6073, #16222a);
    padding-left: 20px;
    font-size: 25px;
    justify-content: flex-start;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  .seven-skill {
    height: 6rem;
    border-radius: 6px;
    background: linear-gradient(to right, #f4f4f4, #cfc9d1);
    color: #030303;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    justify-content: center;
    width: 180px;
    border-radius: 200px;
    position: absolute;
    right: -4px;
    top: 0px;
    font-weight: 600;
  }
  
  .eight-skill-percent {
    height: 6rem;
    border-radius: 6px;
    color: #fff;
    display: flex;
    align-items: center;
    width: 780px;
    border-radius: 60px;
    position: relative;
    background: -webkit-linear-gradient(to right, #799f0c, #ffe000);
    background: linear-gradient(to right, #799f0c, #ffe000);
    padding-left: 20px;
    font-size: 25px;
    justify-content: flex-start;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  .eight-skill {
    height: 6rem;
    border-radius: 6px;
    background: linear-gradient(to right, #f4f4f4, #cfc9d1);
    color: #030303;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    justify-content: center;
    width: 180px;
    border-radius: 200px;
    position: absolute;
    right: -4px;
    top: 0px;
    font-weight: 600;
  }
  
  .nine-skill-percent {
    height: 6rem;
    border-radius: 6px;
    color: #fff;
    display: flex;
    align-items: center;
    width: 780px;
    border-radius: 60px;
    position: relative;
    background: #5f2c82;
    background: -webkit-linear-gradient(to right, #49a09d, #5f2c82);
    background: linear-gradient(to right, #49a09d, #5f2c82);
    padding-left: 20px;
    font-size: 25px;
    justify-content: flex-start;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  .nine-skill {
    height: 6rem;
    border-radius: 6px;
    background: linear-gradient(to right, #f4f4f4, #cfc9d1);
    color: #030303;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 173px;
    justify-content: center;
    width: 180px;
    border-radius: 200px;
    position: absolute;
    right: -4px;
    top: 0px;
    font-weight: 600;
  }
  
  .ten-skill-percent {
    height: 6rem;
    border-radius: 6px;
    color: #fff;
    display: flex;
    align-items: center;
    width: 780px;
    border-radius: 60px;
    position: relative;
    background: #649173;
    background: -webkit-linear-gradient(to right, #dbd5a4, #649173);
    background: linear-gradient(to right, #dbd5a4, #649173);
    padding-left: 20px;
    font-size: 25px;
    justify-content: flex-start;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  .ten-skill {
    height: 6rem;
    border-radius: 6px;
    background: linear-gradient(to right, #f4f4f4, #cfc9d1);
    color: #030303;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 173px;
    justify-content: center;
    width: 180px;
    border-radius: 200px;
    position: absolute;
    right: -4px;
    top: 0px;
    font-weight: 600;
  }
  
  span.iq-center {
    display: flex;
    justify-content: center;
    font-weight: 600;
  }
  tr.tableresult-data {
    font-size: 16px;
    height: 40px;
  }
  /* add new latest-css end */
  /* A4-css */
  
  page[size='A4'] {
    width: 21cm;
    height: 900mn;
  }
  
  @media print {
    html body {
      width: 320mm;
      height: 900mn;
    }
    .logo-text {
      padding-top: 4rem;
    }
    .fixed {
      margin-top: 17rem;
    }
    .big-img {
      width: 314mm;
      height: 100%;
    }
    .second-img {
      width: 350mm;
      height: 149.9vh;
    }
    .third-img {
      width: 320mm;
      height: 149.9vh;
    }
  
    .fixed {
      height: 100vh;
      justify-content: flex-end;
    }
    .top-heading {
      font-size: 40px;
    }
  
    .bg-img {
      width: 310mm;
      height: 1200mn;
    }
    .text-absolute {
      position: absolute;
      top: 0rem;
      width: 100%;
    }
    .text-space {
      font-size: 22px;
    }
    .strength-next {
      margin-top: 2rem;
    }
    .first-skill-percent {
      height: 5rem;
      position: relative;
    }
    .first-skill {
      height: 5rem;
      position: absolute;
      right: -4px;
      top: 0px;
    }
  
    .second-skill-percent {
      height: 5rem;
      position: relative;
    }
    .second-skill {
      height: 5rem;
      position: absolute;
      right: -4px;
      top: 0px;
    }
    .third-skill-percent {
      height: 5rem;
      position: relative;
    }
    .third-skill {
      height: 5rem;
      position: absolute;
      right: -4px;
      top: 0px;
    }
    .fourth-skill-percent {
      height: 5rem;
      position: relative;
    }
    .fourth-skill {
      height: 5rem;
      position: absolute;
      right: -4px;
      top: 0px;
    }
    .fifth-skill-percent {
      height: 5rem;
      position: relative;
    }
    .fifth-skill {
      height: 5rem;
      position: absolute;
      right: -4px;
      top: 0px;
    }
    .six-skill-percent {
      height: 5rem;
      position: relative;
    }
    .six-skill {
      height: 5rem;
      position: absolute;
      right: -4px;
      top: 0px;
    }
    .seven-skill-percent {
      height: 5rem;
      position: relative;
    }
    .seven-skill {
      height: 5rem;
      position: absolute;
      right: -4px;
      top: 0px;
    }
    .seven-skill {
      height: 5rem;
      font-size: 22px;
    }
    .eight-skill-percent {
      height: 5rem;
      position: relative;
    }
    .eight-skill {
      height: 5rem;
      position: absolute;
      right: -4px;
      top: 0px;
    }
    .nine-skill-percent {
      height: 5rem;
      position: relative;
    }
    .nine-skill {
      height: 5rem;
      position: absolute;
      right: -4px;
      top: 0px;
    }
    .ten-skill-percent {
      height: 5rem;
      position: relative;
    }
    .pdf-width td {
      border: 1px solid #ddd;
      padding: 0.55rem;
      color: #000;
      width: 45px;
    }
    .top-space {
      margin-top: 3rem;
    }
    .top-space-sec {
      margin-top: 7rem;
    }
    .ten-skill {
      height: 5rem;
      position: absolute;
      right: -4px;
      top: 0px;
    }
    .sign-heading {
      margin-top: 4rem;
    }
    .margin-text {
      font-size: 25px;
    }
    .detail-text {
      font-size: 25px;
    }
    .strength-top {
      margin-left: 50px;
    }
    .strength-next {
      margin-left: 50px;
    }
    tr.tableresult-data {
      font-size: 12px;
      height: 40px;
    }
    .margin-pdf {
      margin-top: 1rem;
    }
    .pdf-table td {
      padding: 0.25rem;
    }
  }
  .pdf-scroll {
    cursor: pointer;
    padding-top: 10px;
    height: calc(100vh - 94px) !important;
  }
  
  .printto-pdf {
    position: fixed;
    top: 83px;
    right: 12px;
    z-index: 9;
  }
  .edit-style {
    padding: 18px 11px;
  }
  .preview {
    margin-top: 33px;
  }
  .pdf-btn {
    display: flex;
    gap: 15px;
    margin-left: 8px;
    position: fixed;
    z-index: 9;
  }
  .print-pdf {
    margin-right: 10px;
    background-color: var(--blue100);
    padding: 0.375rem 0.75rem;
    font-weight: 500;
    color: white;
    height: 40px;
    font-size: 14px;
    border-radius: 60px;
    float: right;
  }
  .dynamic {
    display: grid;
    grid-template-columns: auto auto;
  }
  .learning-margin {
    margin-top: 1100px;
  }`;

  return (
    <div className='preview'>
      <Editor
        apiKey='nqkd2ppm3991i5ahof427m4h5ba9qtk8byerucf8ps8n0xgv'
        onEditorChange={(e) => handleChange(e)}
        initialValue={pdfInitalValue}
        init={{
          menubar: 'file edit view insert format tools table help',
          selector: 'textarea#open-source-plugins' as unknown as undefined,
          plugins:
            'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
          imagetools_cors_hosts: ['picsum.photos'],
          toolbar:
            'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
          toolbar_sticky: true,
          autosave_ask_before_unload: true,
          autosave_interval: '30s',
          autosave_prefix: '{path}{query}-{id}-',
          autosave_restore_when_empty: false,
          autosave_retention: '2m',
          image_advtab: true,
          templates: [
            {
              title: 'New Table',
              description: 'creates a new table',
              content:
                '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>',
            },
            {
              title: 'Starting my story',
              description: 'A cure for writers block',
              content: 'Once upon a time...',
            },
            {
              title: 'New list with dates',
              description: 'New List with dates',
              content:
                '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>',
            },
          ],
          template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
          template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
          height: 1000,
          image_caption: true,
          quickbars_selection_toolbar:
            'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
          noneditable_noneditable_class: 'mceNonEditable',
          toolbar_mode: 'sliding',
          contextmenu: 'link image imagetools table',
          content_style: `${pdfStyles}`,
        }}
      />
    </div>
  );
};
export default EditorOfPdf;
