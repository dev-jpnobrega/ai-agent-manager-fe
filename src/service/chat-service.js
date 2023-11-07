import axios from "axios";
import { get } from "lodash";

const CHATS_LOCAL_STORAGE = 'chats'

const headers = {
  authorization: process.env.REACT_APP_AUTHORIZATION
}

const formatSendMessage = (message, chatUid, agent) => ({
  body: {
    agentUid: agent,
    id: chatUid,
    userId: 'currentUser',
    messages: [ message ]
  }
})

export const sendMessage = async (message, chatUid, agent) => {
  const data = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/v1/chat`,
    formatSendMessage(message, chatUid, agent),
    { headers })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return { error: get(error, 'response.data', 'error') }
    })

  return data || []
}

export const uploadFiles = async (files, chatUid, agent) => {
  const formData = new FormData()

  formData.append('file', files)
  formData.append('chatUid', chatUid)
  formData.append('agent', agent)

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

export const saveChatLocally = (agent, chatUid, chatMessages = [], uploadedFiles = []) => {
  const chats = getLocallyChats()

  return setLocallyChats({
    ...chats,
    [chatUid]: {
      agent,
      createdAt: chats[chatUid] ? chats[chatUid].createdAt : new Date(),
      uploadedFiles,
      messages: chatMessages
    },
  });
}

const setLocallyChats = (chat) => localStorage.setItem(CHATS_LOCAL_STORAGE, JSON.stringify(chat));

export const getLocallyChats = () => {
  return JSON.parse(localStorage.getItem(CHATS_LOCAL_STORAGE)) || {};
}

export const getLocallyChatsList = () => {
  const chats = getLocallyChats()

  return Object.keys(chats).map((key) => chats[key]).reverse();
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