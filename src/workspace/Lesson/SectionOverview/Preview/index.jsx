import React, { useRef, useImperativeHandle } from "react"
import styled, { css } from "styled-components"

import Flex from "~/components/Flex"

import theme from "~/theme"

import DnDHOC from "./DnDHOC"

import Controls from "./Controls"
import EditorPreview from "./EditorPreview"
import { isTouchDevice } from "~/utils/device"


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
        const expanded = store.view.sectionOverviewExpanded

        const activeSectionIndex = store.sections.findIndex(
            el => el._id === store.view.activeSectionId,
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

        const p = (
            <div>
                    <EditorPreview
                        store={store}
                        section={section}
                        expanded={expanded}
                        index={index}
                        connectDragSource={connectDragSource}
                        activeSectionIndex={activeSectionIndex}
                        dispatch={dispatch}
                        wrapperRef={wrapperRef}
                        previewRef={previewRef}
                        isDragging={isDragging}
                        k={k}
                    />
            </div>
        )
        return connectDragSource(p)
    },
)

export default DnDHOC(Preview)
