import React from "react"

import styled, { keyframes } from "styled-components"
import Button from "~/components/Button"

const StyledLink = styled.a`
    &::after {
        display: none;
    }
`

const anim = keyframes`
    0% {
        transform: scale(0.85);
        opacity: 0.8;
    }
    
    50% {
        transform: scale(1.05);
        opacity: 1;
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
`

const FeedbackBtn = styled(Button)`
    position: fixed;
    bottom: 50px;
    right: 50px;
    animation-name: ${anim};
    animation-play-state: running;
    animation-duration: 1000ms;
    animation-iteration-count: 5;
    animation-direction: alternate;
    animation-timing-function: ease-in-out;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2), 0 3px 6px rgba(0, 0, 0, 0.36);
    background-color: #f6a800;
    border-color: #f6a800;

    &:hover,
    &:focus,
    &:visited,
    &:active {
        background-color: #f6a800;
        border-color: #f6a800;
    }
`

const BackBtn = styled(Button)`
    position: fixed;
    bottom: 50px;
    left: 1px;
    margin: 0;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2), 0 3px 6px rgba(0, 0, 0, 0.36);
`

const Feedback = () => {
    return (
        <React.Fragment>
            <StyledLink href="mailto:konstantin.kaiser@hpi.de?subject=Feedback%20zum%20neuen%20Editor&amp;body=Hallo Konstantin, euer neuer Editor ist super!">
                <FeedbackBtn>Gib uns Feedback!</FeedbackBtn>
            </StyledLink>
            <BackBtn
                onClick={() => {
                    window.location.href = window.location.href.replace(
                        "?edtr=true",
                        "",
                    )
                }}>
                Zurück zum normalen Editor
            </BackBtn>
        </React.Fragment>
    )
}

export default Feedback
