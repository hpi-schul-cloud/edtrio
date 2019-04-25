import React, { useEffect, useRef } from "react"
import styled from "styled-components"

const Wrapper = styled.div`
    background-color: rgb(245, 245, 245);
    padding: 15px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const Textarea = styled.textarea`
    /* font-style: italic; */
    width: 100%;
    overflow: hidden;
    min-height: 30px;
    border: none;
    background-color: transparent;
    outline: none;
    color: rgb(100, 100, 100);
    resize: none;
    font-family: "Kalam", cursive;

    &::placeholder {
        color: rgb(140, 140 140);
    }
`

const NotesEditor = ({ focused, state }) => {
    useEffect(() => {
        adaptHeight()
    }, [])

    const r = useRef(null)

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
        <Wrapper>
            <Textarea
                ref={r}
                placeholder="Gib hier deine Notizen ein..."
                rows={1}
                value={state.text.value}
                onChange={evt => {
                    state.text.set(evt.target.value)
                    adaptHeight()
                }}
            />
        </Wrapper>
    )
}

export default NotesEditor
