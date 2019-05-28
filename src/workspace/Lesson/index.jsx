import React, { useEffect, useContext, useState } from "react"
import styled from "styled-components"

import config from "~/config"

import LessonContext from "~/Contexts/Lesson"
import UserContext from "~/Contexts/User"
import { useInterval } from "~/utils/hooks"

import Container from "~/components/Container"
import Flex from "~/components/Flex"
import Loader from "~/components/Loader"

import Header from "./Header"
import Section from "./Section"
import SectionOverview from "./SectionOverview"

import {
    useBootstrap,
    useChangeListener,
    useFullScreenListener,
    saveLesson,
} from "./hooks"

const Wrapper = styled.div`
    position: relative;
    width: 100%;
`

const Lesson = props => {
    const { store, dispatch } = useContext(LessonContext)
    const { store: userStore, dispatch: dispatchUserAction } = useContext(
        UserContext,
    )

    let id = "TEST"
    try {
        const location = window.location.pathname
        const topicId = location.split("/topics/")[1]
        if (topicId && !config.DISABLE_BACKEND) id = topicId
    } catch (err) {}

    useBootstrap(id, dispatch, dispatchUserAction)
    useChangeListener(store, dispatch)
    // useInterval(() => saveLesson(store, dispatch), 10000)

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
            <Section store={store} dispatch={dispatch} />
            <SectionOverview store={store} dispatch={dispatch} />
        </Wrapper>
    )
}

export default Lesson
