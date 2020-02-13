import React, { useContext, useEffect, useState } from "react"
import styled, { css } from "styled-components"

import LessonContext from "~/Contexts/Lesson.context"

import Flex from "~/components/Flex"
import Text from "~/components/Text"
import { Toggle } from "~/components/Button"

import Back from "./Back"
import BreadCrumbs from "./BreadCrumbs"
import Settings from "./Settings"
import { setEditing } from "~/Contexts/view.actions"

const StyledHeader = styled(Flex)`
    position: fixed;
    left: 0;
    top: 0;
    background-color: #fff;
    width: 100vw;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.18);
    z-index: 3;

    &:hover .save-status {
        ${props =>
		props.editing &&
            css`
                opacity: 1 !important;
            `}
    }
`

const SaveStatus = styled(Text)`
    color: rgb(180, 180, 180);
    margin-right: 25px;
`

const hasPermission = (sections = [], sectionId = '') => {
	const section = sections.find(s => s._id.toString() === sectionId.toString()) || {};
	return section.scopePermission === 'write';
}

const Header = () => {
	const { store, dispatch } = useContext(LessonContext)
	const [showSaveStatus, setShowSaveStatus] = useState(false)

	const {
		notifications:{
			saveStatus,
		},
		view: {
			editing,
			studentView,
			activeSectionId,
		},
		sections
	} = store

	// TODO: do not work re-implement
	useEffect(() => {
		let timeout
		if (saveStatus === "Ungesicherte Änderungen")
			return setShowSaveStatus(true)
		if (
			saveStatus === "Gespeichert" ||
            saveStatus === "Lokal Gespeichert"
		)
			timeout = setTimeout(() => setShowSaveStatus(false), 1500)

		return () => clearTimeout(timeout)
	}, [saveStatus])

	const editPermission = hasPermission(sections, activeSectionId);
	const showEditToggle = editPermission && !studentView;
	// TODO: is disabled for the moment
	const enabled = false;

	return (
		<StyledHeader noWrap justifyBetween alignCenter editing={editing}>
			<Flex alignCenter>
				<Back />
				<BreadCrumbs store={store} dispatch={dispatch} />
			</Flex>

			<Flex alignCenter noWrap>
				{enabled && (<SaveStatus
					noMargin
					className="save-status"
					inline
					style={{
						textAlign: "right",
						width: "185px",
						opacity: showSaveStatus ? 1 : 0,
						transition: "250ms all ease-in-out",
					}}>
					{saveStatus}
				</SaveStatus>)}
				{showEditToggle && (
					<Toggle
						caption="Präsentieren"
						activeCaption="Bearbeiten"
						active={editing}
						onChange={(newValue) => {
							dispatch(setEditing(newValue))
						}}
					/>
				)}
				<Settings store={store} dispatch={dispatch} />
			</Flex>
		</StyledHeader>
	)
}

export default Header
