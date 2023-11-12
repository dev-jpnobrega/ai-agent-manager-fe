import { isEmpty } from "lodash"

export const getChatAwswer = (agentAnswer) => {
  if (agentAnswer.error) return agentAnswer.error

  return agentAnswer
}

export const formatChatMessage = (chatUid, content, role, type) => {
  return {
    id: chatUid,
    content,
    role,
    type,
    createdAt: new Date(),
    name: 'Username'
  }
}