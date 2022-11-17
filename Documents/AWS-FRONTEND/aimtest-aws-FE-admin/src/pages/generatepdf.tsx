import dynamic from 'next/dynamic';

const DynamicPdf = dynamic(() => import('../components/Pdf/Pdf'), {
  ssr: false,
});
export default DynamicPdf;


