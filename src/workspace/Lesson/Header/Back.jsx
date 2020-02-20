import React from "react"
import styled from "styled-components"

import Flex from "~/components/Flex"
import ArrowIcon from "~/assets/arrow-back.svg"

const StyledBack = styled(Flex)`
    background-color: #af0437;
    padding: 10px;
    height: 100%;
    cursor: pointer;
`

const Back = () => {
    const currentUrl = window.location.href
    const currentBaseURL = (/^((https|http):\/\/[\w\d:.-]+)/.exec(currentUrl) || [])[0]
    const regexResult = /courses\/([a-f0-9]{24})\/topics\/([a-f0-9]{24})/.exec(currentUrl)
    let jumpUrl = '/';

    if (Array.isArray(regexResult) && regexResult[1]) {
        jumpUrl = `${currentBaseURL}/courses/${regexResult[1]}`
    }

	return (
		<StyledBack
			alignCenter
			justifyCenter
			onClick={() => {
				window.location.href = jumpUrl
			}}>
			<ArrowIcon height="42px"/>
		</StyledBack>
	)
}

export default Back
