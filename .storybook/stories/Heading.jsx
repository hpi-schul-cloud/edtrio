import React from "react"
import { storiesOf } from "@storybook/react"
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs"
import Container from "~/components/Container"
import Action from "~/components/Action"
import Heading from "~/components/Heading"

storiesOf("Heading/Overview", module).add("Default", () => (
    <Container>
        <Heading>Default h1</Heading>
        <Heading h2>Default h2</Heading>
        <Heading h3>Default h3</Heading>
        <Heading h4>Default h4</Heading>
        <Heading h5>Default h5</Heading>
    </Container>
))

storiesOf("Heading/h1", module)
    .add("Default", () => (
        <Container>
            <Heading>Default</Heading>
        </Container>
    ))
    .add("primary", () => (
        <Container>
            <Heading primary>Default Primary</Heading>
        </Container>
    ))
    .add("noMargin", () => (
        <Container>
            <Heading style={{ backgroundColor: "#AC9FBB" }}>
                Default headings have margin bottom.
            </Heading>
            <Heading noMargin style={{ backgroundColor: "#DDBDD5" }}>
                You can also decide not to have margin.
            </Heading>
            <Heading style={{ backgroundColor: "#AC9FBB" }}>Lorem.</Heading>
        </Container>
    ))

storiesOf("Heading/h2", module)
    .add("Default", () => (
        <Container>
            <Heading h2>Default</Heading>
        </Container>
    ))
    .add("primary", () => (
        <Container>
            <Heading h2 primary>
                Primary
            </Heading>
        </Container>
    ))
    .add("noMargin", () => (
        <Container>
            <Heading h2 style={{ backgroundColor: "#AC9FBB" }}>
                Default headings have margin bottom.
            </Heading>
            <Heading h2 noMargin style={{ backgroundColor: "#DDBDD5" }}>
                You can also decide not to have margin.
            </Heading>
            <Heading h2 style={{ backgroundColor: "#AC9FBB" }}>
                Lorem.
            </Heading>
        </Container>
    ))
storiesOf("Heading/h3", module)
    .add("Default", () => (
        <Container>
            <Heading h3>Default</Heading>
        </Container>
    ))
    .add("primary", () => (
        <Container>
            <Heading h3 primary>
                Primary
            </Heading>
        </Container>
    ))
    .add("noMargin", () => (
        <Container>
            <Heading h3 style={{ backgroundColor: "#AC9FBB" }}>
                Default headings have margin bottom.
            </Heading>
            <Heading h3 noMargin style={{ backgroundColor: "#DDBDD5" }}>
                You can also decide not to have margin.
            </Heading>
            <Heading h3 style={{ backgroundColor: "#AC9FBB" }}>
                Lorem.
            </Heading>
        </Container>
    ))
storiesOf("Heading/h4", module)
    .add("Default", () => (
        <Container>
            <Heading h4>Default</Heading>
        </Container>
    ))
    .add("primary", () => (
        <Container>
            <Heading h4 primary>
                Primary
            </Heading>
        </Container>
    ))
    .add("noMargin", () => (
        <Container>
            <Heading h4 style={{ backgroundColor: "#AC9FBB" }}>
                Default headings have margin bottom.
            </Heading>
            <Heading h4 noMargin style={{ backgroundColor: "#DDBDD5" }}>
                You can also decide not to have margin.
            </Heading>
            <Heading h4 style={{ backgroundColor: "#AC9FBB" }}>
                Lorem.
            </Heading>
        </Container>
    ))
storiesOf("Heading/h5", module)
    .add("Default", () => (
        <Container>
            <Heading h5>Default</Heading>
        </Container>
    ))
    .add("primary", () => (
        <Container>
            <Heading h5 primary>
                Primary
            </Heading>
        </Container>
    ))
    .add("noMargin", () => (
        <Container>
            <Heading h5 style={{ backgroundColor: "#AC9FBB" }}>
                Default headings have margin bottom.
            </Heading>
            <Heading h5 noMargin style={{ backgroundColor: "#DDBDD5" }}>
                You can also decide not to have margin.
            </Heading>
            <Heading h5 style={{ backgroundColor: "#AC9FBB" }}>
                Lorem.
            </Heading>
        </Container>
    ))

const stories = storiesOf("Heading", module)
stories.addDecorator(withKnobs)

stories.add("Interactive Example", () => (
    <Container>
        <Heading
            style={{ backgroundColor: "#DDBDD5" }}
            right={boolean("right", false)}
            center={boolean("center", false)}
            primary={boolean("primary", false)}
            secondary={boolean("secondary", false)}
            tertiary={boolean("tertiary", false)}
            disabled={boolean("disabled", false)}
            success={boolean("success", false)}
            danger={boolean("danger", false)}
            h2={boolean("h2", false)}
            h3={boolean("h3", false)}
            h4={boolean("h4", false)}
            h5={boolean("h5", false)}
            noMargin={boolean("noMargin", false)}>
            Go to the Knobs Panel to change this Heading interactively :)
        </Heading>
        <Heading inline>Lorem.</Heading>
    </Container>
))
