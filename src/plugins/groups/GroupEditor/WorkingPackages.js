import React, { useState } from "react"
import styled from "styled-components"

const StyledWorkingPackages = styled.div`
    border: 1px solid black;
`

const TabTitles = styled.div`
    display: flex;
`

const GroupTab = styled.div`
    flex: 1;
    padding: 0 8px;
    ${({ selected }) =>
        selected
            ? "border: 1px solid black; border-bottom: none;"
            : "border-bottom: 1px solid black;"}
`

export function WorkingPackages(props) {
    const { workingPackages, className, state } = props
    const [tabSelected, changeSelectedTab] = useState(0)
    return (
        <StyledWorkingPackages className={className}>
            Arbeitspakete:
            <TabTitles>
                {workingPackages.map((workingPackage, id) => (
                    <GroupTab
                        key={id}
                        selected={id === tabSelected}
                        onClick={() => changeSelectedTab(id)}>
                        {workingPackage.title}
                    </GroupTab>
                ))}
            </TabTitles>
            {state.value.workingPackages.items.map((item, index) => {
                console.log(item)
                return index === tabSelected ? (
                    <div key={index}>Arbeitspaket {item.render()}</div>
                ) : null
            })}
        </StyledWorkingPackages>
    )
}
