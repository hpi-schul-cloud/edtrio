import * as React from "react"
import styled, { css } from "styled-components"
import {
    getDocument,
    EditorContext,
    ActionType,
    getPlugins,
} from "@edtr-io/core"

import Menu from "./Menu"
import Controls from "./Controls"
import Globals from "./Globals"
import Settings from "./Settings"
import Separator, { Add } from "./Separator"
import render from "./render"

export const RowContainer = styled.div`
    margin-left: 25px;
    margin-right: 25px;

    ${props =>
        !props.noHeight &&
        css`
            min-height: 10px;
            margin: 25px;
            margin-top: ${props => (props.isFirst ? 25 : 0)}px;
        `}
    position: relative;
    border-left: 3px solid transparent;
    transition: 250ms all ease-in-out;
    padding-left: 25px;
    padding-right: 25px;

    &:hover {
        ${props =>
            props.editable &&
            css`
                border-color: rgba(177, 4, 56, 1);
                padding-top: 25px;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
                    0 1px 2px rgba(0, 0, 0, 0.24);
            `}
    }

    &:hover .row-controls {
        opacity: 1;
    }
`

export const Row = props => {
    const [hover, setHover] = React.useState(false)
    const [menu, setMenu] = React.useState(undefined)
    const store = React.useContext(EditorContext)
    const rows = props.state
    const index = props.index
    const row = rows()[index]
    const doc = getDocument(store.state, row.id)
    const plugins = getPlugins(store.state)

    const matchingPlugin = plugins[doc.plugin]

    function openMenu(insertIndex, replaceIndex) {
        setMenu({
            index: insertIndex,
            onClose: pluginState => {
                rows.insert(insertIndex, pluginState)
                setMenu(undefined)
                if (typeof replaceIndex === "number") {
                    rows.remove(replaceIndex)
                }
            },
        })
    }

    function duplicateRow() {
        rows.insert(index, doc)
    }

    return (
        <RowContainer
            noHeight={doc.plugin === "notes" && !props.editable}
            editable={props.editable}
            isFirst={index === 0}
            hover={hover}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>
            {index === 0 && (
                <Separator isFirst={true} onClick={() => openMenu(index)} />
            )}

            {render({ row, rows, index, store, getDocument })}
            <Separator onClick={() => openMenu(index + 1)} />
            {props.editable && (
                <React.Fragment>
                    <Controls
                        hover={hover}
                        index={index}
                        rows={rows}
                        row={row}
                    />
                    <Settings
                        index={index}
                        pluginName={matchingPlugin.title || doc.plugin}
                    />
                    <Globals
                        hover={hover}
                        index={index}
                        rows={rows}
                        duplicateRow={duplicateRow}
                        row={row}
                    />
                </React.Fragment>
            )}
            <Menu
                visible={!!menu}
                menu={menu}
                setMenu={setMenu}
                store={store}
                name={props.name}
            />
        </RowContainer>
    )
}
