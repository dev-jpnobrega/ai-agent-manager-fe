import React, { useRef, useState } from 'react';
import { useMediaQuery, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography, Avatar } from '@material-ui/core'

import AdbIcon from '@material-ui/icons/Adb';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';

import FileUploader from '../../containers/FIleUploader';
import { useStyles } from './styles';
import { ChatMessage } from './ChatMessage';

// AGENT RETURN MOCKS
const createdAt = new Date()
const agentMessages = {
  message: {
    content: `Sorry, we aren't online at the moment. Leave a message and we'll get back to you.`,
    author: 'Agent',
    type: 'message',
    createdAt,
  },
  picture: {
    content: 'https://interbrand.com/wp-content/uploads/2022/09/b7e45662895889.5b9ed26f2d4f8-600x400.jpeg',
    author: 'Agent',
    type: 'picture',
    createdAt,
  },
  file: {
    content: `certifications.pdf`,
    author: 'Agent',
    type: 'file',
    createdAt,
  }
}


export const Chat = ({ chatProps = { open: false }, setChatProps }) => {
  const mobile = useMediaQuery('(max-width:400px)');
  const chatInputRef = useRef()
  const chatBottomLinRef = useRef()
  const classes = useStyles({ mobile });
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [chatMessages, setChatMessages] = useState([])

  const handleClose = () => {
    setChatProps({ open: false, agent: '' });
    setChatMessages([]);
    setUploadedFiles([]);
  }

  const pushChatMessage = (newMessage) => {
    const message = {
      content: newMessage,
      author: 'User',
      type: 'message',
      createdAt
    }

    chatInputRef.current.value = ''

    setChatMessages([...chatMessages, message, agentMessages[newMessage] || agentMessages.message])

    chatBottomLinRef.current.click()
    setTimeout(() => chatInputRef.current.focus(), "500")
  }

  const handleInputKeyDown = (event) => {
    const { target, key } = event

    if (key === 'Enter' && target.value !== '') pushChatMessage(target.value)
  }

  const handleSendButton = () => {
    const { value } = chatInputRef.current

    if (value !== '') pushChatMessage(value)
  }

  return (
    <Dialog
      open={chatProps.open}
      maxWidth="sm"
      scroll='paper'
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={classes.root}
      fullScreen={mobile}
    >
      <DialogTitle id="alert-dialog-title" className={classes.dialogTitle}>
        <Grid container alignItems='center'>
          {!mobile &&
            <Grid item xs={1} className={classes.dialogTitleButtons}>
              <Avatar>
                <AdbIcon />
              </Avatar>
            </Grid>
          }
          <Grid item xs={mobile ? 9 : 8} style={{ paddingLeft: '8px' }}>
            <Typography variant='subtitle1' className={classes.dialogTexts}>{chatProps.agent}</Typography>
            <Typography variant='body2' className={classes.dialogTextsSub}>Specialized Agent</Typography>
          </Grid>
          <Grid item xs={3} justifyContent='flex-end' className={classes.dialogTitleMenuButtons}>
            <SaveIcon color="action" fontSize="small" />
            <FileUploader uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} />
            <CloseIcon color="action" fontSize="small" onClick={() => handleClose()} />
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        {
          uploadedFiles.length > 0 &&
          <div className={classes.uploadedFiles}>
            <span style={{ color: 'black', fontWeight: '700' }}> Uploaded files:<br /></span>
            {uploadedFiles.map(file => (<span>{file.name}<br /></span>))}
          </div>
        }

        {chatMessages.map((chat, index) => <ChatMessage classes={classes} chat={chat} index={index} />)}
        <div id="chatBottom" />
        <a href="#chatBottom" ref={chatBottomLinRef}>{''}</a>
      </DialogContent>
      <DialogActions>
        <div className={classes.dialogActions}>
          <input
            ref={chatInputRef}
            className={classes.inputChat}
            placeholder='Type your message here...'
            onKeyDown={handleInputKeyDown}
          />
          <Button
            variant="contained"
            size="small"
            color="primary"
            className={classes.sendButton}
            onClick={handleSendButton}>
            SEND
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  )
};
