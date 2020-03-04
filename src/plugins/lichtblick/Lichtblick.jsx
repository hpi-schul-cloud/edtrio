import React, { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import shortid from "shortid"
import uuidv4 from 'uuid/v4'

import LessonContext from "~/Contexts/Lesson.context"
import EditMode from "./EditMode"


export const LichtblickWrapper = styled.div`
    height: 0;
    width: 100%;
    height: auto;
`

const Lichtblick = ({ focused, state, editable }) => {
	const initData = {
		items:[
			{
				captureUrl: "data:image/jpeg;base64,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",
				endTime: 2.55,
				index: 0,
				startTime: 2.0,
				uid: "ba7a612919704c0fac16cd44ad7dff23"
			}
		]
	}
	const { store, dispatch } = useContext(LessonContext)
	const videoUrl = state.videoUri.get()
	const videoUuid = state.videoUuid.get()
	const videoTitle = state.videoTitle.get()

	// testmovie: https://www10-fms.hpi.uni-potsdam.de/vod/media/SCHUL-CLOUD/explainer2018/hd/video.mp4
	// http://pbojinov.github.io/iframe-communication/iframe.html
	// https://nwdl.eu/lichtblick/dist/
	// page to iframe https://robertnyman.com/html5/postMessage/postMessage.html
	// `/lichtblick/index.html?src=${encodeURI(videoUrl)}&id=${uuid}` 
	// `http://localhost:3060/index.html?src=${encodeURI(videoUrl)}&id=${uuid}`
	const src = `http://localhost/lichtblick/?src=${encodeURIComponent(videoUrl)}&title=${encodeURIComponent(videoTitle)}` 

	const [height, setHeight] = useState(500)

	useEffect(() => {
		// const iframeContent = document.getElementById(uuid).contentWindow
		// iframeContent.postMessage(state.data, '*')
	}, [state.changed])


	const lichtblickFrame = (
		<iframe
			id={videoUuid}
			src={src}
			allowFullScreen={true}
			style={{
				width: '100%',
				height: height,
				border: 0,
				overflow: "none",
				backgroundColor: "rgba(240, 240, 240)",
			}}
			scrolling="0"
			data-identifier="iframe-lichtblick"
		/>
	)

	window.addEventListener('message', (e) => {
		// console.log(e.data.action)
		// console.log(e.data.data)
		if(e.data.id === videoUuid){
			var iframeContent = document.getElementById(videoUuid).contentWindow
			if (e.data.action && e.data.action === 'resize') {
				setHeight(e.data.height)
			} else if (e.data.action && e.data.action === 'getState') {
				iframeContent.postMessage({
					action: 'init',
					data: initData// state.data
				}, '*')
				console.log(initData)
			} else if (e.data.action && e.data.action === 'saveState') {
				// console.log('save')
				// console.log(e.data)
				state.data.set(e.data)
			}
		}
	})

	if(editable){
		return (
			<div>
				<LichtblickWrapper>
					{lichtblickFrame}
				</LichtblickWrapper>
				<EditMode state={state} focused={focused}/>
			</div>
		)
	}else{
		if(state.videoTitle.get()) {
			return (<LichtblickWrapper>{lichtblickFrame}</LichtblickWrapper>)
		}else{
			return (<h5>[Lichtblick] Kein Video ausgewählt</h5>);
		}
	}
}

export default Lichtblick
