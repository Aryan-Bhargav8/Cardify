"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { pdfjs } from 'react-pdf';

// Dynamically import the `Document` and `Page` from `react-pdf`
const Document = dynamic(() => import('react-pdf').then(mod => mod.Document), { ssr: false });
const Page = dynamic(() => import('react-pdf').then(mod => mod.Page), { ssr: false });

const PdfPreviewPage = ({ id }: { id: string }) => {
  const [numPages, setNumPages] = useState(0);

  useEffect(() => {
    // Set the worker source to the correct path in the public directory
    pdfjs.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.min.js';
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document file={`/api/pdf/${id}`} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document>
    </div>
  );
};

export default PdfPreviewPage;