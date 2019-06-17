import React, { Component } from "react"
import styled, { css } from "styled-components"
import { DragLayer } from "react-dnd"
import { isTouchDevice } from "~/utils/device"

import Editor from "./Editor"

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
    margin-bottom: 25px;
    width: ${props => {
        return props.expanded && props.editing ? "calc(100% - 30px)" : "100%"
    }};
    ${props =>
        !props.active &&
        css`
            border-color: transparent;
            background: transparent;
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

    ${props =>
        props.expanded
            ? css`
                  padding: 15px 0;
                  height: 250px;
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
                  transform: scale(0.7);
                  transform-origin: center center;

                  ${props =>
                      props.active &&
                      css`
                          transform: scale(1.1);
                      `}

                  &:hover {
                      transform: scale(1.1);
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
    return (
        <Outer
            ref={previewRef}
            active={store.activeSectionId === section.id}
            expanded={expanded}
            editing={store.editing}
            style={dragStyle}>
            <Wrapper
                active={store.activeSectionId === section.id}
                visible={section.visible}
                hidden={!section.visible && !store.editing}
                expanded={expanded}
                isDone={index <= activeSectionIndex}
                onClick={() => {
                    dispatch({
                        type: "SET_ACTIVE_SECTION",
                        payload: { id: section.id },
                    })
                }}>
                {expanded && (
                    <Editor
                        key={k}
                        expanded={expanded}
                        editing={store.editing}
                        docValue={section.docValue}
                    />
                )}
            </Wrapper>
        </Outer>
    )
}

export default DragLayer(collect)(EditorPreview)
