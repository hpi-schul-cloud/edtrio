import React, { useState } from "react"
import styled from "styled-components"
import Button from "../../components/Button"

import {
    GroupButton,
    SimpleGroupButton,
    AdvancedGroupButton,
    JigsawButton,
    TextButton,
    ImageButton,
    AssignmentButton,
} from "./actionButtons"

const StyledContentBox = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
`

const StyledRoot = styled.div`
    display: flex;
    flex-direction: column;
`
const StyledEditorBox = styled.div`
    flex: 2;
    padding-left: 12px;
`
const StyledPluginBox = styled.div`
    flex: 1;
    background-color: #666666;
    padding: 12px;
    min-height: -webkit-fill-available;
`

const StyledPlusButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`

export function PluginMenu(props) {
    const { state } = props
    const [showPlugins, setShowPlugins] = useState(true)

    return (
        <StyledRoot>
            <StyledContentBox>
                {showPlugins && (
                    <StyledPluginBox showPlugins={showPlugins}>
                        <TextButton state={state} />
                        <ImageButton state={state} />
                        <GroupButton state={state} />
                        <SimpleGroupButton state={state} />
                        <AdvancedGroupButton state={state} />
                        <AssignmentButton state={state} />
                        <JigsawButton state={state} />
                    </StyledPluginBox>
                )}
                <StyledEditorBox onClick={() => setShowPlugins(false)}>
                    {state.text.render()}
                    {state.children.items.map(child => {
                        return child.render()
                    })}
                </StyledEditorBox>
            </StyledContentBox>
            {!showPlugins && (
                <StyledPlusButtonContainer>
                    <Button onClick={() => setShowPlugins(true)}>+</Button>
                </StyledPlusButtonContainer>
            )}
        </StyledRoot>
    )
}
