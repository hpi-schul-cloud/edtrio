import React from "react"
import styled, { css } from "styled-components"

const Container = styled.div`
    padding: 25px calc((100vw - 995px) / 2); /* // TODO take schul-cloud sidebar into account */

    @media (max-width: 1035px) {
        padding: 25px 20px;
    }

    @media (max-width: 640px) {
        padding: 20px 14px;
    }

    @media (max-width: 480px) {
        padding: 15px 10px;
    }

    ${props =>
        props.small &&
        css`
            padding: 15px !important;
        `}

    ${props =>
        props.full &&
        css`
            padding-left: 0 !important;
            padding-right: 0 !important;
        `}
    ${props =>
        props.fullVertical &&
        css`
            padding-top: 0 !important;
            padding-bottom: 0 !important;
        `};
`

export default Container
