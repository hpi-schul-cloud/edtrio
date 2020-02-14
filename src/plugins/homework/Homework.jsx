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

	const [homeworks, setHomework] = useState([])
	const { store: { course } } = useContext(LessonContext)
	state.color.set(course.color);

	useEffect(() => {
		async function fetchData(){
			const result = await serverApi.get(`${config.HOMEWORK_URI}?courseId=${course._id}`);
			setHomework(result.data);
		}
		fetchData();
	}, [])

	useEffect(() => {
		if(!focused && !state._id.get()){
			console.log("set default state")
			setHomeworkState(state, homeworks[0]);
		}
	}, [focused])

	if (focused){
		return <Edit state={state} homeworks={homeworks} />
	} else {
		return <View state={state} />
	}
}

export default Homework
