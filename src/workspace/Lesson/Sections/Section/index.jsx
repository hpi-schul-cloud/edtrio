import React from "react"
import styled from "styled-components"

import Flex from "~/components/Flex"
import Container from "~/components/Container"
import Heading from "~/components/Heading"

const Wrapper = styled.div`
    width: 960px;
    padding: 25px;
    border-radius: 5px;

    transition: 250ms all ease-in-out;

    &:hover {
        box-shadow: 0 5px 25px -15px rgba(0, 0, 0, 1);
    }
`

const Separator = styled.div`
    width: 3px;
    border-radius: 1px;
    background-color: rgb(200, 200, 200);
    height: 75px;
`

const EditorContent = styled.div`
    background-color: rgb(230, 230, 230);
    min-height: 500px;
`

const Section = ({ section, isLast }) => {
    return (
        <Flex column alignCenter>
            <Wrapper>
                <Heading h3>{section.title}</Heading>
                <EditorContent />
            </Wrapper>
            {!isLast && <Separator />}
        </Flex>
    )
}

export default Section
