import { serverApi } from "~/utils/api"

export const getTools = async () => {
  return await serverApi.get('/ltitools/?isTemplate=true&isLocal=false')
}

export const getPseudonym = async (userId, toolId) => {
  const response = await serverApi.get(`/pseudonym/?userId=${userId}&toolId=${toolId}`)
  return response.data[0].pseudonym
}

export const sign = async (request) => {
  return await serverApi.post('/tools/sign', {request})
}

export const depseudonymizationFrame = (url, pseudonym) => {
  const properties = 'title="username" style="height: 26px; width: 180px; border: none;"';
  return `<iframe src="${url}oauth2/username/${pseudonym}" ${properties}></iframe>`;
}