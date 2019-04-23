import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"

const Text = styled.p`
    font-style: italic;
    color: rgb(100, 100, 100);
    margin: 0;
`

const TextWrapper = styled.div`
    background-color: rgb(250, 250, 250);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    z-index: 50;
    transition: 250ms all ease-in-out;
    opacity: ${props => (props.visible ? 1 : 0)};
    pointer-events: ${props => (props.visible ? "all" : "none")};
    padding: 15px;
    border-radius: 5px;
    position: absolute;
    top: 0;
    left: 15px;
    transform: translateY(-50%);
    max-width: 100%;
`

const Positioner = styled.div`
    height: 0;
    width: 100%;
    transform: translateY(-13px);
    position: relative;
    z-index: 1;
`

const Trigger = styled.img`
    position: absolute;
    left: -10px;
    top: 0;
    transition: 250ms all ease-in-out;
    transform: translate(-100%, -50%);
    opacity: ${props => (props.visible ? 0.7 : 0.4)};
    height: 20px;
    cursor: pointer;
`

const Arrow = styled.div`
    width: 20px;
    height: 40px;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(-100%, -50%);
    overflow: hidden;
    background-color: transparent;
    z-index: 51;

    &::after {
        content: "";
        position: absolute;
        width: 20px;
        height: 20px;
        background: rgb(250, 250, 250);
        transform-origin: center center;
        transform: translate(50%, -50%) rotate(45deg);
        top: 50%;
        right: 0;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2), 0 3px 6px rgba(0, 0, 0, 0.27);
    }
`

const NotesRenderer = ({ state }) => {
    const [visible, setVisible] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        if (!visible) return
        function checkHide(event) {
            if (ref.current.contains(event.target)) return
            setVisible(false)

            document.removeEventListener("click", checkHide)
        }

        document.addEventListener("click", checkHide)
    }, [visible])

    if (!state.text.value) return null

    return (
        <Positioner>
            <Trigger
                src={require("./assets/logo.svg")}
                visible={visible}
                onClick={() => setVisible(!visible)}
            />
            <TextWrapper visible={visible} ref={ref}>
                <Arrow />
                <Text>{state.text.value}</Text>
            </TextWrapper>
        </Positioner>
    )
}

export default NotesRenderer
