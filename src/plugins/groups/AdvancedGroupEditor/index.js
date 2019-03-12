import React, { useState } from "react"
import styled from "styled-components"

import {
    saveWorkingPackages,
    loadWorkingPackages,
} from "../localStorageHelpers"
import Button from "../../../components/Button"
import { GroupEditor } from "../GroupEditor/index"

const StyledRoot = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid red;
`

const StyledPreferences = styled.div`
    display: flex;
    justify-content: flex-start;
`

const StyledHeader = styled.h2`
    margin-left: 16px;
`

// ({ editable, focused, state })
export function AdvancedGroupEditor(props) {
    const { editable, state } = props
    const [workingPackagesSet, setWorkingPackagesSet] = useState({})
    const [chosenWorkingPackages, setChosenWorkingPackages] = useState(null)
    return (
        <StyledRoot>
            <StyledHeader>Erweiterte Gruppenarbeit</StyledHeader>
            <StyledPreferences>
                <Button
                    onClick={() =>
                        setWorkingPackagesSet(loadWorkingPackages())
                    }>
                    Lade vorige Gruppen
                </Button>
            </StyledPreferences>
            {chosenWorkingPackages ? (
                <div>
                    <GroupEditor
                        {...props}
                        startWorkingPackage={chosenWorkingPackages}
                    />
                </div>
            ) : (
                Object.entries(workingPackagesSet).map(
                    ([key, workingPackages], index) => {
                        return (
                            <div key={index}>
                                {key}
                                {workingPackages.map(
                                    (workingPackage, index) => {
                                        return (
                                            <div key={index}>
                                                {workingPackage.title}
                                            </div>
                                        )
                                    },
                                )}
                                <Button
                                    onClick={() =>
                                        setChosenWorkingPackages(
                                            workingPackages,
                                        )
                                    }>
                                    Dieses Set wählen
                                </Button>
                            </div>
                        )
                    },
                )
            )}
        </StyledRoot>
    )
}
