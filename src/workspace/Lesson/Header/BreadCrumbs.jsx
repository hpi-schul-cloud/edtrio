import React, { useState, useEffect } from "react"
import styled from "styled-components"

import { editor } from "~/utils/socket"

import Action from "~/components/Action"
import Flex from "~/components/Flex"
import Input from "~/components/Input"

const TitleInput = styled(Input)`
    font-weight: 700;
    width: 150px;
    margin-top: 0px;
`

const StyledCrumb = styled(Flex)`
    @media (max-width: 900px) {
        display: none;
    }
`

const Crumb = ({ to, caption }) => {
    return (
        <StyledCrumb noWrap>
            <Action a to={to} target="_self" style={{ whiteSpace: "nowrap" }}>
                {caption}
            </Action>
            &nbsp;&nbsp;
            <span style={{ color: "#879096" }}>{"/"}</span>
            &nbsp;&nbsp;
        </StyledCrumb>
    )
}

const BreadCrumbs = ({ store, dispatch }) => {
    const {
        lesson: { _id: lessonId }, 
        course,
    } = store
    const [crumbData, setCrumbData] = useState({
        crumbs: [
            { caption: "Meine Kurse", to: "/courses" },
            {
                caption: store.course.name || "Kurs",
                to: `/courses/${course._id}`,
            },
        ],
    })

    const updateTitle = async (value) => {

        dispatch({
            type: "LESSON_TITLE_CHANGE",
            payload: value,
        })
    }

    useEffect(() => {
        setCrumbData({
            crumbs: crumbData.crumbs.map((el, i) => {
                if (i !== 1) return el
                return { ...el, caption: store.course.name || "Kurs" }
            }),
        })
    }, [store.course.name])

    return (
        <Flex alignCenter noWrap style={{ paddingLeft: 25 }}>
            {crumbData.crumbs.map(c => (
                <Crumb {...c} key={c.to} />
            ))}
            <TitleInput
                noMargin
                size={16}
                value={store.lesson.title}
                readOnly={!store.editing}
                placeholder="Titel für das Thema"
                onChange={ updateTitle }
            />
        </Flex>
    )
}

export default BreadCrumbs
