import React, { useContext, useRef, useState } from "react"
import styled, { css } from "styled-components"

import LessonContext from "~/Contexts/Lesson.context"

import Flex from "~/components/Flex"
import Text from "~/components/Text"
import Container from "~/components/Container"

import Editor from "./Editor"
import Controls from "./Controls"
import { updateSectionDocValue } from "~/Contexts/section.actions"

const StyledSection = styled(Flex)`
	transition: 250ms all ease-in-out;
	${props =>
		props.delete &&
		css`
			transform: translateX(500px);
			opacity: 0;
		`}
	${props =>
		props.sectionOverviewExpanded
			? css`
					margin-left: 250px;
			  `
			: css`
					margin-left: 55px;
			  `}
`

const Wrapper = styled.div`
	flex-shrink: 1;
	flex-grow: 1;
	max-width: 850px;
	width: 100%;

	/* box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23); */
	background-color: #fff;
	border-radius: 5px;
	transition: 250ms margin ease-in-out;
`
/*
const SectionInput = styled(Input)`
	font-weight: 700;
	margin-left: 25px;
	margin-right: 25px;
	margin-right: 25px;
	width: calc(100% - 50px);
	font-family: "PT Sans Narrow", sans-serif;
`
*/
const Warning = styled(Text)`
	width: auto;
	max-width: 850px;
	padding: 15px;
	background-color: #cc0000;
	color: #fff;
	margin-bottom: 25px;
`

const getSectionData = (store, sectionId = '') => {
	const index = store.sections.findIndex(s => s._id === sectionId)
	if (index === -1) {
		return [null, index];
	}
	return [store.sections[index], index];
}

const Section = () => {
	const { store, dispatch } = useContext(LessonContext)
	const sectionRef = useRef(null)

	const [timeout, setTimeoutState] = useState(null)
	const onChange = ({changed, getDocument}) => {
		if (timeout) {
			clearTimeout(timeout);
			setTimeoutState(null)
		}

		setTimeoutState(setTimeout(() => {
			setTimeoutState(null)
			dispatch(updateSectionDocValue(store.view.activeSectionId, getDocument()))
		}, 250))
	}
	const [section, index] = getSectionData(store, store.view.activeSectionId)

	if (!store.view.activeSectionId || index === -1) {
		// TODO: notifcation and set new section
		const text = index === -1 ?  'Der Abschnitt existiert nicht.' : 'Kein Abschnitt ausgewählt.'
		return (
			<Container>
				<Flex>
					<Text center>{text}</Text>
				</Flex>
			</Container>
		)
	}
	
	// TODO: useEffect error

	// TODO: controls get section id as prop an fetch all other data
	// TODO: how to use section.delete at this position?

	return (
		<StyledSection
			column
			delete={section.delete}
			alignCenter
			sectionOverviewExpanded={store.view.sectionOverviewExpanded}
			data-section={index}
			className="lesson-section"
			ref={sectionRef}>
			<Flex justifyCenter>
				<Warning center bold>
                    +++ Beta-Testversion +++ wir freuen uns über Feedback 🙂 +++
				</Warning>
			</Flex>
			<Wrapper>
				<Editor
					key={store.view.activeSectionId}
					section={section}
					editing={store.view.editing}
					onChange={onChange}
				/>
				<Controls
					dispatch={dispatch}
					prevId={
						index - 1 >= 0 && store.sections[index - 1]._id
					}
					nextId={
						index + 1 < store.sections.length &&
                        store.sections[index + 1]._id
					}
				/>
			</Wrapper>
		</StyledSection>
	)
}

export default Section
