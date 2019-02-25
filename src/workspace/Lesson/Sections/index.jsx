import React from "react"
import styled from "styled-components"

import Flex from "~/components/Flex"

import SectionOverview from "./SectionOverview"
import Section from "./Section"

const Wrapper = styled(Flex)``

const Sections = ({ sections }) => {
    return (
        <Wrapper justifyCenter>
            <SectionOverview sections={sections} />
            <div>
                {sections.map((section, index) => (
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
