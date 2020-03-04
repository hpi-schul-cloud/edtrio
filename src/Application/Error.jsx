import React, { useContext } from "react"
import styled, { keyframes } from "styled-components"

import Flex from "~/components/Flex"

import LessonContext from "~/Contexts/Lesson.context"

import RemoveIcon from "~/assets/remove.svg"
import BaseButton from "~/components/Button/BaseButton"

const slideIn = keyframes`
    from {
        transform: translateX(-50%) translateY(-100%);
        opacity: 0;
    }

    to {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
    }
`

const ErrorWrapper = styled.div`
    background-color: #ffcccc;
    padding: 7px 10px;
    position: fixed;
    top: 75px;
    left: 50%;
    transform: translateX(-50%);
    animation: ${slideIn} 500ms ease-in-out 1;

    width: ${props => {
		if (props.width) return props.width
		if (props.full) return "100%"
		return "auto"
	}};

    max-width: 250px;

    z-index: 13713;
`

const Error = () => {
	const { store, dispatch } = useContext(LessonContext)
	if (!store.notifications.error.length) return null
	return (
		<ErrorWrapper onClick={() => dispatch({ type: "ERROR", payload: "" })}>
			<Flex inline alignCenter noWrap>
				{store.notifications.error}
				<BaseButton><RemoveIcon width="16px" /></BaseButton>
			</Flex>
		</ErrorWrapper>
	)
}

export default Error
