import React, { useContext, useEffect, useState } from "react";
import { getLocallyChatsList, deleteChatLocally } from "../../service/chat-service";

import moment from "moment";

import { Avatar, InputAdornment, Paper, TextField, Box, Grid, List, ListItem, Typography, ListItemIcon, ListItemText } from "@material-ui/core";
import AdbIcon from '@material-ui/icons/Adb';
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import SpeakerNotesOutlinedIcon from '@material-ui/icons/SpeakerNotesOutlined';

import { useStyles } from './styles';
import { ChatMessage } from "../../components/Chat/ChatMessage";
import { useTranslation } from "react-i18next";
import { SnackbarContext } from "../../context/SnackbarContext";

export const HistoryChatsContainer = () => {
  const [chats, setChats] = useState(getLocallyChatsList())
  const [selectedChat, setSelectedChat] = useState()
  const [t] = useTranslation('translation')
  const { setSnackbar } = useContext(SnackbarContext)

  const classes = useStyles();

  useEffect(() => {
    setChats(getLocallyChatsList())
  }, [])

  const handleSelectChat = (chat) => {
    setSelectedChat(chat)
  }

  const handleDeleteChat = (chat) => {
    deleteChatLocally(chat)

    selectedChat && selectedChat.chatUid === chat.chatUid && setSelectedChat(null)
    setSnackbar({ title: t('history.chats.page.message.deleted'), severity: 'success' })

    setChats(getLocallyChatsList())
  }

  return (
    <Box mt={3} mx={2}>
      <Paper className={classes.paper} style={{ width: '100%' }}>
        <Grid container style={{ width: '100%', minHeight: '450px' }}>
          <Grid item xs={12} md={4} className={classes.agentsSession}>
            <div>
              <TextField
                style={{ width: '100%' }}
                id="input-with-icon-textfield"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <List style={{ overflow: 'auto', maxHeight: '450px' }}>
              <ListItem>
                <ListItemText>
                  <Typography variant='subtitle1' color="primary" className={classes.chatSession}>
                    {t(`history.chats.page.label.${chats.length ? '' : 'no.'}results`)}
                  </Typography>
                </ListItemText>
              </ListItem>
              {chats.map((chat, index) => (
                <ListItem button key={index}>
                  <ListItemIcon onClick={() => { handleSelectChat(chat) }}>
                    <Avatar>
                      <AdbIcon />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText >
                    <div className={classes.chatListItem}>
                      <div onClick={() => { handleSelectChat(chat) }}>
                        <Typography variant='subtitle1' className={classes.chatTexts}>{chat.agent}</Typography>
                        <Typography variant='body2' className={classes.chatTextsSub}>
                          {t(`history.chats.page.label.date`)}{' '}
                          {moment(chat.createdAt).format("YYYY-MM-DD HH:mm")}
                        </Typography>
                      </div>
                      <DeleteIcon color="action" onClick={() => { handleDeleteChat(chat) }}/>
                    </div>
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </Grid>
          {selectedChat &&
            <Grid item xs={12} md={8} style={{ backgroundColor: '#86868612' }}>
              <>
                <Grid container alignItems='center' style={{ padding: '13px 15px', borderBottom: '1px solid #d9d9d9' }}>
                  <Grid item xs={3} sm={4} md={1} className={classes.dialogTitleButtons}>
                    <Avatar>
                      <AdbIcon />
                    </Avatar>
                  </Grid>
                  <Grid item xs={9} sm={8} md={11} style={{ paddingLeft: '8px' }}>
                    <Typography variant='subtitle1' >{selectedChat.agent}</Typography>
                    <Typography variant='body2'>Specialized Agent</Typography>
                  </Grid>
                </Grid>
                <Grid container alignItems='center' style={{}}>
                  <Grid item xs={12} className={classes.chatHistory}>
                    {
                      selectedChat.uploadedFiles.length > 0 &&
                      <div className={classes.uploadedFiles}>
                        <span style={{ color: 'black', fontWeight: '700' }}> Uploaded files:<br /></span>
                        {selectedChat.uploadedFiles.map((file, index) => (<span key={index}>{file}<br /></span>))}
                      </div>
                    }
                    {selectedChat.messages.map((chat, index) => <ChatMessage key={`chat-message-agent${index}`} classes={classes} chat={chat} index={index} />)}
                  </Grid>
                </Grid>
              </>
            </Grid>
          }
          {!selectedChat &&
            <Grid item xs={12} md={8} className={classes.chatSelectInfo}>
              <div className={classes.chatSelectInfoIcon}>
                <SpeakerNotesOutlinedIcon style={{ fontSize: '62px' }} />
              </div>
            </Grid>
          }
        </Grid>
      </Paper>
    </Box>
  )
}