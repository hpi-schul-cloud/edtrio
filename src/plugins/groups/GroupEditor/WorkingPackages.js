import React, { useState } from "react"
import styled from "styled-components"

import Text from "../../../components/Text"

import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs"
// and the styles
import "@reach/tabs/styles.css"

const StyledWorkingPackages = styled.div`
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 3px;
    min-height: 145px;
`

const StyledAddTab = styled(Tab)`
    ${({ isEditable }) => (!isEditable ? "display: none" : "")}
`

export function WorkingPackages(props) {
    const {
        workingPackages,
        className,
        state,
        addWorkingPackage,
        editable,
        staticNumberOfWorkingPackages = false,
    } = props

    return (
        <div>
            <h3>Aufgabenpakete</h3>
            {editable && (
                <Text>
                    Erstelle hier die Aufgabenpakete, die du verschiedenen
                    Gruppen zuweisen möchtest.
                </Text>
            )}
            <StyledWorkingPackages className={className}>
                <Tabs
                    onChange={index => {
                        if (index === workingPackages.length && editable)
                            addWorkingPackage(
                                "Aufgabenpaket " + (workingPackages.length + 1),
                            )
                    }}>
                    <TabList>
                        {workingPackages.map((workingPackage, id) => (
                            <Tab key={id}>{workingPackage.title}</Tab>
                        ))}
                        <StyledAddTab
                            isEditable={
                                editable && !staticNumberOfWorkingPackages
                            }
                            key={"add_work_package"}>
                            +
                        </StyledAddTab>
                    </TabList>
                    <TabPanels>
                        {state.workingPackages.items.map((item, index) => {
                            return (
                                <TabPanel key={index}>
                                    <div>{item.render()}</div>
                                </TabPanel>
                            )
                        })}
                    </TabPanels>
                </Tabs>
            </StyledWorkingPackages>
        </div>
    )
}
