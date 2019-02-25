import React from "react"

import styled, { css } from "styled-components"

import Flex from "~/components/Flex"
import Button from "~/components/Button"

const SeparatorWrapper = styled(Flex)`
    align-self: stretch;
    height: 100px;

    &:hover .separator-button {
        opacity: 1;
    }
`

const StyledSeparator = styled.div`
    width: 3px;
    height: 100%;
    border-radius: 1px;
    background-color: ${props =>
        props.hide ? "transparent" : "rgb(200, 200, 200)"};
    position: relative;
`

const SeparatorButton = styled(Button)`
    position: absolute;
    top: 50%;
    left: 50%;
    opacity: 0;
    transform: translate(-50%, -50%);
`

const Separator = ({ index, isFirst, isLast, dispatch, editing }) => {
    return (
        <SeparatorWrapper justifyCenter>
            <StyledSeparator hide={isFirst || isLast}>
                {editing && (
                    <SeparatorButton
                        className="separator-button"
                        onClick={() =>
                            dispatch({
                                type: "ADD_SECTION",
                                payload: isFirst ? -1 : index,
                            })
                        }
                        noMargin>
                        Neuer Abschnitt
                    </SeparatorButton>
                )}
            </StyledSeparator>
        </SeparatorWrapper>
    )
}

export default Separator
