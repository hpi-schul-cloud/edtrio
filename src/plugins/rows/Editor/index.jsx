import {
    StatefulPluginEditorProps,
    getDocument,
    EditorContext,
    ActionType,
    getPlugins,
} from "@edtr-io/core"
import styled from "styled-components"
import * as React from "react"

import Row from "./Row"

const RowsEditor = props => {
    const rows = props.state
    const store = React.useContext(EditorContext)
    return (
        <React.Fragment>
            {rows.items.map((row, index) => {
                const doc = getDocument(store.state, row.id)
                return (
                    <Row
                        key={row.id}
                        doc={doc}
                        store={store}
                        moveRow={(dragIndex, hoverIndex) => {
                            rows.move(dragIndex, hoverIndex)
                        }}
                        state={props.state}
                        editable={props.editable}
                        focused={props.focused}
                        index={index}
                    />
                )
            })}
        </React.Fragment>
    )
}

export default RowsEditor
