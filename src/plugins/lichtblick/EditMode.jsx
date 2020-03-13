import React, { useContext } from "react"
import styled, { css } from "styled-components"
import Select from 'react-select';

import { setVideo } from "./utils"

const videos = [
	{
		title: 'Demo-Video 1',
		uri: 'https://s3.hidrive.strato.com/schul-cloud-hpi/Sport2.mp4'
	},
	{
		title: 'Demo-Video 2',
		uri: 'assets/video/test.mp4'
	},
	{
		title: 'Demo-Video 3',
		uri: 'https://www.youtube.com/watch?v=nS4a_bTv5_Y'
	},
]

const videoUri = ''

const Overlay =styled.div`
	display: block;
    position: absolute;
    top: 0;
	width: 100%;
	height: 100%;
	right: 0;
	${(props) =>
		props.focused
			? css`
					background-color: rgb(125,125,125,0.7);
			  `
			: css`
					background-color: rgb(125,125,125,0);
			  `}
`

const Container =styled.div`
	position: relative;
	top: 40%;
    left: 50%;
    transform: translate(-50%,-50%);
	flex-grow: 2;
	flex-direction: column;
	margin-right: 10px;

	& label{
		font-size: 22px;
		color: #ffffff;
		text-align: center;
		padding: 50px;
	}
	${(props) =>
		props.focused
			? css`
					display: flex;
			  `
			: css`
					display: none;
			  `}
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
	margin: 0 20%;
	display: flex;
	flex-direction:row;
	align-items: center;
`

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


const Edit = ({ state, focused }) => {
	const options = createOptions();
	return (
		<Overlay focused={focused}>
			<Container focused={focused}>
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
		</Overlay>
	)
}

export default Edit
