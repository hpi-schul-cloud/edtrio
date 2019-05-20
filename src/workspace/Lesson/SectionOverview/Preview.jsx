import React from "react"
import styled from "styled-components"

import Editor from "./Editor"

import theme from "~/theme"

const Outer = styled.div`
    padding: 3px;
    border: 3px solid
        ${props => (props.active ? theme.primaryColor : "transparent")};
    border-radius: 3px;
    background: transparent;
    margin-bottom: 25px;
`

const Wrapper = styled.div`
    background-color: #fff;
    padding: 15px 0;
    height: 250px;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.1);
    transition: 250ms all ease-in-out;
    border-radius: 3px;
    position: relative;

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
        /* background: linear-gradient(
            0deg,
            rgba(212, 208, 208, 1) 0%,
            rgba(230, 226, 226, 0) 100%
        ); */
    }
`

const Preview = ({ store, k, dispatch, section, index }) => {
    return (
        <Outer active={store.activeSectionId === section.id}>
            <Wrapper
                onClick={() => {
                    dispatch({
                        type: "SET_ACTIVE_SECTION",
                        payload: { id: section.id },
                    })
                }}>
                <Editor key={k} docValue={section.docValue} />
            </Wrapper>
        </Outer>
    )
}

export default Preview
