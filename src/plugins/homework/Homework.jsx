import React, { useContext, useEffect, useState } from "react"
import { VueInReact } from 'vuera'
import qs from "qs"

import api from '~/utils/api'
import config from "~/config"
import UserContext from "~/Contexts/User"
import LessonContext from '~/Contexts/Lesson'
import views from './views'
import BaseSelectVue from "../../componentsVue/BaseButton.vue"

const useMountEffect = (fun) => useEffect(()=> { fun() }, []);

const Homework = ({ focused, state }) => {
	const { store: userStore } = useContext(UserContext)
	const { store: lessonStore } = useContext(LessonContext)

	const [loading, setLoading] = useState(true)
	const [requestedHomeworks, setRequestedHomeworks] = useState([])
	// const BaseSelectComponent = VueInReact(BaseSelectVue)

	const bootstrap = async () => {
		try {
			const query = qs.stringify({
				
			});
			const { data: homeworks } = await api.get(config.homeworkUri+'?'+query)
			if (!Array.isArray(homeworks)) {
				throw new Error('Homeworks not type of array.')
			}
			state.selected.set(0); // todo use from state
			state.title.set(homeworks[state.selected.get()].title)
			state.description.set(homeworks[state.selected.get()].description)

			setRequestedHomeworks(homeworks);
		} catch (err) {
			console.log('Error', err);
			setLoading(false)
		}
	}	
	useMountEffect(bootstrap);
	
	// todo get homework permissions and resort modi
	
	if (!loading) {
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