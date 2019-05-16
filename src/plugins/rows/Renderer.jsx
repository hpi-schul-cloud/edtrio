import React from "react"
import { getDocument, EditorContext } from "@edtr-io/core"

import RowContainer from "./RowContainer"

const RowsRenderer = props => {
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

export default RowsRenderer
