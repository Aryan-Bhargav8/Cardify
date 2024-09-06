import React from 'react';
import {UploadProvider} from "@/components/providers/upload-provider";

const Layout = (
  {
    children,
  } : { children: React.ReactNode },
) => {
  return (
    <UploadProvider>
      {children}
    </UploadProvider>
  );
};

export default Layout;