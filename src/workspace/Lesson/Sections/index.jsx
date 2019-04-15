import React from "react"
import styled from "styled-components"

import Flex from "~/components/Flex"

import SectionOverview from "./SectionOverview"
import Section from "./Section"

const Wrapper = styled(Flex)``

const Sections = ({ sections, editing, showSectionOverview, isFullScreen }) => {
    const filteredSections = sections.filter(section => {
        if (editing) return true
        return section.visible
    })
    return (
        <Wrapper justifyCenter style={{ width: "100%" }}>
            <SectionOverview
                sections={sections}
                editing={editing}
                visible={showSectionOverview}
                isFullScreen={isFullScreen}
            />
            <div
                style={{
                    width: "100%",
                    backgroundColor: "rgb(248, 248, 248)",
                }}>
                {filteredSections.map((section, index) => (
                    <Section
                        key={section.id}
                        index={index}
                        section={section}
                        isLast={index === filteredSections.length - 1}
                    />
                ))}
            </div>
        </Wrapper>
    )
}

export default Sections
