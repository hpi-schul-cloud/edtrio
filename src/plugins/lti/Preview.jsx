import React from "react"
import Flex from "~/components/Flex"

import {generatePlugin} from './index'

const LtiPreview = () => <Flex
    justifyCenter
    alignCenter
    style={{
        minHeight: 800,
        backgroundColor: "rgba(240, 240, 240)",
    }}>
    <h1>LTI Tools</h1>
</Flex>

const ltiPlugin = generatePlugin(LtiPreview)

export default ltiPlugin
