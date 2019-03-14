import React, { useEffect, useState } from "react"

import api from "~/utils/api"
import { useInterval } from "~/utils/hooks"
import { loadEditorData, saveEditorData } from "~/utils/cache"

export function useBootstrap(id, dispatch) {
    async function fetchLesson() {
        // if (process.env.NODE_ENV === "development") {
        //     const lesson = await api.get("/editor/test")
        //     id = lesson._id
        //     setCookie("jwt", lesson.jwt)
        // }

        try {
            const cacheData = loadEditorData(id)
            let lesson
            if (cacheData && cacheData.savedToBackend === false) {
                lesson = cacheData.lesson
            } else {
                lesson = await api.get(`/editor/lessons/${id}`, {
                    id,
                    title: `Sample lesson`,
                    sections: [
                        {
                            id: 1,
                            notes: "",
                            title: "Sample Section",
                            docValue: null,
                            visible: true,
                        },
                        {
                            id: 2,
                            notes: "",
                            title: "Second Sample Section",
                            docValue: null,
                            visible: false,
                        },
                        {
                            id: 3,
                            notes: "",
                            title: "Third Sample Section",
                            docValue: null,
                            visible: true,
                        },
                        {
                            id: 4,
                            notes: "",
                            title: "Fourth Sample Section",
                            docValue: null,
                            visible: true,
                        },
                    ],
                })
            }

            dispatch({ type: "BOOTSTRAP", payload: lesson })
        } catch (err) {
            dispatch({ type: "ERROR" })
        }
        requestAnimationFrame(() => {
            dispatch({ type: "BOOTSTRAP_FINISH" })
        })
    }

    useEffect(() => {
        fetchLesson()
    }, [])
}

export async function saveLesson(store, dispatch, override) {
    if (!store.editing && !override) return
    dispatch({ type: "SAVE_STATUS", payload: "Sichern..." })
    const savePromises = []

    // save lesson title and section order
    const lessonChanges = {}
    store.lesson.changed.forEach(key => {
        if (key === "order") {
            lessonChanges.order = store.lesson.sections.map(
                section => section.id,
            )
        } else {
            lessonChanges[key] = store.lesson[key]
        }
    })
    if (store.lesson.changed.size !== 0)
        savePromises.push(
            new Promise(async resolve => {
                try {
                    await api.patch(
                        `/editor/lessons/${store.lesson.id}`,
                        lessonChanges,
                        null,
                        null,
                        { id: store.lesson.id, ...lessonChanges },
                    )
                    dispatch({ type: "LESSON_SAVED" })
                } catch (err) {
                    resolve("error")
                }
            }),
        )
    else savePromises.push(Promise.resolve("No lesson changes"))

    // save sections
    store.lesson.sections.forEach(section => {
        if (section.changed.size === 0)
            return savePromises.push(
                Promise.resolve(`No changes for section ${section.id}`),
            )

        const sectionChanges = {}
        section.changed.forEach(key => {
            if (key === "docValue") {
                const updatedDocValue = section.collectDocValue()
                if (
                    JSON.stringify(section[key]) !==
                    JSON.stringify(updatedDocValue)
                ) {
                    sectionChanges[key] = updatedDocValue
                }
            } else {
                sectionChanges[key] = section[key]
            }
        })

        savePromises.push(
            new Promise(async resolve => {
                try {
                    const backendResult = await api.patch(
                        `/editor/sections/${section.id}`,
                        sectionChanges,
                        null,
                        null,
                        // { success: true },
                    )
                    dispatch({ type: "SECTION_SAVED", payload: section.id })
                    resolve(backendResult)
                } catch (err) {
                    resolve("error")
                }
            }),
        )
    })

    const results = await Promise.all(savePromises)
    const cacheData = {
        savedToBackend: true,
        lesson: {
            ...store.lesson,
            sections: store.lesson.sections.map(section => ({
                ...section,
                docValue:
                    typeof section.collectDocValue === "function"
                        ? section.collectDocValue()
                        : section.docValue,
            })),
        },
    }
    if (results.includes("error")) {
        cacheData.savedToBackend = false
    }
    cacheData.savedToBackend = false // REMOVE

    saveEditorData(cacheData, store.lesson.id)

    dispatch({
        type: "SAVE_STATUS",
        payload: !cacheData.savedToBackend
            ? "Lokal Gespeichert"
            : "Gespeichert",
    })
}

export function useChangeListener(store, dispatch) {
    useEffect(() => {
        if (!store.bootstrapFinished) return
        dispatch({ type: "SAVE_STATUS", payload: "Ungesicherte Änderungen" })
    }, [store.lesson])
}

export function useFullScreenListener() {
    const [isFullScreen, setIsFullScreen] = useState(false)
    useInterval(() => {
        if (
            document.body.classList.value.includes("loaded") &&
            !document.body.classList.value.includes("fullscreen")
        )
            setIsFullScreen(false)
        else setIsFullScreen(true)
    }, 100) // TODO maybe think of another way than an interval

    useEffect(() => {
        if (isFullScreen) {
            document.querySelector("body").style.paddingTop = 0
        } else {
            document.querySelector("body").style.paddingTop = "75px"
        }
    }, [isFullScreen])

    return isFullScreen
}
