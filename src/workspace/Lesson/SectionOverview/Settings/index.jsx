import React, { useContext } from "react"
import { Portal } from "react-portal"
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

import DeleteModal from "./DeleteModal"
import { editorWS } from "~/utils/socket"
import { switchSectionVisibility , removeSection } from "~/Contexts/section.actions"
import { toggleSectionSettings } from "~/Contexts/view.actions"
import BaseButton from "~/components/Button/BaseButton"


const Wrapper = styled(Flex)`
    background-color: #455b6a;
    width: 100vw;
    position: fixed;
    left: 0;
    top: 55px;
    padding: 10px 15px;
    z-index: 6;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.18);
`

const buttonTheme = {
	height: "28px",
	padding: "1px",
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

	async function confirmDelete() {
		dispatch(removeSection(activeSectionId))
	}

	if (!store.view.showSectionSettings) return null

	return (
		<Portal>
			<Wrapper justifyBetween>
				<Flex noWrap>
					{/*
					<Icon src={duplicateIcon} />
					<Icon src={shareIcon} />
					<Icon src={infoIcon} />
					*/}
					<DeleteModal
						sectionTitle={
							activeSection.title ||
                            `Abschnitt ${activeSectionIndex + 1}`
						}
						confirmDelete={confirmDelete}
						renderIcon={openModal => {
							return (
								<BaseButton
									onClick={e => !isOnly && openModal(e)}
									theme={buttonTheme}
								>
									<TrashIcon/>
								</BaseButton>
							)
						}}
					/>{/* // show / hide section
					<Icon
						src={
							activeSection.visible ? previewIcon : noPreviewIcon
						}
						onClick={() => dispatch(switchSectionVisibility(activeSectionId))}
						visible
					/>
					*/}
				</Flex>
				<BaseButton theme={buttonTheme} noWrap>
					<CloseIcon
						onClick={() => {
							dispatch(toggleSectionSettings())
						}}
					/>
				</BaseButton>
			</Wrapper>
		</Portal>
	)
}

export default Settings
