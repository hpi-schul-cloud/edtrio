import React, { useContext } from "react"
import color from "color"
import styled, { css } from "styled-components"

import theme from "~/theme"

const StyledButton = styled.button`
	height: ${props => props.theme.height || '48px'};
	background: ${props => props.theme.background || 'none'};
	border: ${props => props.theme.border || 'none'};
	cursor: pointer;

	${props => props.theme.padding ? css`padding: ${props.theme.padding};` : css`padding: 5px 10px;` }
	${props => props.theme.width ? css`width: ${props.theme.width};` : css`` }

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
