import React, { useEffect, useState, useContext } from "react"
import styled, { css } from "styled-components"
import Heading from "~/components/Heading"

import theme from "~/theme"

import Preview from "./Preview"
import Settings from "./Settings"
import SidebarControls from "./SidebarControls"

const Wrapper = styled.div`
    left: 0;
    position: fixed;
    top: 62px;
    width: ${props => (props.expanded ? 275 : 50)}px;
    height: calc(100vh - 62px);
    overflow: hidden;
    transition: 250ms all ease-in-out;
    background-color: rgba(221, 221, 221, 1);
    padding-bottom: 100px;
    z-index: 100;
    box-shadow: inset -3px 0px 6px rgba(0, 0, 0, 0.1),
        inset -3px 0px 6px rgba(0, 0, 0, 0.18);
    border-radius: 0;

    ${props =>
        !props.expanded &&
        css`
            box-shadow: none;
            background-color: #fff;
        `}
`

const Previews = styled.div`
    padding: ${props =>
        props.editing && props.expanded
            ? "15px 30px 15px 5px"
            : !props.expanded
            ? "15px 10px"
            : "15px"};
    width: 100%;
    height: calc(100vh - 62px);
    overflow: auto;

    ${props =>
        !props.expanded &&
        css`
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding-bottom: 150px;
        `}
`

function useResizeListener(store, dispatch) {
    function resizeListener() {
        if (store.sectionOverviewExpanded && window.innerWidth < 1350) {
            dispatch({ type: "TOGGLE_SECTION_OVERVIEW", payload: false })
        }

        if (
            store.sectionOverviewExpanded === false &&
            window.innerWidth > 1350
        ) {
            dispatch({ type: "TOGGLE_SECTION_OVERVIEW", payload: true })
        }
    }

    useEffect(() => {
        if (window.innerWidth > 1350 && !store.bootstrapFinished) {
            dispatch({ type: "TOGGLE_SECTION_OVERVIEW", payload: true })
        }

        window.addEventListener("resize", resizeListener)
        return () => window.removeEventListener("resize", resizeListener)
    }, [store.sectionOverviewExpanded])
}

const SectionOverview = ({ store, dispatch }) => {
    useResizeListener(store, dispatch)
    const expanded = store.sectionOverviewExpanded
    const sections = store.lesson.sections

    function moveSection(fromIndex, toIndex) {
        dispatch({ type: "SWAP_SECTIONS", payload: [fromIndex, toIndex] })
    }

    return (
        <React.Fragment>
            <Wrapper expanded={expanded} editing={store.editing}>
                <Previews editing={store.editing} expanded={expanded}>
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
                                    moveSection={moveSection}
                                    dispatch={dispatch}
                                    section={section}
                                    index={index}
                                    key={section.id}
                                />
                            )
                        })}
                </Previews>
                <SidebarControls store={store} dispatch={dispatch} />
            </Wrapper>
            <Settings />
        </React.Fragment>
    )
}

export default SectionOverview
