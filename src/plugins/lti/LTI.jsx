import React, { useState, useEffect, useContext } from "react"
import {default as UUID} from "node-uuid";

import UserContext from "~/Contexts/User"

import Input from "~/components/Input"
import Flex from "~/components/Flex"
import Loader from "~/components/Loader"
import { getTools, getPseudonym, sign } from './utils'

const generateNonce = (length) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const LTI = ({ state, editable }) => {
  const [tools, setTools] = useState({})
  const [loading, setLoading] = useState(true)
  const [idToken, setIdToken] = useState("")
  const { store: user } = useContext(UserContext)

  async function bootstrap() {
    if (state.url.value) {
      const iss = window.location.protocol + '//' + window.location.host + '/';
      const pseudonym = await getPseudonym(user.id, state.templateId.value)
      const current = new Date();
      const request = {
        iss,
        name: pseudonym,
        aud: state.clientId.value,
        sub: pseudonym,
        exp: current.getTime() + 3 * 60,
        iat: current.getTime(),
        nonce: generateNonce(16),
        'https://purl.imsglobal.org/spec/lti/claim/message_type': state.ltiMessageType.value,
        'https://purl.imsglobal.org/spec/lti/claim/roles': [
          `http://purl.imsglobal.org/vocab/lis/v2/membership#${user.roles[0].name}`,
        ],
        'https://purl.imsglobal.org/spec/lti/claim/resource_link': {
          id: state.id.value,
        },
        'https://purl.imsglobal.org/spec/lti/claim/version': state.ltiVersion.value,
        'https://purl.imsglobal.org/spec/lti/claim/deployment_id': state.id.value,
        'https://purl.imsglobal.org/spec/lti-dl/claim/deep_linking_settings':
          (state.ltiMessageType === 'LtiDeepLinkingRequest'
            ? {
              accept_types: ['ltiLink'],
              accept_media_types: 'image/*,text/html',
              accept_presentation_document_targets: ['iframe', 'window'],
              deep_link_return_url: `${iss}courses/x/tools/link/${state.id.value}`,
            }
            : undefined),
      }
      setIdToken(await sign(request))
    } else {
      setTools(await getTools())
    }
    setLoading(false)
  }

  useEffect(() => {
      bootstrap()
  }, [])

  const setTool = (tool) => {
    state.id.set(UUID.v4())
    state.templateId.set(tool._id)
    state.clientId.set(tool.oAuthClientId)
    state.ltiMessageType.set(tool.lti_message_type)
    state.ltiVersion.set(tool.lti_version)
    state.url.set(tool.url)
  }

  if (loading) {
    return (
      <Flex justifyCenter>
        <p>lade genrell</p>
      </Flex>
    )
  } else {
    console.log('loading stopped', state.url.value)
    if (state.url.value) {
      if (idToken) {
        const html = `data:text/html;charset=utf-8,<html>
        <body onLoad="document.getElementById('lti').submit()">
          <form id="lti" method="post" action=${state.url.value}>
            <input type="hidden" name="id_token" value="${idToken}" />
          </form>
        </body>
      </html>`
        return (
          <iframe src={html} style={{width: '100%', height: '400px',}}>
          </iframe>
        )
      } else {
        bootstrap()
        return (
          <Flex justifyCenter>
            <p>Lade shit</p>
          </Flex>
        )
      }
    } else {
      console.log('such was')
      return <Flex justifyCenter>
        <p>Wähle ein Tool aus</p>
        <ul>
          {tools.data.map(tool => (<li onClick={() => setTool(tool) }>{tool.name}</li>))}
        </ul>
      </Flex>
    }
  }
}

export default LTI
