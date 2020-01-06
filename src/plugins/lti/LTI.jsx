import React, { useState, useEffect, useContext } from "react"
import shortid from "shortid"

import UserContext from "~/Contexts/User"

import Flex from "~/components/Flex"
import Loader from "~/components/Loader"
import { getTools, getPseudonym, sign, depseudonymizationFrame } from './utils'

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
      const name = encodeURI(depseudonymizationFrame(iss, pseudonym));
      const request = {
        iss,
        name,
        aud: state.clientId.value,
        sub: pseudonym,
        exp: current.getTime() + 3 * 60,
        iat: current.getTime(),
        nonce: shortid.generate() + shortid.generate(),
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
          (state.ltiMessageType.value === 'LtiDeepLinkingRequest'
            ? {
              accept_types: ['ltiLink'],
              accept_media_types: 'image/*,text/html',
              accept_presentation_document_targets: ['iframe', 'window'],
              deep_link_return_url: `http://localhost:3030/tools/${state.id.value}/link`,
            }
            : undefined),
      }
      setIdToken(await sign(request))
      window["link-" + state.id.value] = (url) => {
        state.ltiMessageType.set('basic-lti-launch-request')
        state.url.set(url)
        setIdToken(null)
      }
    } else {
      setTools(await getTools())
    }
    setLoading(false)
  }

  useEffect(() => {
      bootstrap()
  }, [])

  const setTool = (tool) => {
    state.id.set(shortid.generate())
    state.templateId.set(tool._id)
    state.clientId.set(tool.oAuthClientId)
    state.ltiMessageType.set(tool.lti_message_type)
    state.ltiVersion.set(tool.lti_version)
    state.url.set(tool.url)
  }

  if (loading) {
    return (
      <Flex justifyCenter>
        <Loader />
      </Flex>
    )
  } else {
    if (state.url.value) {
      if (idToken) {
        const csrf = document.getElementsByName('_csrf')[0].value
        const html = `data:text/html;charset=utf-8,<html>
        <body onLoad="document.getElementById('lti').submit()">
          <form id="lti" method="post" action=${state.url.value}>
            <input type="hidden" name="id_token" value="${idToken}" />
            <input type="hidden" name="_csrf" value="${csrf}" />
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
            <Loader />
          </Flex>
        )
      }
    } else {
      if(editable) {
        return <Flex justifyCenter style={{ maxHeight: '400px', overflowY: 'scroll', overflowX: 'hidden', }}>
          {tools.data.map(tool => (
            <Flex
              onClick={() => setTool(tool) }
              justifyCenter
              alignCenter
              style={{
                cursor: 'pointer',
                textAlign: 'center',
                margin: '1.5%',
                padding: '3%',
                width: '27%',
                backgroundColor: "rgba(240, 240, 240)",
              }}>
              {tool.name}
            </Flex>
          ))}
        </Flex>
      } else {
        return <div></div>
      }
    }
  }
}

export default LTI
