import React, { useEffect, useContext } from "react"
import { withRouter } from "react-router"
import styled from "styled-components"

import api from "~/utils/api"
import { LessonContext } from "~/contexts/Lesson"
import { useInterval } from "~/utils/hooks"

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
        try {
            const lesson = await api.get(`/editor/lessons/${id}`, {
                id,
                title: `Sample lesson`,
                sections: [
                    {
                        id: 1,
                        notes: "",
                        title: "Sample Section",
                        docValue: JSON.parse(
                            '{"type":"@edtr-io/document","plugin":"rows","state":[{"type":"@edtr-io/document","plugin":"counter","state":1},{"type":"@edtr-io/document","plugin":"counter","state":2},{"type":"@edtr-io/document","plugin":"counter","state":3}]}',
                        ),
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

            dispatch({ type: "BOOTSTRAP", payload: lesson })
        } catch (err) {
            dispatch({ type: "ERROR" })
        }
        dispatch({ type: "BOOTSTRAP_FINISH" })
    }

    useEffect(() => {
        fetchLesson()
    }, [])
}

async function saveLesson(store, dispatch) {
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
                    console.error("Error saving lesson", err)
                } finally {
                    resolve(lessonChanges)
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
                // TODO
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
                        { id: section.id, ...sectionChanges },
                    )
                    dispatch({ type: "SECTION_SAVED", payload: section.id })
                    resolve(backendResult)
                } catch (err) {
                    console.error("Error saving section " + section.id, err)
                } finally {
                    resolve()
                }
            }),
        )
    })

    const results = await Promise.all(savePromises)
    console.log("DATA SAVED TO BACKEND :", results)

    dispatch({ type: "SAVE_STATUS", payload: "Gespeichert" })
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
    useInterval(() => saveLesson(store, dispatch), 5000)

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
