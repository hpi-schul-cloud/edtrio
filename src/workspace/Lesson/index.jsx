import React, { useEffect, useContext } from "react"
import { withRouter } from "react-router"
import styled from "styled-components"

import api from "~/utils/api"
import { setCookie, getCookie } from "~/utils/cookie"
import { LessonContext } from "~/contexts/Lesson"
import { useInterval } from "~/utils/hooks"
import { loadEditorData, saveEditorData } from "~/utils/cache"

import Container from "~/components/Container"
import Flex from "~/components/Flex"
import Loader from "~/components/Loader"

import Header from "./Header"
import Sections from "./Sections"

const Wrapper = styled.div`
    position: relative;
    padding-top: 50px;
    width: 100%;
`

function useBootstrap(id, dispatch) {
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

async function saveLesson(store, dispatch, override) {
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

function useChangeListener(store, dispatch) {
    useEffect(() => {
        if (!store.bootstrapFinished) return
        dispatch({ type: "SAVE_STATUS", payload: "Ungesicherte Änderungen" })
    }, [store.lesson])
}

const Lesson = props => {
    const { store, dispatch } = useContext(LessonContext)

    const id = 123 // TODO change to actual lesson id
    useBootstrap(id, dispatch)
    useChangeListener(store, dispatch)
    useInterval(() => saveLesson(store, dispatch), 10000)

    useEffect(() => {
        if (store.bootstrapFinished && store.editing === false)
            saveLesson(store, dispatch, true)
    }, [store.editing])

    if (store.loading) {
        return (
            <Container>
                <Flex justifyCenter alignCenter style={{ minHeight: "70vh" }}>
                    <Loader />
                </Flex>
            </Container>
        )
    }

    return (
        <Wrapper>
            <Header title={store.lesson.title} dispatch={dispatch} />
            <Sections
                showSectionOverview={store.showSectionOverview}
                editing={store.editing}
                sections={store.lesson.sections}
            />
        </Wrapper>
    )
}

export default withRouter(Lesson)
