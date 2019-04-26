import {
    StatefulPluginEditorProps,
    getDocument,
    EditorContext,
    ActionType,
    getPlugins,
} from "@edtr-io/core"
import styled from "styled-components"
import * as React from "react"

import { rowsState } from "."
import Row from "./Row"

const RowsContainer = styled.div({ position: "relative" })

export const RowsEditor = props => {
    const rows = props.state

    const store = React.useContext(EditorContext)

    return (
        <RowsContainer>
            {rows.items.map((row, index) => {
                const doc = getDocument(store.state, row.id)
                return (
                    <div key={row.id} style={{ position: "relative" }}>
                        <Row
                            doc={doc}
                            store={store}
                            moveRow={(dragIndex, hoverIndex) => {
                                rows.remove(hoverIndex)
                                rows.insert(dragIndex, doc)
                            }}
                            state={props.state}
                            editable={props.editable}
                            focused={props.focused}
                            index={index}
                        />
                    </div>
                )
            })}
        </RowsContainer>
    )
}
