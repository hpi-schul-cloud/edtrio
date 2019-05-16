import React, { useState } from "react"
import styled from "styled-components"
import "@reach/tabs/styles.css"

import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs"
// and the styles
import "@reach/tabs/styles.css"

const StyledWorkingPackages = styled.div`
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 3px;
`

export function WorkingPackages(props) {
    const { workingPackages, className, state } = props
    return (
        <StyledWorkingPackages className={className}>
            <Tabs>
                <TabList>
                    {workingPackages.map((workingPackage, id) => (
                        <Tab key={id}>{workingPackage.title}</Tab>
                    ))}
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
    )
}
