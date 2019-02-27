import React from "react"
import styled from "styled-components"

import Flex from "~/components/Flex"

import SectionOverview from "./SectionOverview"
import Section from "./Section"

const Wrapper = styled(Flex)``

const Sections = ({ sections, editing, showSectionOverview }) => {
    return (
        <Wrapper justifyCenter style={{ width: "100%" }}>
            <SectionOverview
                sections={sections}
                editing={editing}
                visible={showSectionOverview}
            />
            <div style={{ width: "100%" }}>
                {sections
                    .filter(section => {
                        if (editing) return true
                        return section.visible
                    })
                    .map((section, index) => (
                        <Section
                            key={section.id}
                            index={index}
                            section={section}
                            isLast={index === sections.length - 1}
                        />
                    ))}
            </div>
        </Wrapper>
    )
}

export default Sections
