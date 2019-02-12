import React from "react"
import { BrowserRouter } from "react-router-dom"
import { storiesOf } from "@storybook/react"
import Container from "~/components/Container"
import Action from "~/components/Action"
import Text from "~/components/Text"

storiesOf("Action", module)
    .add("standard Action", () => (
        <BrowserRouter>
            <Container>
                <Action to="">Standard Action</Action>
            </Container>
        </BrowserRouter>
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
