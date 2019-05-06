import React, { useImperativeHandle, useRef } from "react"
import { createPortal } from 'react-dom'
import { getDocument, getPlugins } from "@edtr-io/core"

import RowContainer from "../RowContainer"

import Menu from "./Menu"
import Separator from "./Separator"
import render from "./render"
import Controls, {
    createPrimarySettingsWrapper,
} from "./Controls"

import DnDHOC from "./DnDHOC"
import ExtendedSettingsWrapper from "./Controls/ExtendedSettings"


const Row = React.forwardRef(
    (
        {
            isDragging,
            connectDragSource,
            connectDropTarget,
            connectDragPreview,
            doc,
            store,
            ...props
        },
        ref,
    ) => {
        const [expanded, setExpanded] = React.useState(false)
        const [menu, setMenu] = React.useState(undefined)
        const [showExtendedSettings, setShowExtendedSettings] = React.useState(
            false,
        )
        const rows = props.state
        const index = props.index
        const row = rows()[index]
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

        // DnD
        const rowRef = useRef(null)
        if (connectDragSource) {
            connectDragPreview(rowRef)
            connectDropTarget(rowRef)
            // const opacity = isDragging ? 0 : 1
            useImperativeHandle(ref, () => ({
                getNode: () => rowRef.current,
            }))
        }

        function outsideClickListener(event) {
            // TODO
            if (rowRef.current.contains(event.target) || showExtendedSettings) return
            setExpanded(false)
            document.removeEventListener("mousedown", outsideClickListener)
        }

        return (
            <RowContainer
                ref={rowRef}
                noHeight={doc.plugin === "notes" && !props.editable}
                editable={props.editable}
                isFirst={index === 0}
                expanded={expanded}
                onMouseDown={() => {
                    setExpanded(true)
                    document.addEventListener("mousedown", outsideClickListener)
                }}>
                {index === 0 && (
                    <Separator isFirst={true} onClick={() => openMenu(index)} />
                )}

                {render({
                    row,
                    rows,
                    index,
                    store,
                    getDocument,
                    PrimarySettingsWrapper: createPrimarySettingsWrapper({
                        expanded,
                    }),
                })}
                <ExtendedSettingsWrapper
                    hideExtendedSettings={() => { setShowExtendedSettings(false) }}
                    expanded={expanded}
                    index={index}
                    rows={rows}
                    duplicateRow={() => rows.insert(index, doc)}
                    row={row}
                    extendedSettingsVisible={showExtendedSettings}
                />
                <Separator onClick={() => openMenu(index + 1)} />
                {props.editable && (
                    <React.Fragment>
                        <Controls
                            pluginName={matchingPlugin.title || doc.plugin}
                            index={index}
                            expanded={expanded}
                            setShowExtendedSettings={setShowExtendedSettings}
                            rows={rows}
                            row={row}
                            connectDragSource={connectDragSource}
                        />
                        <Menu
                            visible={!!menu}
                            menu={menu}
                            setMenu={setMenu}
                            store={store}
                            name={props.name}
                        />
                    </React.Fragment>
                )}
            </RowContainer>
        )
    },
)

export default DnDHOC(Row)
