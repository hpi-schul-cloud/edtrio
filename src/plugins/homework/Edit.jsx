import React, { useContext } from "react"
import styled, { css } from "styled-components"

import Select, { NonceProvider } from 'react-select';
import TaskIcon from '~/components/TaskIcon';

import LessonContext from "~/Contexts/Lesson.context"
import { setHomeworkState } from "./utils"
import config from "~/config"

const StyledHomework = styled.div`
	width: 100%;
  display: flex;
	flex-direction: row;
	justify-content: space-between;
	min-height: 7rem;
	flex-wrap: wrap;
	align-items: center;

	& small{
		font-size: 1rem;
	}

`
const Container =styled.div`
	flex-grow: 2;
	display: flex;
	flex-direction: column;
	margin-right: 10px;

	& date {
		font-size: 0.875rem;
	}
	& label{
		font-size: 0.875rem;
	}
`
const WidthSelect = styled.div`
width: 60%;
display: flex;
flex-direction:row;
align-items: center;

@media (max-width: ${config.breakpoints.tablet + 'px'}) {
	width: 100%;
}

`

const customStyles = {
	container: provided => ({
		...provided,
		width: '100%',
		marginRight:'0.694rem',
		fontSize: '1rem',
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
			<TaskIcon color={state.color.get()}/>
			<Container>
				<label className="label">
					Aufgabe
				</label>
				<WidthSelect>
					<Select styles={customStyles}
						value={getSelectedOption(state, options)}
						onChange={switchSelected(state, homeworks)}
						options={options}
						placeholder={'Wähle eine Aufgabe aus'}
						label={'Aufgabe'}
					/>
					<a href={state.link.get()} ><img src={require("./assets/open-new-window.svg")} /></a>	
				</WidthSelect>
				{
					dueDate
					&& <date className="date">bis: {new Date(dueDate).toLocaleDateString('de-DE')}</date>
				}
			</Container>
		</StyledHomework>
		
	)
}

export default Edit