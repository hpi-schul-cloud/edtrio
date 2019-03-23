import React, { useContext, useEffect } from "react"
import {
    Editor as Edtr,
    EditorContext,
    serializeDocument,
    StateType,
} from "@edtr-io/core"
import { rowsPlugin } from "@edtr-io/plugin-rows"
import { anchorPlugin } from "@edtr-io/plugin-anchor"
import { blockquotePlugin } from "@edtr-io/plugin-blockquote"
import { createImagePlugin } from "@edtr-io/plugin-image"

// import { highlightPlugin } from "@edtr-io/plugin-highlight"
// import { spoilerPlugin } from "@edtr-io/plugin-spoiler"
import { textPlugin } from "@edtr-io/plugin-text"
import { menuPlugin } from "~/plugins/menu/index"
// import nexboardPlugin from "~/plugins/nexboard"
import etherpadPlugin from "~/plugins/etherpad"
import assignmentPlugin from "~/plugins/assignment"
import {
    groupPlugin,
    advancedGroupPlugin,
    quickGroupPlugin,
} from "~/plugins/groups/index"

const uploadConfig = {
    url: "nothing_yet",
    paramName: "attachment[file]",
    maxFileSize: 2 * 1024 * 1024,
    allowedExtensions: ["gif", "jpg", "jpeg", "png", "svg"],
    getAdditionalFields: () => {
        return {
            type: "file",
            csrf: window.csrf,
        }
    },
    getStateFromResponse: response => {
        return {
            src: response.files[0].location,
        }
    },
}

const plugins = {
    // anchor: anchorPlugin,
    //counter: counterPlugin,
    // blockquote: blockquotePlugin,
    // nexboard: nexboardPlugin,
    // highlight: highlightPlugin,
    // spoiler: spoilerPlugin,
    Text: textPlugin,
    Bild: createImagePlugin({ upload: uploadConfig }),
    "Einfache Gruppenarbeit": quickGroupPlugin,
    Abgabe: assignmentPlugin,
    "Komplexe Gruppenarbeit": groupPlugin,
    Gruppeniteration: advancedGroupPlugin,
    Etherpad: etherpadPlugin,
    Reihe: rowsPlugin,
    // TODO:
    // Templates
}

export default class Editor extends React.Component {
    constructor(props) {
        super(props)
        this.docValue = this.props.docValue || {
            plugin: "Reihe",
            state: [{ plugin: "Text" }],
        }
    }

    render() {
        return (
            <div
                style={{
                    minHeight: "500px",
                }}>
                <Edtr
                    plugins={plugins}
                    defaultPlugin={"Reihe"}
                    editable={this.props.editing}
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
