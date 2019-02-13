import { configure } from "@storybook/react"

function loadStories() {
    require("./stories/Container.jsx")
    require("./stories/Flex.jsx")
    require("./stories/Action.jsx")
    require("./stories/Button.jsx")
    require("./stories/Heading.jsx")
    require("./stories/Text.jsx")
    require("./stories/Loader.jsx")
}

configure(loadStories, module)
