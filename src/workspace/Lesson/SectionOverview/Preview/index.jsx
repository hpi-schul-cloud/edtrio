import React from "react"
import styled, { css } from "styled-components"

import Editor from "./Editor"

import theme from "~/theme"

const Outer = styled.div`
    padding: 3px;
    border: 3px solid
        ${props => (props.active ? theme.primaryColor : "transparent")};
    border-radius: 3px;
    background: transparent;
    margin-bottom: 25px;

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

    &::after {
        height: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        content: "";
    }
`

const Preview = ({ store, k, dispatch, section, index }) => {
    const expanded = store.sectionOverviewExpanded

    const activeSectionIndex = store.lesson.sections.findIndex(
        el => el.id === store.activeSectionId,
    )

    return (
        <Outer
            active={store.activeSectionId === section.id}
            expanded={expanded}>
            <Wrapper
                expanded={expanded}
                isDone={index <= activeSectionIndex}
                onClick={() => {
                    dispatch({
                        type: "SET_ACTIVE_SECTION",
                        payload: { id: section.id },
                    })
                }}>
                {expanded && <Editor key={k} docValue={section.docValue} />}
            </Wrapper>
        </Outer>
    )
}

export default Preview
