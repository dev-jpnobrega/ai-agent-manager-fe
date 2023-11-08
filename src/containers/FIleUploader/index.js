import React, { useState, useRef, useContext } from 'react';
import BackupIcon from '@material-ui/icons/Backup';
import { SnackbarContext } from '../../context/SnackbarContext';
import { withTranslation } from 'react-i18next';
import { Button } from '@material-ui/core';

const MAX_COUNT = 5;

const FileUploader = ({ uploadedFiles, setUploadedFiles, t }) => {
  const inputFileRef = useRef();
  const [fileLimit, setFileLimit] = useState(false);

  const { setSnackbar } = useContext(SnackbarContext)

  const handleUploadFiles = files => {
    const uploaded = [...uploadedFiles];
    let limitExceeded = false;
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        if (uploaded.length === MAX_COUNT) setFileLimit(true);
        if (uploaded.length > MAX_COUNT) {
          setSnackbar({ title: t('agent.page.chat.upload') + MAX_COUNT, severity: 'error' })
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
      <Button
        variant="contained"
        color="secondary"
        size="small"
        startIcon={<BackupIcon />}
        onClick={() => inputFileRef.current.click()}
      >
        Upload
      </Button>
    </>
  );
}

export default withTranslation()(FileUploader);