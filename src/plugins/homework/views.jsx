import React from "react"
import { VueWrapper  } from 'vuera'
import CustomButton from 'sc-component-lib'

const error = (err = '') => {
	return <div>  
		Error, can not load homeworks {err}
	</div>
}

const edit = (array) => {
	return <div>
		<VueWrapper
			component={CustomButton}
		></VueWrapper>
		<ul>
			{array.map(h => <li key={h.name}> {h.name}></li>)}
		</ul>
	</div>
}

const show = (element = {}) => {
	const name = element.name || '';
	let description = element.description || '';
	description = description.slice(0, 120);
	return <p>
		Aufgabe<br></br>
		<b>{name}</b><br></br>
		<i>{description}</i>
	</p>
}

const practice = (element = {}) => {
	const name = element.name || '';

	return <div>
		<a href="http://localhost:3100/homework/59cce3f6c6abf042248e888d">{name}</a> 
	</div>
}

export default {
	error,
	edit,
	show,
	practice,
}