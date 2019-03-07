import React, { useEffect, useContext, useState } from "react"
import styled from "styled-components"
import { DragDropContext } from "react-beautiful-dnd"

import LessonContext from "~/Contexts/Lesson"
import UserContext from "~/Contexts/User"
import { useInterval } from "~/utils/hooks"

import Container from "~/components/Container"
import Flex from "~/components/Flex"
import Loader from "~/components/Loader"

import Header from "./Header"
import Sections from "./Sections"

import {
    useBootstrap,
    useChangeListener,
    useFullScreenListener,
    saveLesson,
} from "./hooks"

const Wrapper = styled.div`
    position: relative;
    padding-top: ${props => props.isFullScreen && "50px"};
    width: 100%;
`

const Lesson = props => {
    const { store, dispatch } = useContext(LessonContext)
    const { store: userStore, dispatch: dispatchUserAction } = useContext(
        UserContext,
    )

    let id = 123
    try {
        const location = window.location.pathname
        const topicId = location.split("/topics/")[1]
        if (topicId) id = topicId
    } catch (err) {}

    useBootstrap(id, dispatch, dispatchUserAction)
    useChangeListener(store, dispatch)
    const isFullScreen = useFullScreenListener(store, dispatch)
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
        <Wrapper isFullScreen={isFullScreen}>
            <Header
                title={store.lesson.title}
                dispatch={dispatch}
                isFullScreen={isFullScreen}
            />
            <Sections
                showSectionOverview={store.showSectionOverview}
                editing={store.editing}
                sections={store.lesson.sections}
                isFullScreen={isFullScreen}
            />
        </Wrapper>
    )
}

export default Lesson
