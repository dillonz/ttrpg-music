import React, { ChangeEvent, useState } from 'react';
import { Input, Button } from '@mui/material';


interface FileUploaderProps {
}

const FileUploader: React.FC<FileUploaderProps> = ({ }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFileUpload = () => {
    // Handle the selected file here, e.g., upload it to a server or process it in some way.
    console.log('Selected file:', selectedFile);
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
      <Button 
        onClick={handleFileUpload}
        variant="contained"
        color="primary"
        className="audio-button"
        key="submit"
      >
        Add
      </Button>
    </div>
  );
};

export default FileUploader;