import React, { useState, useEffect, useContext } from "react"

import LessonContext from "~/Contexts/Lesson.context"
import config from "~/config"
import { serverApi } from "~/utils/api";

import EditMode from "./EditMode"
import ViewMode from "./ViewMode"
import { setHomeworkState } from "./utils";

const Homework = ({ focused, state, editable }) => {
	const [homeworks, setHomework] = useState([])
	const { store: { course, view } } = useContext(LessonContext)

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
			setHomeworkState(state, homeworks[0]);
		}
	}, [focused, homeworks])

	if (focused){
		return <EditMode state={state} homeworks={homeworks} />
	} else {
		return <ViewMode state={state} editing={editable}/>
	}
}

export default Homework
