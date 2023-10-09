import React, { ChangeEvent, useState } from 'react';
import { Input, Button } from '@mui/material';


interface FileUploaderProps {
    selectedFile: File | undefined;
    setSelectedFile: (val: File | undefined) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ selectedFile, setSelectedFile }) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file);
  };

  return (
    <div
        style={{
            backgroundColor: 'white'
        }}
    >
      <Input
        type="file"
        inputProps={{accept:".mp3, .wav"}} // Define accepted file types
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileUploader;