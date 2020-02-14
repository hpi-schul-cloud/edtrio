import React, { useState, useEffect, useContext } from "react"
import shortid from "shortid"
import styled, { css } from "styled-components"

import Select from 'react-select';

import LessonContext from "~/Contexts/Lesson.context"
import config from "~/config"
import Input from "~/components/Input"
import Flex from "~/components/Flex"
import { serverApi } from "~/utils/api";

import Edit from "./Edit"
import View from "./View"
import { setHomeworkState } from "./utils";

const Homework = ({ focused, state }) => {
	console.log("Homework ist loaded")
	const [homeworks, setHomework] = useState([])
	const { store: { course } } = useContext(LessonContext)

	useEffect(() => {
		state.color.set(course.color);
		async function fetchData(){
			const result = await serverApi.get(`${config.HOMEWORK_URI}?courseId=${course._id}`);
			setHomework(result.data);
		}
		fetchData();
	}, [])

	useEffect(() => {
		if(!focused && !state._id.get() && homeworks.length !== 0){
			console.log("defaults are loaded")
			setHomeworkState(state, homeworks[0]);
		}
	}, [focused, homeworks])

	if (focused){
		return <Edit state={state} homeworks={homeworks} />
	} else {
		return <View state={state} />
	}
}

export default Homework
