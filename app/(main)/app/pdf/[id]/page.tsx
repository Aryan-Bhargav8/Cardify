import React from 'react';
import PdfPreviewPage from "@/app/(main)/app/pdf/[id]/page-inner";

const Page = (
  { params } : { params: { id: string } }
) => {
  return (
    <PdfPreviewPage id={params.id} />
  );
};

export default Page;