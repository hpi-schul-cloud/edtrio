import React, { useEffect, useState } from "react"

import api from "~/utils/api"
import { setCookie } from "~/utils/cookie"
import { useInterval } from "~/utils/hooks"
import { loadEditorData, saveEditorData } from "~/utils/cache"

export function useBootstrap(id, dispatch, dispatchUserAction) {
    async function fetchData() {
        if (!process.env.CLIENT && process.env.NODE_ENV !== "production") {
            // NOTE if you want to persist your lesson data in local development (not in schulcloud-client), simply comment this block
            try {
                // DEVELOPMENT ONLY
                const lesson = await api.get("/editor/test")
                id = lesson._id
                setCookie("jwt", lesson.jwt)
            } catch (err) {
                // in case the backend is not running, we should still be able to continue
            }
        }
        const user = await api.get("/me")
        dispatchUserAction({ type: "BOOTSTRAP_USER", payload: user })

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
        fetchData()
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

export function useFullScreenListener(store, dispatch) {
    useInterval(() => {
        if (
            document.body.classList.value.includes("loaded") &&
            !document.body.classList.value.includes("fullscreen")
        ) {
            if (store.isFullScreen) {
                dispatch({ type: "FULL_SCREEN", payload: false })
            }
        } else if (!store.isFullScreen) {
            dispatch({ type: "FULL_SCREEN", payload: true })
        }
    }, 100) // TODO maybe think of another way than an interval

    useEffect(() => {
        document.body.classList.add("edtr")
        const fullscreenBtn = document.querySelector(".btn-fullscreen")
        // if (store.isFullScreen) {
        //     document.querySelector("body").style.paddingTop = 0
        //     if (fullscreenBtn) fullscreenBtn.style.top = "83px"
        // } else {
        //     document.querySelector("body").style.paddingTop = "75px"
        //     if (fullscreenBtn) fullscreenBtn.style.top = "8px"
        // }
        return () => document.body.classList.remove("edtr")
    }, [])

    return store.isFullScreen
}