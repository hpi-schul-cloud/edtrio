import React, { useEffect, useState } from "react"

import { serverApi, editorApi } from "~/utils/api"
import { editorWS } from "~/utils/socket"
import { loadEditorData, saveEditorData } from "~/utils/cache"
import { buildDiff } from "~/utils/diff"
import { fetchCourse } from "~/Contexts/course.actions"
import { fetchLessonWithSections } from "~/Contexts/lesson.actions"

export function useBootstrap(id, courseId, dispatch, dispatchUserAction) {
    async function fetchData() {
        try {
            const user = await serverApi.get("/me")
            dispatchUserAction({ type: "BOOTSTRAP_USER", payload: user })
        } catch (err) {
            console.warn("Could not fetch user data")
        }

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
        const dispatchLessonUpdate = (data) => {
            dispatch({
                type: "LESSON_UPDATED",
                payload: data
            })
        }
        editorWS.on('course/:courseId/lessons patched', dispatchLessonUpdate)
        editorWS.on('course/:courseId/lessons updated', dispatchLessonUpdate)

        const dispatchSectionUpdate = (data) => {
            dispatch({
                type: "SECTION_UPDATED",
                payload: data
            })
        }

        editorWS.on('lesson/:lessonId/sections patched', dispatchSectionUpdate)
        editorWS.on('lesson/:lessonId/sections updated', dispatchSectionUpdate)


        const dispatchSectionDiff = (data) => {
            dispatch({
                type: "SECTION_DOCVALUE_DIFF",
                payload: {
                    sectionId: data._id,
                    diff: data.diff
                }
            })
        }

        editorWS.on('lesson/:lessonId/sections/diff patched', dispatchSectionDiff)
    }

    useEffect(() => {
        fetchCourse()
        fetchData()
        registerHandler()
    }, [])
}


export async function saveLesson(store, dispatch, override) {
    if (!store.view.editing && !override) return
    dispatch({ type: "SAVE_STATUS", payload: "Sichern..." })
    const savePromises = []
    const lessonChanges = {}
    store.lesson.changed.forEach(key => {
        if (key === "order") {
            lessonChanges.sections = store.sections.map(
                section => section._id,
            )
        } else {
            lessonChanges[key] = store.lesson[key]
        }
    })
    if (store.lesson.changed.size !== 0)
        savePromises.push(
            new Promise(async (resolve, reject) => {
                try{
                    const { lesson: { courseId, id: lessonId } } = store
                    const message = await editorWS.emit(
                        'patch',
                        `course/${courseId}/lessons`,
                        lessonId,
                        lessonChanges
                    )
                    dispatch({ type: "LESSON_SAVED" })
                    resolve( message )
                } catch (err) {
                    reject(err)
                }
            }),
        )
    else savePromises.push(Promise.resolve("No lesson changes"))

    // save sections
    store.sections.forEach(section => {
        const sectionChanges = {}
        let sectionDiff
        let savedDocValue
        section.changed.forEach(key => {
            if (key === "docValue") {
                savedDocValue =
                    typeof section.docValue === "object" &&
                    JSON.parse(JSON.stringify(section.docValue))

                sectionDiff = buildDiff(
                    section.savedDocValue,
                    section.docValue,
                )

            } else if (key === "notes") {
                sectionChanges.note = section.notes
            } else {
                sectionChanges[key] = section[key]
            }
        })
        if(sectionDiff){
            savePromises.push(
                new Promise(async (resolve, reject) => {
                    try {
                        const backendResult =
                            await editorWS
                                .emit(
                                    'patch',
                                    `lesson/${store.lesson._id}/sections/diff`,
                                    section._id,
                                    {state: sectionDiff},
                                )
                        dispatch({ type: "SECTION_SAVED", payload: section._id })
                        resolve(backendResult)
                    } catch (err) {
                       /* if (savedDocValue) {
                            dispatch({
                                type: "SECTION_SAVE_DOCVALUE_FAILED",
                                payload: {
                                    id: section._id,
                                    lastSavedDocValue: savedDocValue,
                                },
                            })
                        } */
                        reject(err)
                    }
                }),
            )
        }

        if (Object.keys(sectionChanges).length === 0) {
            return savePromises.push(
                Promise.resolve(`No changes for section ${section._id}`),
            )
        }else {
            savePromises.push(
                new Promise(async (resolve, reject) => {
                    try {
                        const backendResult =
                            await editorWS
                                .emit(
                                    'patch',
                                    `lesson/${store.lesson._id}/sections`,
                                    section._id,
                                    sectionChanges
                                )
                        dispatch({ type: "SECTION_SAVED", payload: section._id })
                        resolve(backendResult)
                    } catch (err) {
                        reject(err)
                    }
                }),
            )
        }
    })

    const cacheData = {
        savedToBackend: true,
        lesson: {
            ...store.lesson,
            sections: store.sections.map(section => ({
                ...section,
                savedDocValue: undefined, // TODO: do not set to undefined, because needed for first diff
                docValue: section.docValue,
            })),
        },
    }

    try{
        await Promise.all(savePromises)
    } catch (err) {
        cacheData.savedToBackend = false
    }

    saveEditorData(cacheData, store.lesson._id)
    dispatch({
        type: "SAVE_STATUS",
        payload: !cacheData.savedToBackend
            ? "Lokal Gespeichert"
            : "Gespeichert",
    })
}

export function useChangeListener(store, dispatch) {
    const [timeout, setTimeoutState] = useState(null)
    useEffect(() => {
        if (!store.view.bootstrapFinished) return
        dispatch({ type: "SAVE_STATUS", payload: "Ungesicherte Änderungen" })

        if(timeout) clearTimeout(timeout)
        setTimeoutState(setTimeout(() => {
                saveLesson(store, dispatch)
            }, 500)
        )
    }, [store.lesson])
}

export function useFullScreenListener(store, dispatch) {
    return true
}
