import React from "react"
import { storiesOf } from "@storybook/react"
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs"
import Container from "~/components/Container"
import Text from "~/components/Text"

storiesOf("Text/Overview", module)
    .add("default Text", () => (
        <Container>
            <Text>
                Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
                auctor. Aenean eu leo quam. Pellentesque ornare sem lacinia quam
                venenatis vestibulum. Praesent commodo cursus magna, vel
                scelerisque nisl consectetur et. Nulla vitae elit libero, a
                pharetra augue. Cum sociis natoque penatibus et magnis dis
                parturient montes, nascetur ridiculus mus. Nulla vitae elit
                libero, a pharetra augue.
            </Text>
        </Container>
    ))
    .add("inline Text", () => (
        <Container>
            <Text inline style={{ backgroundColor: "#AC9FBB" }}>
                Text can&nbsp;
            </Text>
            <Text inline style={{ backgroundColor: "#DDBDD5" }}>
                also be&nbsp;
            </Text>
            <Text inline style={{ backgroundColor: "#AC9FBB" }}>
                in inline chunks.
            </Text>
        </Container>
    ))
    .add("primary Text", () => (
        <Container>
            <Text>Default Text</Text>
            <Text primary>vs. primary Text</Text>
        </Container>
    ))
    .add("custom size", () => (
        <Container>
            <Text size={24}>
                You can manually adjust font size by passing a number.
            </Text>
        </Container>
    ))
    .add("noMargin", () => (
        <Container>
            <Text style={{ backgroundColor: "#AC9FBB" }}>
                By default, Text blocks do have margin.
            </Text>
            <Text noMargin style={{ backgroundColor: "#DDBDD5" }}>
                You can disable margin by passing{" "}
                <Text inline bold>
                    noMargin
                </Text>
                .
            </Text>
            <Text style={{ backgroundColor: "#AC9FBB" }}>Lorem.</Text>
        </Container>
    ))

const stories = storiesOf("Text", module)
stories.addDecorator(withKnobs)

stories.add("Interactive Example", () => (
    <Container>
        <Text
            style={{ backgroundColor: "#DDBDD5" }}
            size={number("size")}
            width={text("width (e.g: 70%)")}
            bold={boolean("bold", false)}
            right={boolean("right", false)}
            center={boolean("center", false)}
            primary={boolean("primary", false)}
            secondary={boolean("secondary", false)}
            tertiary={boolean("tertiary", false)}
            disabled={boolean("disabled", false)}
            success={boolean("success", false)}
            danger={boolean("danger", false)}
            inline={boolean("inline", false)}
            noMargin={boolean("noMargin", false)}>
            Go to the Knobs Panel to change this text interactively :)
        </Text>
        <Text inline>
            Nulla vitae elit libero, a pharetra augue. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Etiam porta sem
            malesuada magna mollis euismod. Sed posuere consectetur est at
            lobortis. Fusce dapibus, tellus ac cursus commodo, tortor mauris
            condimentum nibh, ut fermentum massa justo sit amet risus. Nulla
            vitae elit libero, a pharetra augue. Aenean lacinia bibendum nulla
            sed consectetur.
        </Text>
    </Container>
))
