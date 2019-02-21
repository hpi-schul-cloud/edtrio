import React from "react"

import Action from "~/components/Action"
import Container from "~/components/Container"
import Text from "~/components/Text"
import Heading from "~/components/Heading"

const Dashboard = () => {
    return (
        <Container>
            <Heading primary>Dashboard</Heading>
            <Text>
                This is the sample entry point. Later on, we will load into the
                lesson directly.
            </Text>
            <Action to="/lesson/1234" block>
                Go to sample Lesson 1234
            </Action>
            <Action to="/lesson/5678" block>
                Go to sample Lesson 5678
            </Action>
            <Action to="/apollo/5678" block>
                Go to Apollo Playground
            </Action>
            <Action to="/editor" block>
                Go to Editor Playground
            </Action>
        </Container>
    )
}

export default Dashboard
