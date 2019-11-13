import React, { useEffect, useState } from "react"

import { serverApi, editorApi } from "~/utils/api"
import { editorWS } from "~/utils/socket"
import { loadEditorData, saveEditorData } from "~/utils/cache"
import { buildDiff } from "~/utils/diff"
import { createSection } from "~/actions/lesson"

export function useBootstrap(id, courseId, dispatch, dispatchUserAction) {
    async function fetchData() {
        try {
            const user = await serverApi.get("/me")
            dispatchUserAction({ type: "BOOTSTRAP_USER", payload: user })
        } catch (err) {
            console.warn("Could not fetch user data")
        }

        try {
            const cacheData = loadEditorData(id)
            let lesson
            if (
                cacheData &&
                cacheData.hasOwnProperty("lesson") &&
                (cacheData.savedToBackend === false || editorWS.connected)
            ) {
                lesson = cacheData.lesson
            } else {
                lesson = await editorWS.emit(
                    'get',
                    `course/${courseId}/lessons`,
                    id,
                    {all: 'true'}
                )

                lesson.id = lesson._id
                if(lesson.sections.length === 0){
                    const section = await editorWS.emit('create', `lesson/${id}/sections`, {})
                    lesson.sections.push(section)
                }
                lesson.sections = lesson.sections.map(section => ({
                    ...section,
                    id: section._id,
                    docValue: section.state,
                    savedDocValue: section.state,
                    notes: section.note,
                    visible: true, // TODO: remove should be set by server and blur mode should removed
                }))
            }
            dispatch({ type: "BOOTSTRAP", payload: lesson })
        } catch (err) {
            dispatch({ type: "ERROR" })
            dispatch({
                type: "BOOTSTRAP",
                payload: {
                    id: new Date().getTime(),
                    sections: [
                        {
                            id:
                                new Date().getTime() +
                                "" +
                                Math.floor(Math.random() * 100),
                            docValue: null,
                            visible: true,
                        },
                    ],
                    changed: new Set(),
                },
            })
        }
        requestAnimationFrame(() => {
            dispatch({ type: "BOOTSTRAP_FINISH" })
        })
    }

    async function fetchCourse() {
        try {
            // const courseId = window.location.pathname.split("/")[2]
            const course = await serverApi.get(`/courses/${courseId}`)
            dispatch({ type: "SET_COURSE", payload: course })
        } catch (err) {
            console.log(err)
        }
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
    if (!store.editing && !override) return
    dispatch({ type: "SAVE_STATUS", payload: "Sichern..." })
    const savePromises = []
    const lessonChanges = {}
    store.lesson.changed.forEach(key => {
        if (key === "order") {
            lessonChanges.sections = store.lesson.sections.map(
                section => section.id,
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
    store.lesson.sections.forEach(section => {
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
                                    `lesson/${store.lesson.id}/sections/diff`,
                                    section.id,
                                    {state: sectionDiff},
                                )
                        dispatch({ type: "SECTION_SAVED", payload: section.id })
                        resolve(backendResult)
                    } catch (err) {
                       /* if (savedDocValue) {
                            dispatch({
                                type: "SECTION_SAVE_DOCVALUE_FAILED",
                                payload: {
                                    id: section.id,
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
                Promise.resolve(`No changes for section ${section.id}`),
            )
        }else {
            savePromises.push(
                new Promise(async (resolve, reject) => {
                    try {
                        const backendResult =
                            await editorWS
                                .emit(
                                    'patch',
                                    `lesson/${store.lesson.id}/sections`,
                                    section.id,
                                    sectionChanges
                                )
                        dispatch({ type: "SECTION_SAVED", payload: section.id })
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
            sections: store.lesson.sections.map(section => ({
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

    saveEditorData(cacheData, store.lesson.id)
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
        if (!store.bootstrapFinished) return
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
