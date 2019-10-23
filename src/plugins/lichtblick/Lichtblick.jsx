import React, { useState, useEffect, useContext } from "react"
import shortid from "shortid"

import LessonContext from "~/Contexts/Lesson"

import Input from "~/components/Input"
import Flex from "~/components/Flex"

import { createBoard } from "./utils"
import none from "ramda/es/none"

const Lichtblick = ({ focused, state }) => {
    useEffect(() => {
    }, [])

    const { store, dispatch } = useContext(LessonContext)
    let videoUrl = '/demo_content/video.mp4'
    let lichtblickFrame
    // testmovie: https://www10-fms.hpi.uni-potsdam.de/vod/media/SCHUL-CLOUD/explainer2018/hd/video.mp4
    // http://pbojinov.github.io/iframe-communication/iframe.html
    // https://nwdl.eu/lichtblick/dist/
    // page to iframe https://robertnyman.com/html5/postMessage/postMessage.html
        lichtblickFrame = (
            <iframe
                src={'/lichtblick/index.html?src='+ encodeURI(videoUrl)}
                allowFullScreen={true}
                style={{
                    width: "100%",
                    height: 800,
                    border: 0,
                    resize: "vertical",
                    overflow: "auto",
                }}
                data-identifier="iframe-lichtblick"
            />
        )
    
    return (
        <div>
            {lichtblickFrame}
        </div>
    )
}

export default Lichtblick
