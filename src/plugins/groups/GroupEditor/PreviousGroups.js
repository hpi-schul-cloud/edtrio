import React, { useState } from "react"
import styled from "styled-components"
import Text from "../../../components/Text"
import { FullStudent } from "../Student"

const StyledRoot = styled.div`
    background-color: #fff;
    border-radius: 0.25rem;
    margin-block-start: 1.33em;
    margin-bottom: 8px;
    padding: 12px 8px;
`

const StyledHeadline = styled(Text)`
    font-weight: bold;
`

const StyledGroup = styled.div`
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    margin: 4px 0px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 4px;
`

const StyledStudent = styled(FullStudent)`
    margin: 4px;
    background: rgba(0, 0, 0, 0.125);
    border: 1px solid rgba(0, 0, 0, 0.125);
    color: black;
`
const StyledSelect = styled.select`
    color: White;
    background: rgba(175, 4, 55, 1);
    border: 1px solid rgba(175, 4, 55, 1);
    border-radius: 3px;
`

const StyledExplanation = styled.div`
    margin-left: 8px;
`

export function PreviousGroups(props) {
    const { className, groupState, setId, previewId } = props

    const [selectedReferenceId, setSelectedReferenceId] = useState(previewId)
    return (
        <StyledRoot className={className}>
            <details>
                <summary>Andere Gruppen als Referenz anzeigen</summary>
                <StyledExplanation>
                    {Object.entries(groupState).length > 1 ? (
                        <StyledSelect
                            defaultValue={previewId}
                            onChange={event =>
                                setSelectedReferenceId(event.target.value)
                            }>
                            <option value="">Nichts darstellen</option>
                            {Object.entries(groupState)
                                .filter(entry => entry[0] !== setId)
                                .map((entry, index) => {
                                    const key = entry[0]
                                    const value = entry[1]
                                    return (
                                        <option key={index} value={key}>
                                            {value.groups.length} Gruppen.
                                        </option>
                                    )
                                })}
                        </StyledSelect>
                    ) : (
                        <div>
                            <Text noMargin inline>
                                Noch gibt es keine anderen Gruppen in diesem Arbeitsblatt, die referenziert werden könnten.
                            </Text>
                        </div>
                    )}
                </StyledExplanation>

                {groupState[selectedReferenceId] &&
                    groupState[selectedReferenceId].groups.map(
                        (group, groupIndex) => {
                            return (
                                <StyledGroup key={groupIndex}>
                                    {group.students.map((student, index) => {
                                        return (
                                            <StyledStudent
                                                key={index}
                                                name={student}
                                            />
                                        )
                                    })}
                                </StyledGroup>
                            )
                        },
                    )}
            </details>
        </StyledRoot>
    )
}
