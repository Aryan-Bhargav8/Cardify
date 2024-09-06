'use client'

import React, {createContext, useContext, useState, useCallback, useEffect} from 'react'

export type FileItem = {
  id: string,
  db_id: string,
  name: string,
  status: 'deleting' | 'idle',
}

interface FileContextType {
  files: FileItem[]
  addFile: (item: FileItem) => void
  removeFile: (id: string) => void
  updateFileStatus: (id: string, status: FileItem['status']) => void
}

const FileContext = createContext<FileContextType | undefined>(undefined)

export const useFileProvider = () => {
  const context = useContext(FileContext)
  if (!context) {
    throw new Error('useFileProvider must be used within a FileProvider')
  }
  return context
}

export function FileProvider({ children , initialSet }: { children: React.ReactNode , initialSet: FileItem[] }) {
  const [files, setFiles] = useState<FileItem[]>([])

  useEffect(() => {
    setFiles(initialSet);
  } , [
    initialSet,
  ])
  const addFile = useCallback((item: FileItem) => {
    setFiles((prevFiles) => [...prevFiles, item])
  }, [])

  const removeFile = useCallback((id: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id))
  }, [])

  const updateFileStatus = useCallback((id: string, status: FileItem['status']) => {
    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.id === id ? { ...file, status } : file
      )
    )
  }, [])

  const value = {
    files,
    addFile,
    removeFile,
    updateFileStatus,
  }

  return <FileContext.Provider value={value}>
    {children}
  </FileContext.Provider>
}