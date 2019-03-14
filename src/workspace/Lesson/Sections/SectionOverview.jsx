import React, { useEffect, useState, useContext } from "react"
import styled, { css } from "styled-components"
import Heading from "~/components/Heading"

import { LessonContext } from "~/contexts/Lesson"

const Wrapper = styled.div`
    padding: 15px;
    position: fixed;
    left: 245px;
    top: 150px;
    width: 300px;
    max-width: 100vw;
    overflow: hidden;
    transform: ${props => (props.visible ? 0 : "translateX(-100%)")};
    opacity: ${props => (props.visible ? 1 : 0)};
    transition: 250ms all ease-in-out;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

    ${props =>
        props.isFullScreen &&
        css`
            left: 0;
            border-radius: 0 5px 5px 0;
        `}
`

const SectionTitle = styled(Heading)`
    color: ${props => (props.active ? undefined : "rgb(160, 160, 160)")};
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

function useScrollListener() {
    const [activeSectionIndex, setActiveSectionIndex] = useState(0)

    function scrollListener(evt) {
        let newActiveSection
        const domSections = Array.from(
            document.querySelectorAll(".lesson-section"),
        )

        if (
            window.innerHeight + window.pageYOffset >=
            document.body.offsetHeight - 5
        ) {
            newActiveSection = domSections[domSections.length - 1]
        } else {
            domSections.forEach(domSection => {
                const rect = domSection.getBoundingClientRect()
                if (rect.top > 0 && rect.top < window.innerHeight / 2)
                    newActiveSection = domSection
            })
        }

        if (newActiveSection)
            setActiveSectionIndex(parseInt(newActiveSection.dataset.section))
    }

    useEffect(() => {
        window.addEventListener("scroll", scrollListener)

        return () => window.removeEventListener("scroll", scrollListener)
    }, [])

    return [activeSectionIndex, setActiveSectionIndex]
}

function useResizeListener() {
    const { store, dispatch } = useContext(LessonContext)

    function resizeListener() {
        if (store.showSectionOverview && window.innerWidth < 1500) {
            dispatch({ type: "TOGGLE_SECTION_OVERVIEW", payload: false })
        }

        if (store.showSectionOverview === false && window.innerWidth > 1500) {
            dispatch({ type: "TOGGLE_SECTION_OVERVIEW", payload: true })
        }
    }

    useEffect(() => {
        if (window.innerWidth > 1500 && !store.bootstrapFinished) {
            dispatch({ type: "TOGGLE_SECTION_OVERVIEW", payload: true })
        }

        window.addEventListener("resize", resizeListener)
        return () => window.removeEventListener("resize", resizeListener)
    }, [store.showSectionOverview])
}

const SectionOverview = ({ sections, editing, visible, isFullScreen }) => {
    const [activeSectionIndex, setActiveSectionIndex] = useScrollListener()
    useResizeListener()
    return (
        <Wrapper visible={visible} isFullScreen={isFullScreen}>
            {sections
                .filter(section => {
                    if (editing) return true
                    return section.visible
                })
                .map((section, index) => (
                    <SectionTitle
                        h4
                        left
                        onClick={() => {
                            scrollToSection(index)
                        }}
                        style={{ marginTop: 0 }}
                        key={section.id}
                        active={index === activeSectionIndex}>
                        {section.title || "Neuer Abschnitt"}
                    </SectionTitle>
                ))}
        </Wrapper>
    )
}

export default SectionOverview
