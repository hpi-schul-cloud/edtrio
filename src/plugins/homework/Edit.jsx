import React, { useContext } from "react"
import styled, { css } from "styled-components"

import Select, { NonceProvider } from 'react-select';
import TaskIcon from '~/components/TaskIcon';

import LessonContext from "~/Contexts/Lesson.context"
import { setHomeworkState } from "./utils"

const StyledHomework = styled.div`
    display: flex;
		flex-direction: row;
		align-items: center;
		min-height: 6rem;
`

const customStyles = {
	container: provided => ({
		...provided,
		width: '100%',
		marginRight: '10px',

	})
};

const switchSelected = (state, homeworks) => (selected) => {
	const homework = homeworks.find(({_id}) => selected.value === _id);
	setHomeworkState(state, homework)
}

const getSelectedOption = (state, options) => {
	const current = state._id.get();
	if(!current) return [];
	return options.find(({value}) => current === value) || {};
}

const createOptions =
    (homeworks) => homeworks
    	.map(homework => ({value: homework._id, label: homework.name}));


const Edit = ({ state, homeworks}) => {
	const { store: { course } } = useContext(LessonContext)

	const options = createOptions(homeworks)
	const dueDate = state.dueDate.get()
	return (
		<StyledHomework>
			<TaskIcon />
			<Select styles={customStyles}
				value={getSelectedOption(state, options)}
				onChange={switchSelected(state, homeworks)}
				options={options}
				placeholder={'Wähle eine Aufgabe aus'}
				label={'Aufgabe'}
			/>
			<a href={state.link.get()}><img src={require("./assets/open-new-window.svg")} /></a>
			{
				dueDate
				&& <small>bis: {new Date(dueDate).toLocaleDateString('de-DE')}</small>
			}
		</StyledHomework>
	)
}

export default Edit