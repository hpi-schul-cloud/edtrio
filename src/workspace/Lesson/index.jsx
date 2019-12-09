import React, { useEffect, useContext, useState } from "react"
import styled from "styled-components"

import config from "~/config"

import LessonContext from "~/Contexts/Lesson.context"
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
} from "./hooks"
import { newError } from "~/Contexts/notifications.actions"
import { saveSections } from "~/Contexts/section.actions"
import { UserInformationError } from "~/utils/errors"

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
    let courseId = "TEST_COURSE"
    try {
        const location = window.location.pathname
        const regex = /courses[\/]([a-f0-9]{24})\/topics[\/]([a-f0-9]{24})/
        const [, _courseId, topicId] = regex.exec(location.toString())

        if (topicId && _courseId){
            id = topicId
            courseId = _courseId
        }
    } catch (err) {
        console.log('invalid url: has to look like /courses/:courseId/topics/:topicId')
        dispatch(newError('Die URL scheint nicht die nötigen Informationen zu beinhalten, bitte URL prüfen'))
        throw new UserInformationError(err, 'Die URL scheint nicht die nötigen Informationen zu beinhalten, bitte URL prüfen')
    }

    useBootstrap(id, courseId, dispatch, dispatchUserAction)
    useChangeListener(store, dispatch)

    useEffect(() => {
        if (store.view.bootstrapFinished && store.view.editing === false)
            dispatch(saveSections())
    }, [store.view.editing])

    if (store.view.loading) {
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
