import React from "react"
import { object, string } from "@edtr-io/plugin"

import LTI from "./LTI"
export const ltiState = object({
  id: string(),
  templateId: string(),
  url: string(),
  clientId: string(),
  ltiMessageType: string(),
  ltiVersion: string(),
})

const ltiPlugin = {
    Component: LTI,
    state: ltiState,
    icon: () => (
        <img src={require("./assets/logo.svg")} style={{ height: 50 }} alt="" />
    ),
    title: "LTI",
    description: "Learning Tools Interoperability.",
}

export default ltiPlugin
