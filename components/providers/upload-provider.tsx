"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import UploadPanel from "@/components/providers/upload/upload-panel";

// Types
export type UploadStatus = 'queued' | 'uploading' | 'completed' | 'error';

export interface UploadItem {
  id: string;
  file: File;
  progress: number;
  status: UploadStatus;
  title: string;
}

interface UploadContextType {
  uploadFile: (file: File , title: string) => void;
  uploads: UploadItem[];
}

// Create context
const UploadContext = createContext<UploadContextType | undefined>(undefined);

// Custom hook for using the upload context
export const useUpload = () => {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error('useUpload must be used within an UploadProvider');
  }
  return context;
};

// Provider component
export const UploadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [uploads, setUploads] = useState<UploadItem[]>([]);

  const uploadFile = useCallback((file: File , title: string) => {
    const newUpload: UploadItem = {
      id: Date.now().toString(),
      file,
      progress: 0,
      status: 'queued',
      title: title,
    };

    setUploads((prevUploads) => [...prevUploads, newUpload]);

    // Simulated upload process
    const upload = async () => {
      setUploads((prevUploads) =>
        prevUploads.map((u) =>
          u.id === newUpload.id ? { ...u, status: 'uploading' } : u
        )
      );

      const chunkSize = 1024 * 1024; // 1MB chunks
      const chunks = Math.ceil(file.size / chunkSize);

      let fId = null;
      for (let i = 0; i < chunks; i++) {
        const chunk = file.slice(i * chunkSize, (i + 1) * chunkSize);
        const formData = new FormData();
        formData.append('file', chunk);
        formData.append('chunk', i.toString());
        formData.append('chunks', chunks.toString());
        formData.append('title' , title);
        if (fId) formData.append('id' , fId);

        try {
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });

          fId = (await response.json()).id;

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const progress = Math.round(((i + 1) / chunks) * 100);
          setUploads((prevUploads) =>
            prevUploads.map((u) =>
              u.id === newUpload.id ? { ...u, progress } : u
            )
          );
        } catch (error) {
          console.error(`Error uploading chunk ${i + 1}/${chunks}:`, error);
          setUploads((prevUploads) =>
            prevUploads.map((u) =>
              u.id === newUpload.id ? { ...u, status: 'error' } : u
            )
          );
          return;
        }
      }

      setUploads((prevUploads) =>
        prevUploads.map((u) =>
          u.id === newUpload.id ? { ...u, status: 'completed', progress: 100 } : u
        )
      );
    };

    upload();
  }, []);

  return (
    <UploadContext.Provider value={{ uploadFile, uploads }}>
      {children}
      <UploadPanel/>
    </UploadContext.Provider>
  );
};
