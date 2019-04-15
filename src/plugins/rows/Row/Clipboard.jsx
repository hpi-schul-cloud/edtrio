import * as React from "react"
import {
    Editor,
    EditorContext,
    getClipboard,
    PluginState,
    getPlugins,
} from "@edtr-io/core"
import styled from "styled-components"

const ClipboardHeader = styled.div({
    fontSize: 20,
    textAlign: "center",
    marginBottom: "10px",
})

const Container = styled.div({
    textAlign: "center",
    backgroundColor: "rgba(245, 245, 245, 1.00)",
    padding: 15,
    borderRadius: 5,
})

const ButtonContainer = styled.div({
    marginTop: "10px",
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-evenly",
})

const Preview = styled.div({
    display: "flex",
    width: "80px",
    height: "45px",
    overflow: "hidden",
    border: "1px solid black",
    margin: "0 5px",
})

const Button = styled.div({
    cursor: "pointer",
})

const PreventMouseEvents = styled.div({
    pointerEvents: "none",
})

const Clipboard = ({ onClose, ...props }) => {
    const store = React.useContext(EditorContext)
    const states = getClipboard(store.state)
    return (
        <Container>
            <ClipboardHeader> Zwischenablage </ClipboardHeader>
            <ButtonContainer>
                {states.length ? (
                    states.map((state, index) => {
                        return (
                            <Button key={index} onClick={() => onClose(state)}>
                                <Preview>
                                    <PreventMouseEvents>
                                        <Editor
                                            plugins={getPlugins(store.state)}
                                            defaultPlugin={
                                                store.state.defaultPlugin
                                            }
                                            initialState={state}
                                            editable={false}
                                        />
                                    </PreventMouseEvents>
                                </Preview>
                                <div>{state.plugin}</div>
                            </Button>
                        )
                    })
                ) : (
                    <div>Keine Elemente vorhanden</div>
                )}
            </ButtonContainer>
        </Container>
    )
}

export default Clipboard
