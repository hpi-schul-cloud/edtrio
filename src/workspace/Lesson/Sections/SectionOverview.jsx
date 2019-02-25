import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Heading from "~/components/Heading"

const Wrapper = styled.div`
    padding: 15px;
    position: fixed;
    left: 0;
    top: 125px;
    width: 300px;
    max-width: 300px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`

const SectionTitle = styled(Heading)`
    color: ${props => (props.active ? undefined : "rgb(160, 160, 160)")};
    transition: 250ms all ease-in-out;
    transform: ${props => !props.active && "scale(0.8)"};
    transform-origin: left center;
    margin-bottom: 0px;
    max-width: 100%;
    text-overflow: ellipsis;
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

const SectionOverview = ({ sections }) => {
    const [activeSectionIndex, setActiveSectionIndex] = useScrollListener()

    return (
        <Wrapper>
            {sections.map((section, index) => (
                <SectionTitle
                    h4
                    left
                    onClick={() => {
                        scrollToSection(index)
                    }}
                    key={section.id}
                    active={index === activeSectionIndex}>
                    {section.title || "Neuer Abschnitt"}
                </SectionTitle>
            ))}
        </Wrapper>
    )
}

export default SectionOverview
