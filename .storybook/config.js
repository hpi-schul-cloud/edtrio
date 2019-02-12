import { configure } from "@storybook/react"

function loadStories() {
    require("./stories/Container.jsx")
    require("./stories/Action.jsx")
    require("./stories/Heading.jsx")
    require("./stories/Text.jsx")
}

configure(loadStories, module)
