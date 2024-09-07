import React from 'react';
import {UploadProvider} from "@/components/providers/upload-provider";
import {FileProvider} from "@/components/providers/files-provider";
import {currentUserProfile} from "@/lib/user-pro";
import {db} from "@/lib/db";

const Layout = async (
  {
    children,
  } : { children: React.ReactNode },
) => {

  const user = await currentUserProfile(true);
  if (!user) return;

  const files = await db.file.findMany({
    where: {
      userId: user.id,
    }
  })

  return (
    <FileProvider initialSet={files.map((i) => {
      return {
        name: i.title,
        id: i.id,
        db_id: i.id,
        status: 'idle',
      }
    })}>
      <UploadProvider>
        {children}
      </UploadProvider>
    </FileProvider>
  );
};

export default Layout;