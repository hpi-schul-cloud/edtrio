import React, { useEffect, useState, useContext } from "react"
import styled, { css } from "styled-components"
import Heading from "~/components/Heading"

import theme from "~/theme"

import Preview from "./Preview"
import SidebarControls from "./SidebarControls"

const Wrapper = styled.div`
    left: 0;
    position: fixed;
    top: 62px;
    width: ${props => (props.expanded ? 250 : 54)}px;
    height: calc(100vh - 62px);
    overflow: hidden;
    transition: 250ms all ease-in-out;
    background-color: ${theme.colorDarkerGrey};
    padding-bottom: 100px;
    z-index: 100;
    box-shadow: inset -3px 0px 6px rgba(0, 0, 0, 0.1),
        inset -3px 0px 6px rgba(0, 0, 0, 0.18);
    border-radius: 0;
`

const Previews = styled.div`
    padding: 15px;
    width: 100%;
    height: calc(100vh - 62px);
    overflow: auto;
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

    return (
        <Wrapper expanded={expanded}>
            <Previews>
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
            </Previews>
            <SidebarControls store={store} dispatch={dispatch} />
        </Wrapper>
    )
}

export default SectionOverview
