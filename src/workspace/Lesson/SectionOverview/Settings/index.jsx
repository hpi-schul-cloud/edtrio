import React, { useContext, useState } from "react"

import styled, { css } from "styled-components"

import LessonContext from "~/Contexts/Lesson.context"

import Flex from "~/components/Flex"
import previewIcon from "~/assets/preview-white.svg"
import noPreviewIcon from "~/assets/no-preview-white.svg"
import TrashIcon from "~/assets/trash-white.svg"
import duplicateIcon from "~/assets/duplicate-white.svg"
import shareIcon from "~/assets/share-white.svg"
import infoIcon from "~/assets/info-white.svg"
import CloseIcon from "~/assets/close-white.svg"
import Heading from "~/components/Heading"
import Text from "~/components/Text"
import Button from "~/components/Button"

import ModalActions from "~/components/Modals"
import { switchSectionVisibility, removeSection } from "~/Contexts/section.actions"
import { toggleSectionSettings } from "~/Contexts/view.actions"
import BaseButton from "~/components/Button/BaseButton"
import { colors } from "react-select/src/theme"


const Wrapper = styled(Flex)`
    background-color: #455b6a;
    width: 100vw;
		position: fixed;
		justify-content: space-between;
    left: 0;
    top: 55px;
    padding: 10px 15px;
    z-index: 6;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.18);
`

const buttonTheme = {
	height: "24px",
	padding: "none",
}
const Icon = styled.img`
    cursor: pointer;
    margin-right: 25px;

    &:last-child {
        margin-right: 0;
    }

    /* ${props =>
		!props.visible &&
		css`
            display: none;
        `} */

    ${props => {
		return (
			props.isOnly && // only one section
			css`
                cursor: not-allowed;
                user-select: none;
                opacity: 0.5;
                &:active {
                    cursor: not-allowed;
                }
            `
		)
	}}
`

const TrashButton = ({inactive = false, onClick}) => {
	if(inactive) return (
		<TrashIcon height={buttonTheme.height} color="#333" />
	)
	return (
		<BaseButton
			onClick={onClick}
			theme={buttonTheme}
		>
			<TrashIcon />
		</BaseButton>
	)
}


const Settings = () => {
	const { store, dispatch } = useContext(LessonContext)
	const activeSectionId = store.view.activeSectionId
	const activeSection = store.sections.find(
		el => el._id === activeSectionId,
	)
	const activeSectionIndex = store.sections.findIndex(
		el => el._id === activeSectionId,
	)

	const isOnly = store.sections.length === 1
	const [isOpen, setOpen] = useState(false)

	async function confirmDelete() {
		setOpen(false)
		dispatch(removeSection(activeSectionId))
	}
	if (!store.view.showSectionSettings) return null


	return (

		<Wrapper>
			<Flex noWrap>
				{/*
					<Icon src={duplicateIcon} />
					<Icon src={shareIcon} />
					<Icon src={infoIcon} />
					*/}
				<ModalActions
					open={isOpen}
					actions={
						Button({
							children: ['Löschen'],
							onClick: confirmDelete
						})
					}
					onClose={() => setOpen(false)}
				>
					<Heading h3>
						&quot;{activeSection.title || `Abschnitt ${activeSectionIndex + 1}`}&quot; löschen
					</Heading>
					<Text size={20}>
						{
							`Bist du dir sicher, dass du diesen Abschnitt
							löschen möchtest? Du kannst dies nicht
							rückgängig machen.`
						}
					</Text>
				</ModalActions>{/* // show / hide section
					// <Icon
					// 	src={
					// 		activeSection.visible ? previewIcon : noPreviewIcon
					// 	}
					// 	onClick={() => dispatch(switchSectionVisibility(activeSectionId))}
					// 	visible
					// />
					*/}

				<TrashButton
					inactive={isOnly}
					onClick={() => setOpen(true)}
				/>
			</Flex>
			<BaseButton theme={buttonTheme} noWrap>
				<CloseIcon
					onClick={() => {
						dispatch(toggleSectionSettings())
					}}
				/>
			</BaseButton>
		</Wrapper>

	)
}

export default Settings
