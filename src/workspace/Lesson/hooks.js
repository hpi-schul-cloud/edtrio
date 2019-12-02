import { useEffect, useState } from "react"
import { fetchCourse } from "~/Contexts/course.actions"
import { fetchLessonWithSections, lessonWasUpdated, saveLesson, setLesson } from "~/Contexts/lesson.actions"
import { unsavedChanges , newError } from '~/Contexts/notifications.actions'
import { mergeSerloDiff, saveSections, sectionWasUpdated, setSections, fetchSection } from '~/Contexts/section.actions'
import { serverApi } from "~/utils/api"
import { loadLessonData, loadSectionData } from "~/utils/cache"
import { editorWS } from "~/utils/socket"

export function useBootstrap(id, courseId, dispatch, dispatchUserAction) {
    async function bootstrap() {
        try {
            const user = await serverApi.get("/me")
            dispatchUserAction({ type: "BOOTSTRAP_USER", payload: user })
        } catch (err) {
            console.warn("Could not fetch user data")
            dispatch(newError('Es konnten nicht alle Daten geladen werden, eventuell kommt es zu einschränkungen'))
        }

        const cachedLessonData = loadLessonData(id)
		if (
			cachedLessonData &&
			Object.prototype.hasOwnProperty.call(cachedLessonData, 'sections') &&
			(cachedLessonData.savedToBackend === false || !editorWS.isConnected)
		) {
            // TODO: compare timestamps and hash with server state and save if possible or set
            // saved to true if hash is the same (needs server route, to do not send all data)
            console.log('Data are loaded from cach', !cachedLessonData.savedToBackend)
            dispatch(setLesson(cachedLessonData))
            const sections = loadSectionData(...cachedLessonData.sections)

            dispatch(setSections(sections))

            if(sections.length !== cachedLessonData.sections.length){
                const sectionsNotInChache = cachedLessonData.sections.filter(secId => !sections.find(section => section.id === secId))
                dispatch(fetchSection(...sectionsNotInChache))
            }


		} else {
           await dispatch(fetchLessonWithSections(id, courseId))
        }

        /* requestAnimationFrame(() => {
            // dispatch({ type: "BOOTSTRAP_FINISH" })
        }) */
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

        if (timeout) {
            clearTimeout(timeout);
            setTimeoutState(null)
        } else {
            dispatch(unsavedChanges());
        }

        setTimeoutState(setTimeout(() => {
                setTimeoutState(null)
                dispatch(saveLesson())
                dispatch(saveSections())
            }, 500)
        )
    }, [store.lesson, store.sections])
}

export function useFullScreenListener(store, dispatch) {
    return true
}
