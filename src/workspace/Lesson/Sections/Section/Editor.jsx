import React, { useContext, useEffect } from "react"
import {
    Editor as Edtr,
    EditorContext,
    serializeDocument,
    StateType,
} from "@edtr-io/core"
import { rowsPlugin } from "@edtr-io/ui"
import { anchorPlugin } from "@edtr-io/plugin-anchor"
import { blockquotePlugin } from "@edtr-io/plugin-blockquote"
// import { highlightPlugin } from "@edtr-io/plugin-highlight"
// import { spoilerPlugin } from "@edtr-io/plugin-spoiler"
import { textPlugin } from "@edtr-io/plugin-text"
import { menuPlugin } from "~/plugins/menu/index"
// import nexboardPlugin from "~/plugins/nexboard"
import etherpadPlugin from "~/plugins/etherpad"
import {
    groupPlugin,
    advancedGroupPlugin,
    quickGroupPlugin,
} from "~/plugins/groups/index"

const counterState = StateType.number(0)

const counterPlugin = {
    // eslint-disable-next-line react/display-name
    Component: ({ focused, state }) => {
        return (
            <div>
                {state.value}
                <button
                    onClick={() => {
                        state.set(value => value + 1)
                    }}>
                    +
                </button>
            </div>
        )
    },
    state: counterState,
}

const plugins = {
    // rows: rowsPlugin,
    // anchor: anchorPlugin,
    counter: counterPlugin,
    // blockquote: blockquotePlugin,
    etherpad: etherpadPlugin,
    // nexboard: nexboardPlugin,
    // highlight: highlightPlugin,
    // spoiler: spoilerPlugin,
    text: textPlugin,
    group: groupPlugin,
    advancedGroup: advancedGroupPlugin,
    quickGroup: quickGroupPlugin,
    menu: menuPlugin,
}

export default class Editor extends React.Component {
    constructor(props) {
        super(props)
        this.docValue = this.props.docValue || { plugin: "menu" }
    }

    render() {
        return (
            <div
                style={{
                    minHeight: "500px",
                }}>
                <Edtr
                    plugins={plugins}
                    defaultPlugin={"menu"}
                    editable={true}
                    initialState={this.docValue}>
                    <ChangeListener
                        dispatchChange={this.props.dispatchChange}
                    />
                </Edtr>
            </div>
        )
    }
}

function ChangeListener({ dispatchChange }) {
    const store = useContext(EditorContext)
    useEffect(() => {
        dispatchChange(function() {
            return serializeDocument(store.state)
        })
    }, [store.state])
    return null
}
