'use client'

import {useState, useCallback, useRef, useEffect} from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileIcon, UploadIcon, BookOpenIcon, MessageSquareIcon, Trash2Icon } from 'lucide-react'
import Link from 'next/link'
import {toast} from "sonner";
import {useUpload} from "@/components/providers/upload-provider";
import {useFileProvider} from "@/components/providers/files-provider";


export default function Dashboard() {

  const { uploadFile } = useUpload();
  const { files , removeFile } = useFileProvider();

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.type === 'application/pdf') {
        uploadFile(file , file.name);
        toast("PDF is being processed!");
      } else {
        toast("Failed to upload");
      }
    }
  }, [])

  const openPdf = (url: string) => {
    window.open(url, '_blank')
  }

  const deletePdf = useCallback((id: string) => {
    removeFile(id)
  }, [])

  return (
    <div className="min-h-screen">
      <nav className="bg-secondary shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold">PDF Dashboard</h1>
              </div>
              <div className="ml-6 flex space-x-8">
                <Link href="/quizzes" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  <BookOpenIcon className="mr-2 h-4 w-4" />
                  Quizzes
                </Link>
                <Link href="/posts" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  <MessageSquareIcon className="mr-2 h-4 w-4" />
                  Posts
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Card>
            <CardHeader>
              <CardTitle>Your PDFs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                />
                <Button onClick={handleUpload}>
                  <UploadIcon className="mr-2 h-4 w-4" />
                  Upload PDF
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {files.map(pdf => (
                  <Card key={pdf.id} className="hover:shadow-md transition-shadow duration-200">
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center cursor-pointer" onClick={() => openPdf(`/app/pdf/${pdf.db_id}`)}>
                        <FileIcon className="mr-2 h-6 w-6 text-blue-500" />
                        <span className="text-sm font-medium">{pdf.name}</span>
                      </div>
                      <Button variant="ghost" disabled={pdf.status != 'idle'} size="icon" onClick={() => deletePdf(pdf.id)}>
                        <Trash2Icon className="h-4 w-4 text-red-500" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}