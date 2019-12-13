import React, { useContext, useRef } from "react"
import styled, { css } from "styled-components"

import api from "~/utils/api"

import dragIcon from "~/assets/drag-handle.svg"
import previewIcon from "~/assets/preview.svg"
import noPreviewIcon from "~/assets/no-preview.svg"
import trashIcon from "~/assets/trash.svg"
import settingsIcon from "~/assets/settings.svg"

import Flex from "~/components/Flex"

import DeleteModal from "./DeleteModal"

const StyledControls = styled(Flex)`
    width: 30px;
    padding: 0;
    overflow: hidden;
    flex-shrink: 0;

    transition: 250ms all ease-in-out;
    ${props =>
        !props.expanded
            ? css`
                  width: 0;
                  opacity: 0;
                  height: 0;
                  pointer-events: none;
              `
            : !props.editing &&
              css`
                  opacity: 0;
                  width: 30px;
                  height: 0;
                  pointer-events: none;
              `}
`

const Icon = styled.img`
    cursor: pointer;
    margin: 18px 5px;
    width: 20px;

    ${props =>
        !props.visible &&
        css`
            display: none;
        `}

    ${props => {
        return (
            props.drag &&
            css`
                cursor: grab;
                user-select: none;

                &:active {
                    cursor: grabbing;
                }
            `
        )
    }}

    ${props => {
        return (
            props.isOnly &&
            css`
                cursor: not-allowed;
                user-select: none;
                opacity: 0.5;
                &:active {
                    cursor: not-allowed;
                }
            `
        )
    }}
`

const DragHandle = ({ connectDragSource, ...props }) => {
    const dh = (
        <span style={{ height: 30 }}>
            <Icon src={dragIcon} drag {...props} visible onClick={() => {}} />
        </span>
    )

    return connectDragSource(dh)
}

const Controls = ({
    sectionId,
    store,
    index,
    dispatch,
    visible,
    sectionTitle,
    connectDragSource,
}) => {
    function handleOrderChange(down) {
        dispatch({
            type: "SWAP_SECTIONS",
            payload: [index, down === true ? index + 1 : index - 1],
        })
    }

    async function confirmDelete() {
        dispatch({
            type: "PREPARE_DELETE_SECTION",
            payload: sectionId,
        })

        setTimeout(() => {
            dispatch({
                type: "DELETE_SECTION",
                payload: sectionId,
            })
        }, 250)

        await api.delete(`/editor/sections/${sectionId}`)
    }

    const isOnly = store.lesson.sections.length === 1

    return (
        <StyledControls
            column
            alignStart
            editing={store.editing}
            expanded={store.sectionOverviewExpanded}>
            <DragHandle connectDragSource={connectDragSource} isOnly={isOnly} />
            <Icon
                src={settingsIcon}
                visible
                onClick={() => {
                    dispatch({ type: "TOGGLE_SECTION_SETTINGS" })
                }}
            />
            {/* <Icon
                src={visible ? previewIcon : noPreviewIcon}
                visible
                onClick={() => {
                    dispatch({ type: "SECTION_VISIBILITY", payload: sectionId })
                }}
            />
            <DeleteModal
                sectionTitle={sectionTitle || `Abschnitt ${index + 1}`}
                confirmDelete={confirmDelete}
                renderIcon={openModal => {
                    return (
                        <Icon
                            src={trashIcon}
                            isOnly={isOnly}
                            visible
                            onClick={e => !isOnly && openModal(e)}
                        />
                    )
                }}
            /> */}
        </StyledControls>
    )
}

export default Controls
