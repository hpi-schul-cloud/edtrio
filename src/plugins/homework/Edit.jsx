import React, { useContext } from "react"
import styled, { css } from "styled-components"

import Select from 'react-select';
import TaskIcon from '~/components/TaskIcon';

import LessonContext from "~/Contexts/Lesson.context"
import { setHomeworkState } from "./utils"

const StyledHomework = styled.div`
    display: flex;
    flex-direction: row;


`

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
	return (
		<StyledHomework>
			<TaskIcon />
			<Select
				value={getSelectedOption(state, options)}
				onChange={switchSelected(state, homeworks)}
				options={options}
			/>
			<a href={state.link.get()}><img src={require("./assets/open-new-window.svg")} /></a>
		</StyledHomework>
	)
}

export default Edit