import React, { useEffect, useContext } from "react"
import { withRouter } from "react-router"
import styled from "styled-components"

import { LessonContext } from "~/contexts/Lesson"
import { bootstrapLesson } from "~/api"

import Container from "~/components/Container"
import Flex from "~/components/Flex"
import Loader from "~/components/Loader"

import Header from "./Header"
import Sections from "./Sections"

const Wrapper = styled.div`
    position: relative;
    padding-top: 125px;
`

const Lesson = props => {
    const { store, dispatch } = useContext(LessonContext)

    async function fetchLesson() {
        try {
            const lesson = await bootstrapLesson({ id: 123 }, true)

            dispatch({ type: "BOOTSTRAP", payload: lesson })
        } catch (err) {
            dispatch({ type: "ERROR" })
        }
    }

    useEffect(() => {
        fetchLesson()
    }, [])

    if (store.loading) {
        return (
            <Container>
                <Flex justifyCenter alignCenter style={{ minHeight: "70vh" }}>
                    <Loader />
                </Flex>
            </Container>
        )
    }

    const { lesson } = store
    return (
        <Wrapper>
            <Header title={lesson.title} />
            <Sections sections={lesson.sections} />
        </Wrapper>
    )
}

export default withRouter(Lesson)
