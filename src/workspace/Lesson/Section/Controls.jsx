import React from "react"
import styled, { css } from "styled-components"

import Flex from "~/components/Flex"
import Action from "~/components/Action"
import Container from "~/components/Container"
import { setActiveSection } from "~/Contexts/view.actions"

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
		<Container full style={{ marginTop: 150, width: "100%" }}>
			<Flex justifyBetween>
				<StyledAction
					clickable
					disabled={!prevId}
					onClick={() => {
						prevId &&
                            dispatch(setActiveSection(prevId))
					}}>
                    ❮&nbsp;&nbsp;Vorheriger Abschnitt
				</StyledAction>
				<StyledAction
					clickable
					disabled={!nextId}
					onClick={() => {
						nextId &&
                            dispatch(setActiveSection(nextId))
					}}>
                    Nächster Abschnitt&nbsp;&nbsp;❯
				</StyledAction>
			</Flex>
		</Container>
	)
}

export default Controls
