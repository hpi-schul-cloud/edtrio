import React, { useState, useEffect, useContext } from "react"
import shortid from "shortid"
import uuidv5 from 'uuid/v5'

import LessonContext from "~/Contexts/Lesson"

import Input from "~/components/Input"
import Flex from "~/components/Flex"

import { createBoard } from "./utils"
import none from "ramda/es/none"


export const LichtblickWrapper = styled.div`
    position: relative; 
    padding-bottom: 56.25%; /* ratio 16x9 */
    height: 0; 
    overflow: hidden; 
    width: 100%;
    height: auto;
`

const Lichtblick = ({ focused, state }) => {
    
    const { store, dispatch } = useContext(LessonContext)
    const uuid = uuidv5()

    const videoUrl = 'https://www10-fms.hpi.uni-potsdam.de/vod/media/SCHUL-CLOUD/explainer2018/hd/video.mp4'
    // testmovie: https://www10-fms.hpi.uni-potsdam.de/vod/media/SCHUL-CLOUD/explainer2018/hd/video.mp4
    // http://pbojinov.github.io/iframe-communication/iframe.html
    // https://nwdl.eu/lichtblick/dist/
    // page to iframe https://robertnyman.com/html5/postMessage/postMessage.html
    const src = `https://nwdl.eu/lichtblick.upload/dist/?src=${encodeURI(videoUrl)}&id=${uuid}` 
    

    useEffect(() => {
        const iframeContent = document.getElementById(uuid).contentWindow
        iframeContent.postMessage('')
    }, [])


    const lichtblickFrame = (
            <iframe
                id={uuid}
                src={src}
                allowFullScreen={true}
                style={{
                    width: 544,
                    height: 800,
                    border: 0,
                    resize: "vertical",
                    overflow: "auto",
                }}
                scrolling="0"
                data-identifier="iframe-lichtblick"
            />
        )

        window.addEventListener('message', (e) => {
            if(e.origin === src){
                
            }
        })
    
    return (
        <LichtblickWrapper>
            {lichtblickFrame}
        </LichtblickWrapper>
    )
}

export default Lichtblick
