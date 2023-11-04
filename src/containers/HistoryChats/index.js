import React, { useEffect, useState } from "react";
import { getLocallyChatsList } from "../../service/chat-service";

import moment from "moment";

import { Avatar, IconButton, InputAdornment, Paper, TextField, Box, Grid, List, ListItem, Typography, ListItemIcon, ListItemText } from "@material-ui/core";
import AdbIcon from '@material-ui/icons/Adb';
import SearchIcon from '@material-ui/icons/Search';
import SpeakerNotesOutlinedIcon from '@material-ui/icons/SpeakerNotesOutlined';

import { useStyles } from './styles';
import { ChatMessage } from "../../components/Chat/ChatMessage";

export const HistoryChatsContainer = () => {
  const [chats, setChats] = useState(getLocallyChatsList())
  const [selectedChat, setSelectedChat] = useState()

  const classes = useStyles();

  useEffect(() => {
    setChats(getLocallyChatsList)
  }, [])

  const handleSelectChat = (chat) => {
    setSelectedChat(chat)
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
            <List>
              <ListItem>
                <ListItemText>
                  <Typography variant='subtitle1' color="primary" className={classes.chatSession}>Histórico</Typography>
                </ListItemText>
              </ListItem>
              {chats.map((chat, index) => (
                <ListItem button key={index} onClick={() => { handleSelectChat(chat) }}>
                  <ListItemIcon>
                    <Avatar>
                      <AdbIcon />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant='subtitle1' className={classes.chatTexts}>{chat.agent}</Typography>
                    <Typography variant='body2' className={classes.chatTextsSub}>Em {moment(chat.createdAt).format("YYYY-MM-DD HH:mm")}</Typography>
                  </ListItemText>
                </ListItem>
              ))}
              {/* <ListItem>
                <ListItemText>
                  <Typography variant='subtitle1' color="primary" className={classes.chatSession}>Agentes</Typography>
                </ListItemText>
              </ListItem> */}
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