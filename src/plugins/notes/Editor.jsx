import React, { useEffect, useRef } from "react"
import styled, { css } from "styled-components"

import PrimarySettings from "./PrimarySettings"
import ExtendedSettings from "./ExtendedSettings"

const Wrapper = styled.div`
    background-color: ${props =>
        props.funky ? "rgba(249, 5, 126, 1.00)" : "rgb(245, 245, 245)"};
    padding: 15px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: 250ms all ease-in-out;

    ${props =>
        props.extraFunky &&
        css`
            border: 4px solid #73ee16;

            border-top-color: #03ffff;
            border-right-color: #ffe700;
            border-bottom-color: #1e00ff;
        `}
`

const Textarea = styled.textarea`
    /* font-style: italic; */
    width: 100%;
    overflow: hidden;
    min-height: 30px;
    border: none;
    background-color: transparent;
    outline: none;
    color: ${props => (props.funky ? "#fff" : "rgb(100, 100, 100)")};
    resize: none;
    font-family: ${props => (props.funky ? "Faster One" : "Kalam")}, cursive;
    ${props =>
        props.funky &&
        css`
            font-size: 20px;
        `}

    &::placeholder {
        color: rgb(140, 140 140);
    }
`

const NotesEditor = ({
    focused,
    state,
    PrimarySettingsWrapper,
    ExtendedSettingsWrapper,
}) => {
    useEffect(() => {
        adaptHeight()
    }, [])
    const r = useRef(null)

    useEffect(() => {
        console.log("rerender")
    }, [])

    function adaptHeight() {
        if (!r || !r.current) return
        const el = r.current
        const minHeight = 28
        var outerHeight = parseInt(window.getComputedStyle(el).height, 10)
        var diff = outerHeight - el.clientHeight

        el.style.height = 0
        el.style.height = Math.max(minHeight, el.scrollHeight + diff) + "px"
    }

    return (
        <React.Fragment>
            <Wrapper
                funky={state.primarySettings.funky.value}
                extraFunky={state.extendedSettings.extraFunky.value}>
                <Textarea
                    ref={r}
                    placeholder="Gib hier deine Notizen ein..."
                    rows={1}
                    value={state.text.value}
                    funky={state.primarySettings.funky.value}
                    onChange={evt => {
                        state.text.set(evt.target.value)
                        adaptHeight()
                    }}
                />
            </Wrapper>
            <PrimarySettingsWrapper>
                <PrimarySettings state={state} />
            </PrimarySettingsWrapper>
            <ExtendedSettingsWrapper>
                <ExtendedSettings state={state} />
            </ExtendedSettingsWrapper>
        </React.Fragment>
    )
}

export default NotesEditor
