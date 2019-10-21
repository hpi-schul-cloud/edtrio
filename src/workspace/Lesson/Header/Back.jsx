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
    const currentBaseURL = (/^((https|http):\/\/[\w\d:.-]+)/.exec(currentUrl) || [])[0]
    const last = window.history.length - 1

    const posibleUrls = window.history.slice(-10, 10).filter((url) => (new RegExp(`^${currentBaseURL}`).test(url)))

    let jumpUrl = 'https://schul-cloud.org'

    if(posibleUrls.length === 0){
        const regexResult = /courses\/([a-f0-9]{24})\/topics\/([a-f0-9]{24})/.exec(currentUrl)
        jumpUrl = regexResult[1] || jumpUrl
    }else{
        jumpUrl = posibleUrls[posibleUrls.length-1]
    }

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
