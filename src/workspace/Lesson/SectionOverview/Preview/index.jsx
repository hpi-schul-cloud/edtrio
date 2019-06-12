import React, { useRef, useImperativeHandle } from "react"
import styled, { css } from "styled-components"

import Flex from "~/components/Flex"

import theme from "~/theme"

import DnDHOC from "./DnDHOC"
import Editor from "./Editor"
import Controls from "./Controls"

const OuterMost = styled(Flex)`
    width: 100%;
    transition: 250ms all ease-in-out;
    transform: ${props => props.delete && "translateX(100%)"};
`

const Outer = styled.div`
    padding: 3px;
    border: 3px solid
        ${props => (props.active ? theme.primaryColor : "transparent")};
    border-radius: 3px;
    background: transparent;
    margin-bottom: 25px;
    width: ${props => {
        return props.expanded && props.editing ? "calc(100% - 30px)" : "100%"
    }};

    ${props =>
        !props.expanded &&
        css`
            width: 30px;
            height: 30px;
            border-radius: 15px;
        `}
`

const Wrapper = styled.div`
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.1);
    transition: 250ms all ease-in-out;
    position: relative;

    ${props =>
        props.expanded
            ? css`
                  padding: 15px 0;
                  height: 250px;
                  border-radius: 3px;
                  background-color: #fff;
              `
            : css`
                  border: 3px solid ${props => theme.primaryColor};
                  background-color: ${props =>
                      props.isDone ? theme.primaryColor : "#fff"};
                  width: 18px;
                  height: 18px;
                  border-radius: 9px;
              `}

    &:hover {
        box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.3);
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
        },
        ref,
    ) => {
        const expanded = store.sectionOverviewExpanded

        const activeSectionIndex = store.lesson.sections.findIndex(
            el => el.id === store.activeSectionId,
        )

        // DnD
        const previewRef = useRef(null)
        if (connectDragSource) {
            connectDragPreview(previewRef)
            connectDropTarget(previewRef)
            // const opacity = isDragging ? 0 : 1
            useImperativeHandle(ref, () => ({
                getNode: () => previewRef.current,
            }))
        }

        return (
            <OuterMost noWrap ref={previewRef} delete={section.delete}>
                <Controls
                    connectDragSource={connectDragSource}
                    sectionId={section.id}
                    store={store}
                    index={index}
                    dispatch={dispatch}
                    visible={section.visible}
                    sectionTitle={section.title}
                />
                <Outer
                    active={store.activeSectionId === section.id}
                    expanded={expanded}
                    editing={store.editing}>
                    <Wrapper
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
            </OuterMost>
        )
    },
)

export default DnDHOC(Preview)
