import React, { useState, useEffect, useContext } from "react"
import shortid from "shortid"

import config from "~/config.js"
import UserContext from "~/Contexts/User"

import Flex from "~/components/Flex"
import Loader from "~/components/Loader"
import { getTools, getPseudonym, sign, depseudonymizationFrame } from './utils'

const loader = <Flex justifyCenter>
  <Loader />
</Flex>

const toolSelector = (tools, setTool) => <Flex justifyCenter style={{ maxHeight: '400px', overflowY: 'scroll', overflowX: 'hidden', }}>
  {tools.data.map(tool => (
    <Flex
      onClick={() => setTool(tool) }
      key={tool.id}
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

const LTI11Frame = (state) => <iframe
  src={`${window.location.protocol}//${window.location.host}/courses/X/tools/run/${state.templateId.value}`}
  style={{width: '100%', height: '400px',}}>
</iframe>

const LTI13Frame = (state, idToken) => {
  const csrf = (document.getElementsByName('_csrf')[0] ? document.getElementsByName('_csrf')[0].value : undefined)
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
}

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
      if(state.ltiVersion.value === '1.3.0') {
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
                deep_link_return_url: `${config.SERVER_API_URL}/tools/${state.id.value}/link`,
              }
              : undefined),
        }
        setIdToken(await sign(request))
        window.addEventListener("message", receiveMessage, false);

        function receiveMessage(event) {
          if (event.origin !== config.SERVER_API_URL)
            return;

          if (event.data.id === state.id.value) {
            state.url.set(event.data.url)
            state.ltiMessageType.set('basic-lti-launch-request')
            setIdToken(null)
          }
        }
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
    return loader
  } else {
    if (state.url.value) {
      if (idToken) {
        return LTI13Frame(state, idToken)
      } else if (state.ltiVersion.value === 'LTI-1p0') {
        return LTI11Frame(state)
      } else {
        bootstrap()
        return loader
      }
    } else {
      if(editable) {
        return toolSelector(tools, setTool)
      } else {
        return <div></div>
      }
    }
  }
}

export default LTI
