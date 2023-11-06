import axios from "axios";

const headers = {
  authorization: process.env.REACT_APP_AUTHORIZATION
}

export const getAgents = async () => {
  const data = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/v1/agent`,
    { headers })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return { error: error.response.data }
    })

  return data || false
}

export const getAgent = async (agent) => {
  const data = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/v1/agent/${agent}`,
    { headers })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return { error: error.response.data }
    });

  return data || {}
}

export const saveAgent = async (agent) => {
  const data = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/v1/agent`,
    agent,
    { headers })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return { error: error.response.data }
    })


  return data || []
}

export const updateAgent = async (agent) => {
  const data = await axios.patch(
    `${process.env.REACT_APP_BASE_URL}/v1/agent/`,
    agent,
    { headers })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return { error: error.response.data }
    })


  return data || []
}

export const deleteAgent = async (key) => {
  const data = await axios.delete(
    `${process.env.REACT_APP_BASE_URL}/v1/agent/${key}`,
    { headers })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return { error: error.response.data }
    })


  return data || []
}
