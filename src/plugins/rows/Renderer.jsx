import {
    StatefulPluginEditorProps,
    getDocument,
    EditorContext,
} from "@edtr-io/core"
import { rowsState } from "."
import * as React from "react"

import { RowContainer } from "./Row"

export const RowsRenderer = props => {
    const store = React.useContext(EditorContext)

    return (
        <React.Fragment>
            {props.state().map(row => {
                const doc = getDocument(store.state, row.id)

                return (
                    <RowContainer
                        noHeight={doc.plugin === "notes"}
                        key={row.id}>
                        {row.render()}
                    </RowContainer>
                )
            })}
        </React.Fragment>
    )
}
