import React, { useState, useEffect } from "react"
import { storiesOf } from "@storybook/react"
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs"
import Container from "~/components/Container"
import Text from "~/components/Text"
import Button, { Toggle as ToggleComponent } from "~/components/Button"

const stories = storiesOf("Button", module)
stories.addDecorator(withKnobs)

stories.add("Interactive", () => {
    return (
        <Container>
            <Button
                primary={boolean("primary", false)}
                secondary={boolean("secondary", false)}
                success={boolean("success", false)}
                danger={boolean("danger", false)}
                disabled={boolean("disabled", false)}
                outline={boolean("outline", false)}
                small={boolean("small", false)}
                large={boolean("large", false)}
                block={boolean("block", false)}
                full={boolean("full", false)}
                noMargin={boolean("noMargin", false)}
                onClick={() => console.log("Yess!")}>
                Click me!
            </Button>
            <Text>
                Etiam porta sem malesuada magna mollis euismod. Vestibulum id
                ligula porta felis euismod semper. Donec id elit non mi porta
                gravida at eget metus. Etiam porta sem malesuada magna mollis
                euismod. Donec id elit non mi porta gravida at eget metus.
                Aenean eu leo quam. Pellentesque ornare sem lacinia quam
                venenatis vestibulum. Etiam porta sem malesuada magna mollis
                euismod.
            </Text>
        </Container>
    )
})

const toggleStories = storiesOf("Button/Toggle", module)
toggleStories.addDecorator(withKnobs)

const Toggle = ({ ...props }) => {
    const [active, setActive] = useState(false)

    useEffect(() => {
        setActive(props.active)
    }, [props.active])

    return (
        <ToggleComponent
            {...props}
            active={active}
            onChange={newValue => setActive(newValue)}
        />
    )
}

toggleStories.add("Interactive", () => {
    return (
        <Container>
            <Toggle
                active={boolean("active", false)}
                caption={text("caption", "Click to toggle me!")}
                activeCaption={text("activeCaption", "")}
                alignEnd={boolean("alignEnd", false)}
                alignStart={boolean("alignStart", false)}
                columnReverse={boolean("columnReverse", false)}
            />
        </Container>
    )
})
