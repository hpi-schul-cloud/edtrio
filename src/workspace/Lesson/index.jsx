import React, { useEffect } from "react"
import { withRouter } from "react-router"
import styled from "styled-components"

import { useQuery } from "react-apollo-hooks"

import Container from "~/components/Container"
import Flex from "~/components/Flex"
import Loader from "~/components/Loader"

import { BOOTSTRAP_LESSON } from "~/apollo"

import Header from "./Header"
import Sections from "./Sections"

const Wrapper = styled.div`
    position: relative;
    padding-top: 125px;
`

const Lesson = props => {
    const { data, loading, error } = useQuery(BOOTSTRAP_LESSON, {
        variables: { id: props.match.params.lessonId },
        suspend: false,
    })

    useEffect(() => {
        console.log("data :", data)
    }, [data])

    if (loading) {
        return (
            <Container>
                <Flex justifyCenter alignCenter style={{ minHeight: "70vh" }}>
                    <Loader />
                </Flex>
            </Container>
        )
    }

    const { lesson } = data
    return (
        <Wrapper>
            <Header title={lesson.title} />
            <Sections sections={lesson.sections} />
        </Wrapper>
    )
}

export default withRouter(Lesson)
