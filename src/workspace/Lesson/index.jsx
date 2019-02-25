import React, { useEffect, useContext } from "react"
import { withRouter } from "react-router"
import styled from "styled-components"

import { LessonContext } from "~/contexts/Lesson"
import { bootstrapLesson, updateLesson } from "~/api"

import Container from "~/components/Container"
import Flex from "~/components/Flex"
import Loader from "~/components/Loader"

import Header from "./Header"
import Sections from "./Sections"

const Wrapper = styled.div`
    position: relative;
    padding-top: 125px;
`

function useBootstrap(dispatch) {
    async function fetchLesson() {
        try {
            const lesson = await bootstrapLesson({ id: 123 }, true)

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
    const backendResponse = await updateLesson({ lesson: store.lesson }, true)
    console.log("SAVED LESSON TO BACKEND :", backendResponse)
    dispatch({ type: "SAVE_STATUS", payload: "Gespeichert" })
}

function useChangeListener(store, dispatch) {
    useEffect(() => {
        if (!store.bootstrapFinished) return

        dispatch({ type: "SAVE_STATUS", payload: "Ungesicherte Änderungen" })
        const saveTimeout = setTimeout(() => saveLesson(store, dispatch), 5000)

        return () => clearTimeout(saveTimeout)
    }, [store.lesson])
}

const Lesson = props => {
    const { store, dispatch } = useContext(LessonContext)

    useBootstrap(dispatch)
    useChangeListener(store, dispatch)

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
            <Sections sections={store.lesson.sections} />
        </Wrapper>
    )
}

export default withRouter(Lesson)
