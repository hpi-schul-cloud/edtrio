import React from "react"
import { object, string } from "@edtr-io/plugin"

import OAuth2 from "./OAuth2"
export const oauth2State = object({
  id: string(),
  templateId: string(),
  url: string(),
})

const oauth2Plugin = {
    Component: OAuth2,
    state: oauth2State,
    icon: () => (
        <img src={require("./assets/logo.svg")} style={{ height: 50 }} alt="" />
    ),
    title: "OAauth2",
    description: "OAuth2 with OpenID Connect",
}

export default oauth2Plugin
