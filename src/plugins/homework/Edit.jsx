import React, { useState, useEffect, useContext } from "react"
import shortid from "shortid"
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
	console.log("homework", selected)
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
	console.log('loaded edit with', homeworks)
	const { store: { course } } = useContext(LessonContext)

	const options = createOptions(homeworks)
	console.log(getSelectedOption(state, options))
	const { store, dispatch } = useContext(LessonContext)
	return (
		<StyledHomework>
			<TaskIcon />
			<Select
				selectedOption={getSelectedOption(state, options)}
				onChange={switchSelected(state, homeworks)}
				options={options}
			/>
			<a href={state.link.get()}><img src={require("./assets/open-new-window.svg")} /></a>
		</StyledHomework>
	)
}

export default Edit