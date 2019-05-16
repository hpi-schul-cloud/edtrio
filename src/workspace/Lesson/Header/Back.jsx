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
    return (
        <StyledBack
            alignCenter
            justifyCenter
            onClick={() => {
                window.location.href = window.location.href.replace(
                    "?edtr=true",
                    "",
                )
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
