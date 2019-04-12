import { StatefulPluginEditorProps } from "@edtr-io/core"
import styled from "styled-components"
import * as React from "react"

import { rowsState } from "."
import { Row } from "./Row"

const RowsContainer = styled.div({ position: "relative" })

export const RowsEditor = props => {
    const rows = props.state

    return (
        <RowsContainer>
            {rows.items.map((row, index) => {
                return (
                    <div key={row.id} style={{ position: "relative" }}>
                        <Row
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
