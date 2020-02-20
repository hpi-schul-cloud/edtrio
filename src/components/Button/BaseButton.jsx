import React, { useContext } from "react"
import color from "color"
import styled, { css } from "styled-components"

import theme from "~/theme"

export { default as Toggle } from "./Toggle"

const StyledButton = styled.button`
	height: ${props => props.theme.height || '48px'};
	background: ${props => props.theme.background || 'none'};
	border: ${props => props.theme.border || 'none'};
	cursor: pointer;

	${props => props.padding ? css`padding: ${props.widht};` : css`padding: 5px 10px;` }
	${props => props.width ? css`width: ${props.width};` : css`` }

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
