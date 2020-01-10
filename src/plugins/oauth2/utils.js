import { serverApi } from "~/utils/api"

export const getTools = async () => {
  return await serverApi.get('/ltitools/?isTemplate=true&isLocal=true')
}