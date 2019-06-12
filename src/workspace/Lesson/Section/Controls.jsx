import React from "react"
import styled, { css } from "styled-components"

import Flex from "~/components/Flex"
import Action from "~/components/Action"
import Container from "~/components/Container"

const StyledAction = styled(Action)`
    ${props =>
        props.disabled &&
        css`
            opacity: 0.6;
            pointer-events: none;
            cursor: not-allowed;

            &:hover {
                text-decoration: none;
            }
        `}
`

const Controls = ({ dispatch, prevId, nextId }) => {
    return (
        <Container full style={{ marginTop: 150 }}>
            <Flex justifyBetween>
                <StyledAction
                    clickable
                    disabled={!prevId}
                    onClick={() => {
                        prevId &&
                            dispatch({
                                type: "SET_ACTIVE_SECTION",
                                payload: { id: prevId },
                            })
                    }}>
                    Vorheriger Abschnitt
                </StyledAction>
                <StyledAction
                    clickable
                    disabled={!nextId}
                    onClick={() => {
                        nextId &&
                            dispatch({
                                type: "SET_ACTIVE_SECTION",
                                payload: { id: nextId },
                            })
                    }}>
                    Nächster Abschnitt
                </StyledAction>
            </Flex>
        </Container>
    )
}

export default Controls
