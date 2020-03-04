import React, { useContext } from "react"
import styled, { css } from "styled-components"
import Select from 'react-select';
// import Input from "~/components/Input"
import config from "~/config"

import { setVideo } from "./utils"

const videos = [
	{
		title: 'Demo-Video 1',
		uri: 'assets%2Fvideo%2Ftest.mp4'
	},
	{
		title: 'Demo-Video 2',
		uri: 'https://www.youtube.com/watch?v=QHLJERDWW5s'
	},
	{
		title: 'Demo-Video 3',
		uri: 'https://www.youtube.com/watch?v=nS4a_bTv5_Y'
	},
]

const videoUri = ''

const Container =styled.div`
	flex-grow: 2;
	display: flex;
	flex-direction: column;
	margin-right: 10px;

	& label{
		font-size: 0.875rem;
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

const WidthSelect = styled.div`
width: 60%;
display: flex;
flex-direction:row;
align-items: center;

// @media (max-width: ${config.breakpoints.tablet + 'px'}) {
// 	width: 100%;
// }

// `

const switchSelected = (state) => (selected) => {
	const video = videos.find((video) => selected.value === video.title)
	setVideo(state,video);
}

const getSelectedOption = (state, options) => {
	const current = state.videoTitle.get() || ''
	if(!current) return []
	return options.find(({value}) => current === value) || {}
}

const createOptions = () => videos
	.map(video => ({value: video.title, label: video.title}))

// const setUri = (state, uri) => {
// 	videoUri = uri;
// 	state.uri.set(uri);
// }


const Edit = ({ state }) => {
	const options = createOptions();

	return (
		<Container>
			<label className="label">
				Lichtblick (Demo)
			</label>
			<WidthSelect>
				<Select styles={customStyles}
					value={getSelectedOption(state, options)}
					onChange={switchSelected(state)}
					options={options}
					placeholder={'Wähle ein Demo-Video aus'}
					label={'Demo-Video'}
				/>
			</WidthSelect>
		</Container>
	)

	// videoUri = state.uri.get();

	// return (
	// 	<Container>
	// 		<label className="label">
	// 			Video-URL:
	// 		</label>
	// 		<Input value={videoUri} onChange={newValue => setUri(state,newValue)} />
	// 	</Container>
	// )
}

export default Edit
