import React from "react"
import styled from "styled-components"

import Flex from "~/components/Flex"
import Text from "~/components/Text"

import SectionOverview from "./SectionOverview"
import Section from "./Section"

const Wrapper = styled(Flex)``

const Warning = styled(Text)`
    width: auto;
    max-width: 850px;
    padding: 15px;
    background-color: #cc0000;
    color: #fff;
`

const Sections = ({ sections, editing, showSectionOverview }) => {
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
            />
            <Flex justifyCenter>
                <Warning center bold>
                    +++ Alpha-Testversion +++ ohne Speicherfunktion +++ wir
                    freuen uns über Feedback 🙂 +++
                </Warning>
            </Flex>
            <div
                style={{
                    width: "100%",
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
