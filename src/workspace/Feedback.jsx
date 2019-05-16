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
    z-index: 9999999;

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
            <StyledLink href="mailto:konstantin.kaiser@schul-cloud.org@hpi.de?subject=Mein%20Feedback%20zum%20neuen%20Themen-Werkzeug&amp;body=Liebes%20Schul-Cloud-Team%2C%0A%0AHier%20kommt%20mein%20Feedback%20zum%20neuen%20Editor.%0A%0ADas%20hat%20gut%20funktioniert%3A%0A%0A%0AHier%20hatte%20ich%20Probleme%3A%0A%0A%0ADiese%20Funktion%20w%C3%BCnsche%20ich%20mir%20am%20meisten%3A%0A%0A%0A">
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
