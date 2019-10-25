import React, { useContext, useEffect, useState } from "react"
import qs from "qs"

import api from '~/utils/api'
import config from "~/config"
import UserContext from "~/Contexts/User"
import LessonContext from '~/Contexts/Lesson'
import views from './views'


const useMountEffect = (fun) => useEffect(()=> { fun() }, []);

const Homework = ({ focused, state }) => {
	const { store: userStore } = useContext(UserContext)
	const { store: lessonStore, dispatchLessonStore } = useContext(LessonContext)

	const [loading, setLoading] = useState(true)
	const [requestedHomeworks, setRequestedHomeworks] = useState([])

	const fetchData = async () => {
		try {
			console.log(lessonStore);
			const { _id } = lessonStore.course;
			if (!_id) throw new Error('Course do not exist in lessonStore') 	// todo loading enable if default data exist for view and practice

			setLoading(true)
			const query = qs.stringify({
				courseId: _id,
			});
			const { data: homeworks } = await api.get(config.homeworkUri+'?'+query)
			console.log(homeworks);
			if (!Array.isArray(homeworks)) throw new Error('Homeworks not type of array.')
			
			state.selected.set(0); // todo use from state
			state.title.set(homeworks[state.selected.get()].title)
			state.description.set(homeworks[state.selected.get()].description)

			setRequestedHomeworks(homeworks);
		} catch (err) {
			console.log('Error', err);
			setLoading(false)
		}
	}
	useEffect(() => {
		fetchData() // only trigger if edit view or(?) no data in state exist
	}, [lessonStore.course]);

	if (!loading) {
		const newStore = lessonStore.course = { _id: '0000dcfbfb5c7a3f00bf21ab' }	// todo replace if lesson courseId is added and switch to lessons
		dispatchLessonStore(newStore)
		return views.error()
	} else {
		if (lessonStore.studentView === true) {
			return views.practice(requestedHomeworks[state.selected.get()])
		}
		if (lessonStore.editing === true) {
			return views.edit(requestedHomeworks)
		}
		return views.show(requestedHomeworks[state.selected.get()])
	} 
}

export default Homework