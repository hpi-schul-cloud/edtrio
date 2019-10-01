import React from "react"
import { storiesOf } from "@storybook/react"
import Container from "~/components/Container"
import Action from "~/components/Action"
import Text from "~/components/Text"

import { withKnobs, text, boolean, number } from "@storybook/addon-knobs"

const stories = storiesOf("Action", module)
stories.addDecorator(withKnobs)

stories
    .add("Interactive", () => (
        <Container>
            <Text noMargin style={{ backgroundColor: "#DDBDD5" }}>
                Placeholder
            </Text>
            <Action
                to=""
                secondary={boolean("secondary", false)}
                success={boolean("success", false)}
                danger={boolean("danger", false)}
                disabled={boolean("disabled", false)}
                block={boolean("block", false)}
                noMargin={boolean("noMargin", false)}
                onClick={() => console.log("Yess!")}>
                Interactive Action
            </Action>
            <Text style={{ backgroundColor: "#DDBDD5" }}>Placeholder</Text>
        </Container>
    ))
    .add("standard Action", () => (
        <Container>
            <Action to="">Standard Action</Action>
        </Container>
    ))
    .add("external Link", () => (
        <Container>
            <Action a to="//google.com" target="_blank">
                Open Google in a new tab
            </Action>
        </Container>
    ))
    .add("clickable", () => (
        <Container>
            <Text>
                This will only trigger an event, not change the browser
                location.
            </Text>
            <Action clickable onClick={() => console.log("clicked")}>
                Click me
            </Action>
        </Container>
    ))
    .add("default inline Action", () => (
        <Container>
            <Text inline style={{ backgroundColor: "#AC9FBB" }}>
                Placeholder Text&nbsp;
            </Text>
            <Action
                clickable
                onClick={() => console.log("clicked")}
                style={{ backgroundColor: "#DDBDD5" }}>
                default inline Action
            </Action>
            <Text inline style={{ backgroundColor: "#AC9FBB" }}>
                &nbsp;Placeholder Text
            </Text>
        </Container>
    ))
    .add("block Action", () => (
        <Container>
            <Text inline style={{ backgroundColor: "#AC9FBB" }}>
                Placeholder Text&nbsp;
            </Text>
            <Action
                block
                clickable
                onClick={() => console.log("clicked")}
                style={{ backgroundColor: "#DDBDD5" }}>
                block Action
            </Action>
            <Text inline style={{ backgroundColor: "#AC9FBB" }}>
                &nbsp;Placeholder Text
            </Text>
        </Container>
    ))
    .add("block Action without margin", () => (
        <Container>
            <Text inline style={{ backgroundColor: "#AC9FBB" }}>
                Placeholder Text&nbsp;
            </Text>
            <Action
                block
                noMargin
                clickable
                onClick={() => console.log("clicked")}
                style={{ backgroundColor: "#DDBDD5" }}>
                block Action without Margin
            </Action>
            <Text inline style={{ backgroundColor: "#AC9FBB" }}>
                &nbsp;Placeholder Text
            </Text>
        </Container>
    ))
