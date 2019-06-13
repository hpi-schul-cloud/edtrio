import React, { useRef, useImperativeHandle } from "react"
import styled, { css } from "styled-components"

import Flex from "~/components/Flex"

import theme from "~/theme"

import DnDHOC from "./DnDHOC"

import Controls from "./Controls"
import EditorPreview from "./EditorPreview"
import { isTouchDevice } from "~/utils/device"

const OuterMost = styled(Flex)`
    width: 100%;
    transition: 250ms all ease-in-out;
    transform: ${props => props.delete && "translateX(100%)"};
`

/* eslint-disable */
const Preview = React.forwardRef(
    (
        {
            store,
            k,
            dispatch,
            section,
            index,
            isDragging,
            connectDragSource,
            connectDropTarget,
            connectDragPreview,
            ...props
        },
        ref,
    ) => {
        const expanded = store.sectionOverviewExpanded

        const activeSectionIndex = store.lesson.sections.findIndex(
            el => el.id === store.activeSectionId,
        )

        // DnD
        const wrapperRef = useRef(null)
        const previewRef = useRef(null)
        if (connectDragSource) {
            connectDragPreview(previewRef)
            connectDropTarget(wrapperRef)
            // const opacity = isDragging ? 0 : 1
            useImperativeHandle(ref, () => ({
                getNode: () => wrapperRef.current,
            }))
        }

        return (
            <React.Fragment>
                <OuterMost noWrap ref={wrapperRef} delete={section.delete}>
                    <Controls
                        connectDragSource={connectDragSource}
                        sectionId={section.id}
                        store={store}
                        index={index}
                        dispatch={dispatch}
                        visible={section.visible}
                        sectionTitle={section.title}
                    />
                    <EditorPreview
                        store={store}
                        section={section}
                        expanded={expanded}
                        index={index}
                        activeSectionIndex={activeSectionIndex}
                        dispatch={dispatch}
                        wrapperRef={wrapperRef}
                        previewRef={previewRef}
                        isDragging={isDragging}
                        k={k}
                    />
                </OuterMost>
            </React.Fragment>
        )
    },
)

export default DnDHOC(Preview)
