import { isEmpty } from "lodash"

export const getChatAwswer = (agentAnswer) => {
  if (agentAnswer.error) return agentAnswer.error

  return agentAnswer
}

export const formatChatMessage = (chatUid, content, role, type) => {
  return {
    id: chatUid,
    content: content.replace(/[\n\r]/g, "  \n"),
    role,
    type,
    createdAt: new Date(),
    name: 'Username'
  }
}