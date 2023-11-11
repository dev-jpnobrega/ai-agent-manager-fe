import axios from "axios";
import { get } from "lodash";

import { v4 as uuidv4 } from 'uuid';

const CHATS_LOCAL_STORAGE = 'chats'

const headers = {
  authorization: process.env.REACT_APP_AUTHORIZATION
}

export const handleNewChat = (agent) => {
  window.open(`/#/chat/${agent.key}/${uuidv4()}`, '_blank', 'noreferrer');
}

const formatSendMessage = (message, chatUid, agentUid) => ({
  body: {
    agentUid,
    id: chatUid,
    userId: 'currentUser',
    messages: [ message ]
  }
})

export const sendMessage = async (message, chatUid, agentUid) => {
  const data = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/v1/chat`,
    formatSendMessage(message, chatUid, agentUid),
    { headers })
    .then((response) => {
      return JSON.stringify(response.data)
    })
    .catch((error) => {
      return { error: get(error, 'response.data', 'error') }
    })

  return data || []
}

export const uploadFiles = async (files, chatUid, agent) => {
  const formData = new FormData()

  for (let i = 0; i < files.length; i++) {     
    formData.append('files', files[i])   
  }

  formData.append('chatUid', chatUid)
  formData.append('agentUid', agent)

  const data = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/v1/upload`,
    formData,
    { headers })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return { error: get(error, 'response.data', 'error') }
    })

  return data || []
}

export const saveChatLocally = (agent, chatUid, chatMessages = []) => {
  const chats = getLocallyChats()

  return setLocallyChats({
    ...chats,
    [chatUid]: {
      agent,
      createdAt: chats[chatUid] ? chats[chatUid].createdAt : new Date(),
      messages: chatMessages
    },
  });
}

export const deleteChatLocally = (chat) => {
  const chats = getLocallyChats()

  delete chats[chat.chatUid]

  setLocallyChats(chats);
}

const setLocallyChats = (chat) => localStorage.setItem(CHATS_LOCAL_STORAGE, JSON.stringify(chat));

export const getLocallyChats = () => {
  return JSON.parse(localStorage.getItem(CHATS_LOCAL_STORAGE)) || {};
}

export const getLocallyChatsList = () => {
  const chats = getLocallyChats()

  return Object.keys(chats).map((key) => ({ ...chats[key], chatUid: key })).reverse();
}

// TYPE MESSAGES
const agentMessages = {
  message: {
    content: `Sorry, we aren't online at the moment. Leave a message and we'll get back to you.`,
    role: 'Agent',
    type: 'message',
    createdAt: ''
  },
  picture: {
    content: 'https://interbrand.com/wp-content/uploads/2022/09/b7e45662895889.5b9ed26f2d4f8-600x400.jpeg',
    role: 'Agent',
    type: 'picture',
    createdAt: '',
  },
  file: {
    content: `certifications.pdf`,
    role: 'Agent',
    type: 'file',
    createdAt: '',
  }
}