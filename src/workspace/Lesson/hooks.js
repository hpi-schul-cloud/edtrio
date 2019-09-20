import React, { useEffect, useState } from "react"

import { courseApi, editorApi } from "~/utils/api"
import { editor } from "~/utils/socket"
import config from "~/config"
import { lessonFakeData } from "~/utils/fake"
import { setCookie } from "~/utils/cookie"
import { useInterval } from "~/utils/hooks"
import { loadEditorData, saveEditorData } from "~/utils/cache"
import { buildDiff } from "~/utils/diff"
import reject from "ramda/es/reject"

export function useBootstrap(id, courseId, dispatch, dispatchUserAction) {
    async function fetchData() {
        try {
            const user = await courseApi.get("/me")
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
                (cacheData.savedToBackend === false || config.DISABLE_BACKEND)
            ) {
                lesson = cacheData.lesson
            } else {
                //lesson = await editorApi.get(`course/${courseId}/lessons/${id}`)

                lesson = await editor.emit(
                    'get',
                    `course/${courseId}/lessons`,
                    id
                )
                if (lesson.sections.length === 0) {
                    /*const section = await editorApi.post(`/sections/`, {
                        lesson: lesson._id,
                    })*/
                    const section = { lesson: lesson._id, _id: '5d5fe33ca0482e013660a853' } //TODO: replace with result of section creaction (post)
                    lesson.sections = [section]
                }

                lesson.id = lesson._id
                lesson.sections = lesson.sections.map(section => ({
                    ...section,
                    id: section._id,
                    docValue: section.state,
                    notes: section.note,
                }))
            }
            dispatch({ type: "BOOTSTRAP", payload: lesson })
        } catch (err) {
            console.debug(err)
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
            //const courseId = window.location.pathname.split("/")[2]
            const course = await courseApi.get(`/courses/${courseId}`)
            dispatch({ type: "SET_COURSE", payload: course })
        } catch (err) {}
    }

    useEffect(() => {
        fetchCourse()
        fetchData()
    }, [])
}

export async function registerLessonSocket(id, courseId, dispatch){
    editor.on(`course/${courseId}/lesson patched`, (data) => {
        dispatch({
            type: "LESSON_UPDATED",
            data
        })
    })
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
                    const message = await editor.emit(
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
        let savedDocValue = JSON.parse(JSON.stringify(section.docValue))
        section.changed.forEach(key => {
            if (key === "docValue") {
                savedDocValue =
                    typeof section.docValue === "object" &&
                    JSON.parse(JSON.stringify(section.docValue))

                sectionChanges.state = buildDiff(
                    section.savedDocValue,
                    section.docValue,
                )

                dispatch({ type: "SECTION_SAVE_DOCVALUE", payload: section.id })
            } else if (key === "notes") {
                sectionChanges.note = section.notes
            } else {
                sectionChanges[key] = section[key]
            }
        })
        if (Object.keys(sectionChanges).length === 0) {
            return savePromises.push(
                Promise.resolve(`No changes for section ${section.id}`),
            )
        }

        savePromises.push(
            new Promise(async (resolve, reject) => {
                try {
                    const backendResult = await courseApi.patch(
                        `/editor/sections/${section.id}`,
                        sectionChanges,
                        null,
                        null,
                        {
                            success: true,
                        },
                    )
                    dispatch({ type: "SECTION_SAVED", payload: section.id })
                    resolve(backendResult)
                } catch (err) {
                    if (
                        sectionChanges.hasOwnProperty("state") &&
                        savedDocValue
                    ) {
                        dispatch({
                            type: "SECTION_SAVE_DOCVALUE_FAILED",
                            payload: {
                                id: section.id,
                                lastSavedDocValue: savedDocValue,
                            },
                        })
                    }
                    reject(err)
                }
            }),
        )
    })

    const cacheData = {
        savedToBackend: true,
        lesson: {
            ...store.lesson,
            sections: store.lesson.sections.map(section => ({
                ...section,
                savedDocValue: undefined,
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
