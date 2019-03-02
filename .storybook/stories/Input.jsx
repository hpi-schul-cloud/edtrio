import React, { useState } from "react"
import { BrowserRouter } from "react-router-dom"
import { storiesOf } from "@storybook/react"
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs"

import Container from "~/components/Container"
import Input from "~/components/Input"

const StatefulInput = ({ ...props }) => {
    const [value, setValue] = useState("Schul Cloud")

    return (
        <Input
            value={value}
            onChange={newValue => setValue(newValue)}
            {...props}
        />
    )
}

const stories = storiesOf("Input/Text", module)
stories.addDecorator(withKnobs)

stories.add("Dynamic", () => {
    return (
        <BrowserRouter>
            <Container>
                <StatefulInput
                    size={number("size", 20)}
                    full={boolean("full", false)}
                    noMargin={boolean("noMargin", false)}
                    readOnly={boolean("readOnly", false)}
                />
                <div style={{ height: 250, backgroundColor: "#AC9FBB" }} />
            </Container>
        </BrowserRouter>
    )
})
