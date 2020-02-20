import React from "react"
import styled, { css } from "styled-components"

import api from "~/utils/api"
import theme from "~/theme"

import BaseButton from "~/components/Button/BaseButton"
import { createSection } from "~/Contexts/section.actions"
import Flex from "~/components/Flex"
import { toggleSectionOverview } from "~/Contexts/view.actions"

import PlusRedRound from "~/assets/plus-red-round.svg";
import DoubleArrowLeftRed from "~/assets/double-arrow-left-red.svg";
import DoubleArrowLeftWhite from "~/assets/double-arrow-left-white.svg";

const DoubleArrowLeftRedRotated = styled(DoubleArrowLeftRed)`
	transform: rotate(180deg);
`

const Wrapper = styled(Flex)`
	width: 100%;
	background-color: ${props => (props.expanded ? "#455B6A" : "transparent")};
	position: absolute;
	bottom: 0;
	left: 0;
`

const StyledIcon = ({children}) => {
	const Styled = styled.div`
	cursor: pointer;
	margin: 15px;
	width: 24px;
	height: 24px;
	flex-shrink: 0;
	transform: ${props => !props.expanded && "rotate(180deg)"};
	transition: 250ms all ease-in-out;
`
	return (
		<Styled>
			{children}
		</Styled>
	)
}

const AddWrapper = styled.div`
	height: 24px;
	background-color: #fff;
	width: 40px;
	height: 40px;
	border-radius: 18px;
	display: flex;
	justify-content: center;
	align-items: center;
	${props =>
		props.visible
			? css`
					margin: 10px;
			  `
			: css`
					position: absolute;
					top: 0;
					left: 50%;
					transform: translate(-50%, -50%);
			  `}
`

const ExpandButton = ({expanded, onClick}) => {

	const ModifiedBaseButton = Object.assign(BaseButton, onClick)

	if(expanded){
		return (
			<ModifiedBaseButton onClick={onClick}>
				<DoubleArrowLeftWhite />
			</ModifiedBaseButton>)
	} else {
		return (
			<ModifiedBaseButton onClick={onClick}>
				<DoubleArrowLeftRedRotated />
			</ModifiedBaseButton>)
	}
}


const SidebarControls = ({ store, dispatch }) => {
	const {
		sections,
		view: {
			sectionOverviewExpanded: expanded,
			editing
		}
	} = store
	return (
		<Wrapper justifyEnd column={!expanded} alignCenter expanded={expanded}>
			{editing && (
				<AddWrapper visible={!expanded}>
					<BaseButton
						onClick={() => {
							dispatch(createSection(sections.length))
						}}
						redRound={!expanded}
					><PlusRedRound height="49px"/></BaseButton>
				</AddWrapper>
			)}
			<ExpandButton
				expanded={expanded}
				onClick={() => {
					dispatch(toggleSectionOverview())
				}}
			/>
		</Wrapper>
	)
}

export default SidebarControls
