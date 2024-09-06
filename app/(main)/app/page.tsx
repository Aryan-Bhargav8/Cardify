"use client";

import {useUpload} from "@/components/providers/upload-provider";
import React from "react";

const MyComponent = () => {
  const { uploadFile } = useUpload()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      uploadFile(file , file.name)
    }
  }

  return <div className="w-full h-screen flex flex-col">
    <input type="file" onChange={handleFileChange}/>
  </div>
}

export default MyComponent;