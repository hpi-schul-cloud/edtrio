import React from "react"
import { storiesOf } from "@storybook/react"
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs"
import Container from "~/components/Container"
import Flex from "~/components/Flex"
import Loader from "~/components/Loader"
import Heading from "~/components/Heading"

const stories = storiesOf("Loader", module)
stories.addDecorator(withKnobs)

stories.add("Interactive", () => {
    const white = boolean("white", false)
    return (
        <Container>
            <Flex
                justifyCenter
                alignCenter
                style={{
                    height: 400,
                    backgroundColor: white ? "#660220" : "transparent",
                }}>
                <Loader white={white} big={boolean("big", false)} />
            </Flex>
        </Container>
    )
})
