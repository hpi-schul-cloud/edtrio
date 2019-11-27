import React, { useEffect, useState } from "react"

import { serverApi, editorApi } from "~/utils/api"
import { editorWS } from "~/utils/socket"
import { loadEditorData, saveEditorData } from "~/utils/cache"
import { buildDiff } from "~/utils/diff"
import { fetchCourse } from "~/Contexts/course.actions"
import { fetchLessonWithSections , saveLesson , lessonWasUpdated } from "~/Contexts/lesson.actions"
import { mergeSerloDiff, sectionWasUpdated , saveSections } from '~/Contexts/section.actions'




export function useBootstrap(id, courseId, dispatch, dispatchUserAction) {
    async function fetchData() {
        try {
            const user = await serverApi.get("/me")
            dispatchUserAction({ type: "BOOTSTRAP_USER", payload: user })
        } catch (err) {
            console.warn("Could not fetch user data")
        }

        // TODO: have to be rewrite for new chache system
        const cacheData = loadEditorData(id)
		let lesson
		if (
			cacheData &&
			cacheData.hasOwnProperty("lesson") &&
			(cacheData.savedToBackend === false || !editorWS.isConnected)
		) {
			lesson = cacheData.lesson
		} else {
            await dispatch(fetchLessonWithSections(id, courseId))
        }

        requestAnimationFrame(() => {
            dispatch({ type: "BOOTSTRAP_FINISH" })
        })
    }

    async function registerHandler(){
        const dispatchLessonUpdate = (data) =>
            dispatch(lessonWasUpdated(data))

        editorWS.on('course/:courseId/lessons patched', dispatchLessonUpdate)
        editorWS.on('course/:courseId/lessons updated', dispatchLessonUpdate)

        const dispatchSectionUpdate = (data) =>
            dispatch(sectionWasUpdated(data._id, data))

        editorWS.on('lesson/:lessonId/sections patched', dispatchSectionUpdate)
        editorWS.on('lesson/:lessonId/sections updated', dispatchSectionUpdate)


        const dispatchSectionDiff = (data) => dispatch(mergeSerloDiff(data._id, data.diff))

        editorWS.on('lesson/:lessonId/sections/diff patched', dispatchSectionDiff)
    }

    useEffect(() => {
        fetchCourse()
        fetchData()
        registerHandler()
    }, [])
}

export function useChangeListener(store, dispatch) {
    const [timeout, setTimeoutState] = useState(null)
    useEffect(() => {
        if (!store.view.bootstrapFinished) return
        dispatch({ type: "SAVE_STATUS", payload: "Ungesicherte Änderungen" })

        if(timeout) clearTimeout(timeout)
        setTimeoutState(setTimeout(() => {
                dispatch(saveLesson())
                dispatch(saveSections())
            }, 500)
        )
    }, [store.lesson, store.sections])
}

export function useFullScreenListener(store, dispatch) {
    return true
}
