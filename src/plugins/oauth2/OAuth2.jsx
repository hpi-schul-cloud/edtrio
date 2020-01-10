import React, { useState, useEffect, useContext } from "react"
import shortid from "shortid"

import UserContext from "~/Contexts/User"

import Flex from "~/components/Flex"
import Loader from "~/components/Loader"
import { getTools, getPseudonym, sign, depseudonymizationFrame } from './utils'

const OAuth2 = ({ state, editable }) => {
  const [tools, setTools] = useState({})
  const [loading, setLoading] = useState(true)
  const { store: user } = useContext(UserContext)

  async function bootstrap() {
    if (!state.url.value) {
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
      return (<iframe src={state.url.value} style={{width: '100%', height: '400px',}}>
      </iframe>);
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

export default OAuth2
