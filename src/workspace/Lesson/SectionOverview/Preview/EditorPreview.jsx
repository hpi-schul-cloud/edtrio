import React, { Component, useState, useEffect, useMemo } from "react"
import styled, { css } from "styled-components"
import { DragLayer } from "react-dnd"
import { isTouchDevice } from "~/utils/device"

import Editor from "./Editor"
import { setActiveSection } from "~/Contexts/view.actions"

function collect(monitor) {
    return {
        sourceOffset: monitor.getSourceClientOffset(),
    }
}

const Outer = styled.div`
    /* padding: 3px; */
    border: 10px solid
        ${props => (props.active ? "rgba(163, 163, 163, 1.00)" : "transparent")};
    border-radius: 3px;
    background: ${props =>
        props.expanded ? "rgba(163, 163, 163, 1)" : "transparent"};
    flex-shrink: 0;
    margin: 8px 0;
    width: 155px;
    height: 118px;
    flex-shrink: 0;
    transition: 250ms all ease-in-out;

    ${props =>
        !props.active
            ? css`
                  border-color: transparent;
                  background: transparent;
              `
            : css`
                  margin: 24px 0;
              `}
    ${props =>
        !props.expanded &&
        css`
            width: 30px;
            height: 30px;
            border-radius: 15px;
            border-color: transparent;
        `}
`

const Wrapper = styled.div`
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.4);
    transition: 250ms all ease-in-out;
    position: relative;
    font-size: 20px;
    line-height: 1.42;
    width: 135px;
    height: 98px;
    flex-shrink: 0;

    ${props =>
        props.expanded
            ? css`
                  padding: 15px 0;
                  height: 98px;
                  border-radius: 3px;
                  background-color: #fff;
                  border: 3px solid rgba(68, 68, 68, 1);
                  ${props =>
                      !props.active &&
                      css`
                          border-color: #fff;
                      `}
              `
            : css`
                  border: 3px solid transparent;
                  background-color: rgba(170, 170, 170, 1);
                  width: 18px;
                  height: 18px;
                  border-radius: 9px;
                  box-shadow: none !important;
                  transform: scale(0.5);
                  transform-origin: center center;

                  ${props =>
                      props.active &&
                      css`
                          transform: scale(1);
                      `}

                  &:hover {
                      transform: scale(1);
                  }
              `}

    &:hover {
        box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.6);
    }

    ${({ visible }) => {
        return (
            !visible &&
            css`
                opacity: 0.7;
            `
        )
    }}

    display: ${({ hidden }) => hidden && "none"};

`

const EditorPreview = ({
    store,
    section,
    expanded,
    index,
    activeSectionIndex,
    dispatch,
    previewRef,
    wrapperRef,
    isDragging,
    sourceOffset,
    k,
}) => {
    const dragStyle =
        !isDragging || !isTouchDevice()
            ? {}
            : {
                transform: sourceOffset
                    ? `translate(${sourceOffset.x}px, ${sourceOffset.y -
                        wrapperRef.current.offsetTop}px)`
                    : "",
            }

    // reduzing the time a preview is rendered, added for performance reasosns
    const [docValue, setDocValue] = useState(section.docValue)
    useEffect(() => {
        setDocValue(docValue)
    }, [section.changed.size])

    return (
        <Outer
            ref={previewRef}
            active={store.view.activeSectionId === section._id}
            expanded={expanded}
            editing={store.view.editing}
            style={dragStyle}>
            <Wrapper
                active={store.view.activeSectionId === section._id}
                visible={section.visible}
                hidden={!section.visible && !store.view.editing}
                expanded={expanded}
                isDone={index <= activeSectionIndex}
                onClick={() => {
                    dispatch(setActiveSection(section._id))
                }}>
                {expanded && (
                    <Editor
                        key={k}
                        expanded={expanded}
                        editing={store.view.editing}
                        docValue={docValue}
                    />
                )}
            </Wrapper>
        </Outer>
    )
}

export default DragLayer(collect)(EditorPreview)
