import React, { useRef, useState } from 'react';
import { useMediaQuery, Hidden, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography, Avatar } from '@material-ui/core'

import { Alert } from '@material-ui/lab';

import AdbIcon from '@material-ui/icons/Adb';
import SaveIcon from '@material-ui/icons/Save';
import PublishIcon from '@material-ui/icons/Publish';

import FileUploader from '../../containers/FIleUploader';
import { useStyles } from './styles';
import { ChatMessage } from './ChatMessage';
import { ChatAnsweringLoad } from './ChatAnsweringLoad';
import { useTranslation } from 'react-i18next';
import { ResponsiveButton } from '../ResponsiveButton';



export const Chat = ({ chatAgent = { agent: { key: '', name: '' }, chatUid: '' }, saveChatLocally, sendMessage, uploadFiles }) => {
  const [t] = useTranslation('translation')
  const [showUploadFiles, setShowUploadFiles] = useState(false)
  const [uploadingFiles, setUploadingFiles] = useState(false)
  const mobile = useMediaQuery('(max-width:400px)');

  const chatInputRef = useRef()

  const isAgentDefault = chatAgent.agentUid === 'default'

  const classes = useStyles()

  const [uploadedFiles, setUploadedFiles] = useState([])
  const [chatMessages, setChatMessages] = useState([])

  const saveChatMessages = (currentChatMessages) => {
    const { agent: { name }, chatUid } = chatAgent

    saveChatLocally(name, chatUid, currentChatMessages)
    setChatMessages(currentChatMessages)
  }

  const handleUploadFiles = async (files) => {
    if (files.length) {
      const { agentUid, chatUid } = chatAgent
    
      setUploadingFiles(true)

      const uploaded = await uploadFiles(files, chatUid, agentUid)

      if (uploaded) {
        setUploadedFiles(files);

        setTimeout(() => {
          setUploadingFiles(false)

          setTimeout(() => {
            const fileMessages = files.map(file => ({
              role: 'Files',
              type: 'message',
              createdAt: new Date(),
              content: {
                name: file.name,
                size: file.size,
                type: file.type
              },
            }))

            saveChatMessages([...chatMessages, ...fileMessages])
            setShowUploadFiles(false)
          }, 800)
        }, 1200)
      }

      handleMessagePushed()
    }
  }

  const handleMessagePushed = () => {
    const element = document.getElementById('chat');
    if (element) {
      element.scrollIntoView();
    }
  }

  const sendCurrentMessage = (message) => new Promise(async (resolve, reject) => {
    const { agentUid, chatUid } = chatAgent

    const agentAnswer = await sendMessage(message, chatUid, agentUid)

    if (agentAnswer) return resolve(saveChatMessages([...chatMessages, message, {
      content: agentAnswer.error ? agentAnswer.error : agentAnswer,
      role: 'Agent',
      type: 'message',
      createdAt: new Date(),
    }]))
  });

  const pushChatMessage = (newMessage, role = 'User') => {
    const message = {
      id: chatAgent.chatUid,
      content: newMessage,
      role,
      type: 'message',
      createdAt: new Date(),
      name: 'Username'
    }

    chatInputRef.current.value = ''

    saveChatMessages([...chatMessages, message])
    setTimeout(() => handleMessagePushed(), 200)

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
      open={true}
      maxWidth="sm"
      scroll='paper'
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={classes.root}
      fullScreen={true}
    >
      <DialogTitle id="alert-dialog-title" className={classes.dialogTitle}>
        <Grid container alignItems='center'>
          <Grid item xs={6} className={classes.chatAgentInfo} style={{ paddingLeft: '8px' }}>
            <Hidden only={['xs', 'sm']}>
              <Avatar>
                <AdbIcon />
              </Avatar>
            </Hidden>
            <div style={{ width: '100%' }}>
              <Typography variant='subtitle1' className={classes.dialogTexts}>{chatAgent.agent.name || "Agent Name"}</Typography>
              <Typography variant='body2' className={classes.dialogTextsSub}>
                {isAgentDefault ? t('agent.custom') : t('agent.specialized')}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={6} className={classes.dialogTitleMenuButtons}>
            {isAgentDefault && <>
              <ResponsiveButton
                mobile={mobile}
                disabled={true}
                color="primary"
                size="small"
                variant="contained"
                alt="Save"
                Icon={SaveIcon}
                style={{ textTransform: 'uppercase' }}
                description={t('agent.page.form.save')}
              />

              <ResponsiveButton
                mobile={mobile}
                disabled={false}
                color="secondary"
                size="small"
                variant="contained"
                alt="Upload"
                onClick={() => { 
                  setShowUploadFiles(true)
                  setTimeout(() => handleMessagePushed(), 300)
                }}
                Icon={PublishIcon}
                style={{ textTransform: 'uppercase' }}
                description={t('agent.page.form.upload')}
              />
            </>
            }
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        {
          isAgentDefault && uploadedFiles.length === 0 && !showUploadFiles &&
          <Alert severity="warning">
            {t('chat.agent.custom.info')}{t('chat.agent.custom.upload.info')}
          </Alert>
        }

        {chatMessages.map((chat, index) => <ChatMessage key={`chat-message-agent${index}`} classes={classes} chat={chat} index={index} />)}
        {showUploadFiles && <FileUploader uploadingFiles={uploadingFiles} sendUploadFiles={handleUploadFiles} setShowUploadFiles={setShowUploadFiles} />}
        <div id="chat" />
        <ChatAnsweringLoad chatMessages={chatMessages} />
      </DialogContent>
      <DialogActions>
        <div className={classes.dialogActions}>
          <input
            ref={chatInputRef}
            className={classes.inputChat}
            placeholder='Type your message here...'
            onKeyDown={handleInputKeyDown}
            disabled={isAgentDefault && uploadFiles.length === 0}
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
