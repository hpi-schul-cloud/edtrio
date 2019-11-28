import { useEffect, useState } from "react"
import { fetchCourse } from "~/Contexts/course.actions"
import { fetchLessonWithSections, lessonWasUpdated, saveLesson, setLesson } from "~/Contexts/lesson.actions"
import { unsavedChanges } from '~/Contexts/notifications.actions'
import { mergeSerloDiff, saveSections, sectionWasUpdated } from '~/Contexts/section.actions'
import { serverApi } from "~/utils/api"
import { loadEditorData, loadLessonData, loadSectionData } from "~/utils/cache"
import { editorWS } from "~/utils/socket"





export function useBootstrap(id, courseId, dispatch, dispatchUserAction) {
    async function bootstrap() {
        console.log('bootstrap')
        try {
            const user = await serverApi.get("/me")
            dispatchUserAction({ type: "BOOTSTRAP_USER", payload: user })
        } catch (err) {
            console.warn("Could not fetch user data")
        }

        const cachedLessonData = loadLessonData(id)
		if (
			cachedLessonData &&
			cachedLessonData.hasOwnProperty("sections") &&
			(cachedLessonData.savedToBackend === false || !editorWS.isConnected)
		) {
            // TODO: compare timestamps and hash with server state and save if possible or set
            // saved to true if hash is the same
            dispatch(setLesson(cachedLessonData))

            const sections = loadSectionData(...cachedLessonData.sections)
            sections.filter((section) => cachedLessonData.sections.includes(section._id))

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
        dispatch(fetchCourse(courseId))
        bootstrap()
        registerHandler()
    }, [])
}

export function useChangeListener(store, dispatch) {
    const [timeout, setTimeoutState] = useState(null)
    useEffect(() => {
        if (!store.view.bootstrapFinished) return
        // dispatch({ type: "SAVE_STATUS", payload: "Ungesicherte Änderungen" })
        dispatch(unsavedChanges())

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
