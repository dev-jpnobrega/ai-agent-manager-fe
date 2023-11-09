import React, { useState, useRef, useContext } from 'react';

import { isEmpty } from 'lodash';

import { useStyles } from './styles'

import AddIcon from '@material-ui/icons/Add';
import PublishIcon from '@material-ui/icons/Publish';
import ClearIcon from '@material-ui/icons/Clear';
import AttachFileIcon from '@material-ui/icons/AttachFile';

import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import { SnackbarContext } from '../../context/SnackbarContext';
import { withTranslation } from 'react-i18next';
import { Button, IconButton, useMediaQuery, Box, Grid, MenuItem, Chip, Typography, LinearProgress } from '@material-ui/core';
import { pickBetterBytes } from '../../helpers/formatBytes';

const MAX_COUNT = 5;

const FileUploader = ({ uploadingFiles, sendUploadFiles, setShowUploadFiles, t }) => {
  const inputFileRef = useRef();

  const mobile = useMediaQuery('(max-width:490px)');
  const classes = useStyles({ mobile });

  const [filesToUpload, setFilesToUpload] = useState([])
  const [fileLimit, setFileLimit] = useState(false);

  const uploadButtons = [
    {
      label: t('agent.page.form.choose'),
      icon: AddIcon,
      onClick: () => inputFileRef.current.click(),
      disabled: false,
      color: 'primary'
    },
    {
      label: t('agent.page.form.upload'),
      icon: PublishIcon,
      onClick: () => sendUploadFiles(filesToUpload),
      disabled: isEmpty(filesToUpload),
      color: 'primary'
    },
    {
      label: t('agent.page.form.cancel'),
      icon: ClearIcon,
      onClick: () => { setShowUploadFiles(false) },
      disabled: false,
      color: 'secondary'
    }
  ]

  const { setSnackbar } = useContext(SnackbarContext)

  const handleUploadFiles = files => {
    const uploaded = [...filesToUpload];
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
    if (!limitExceeded) setFilesToUpload(uploaded)
  }

  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files)
    handleUploadFiles(chosenFiles);
  }

  const handleRemoveFile = (index) => {
    const files = [...filesToUpload];
    files.splice(index, 1)
    setFilesToUpload(files);
    setFileLimit(false);
  }

  return (
    <>
      <input
        ref={inputFileRef}
        type='file'
        multiple
        onChange={handleFileEvent}
        disabled={fileLimit}
        style={{ display: 'none', visibility: 'hidden', width: '0px' }}
      />
      <Box mt={2}>
        <Grid container className={classes.uploader}>
          <Grid item xs={12}>
            <div className={classes.uploaderActions}>
              {uploadButtons.map((button, index) => (
                <Button
                  key={`upload-button-${index}`}
                  variant="contained"
                  color={button.color}
                  size="small"
                  onClick={button.onClick}
                  startIcon={!mobile ? <button.icon /> : ''}
                  style={{ textTransform: 'uppercase' }}
                  disabled={button.disabled}
                >
                  {button.label}
                </Button>
              ))}
            </div>
          </Grid>

          <Grid item xs={12} className={classes.uploaderContent}>
            {uploadingFiles && <LinearProgress />}
            {filesToUpload.map((file, index) => (
              <MenuItem key={`updated-item${index}`}>
                <div className={classes.uploaderFileItem}>
                  <div className={classes.uploaderFileItem}>
                    {!mobile && <AttachFileIcon />}
                    <div className={classes.uploaderFileDetails}>
                      <div className={classes.uploaderFileDetailsLabel}>
                        {file.name}
                      </div>
                      <div className={classes.uploaderFileDetailsSize}>
                        {pickBetterBytes(file.size)}
                        <Chip color="secondary" size="small" icon={<HourglassEmptyIcon />}
                          label="Pendente"
                          className={classes.uploaderFileDetailsStatus} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <IconButton
                      color="secondary"
                      aria-label="Upload"
                      disabled={uploadingFiles}
                      onClick={() => handleRemoveFile(index)}
                    >
                      <ClearIcon />
                    </IconButton>
                  </div>
                </div>
              </MenuItem>
            ))}

            {
              isEmpty(filesToUpload) &&
              <Typography variant="body2" color="textSecondary" component="p">
                {t('chat.agent.custom.upload.info')}
              </Typography>
            }
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default withTranslation()(FileUploader);