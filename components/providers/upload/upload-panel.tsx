"use client";

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Upload, X, CheckCircle, AlertCircle } from 'lucide-react'
import {UploadStatus, useUpload} from "@/components/providers/upload-provider";

export default function UploadPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const { uploads } = useUpload();

  const togglePanel = () => setIsOpen(!isOpen)

  const getStatusIcon = (status: UploadStatus) => {
    switch (status) {
      case 'uploading':
        return <Upload className="h-4 w-4 text-blue-500" />
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />
    }
  }

  return (
    <div className="relative h-full">
      <Button
        onClick={togglePanel}
        className="fixed bottom-4 right-8 z-50 translate-x-full hover:translate-x-6 transition-all"
      >
        {isOpen ? <X className="h-4 w-4 mr-2" /> : <Upload className="h-4 w-4 mr-2" />}
        {isOpen ? 'Close' : 'Uploads'}
      </Button>

      <Card className={`fixed right-4 top-4 w-fit md:min-w-[20%] md:max-w-[50%] transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-4">Uploads</h3>
          <ScrollArea className="h-[calc(100vh-12rem)] pr-4">
            {uploads.map((item) => (
              <div key={item.id} className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium truncate flex-1 mr-2">{item.title}</span>
                  {getStatusIcon(item.status)}
                </div>
                <Progress value={item.progress} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{item.status}</span>
                  <span>{item.progress}%</span>
                </div>
              </div>
            ))}

            {uploads.length == 0 && (
              <p> You have no active uploads </p>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}