import React, { useEffect, useState, useContext } from "react"
import styled, { css } from "styled-components"
import Heading from "~/components/Heading"

import theme from "~/theme"

import Preview from "./Preview"

const Wrapper = styled.div`
    padding: 15px;
    left: 0;
    position: fixed;
    top: 62px;
    width: 250px;
    height: calc(100vh - 62px);
    overflow: hidden;
    transform: ${props => (props.visible ? 0 : "translateX(-100%)")};
    opacity: ${props => (props.visible ? 1 : 0)};
    transition: 250ms all ease-in-out;
    background-color: ${theme.colorBeige};
    overflow-y: auto;
    z-index: 100;
    box-shadow: inset -3px 0px 6px rgba(0, 0, 0, 0.1),
        inset -3px 0px 6px rgba(0, 0, 0, 0.18);

    border-radius: 5px 0px 0px 5px;
`

const SectionTitle = styled(Heading)`
    color: ${theme.textColor};
    transition: 250ms all ease-in-out;
    transform: ${props => !props.active && "scale(0.8)"};
    transform-origin: left center;
    margin-bottom: 0px;
    max-width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    &:hover {
        cursor: pointer;
    }
`

function scrollToSection(sectionIndex) {
    document
        .querySelector(`.lesson-section[data-section="${sectionIndex}"]`)
        .scrollIntoView({
            behavior: "smooth",
        })
}

function useResizeListener(store, dispatch) {
    function resizeListener() {
        if (store.showSectionOverview && window.innerWidth < 1250) {
            dispatch({ type: "TOGGLE_SECTION_OVERVIEW", payload: false })
        }

        if (store.showSectionOverview === false && window.innerWidth > 1250) {
            dispatch({ type: "TOGGLE_SECTION_OVERVIEW", payload: true })
        }
    }

    useEffect(() => {
        if (window.innerWidth > 1250 && !store.bootstrapFinished) {
            dispatch({ type: "TOGGLE_SECTION_OVERVIEW", payload: true })
        }

        window.addEventListener("resize", resizeListener)
        return () => window.removeEventListener("resize", resizeListener)
    }, [store.showSectionOverview])
}

const SectionOverview = ({ store, dispatch }) => {
    useResizeListener(store, dispatch)
    const visible = store.showSectionOverview
    const sections = store.lesson.sections

    return (
        <Wrapper visible={visible}>
            {sections
                .filter((section, index) => {
                    if (store.editing) return true
                    return section.visible
                })
                .map((section, index) => {
                    const editorKey =
                        section.id +
                        "-" +
                        Math.round(new Date().getTime() / 5000)
                    return (
                        <Preview
                            k={editorKey}
                            store={store}
                            dispatch={dispatch}
                            section={section}
                            index={index}
                            key={section.id}
                        />
                    )
                })}
        </Wrapper>
    )
}

export default SectionOverview
