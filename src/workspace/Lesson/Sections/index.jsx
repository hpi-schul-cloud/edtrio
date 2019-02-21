import React from "react"
import styled from "styled-components"
import Section from "./Section"

const Wrapper = styled.div``

const Sections = ({ sections }) => {
    return (
        <Wrapper>
            {sections.map((section, index) => (
                <Section
                    key={section.id}
                    section={section}
                    isLast={index === sections.length - 1}
                />
            ))}
        </Wrapper>
    )
}

export default Sections
