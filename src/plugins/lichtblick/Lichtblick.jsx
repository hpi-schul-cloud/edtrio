import React, { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import shortid from "shortid"
import uuidv4 from 'uuid/v4'

import LessonContext from "~/Contexts/Lesson"

import Input from "~/components/Input"
import Flex from "~/components/Flex"

import { createBoard } from "./utils"
import none from "ramda/es/none"


export const LichtblickWrapper = styled.div`
    height: 0; 
    width: 100%;
    height: auto;
`

const Lichtblick = ({ focused, state }) => {
    
    const { store, dispatch } = useContext(LessonContext)
    const uuid = uuidv4()

    const videoUrl = '/demo_content/video.mp4'

    // testmovie: https://www10-fms.hpi.uni-potsdam.de/vod/media/SCHUL-CLOUD/explainer2018/hd/video.mp4
    // http://pbojinov.github.io/iframe-communication/iframe.html
    // https://nwdl.eu/lichtblick/dist/
    // page to iframe https://robertnyman.com/html5/postMessage/postMessage.html
    // `/lichtblick/index.html?src=${encodeURI(videoUrl)}&id=${uuid}` 
    // `http://localhost:3060/index.html?src=${encodeURI(videoUrl)}&id=${uuid}`
    const src = `/lichtblick/index.html?src=${encodeURI(videoUrl)}&id=${uuid}` 
    
    const [lichtblickState, setState] = useState({
        data: {},
        changed: false
    })

    useEffect(() => {
        const iframeContent = document.getElementById(uuid).contentWindow
        iframeContent.postMessage(lichtblickState.data, '*')
    }, [])


    const lichtblickFrame = (
            <iframe
                id={uuid}
                src={src}
                allowFullScreen={true}
                style={{
                    width: '100%',
                    height: 500,
                    border: 0,
                    overflow: "none",
                }}
                scrolling="0"
                data-identifier="iframe-lichtblick"
            />
        )

        window.addEventListener('message', (e) => {
            if(e.origin === src){
                if (e.data.action && e.data.action === 'resize') {
                    lichtblickFrame.style.height = e.data.height
                } else {
                    setState({
                        ...lichtblickState,
                        data: e.data
                    })
                }
            }
        })

    return (
        <LichtblickWrapper>
            {lichtblickFrame}
        </LichtblickWrapper>
    )
}

export default Lichtblick
