import React from "react"
import { storiesOf } from "@storybook/react"
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs"
import Container from "~/components/Container"
import Flex, { Column } from "~/components/Flex"
import Heading from "~/components/Heading"

const MockContent = ({ odd, ...props }) => (
    <div
        style={{
            margin: 25,
            width: 200,
            height: 200,
            backgroundColor: odd ? "#DDBDD5" : "#AC9FBB",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}
        {...props}
    />
)

const stories = storiesOf("Flex", module)
stories.addDecorator(withKnobs)

stories.add("Interactive", () => (
    <Container style={{ backgroundColor: "rgb(200, 200, 200)" }}>
        <Flex
            inline={boolean("inline", false, "display")}
            //--
            column={boolean("column", false, "flex-direction")}
            rowReverse={boolean("rowReverse", false, "flex-direction")}
            columnReverse={boolean("columnReverse", false, "flex-direction")}
            //--
            noWrap={boolean("noWrap", false, "flex-wrap")}
            wrapReverse={boolean("wrapReverse", false, "flex-wrap")}
            //--
            justifyCenter={boolean("justifyCenter", false, "justify-content")}
            justifyAround={boolean("justifyAround", false, "justify-content")}
            justifyBetween={boolean("justifyBetween", false, "justify-content")}
            justifyEvenly={boolean("justifyEvenly", false, "justify-content")}
            justifyEnd={boolean("justifyEnd", false, "justify-content")}
            //--
            alignEnd={boolean("alignEnd", false, "align-items")}
            alignCenter={boolean("alignCenter", false, "align-items")}
            alignBaseline={boolean("alignBaseline", false, "align-items")}
            alignStretch={boolean("alignStretch", false, "align-items")}
            //--
            contentStart={boolean("contentStart", false, "align-content")}
            contentEnd={boolean("contentEnd", false, "align-content")}
            contentCenter={boolean("contentCenter", false, "align-content")}
            contentBetween={boolean("contentBetween", false, "align-content")}
            contentAround={boolean("contentAround", false, "align-content")}
            //--
            style={{ backgroundColor: "#fff" }}>
            {[1, 2, 3, 4, 5].map(el => (
                <MockContent key={el} odd={el % 2 === 1}>
                    <Heading noMargin>{el}</Heading>
                </MockContent>
            ))}
        </Flex>
    </Container>
))

const columnStories = storiesOf("Flex/Column", module)

columnStories
    .add("Two Columns", () => (
        <Container style={{ backgroundColor: "rgb(200, 200, 200)" }}>
            <Flex>
                <Column
                    two
                    style={{ height: 200, backgroundColor: "#DDBDD5" }}
                />
                <Column
                    two
                    style={{ height: 200, backgroundColor: "#AC9FBB" }}
                />
            </Flex>
        </Container>
    ))
    .add("Three Columns", () => (
        <Container style={{ backgroundColor: "rgb(200, 200, 200)" }}>
            <Flex>
                <Column
                    three
                    style={{ height: 200, backgroundColor: "#DDBDD5" }}
                />
                <Column
                    three
                    style={{ height: 200, backgroundColor: "#AC9FBB" }}
                />
                <Column
                    three
                    style={{ height: 200, backgroundColor: "#DDBDD5" }}
                />
            </Flex>
        </Container>
    ))
    .add("Four Columns", () => (
        <Container style={{ backgroundColor: "rgb(200, 200, 200)" }}>
            <Flex>
                <Column
                    four
                    style={{ height: 200, backgroundColor: "#DDBDD5" }}
                />
                <Column
                    four
                    style={{ height: 200, backgroundColor: "#AC9FBB" }}
                />
                <Column
                    four
                    style={{ height: 200, backgroundColor: "#DDBDD5" }}
                />
                <Column
                    four
                    style={{ height: 200, backgroundColor: "#AC9FBB" }}
                />
            </Flex>
        </Container>
    ))
