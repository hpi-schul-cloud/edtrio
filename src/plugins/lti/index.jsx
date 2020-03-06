import React from "react"
import { object, string } from "@edtr-io/plugin"

import LtiIcon from "./assets/logo.svg"
import LTI from "./LTI"

export const ltiState = object({
  id: string(),
  templateId: string(),
  url: string(),
  clientId: string(),
  ltiMessageType: string(),
  ltiVersion: string(),
})

export const  SizedLtiIcon = () => (
  <LtiIcon height="100%" />
)

export const generatePlugin = (Component) => ({
  Component,
  state: ltiState,
})

const ltiPlugin = generatePlugin(LTI)

export default ltiPlugin
