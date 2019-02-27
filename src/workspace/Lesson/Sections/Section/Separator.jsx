import React from "react"

import styled, { css } from "styled-components"

import Flex from "~/components/Flex"
import Button from "~/components/Button"

const SeparatorWrapper = styled(Flex)`
    align-self: stretch;
    height: 100px;
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
    transform: translate(-50%, -50%);
    ${props =>
        props.small &&
        css`
            width: 26px;
            height: 26px;
            border-radius: 13px;
            padding: 0;
        `}
`

const Separator = ({ index, isFirst, isLast, dispatch, editing }) => {
    const content =
        isFirst || isLast ? (
            "Neuer Abschnitt"
        ) : (
            <img
                src={require("~/assets/add-white.svg")}
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    height: 20,
                }}
                alt=""
            />
        )

    return (
        <SeparatorWrapper justifyCenter>
            <StyledSeparator hide={isFirst || isLast}>
                {editing && (
                    <SeparatorButton
                        small={!isFirst && !isLast}
                        onClick={() =>
                            dispatch({
                                type: "ADD_SECTION",
                                payload: isFirst ? -1 : index,
                            })
                        }
                        noMargin>
                        {content}
                    </SeparatorButton>
                )}
            </StyledSeparator>
        </SeparatorWrapper>
    )
}

export default Separator
