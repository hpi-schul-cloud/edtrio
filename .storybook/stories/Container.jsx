import React from "react"
import { BrowserRouter } from "react-router-dom"
import { storiesOf } from "@storybook/react"
import Container from "~/components/Container"
import Text from "~/components/Text"

storiesOf("Container", module)
    .add("default Container", () => (
        <Container style={{ backgroundColor: "#AC9FBB" }}>
            <div style={{ backgroundColor: "#fff" }}>
                <Text>
                    This container will adapt based on viewport width. If below
                    a certain threshold, the container will take up the full
                    width (except for some padding).
                </Text>
            </div>
        </Container>
    ))
    .add("full Container", () => (
        <Container full style={{ backgroundColor: "#AC9FBB" }}>
            <div style={{ backgroundColor: "#fff" }}>
                <Text>This container will always be full width.</Text>
            </div>
        </Container>
    ))
    .add("full vertical Container", () => (
        <Container fullVertical style={{ backgroundColor: "#AC9FBB" }}>
            <div style={{ backgroundColor: "#fff" }}>
                <Text>
                    <br />
                    This container will adapt its width based on the viewport,
                    but doesn't have vertical padding.
                    <br />
                    <br />
                </Text>
            </div>
        </Container>
    ))
    .add("small Container", () => (
        <Container small style={{ backgroundColor: "#AC9FBB" }}>
            <div style={{ backgroundColor: "#fff" }}>
                <Text noMargin>
                    <br />
                    This container will always have 15px padding. You can still
                    override (remove) it with the props&nbsp;
                    <Text bold inline>
                        full
                    </Text>
                    &nbsp;and&nbsp;
                    <Text bold inline>
                        fullWidth
                    </Text>
                    .
                    <br />
                    <br />
                </Text>
            </div>
        </Container>
    ))
