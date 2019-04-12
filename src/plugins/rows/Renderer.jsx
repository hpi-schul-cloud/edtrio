import { StatefulPluginEditorProps } from "@edtr-io/core"
import { rowsState } from "."
import * as React from "react"

import { RowContainer } from "./Row"

export const RowsRenderer = props => {
    return (
        <React.Fragment>
            {props.state().map(row => {
                return <RowContainer key={row.id}>{row.render()}</RowContainer>
            })}
        </React.Fragment>
    )
}
