import React, { useRef, useState } from 'react';
import { useMediaQuery, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography, Avatar } from '@material-ui/core'

import { v4 as uuidv4 } from 'uuid';

import AdbIcon from '@material-ui/icons/Adb';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';

import FileUploader from '../../containers/FIleUploader';
import { useStyles } from './styles';
import { ChatMessage } from './ChatMessage';
import { ChatAnsweringLoad } from './ChatAnsweringLoad';
import { useTranslation } from 'react-i18next';

export const Chat = ({ chatProps = { open: false }, setChatProps, saveChatLocally, sendMessage, uploadFiles }) => {
  const mobile = useMediaQuery('(max-width:400px)');
  const [t] = useTranslation('translation'
  )
  const chatInputRef = useRef()
  const chatRef = useRef()

  const classes = useStyles({ mobile });

  const [uploadedFiles, setUploadedFiles] = useState([])
  const [chatMessages, setChatMessages] = useState([])

  const chatUid = uuidv4()

  const saveChatMessages = (currentChatMessages, files = uploadedFiles) => {
    saveChatLocally(chatProps.agent, chatUid, currentChatMessages, files)
    setChatMessages(currentChatMessages)
  }

  const handleClose = () => {
    setChatProps({ open: false, agent: '' });
    setChatMessages([]);
    setUploadedFiles([]);
  }

  const handleUploadFiles = (files) => {
    if (files.length) {
      uploadFiles(files, chatUid, chatProps.agent)
      setUploadedFiles(files);
      saveChatMessages(chatMessages, files)
    }
  }

  const handleMessagePushed = () => {
    chatRef.current.click()
    setTimeout(() => chatInputRef.current.focus(), "500")
  }

  const sendCurrentMessage = (message) => new Promise(async (resolve, reject) => {
    const agentAnswer = await sendMessage(message, chatUid, chatProps.agent)

    if (agentAnswer) return resolve(saveChatMessages([...chatMessages, message, {
      content: agentAnswer.error ? agentAnswer.error : agentAnswer,
      role: 'Agent',
      type: 'message',
      createdAt: new Date(),
    }]))
  });

  const pushChatMessage = (newMessage) => {
    const message = {
      id: uuidv4(),
      content: newMessage,
      role: 'User',
      type: 'message',
      createdAt: new Date(),
      name: 'Username'
    }

    chatInputRef.current.value = ''

    saveChatMessages([...chatMessages, message])
    handleMessagePushed()

    sendCurrentMessage(message)
      .then(() => handleMessagePushed())
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
            <FileUploader uploadedFiles={uploadedFiles} setUploadedFiles={handleUploadFiles} />
            <CloseIcon color="action" fontSize="small" onClick={() => handleClose()} />
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        {
          uploadedFiles.length > 0 &&
          <div className={classes.uploadedFiles}>
            <span style={{ color: 'black', fontWeight: '700' }}> Uploaded files:<br /></span>
            {uploadedFiles.map((file, index) => (<span key={`updated-item${index}`}>{file.name}<br /></span>))}
          </div>
        }

        {chatMessages.map((chat, index) => <ChatMessage key={`chat-message-agent${index}`} classes={classes} chat={chat} index={index} />)}
        <div id="chat" />
        <a href="#chat" ref={chatRef}>{''}</a>
        <ChatAnsweringLoad chatMessages={chatMessages} />
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
            {t('agent.page.chat.send')}
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  )
};
