import React, { useState, useEffect, useContext } from "react"
import shortid from "shortid"
import styled, { css } from "styled-components"

import Select from 'react-select';

import LessonContext from "~/Contexts/Lesson.context"
import config from "~/config"
import Input from "~/components/Input"
import Flex from "~/components/Flex"
import { serverApi } from "~/utils/api";

const StyledHomework = styled.div`
    display: flex;
    flex-direction: row;


`

const StyledIcon = styled.div`
    background: url(${require("./assets/oval.svg")}) no-repeat #333;

    img{
        position: absolut;
        margin: auto;
    }
`

const switchSelected = (state, homeworks) => (selected) => {
	const homework = homeworks.find(({_id}) => selected.value === _id);
	state.color.set(homework.color);
	state.title.set(homework.title);
	state._id.set(homework._id);
	state.link.set(homework.link);
}

const createOptions =
    (homeworks) => homeworks
    	.map(homework => ({value: homework._id, label: homework.name}));


const Homework = ({ focused, state }) => {

	const { store: { course } } = useContext(LessonContext)

	const [homeworks, setHomework] = useState([])

	useEffect(async () => {
		const result = await serverApi.get(`${config.HOMEWORK_URI}?courseId=${course._id}`)
		setHomework(result.data)
	}, [])

	const { store, dispatch } = useContext(LessonContext)
	return (
		<StyledHomework>
			<StyledIcon><img src={require("./assets/tasks.svg")} /></StyledIcon>
			<Select
				onChange={switchSelected(state, homeworks)}
				options={createOptions(homeworks)}
			/>
			<a><img src={require("./assets/open-new-window.svg")} /></a>
		</StyledHomework>
	)
}

export default Homework
