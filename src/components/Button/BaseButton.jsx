import React, { useContext } from "react"
import color from "color"
import styled, { css } from "styled-components"

import theme from "~/theme"

export { default as Toggle } from "./Toggle"

const StyledButton = styled.button`
	height: ${props => props.theme.height || '48px'};;
	background: ${props => props.theme.background || 'none'};
	border: ${props => props.theme.border || 'none'};
	padding: 5px 10px;

	svg, img {
		height: 100%;
	}
`

const BaseButton = ({ styles, children, onClick = () => {}, ...props }) => {
	return (
		<StyledButton className="button" onClick={props.disabled ? () => {} : onClick} {...props}>
			{children}
		</StyledButton>
	)
}

export default BaseButton
