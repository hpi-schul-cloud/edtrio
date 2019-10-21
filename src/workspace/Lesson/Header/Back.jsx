import React from "react"
import styled from "styled-components"

import Flex from "~/components/Flex"

const StyledBack = styled(Flex)`
    background-color: #af0437;
    padding: 10px;
    height: 100%;
    cursor: pointer;
`

const Back = () => {
    const currentUrl = window.location.href
    const regexResult = /courses\/([a-f0-9]{24})\/topics\/([a-f0-9]{24})/.exec(currentUrl)
    const jumpUrl = regexResult[1] || 'https://schul-cloud.org'

    return (
        <StyledBack
            alignCenter
            justifyCenter
            onClick={() => {
                window.location.href = jumpUrl
            }}>
            <img
                src={require("~/assets/arrow-back.svg")}
                height="42px"
                alt=""
            />
        </StyledBack>
    )
}

export default Back
