import React, { useState, useRef } from 'react';
import BackupIcon from '@material-ui/icons/Backup';

const MAX_COUNT = 5;

const FileUploader = ({ uploadedFiles, setUploadedFiles }) => {
  const inputFileRef = useRef();
  const [fileLimit, setFileLimit] = useState(false);

  const handleUploadFiles = files => {
    const uploaded = [...uploadedFiles];
    let limitExceeded = false;
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        if (uploaded.length === MAX_COUNT) setFileLimit(true);
        if (uploaded.length > MAX_COUNT) {
          alert(`You can only add a maximum of ${MAX_COUNT} files`);
          setFileLimit(false);
          limitExceeded = true;
          return true;
        }
      }

      return false
    })
    if (!limitExceeded) setUploadedFiles(uploaded)
  }

  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files)
    handleUploadFiles(chosenFiles);
  }

  return (
    <>
      <input
        ref={inputFileRef}
        id='fileUpload'
        type='file'
        multiple
        onChange={handleFileEvent}
        disabled={fileLimit}
        style={{ display: 'none', visibility: 'hidden', width: '0px' }}
      />
      <BackupIcon color="action" fontSize="small" onClick={() => inputFileRef.current.click() }/>
    </>
  );
}

export default FileUploader;