import React, { useState, useContext } from "react"
import styled from "styled-components"
import uuid from "uuid/v4"
import GroupsContext from "~/Contexts/Groups"

import Button from "../../../components/Button"
import Text from "../../../components/Text"
import { GroupEditor } from "../GroupEditor/index"

const StyledRoot = styled.div`
    display: flex;
    flex-direction: column;
    ${({ editable }) =>
        editable
            ? "border: 2px solid rgba(175, 4, 55, 1);"
            : "border: 2px solid #00640030;"}
`

const StyledPreferences = styled.div`
    display: flex;
    justify-content: flex-start;
`

const StyledHeader = styled.h2`
    margin-left: 16px;
`
const StyledExplanation = styled(Text)`
    margin-left: 16px;
`

const StyledOptions = styled.div`
    margin-left: 16px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

// ({ editable, focused, state })
export function AdvancedGroupEditor(props) {
    const { editable, state } = props
    const { state: groupState, setState: setGroupState } = useContext(
        GroupsContext,
    )

    const [chosenGroupSet, setChosenGroupSet] = useState(null)
    const [additionalProps, setAdditionalProps] = useState({})
    return (
        <StyledRoot editable={editable}>
            {!chosenGroupSet && editable && (
                <>
                    <StyledHeader>Gruppeniteration</StyledHeader>
                    <StyledExplanation size={14}>
                        Dies erlaubt es eine vorher benutzte
                        Gruppenkonstellation wieder zu verwenden. Die
                        Konstellationen tauchen in chronologischer Reihenfolge
                        auf.
                        <br />
                        {Object.entries(groupState).length === 0 && (
                            <span>
                                Aktuell gibt es keine Gruppen, die wieder
                                aufgegriffen werden könnten. Erstellen Sie zuvor
                                Gruppen mit dem <i>Einfache Gruppenarbeit</i>{" "}
                                oder <i>Komplexe Gruppenarbeit</i> Menü. Diese
                                tauchen dann automatisch hier auf.
                            </span>
                        )}
                    </StyledExplanation>
                    <StyledPreferences>
                        {Object.entries(groupState).map((entry, index) => {
                            const key = entry[0]
                            const value = entry[1]
                            return (
                                <StyledOptions key={index}>
                                    <Text>
                                        - {value.groups.length} Gruppe(n).{" "}
                                        {value.workingPackages.length}{" "}
                                        Aufgabenpaket(e).
                                    </Text>
                                    <Button
                                        onClick={() => {
                                            const newSetId = uuid()

                                            setChosenGroupSet(key)
                                            setAdditionalProps({
                                                previewId: key,
                                                setId: newSetId,
                                            })
                                            const newGroupState = {
                                                ...groupState,
                                            }
                                            newGroupState[newSetId] = {
                                                ...groupState[key],
                                            }
                                            setGroupState(newGroupState)
                                        }}>
                                        Übernehmen
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setChosenGroupSet(key)
                                            setAdditionalProps({
                                                previewId: key,
                                            })
                                            const newGroupState = {
                                                ...groupState,
                                            }
                                            setGroupState(newGroupState)
                                        }}>
                                        Als Vorlage für neue Gruppen übernehmen
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            const newSetId = uuid()

                                            setChosenGroupSet(key)
                                            setAdditionalProps({
                                                previewId: key,
                                                setId: newSetId,
                                            })
                                            const newGroupState = {
                                                ...groupState,
                                            }
                                            let newGroups = []
                                            // DO JIGSAW magic
                                            // largest group size = new group number
                                            const newGroupNumber = groupState[
                                                key
                                            ].groups
                                                .map(
                                                    group =>
                                                        group.students.length,
                                                )
                                                .reduce(function(a, b) {
                                                    return Math.max(a, b)
                                                })
                                            // create groups
                                            for (
                                                let i = 1;
                                                i <= newGroupNumber;
                                                i++
                                            ) {
                                                newGroups.push({
                                                    students: [],
                                                    name: `Gruppe ${i}`,
                                                    droppableId: `group ${i}`,
                                                    workingPackageId:
                                                        groupState[key]
                                                            .workingPackages[0]
                                                            .id,
                                                })
                                            }

                                            // fill new groups
                                            groupState[key].groups.forEach(
                                                (group, groupIndex) => {
                                                    group.students.forEach(
                                                        (
                                                            student,
                                                            studentIndex,
                                                        ) => {
                                                            newGroups[
                                                                studentIndex %
                                                                    newGroupNumber
                                                            ].students.push(
                                                                student,
                                                            )
                                                        },
                                                    )
                                                },
                                            )

                                            newGroupState[newSetId] = {
                                                ...groupState[key],
                                                groups: newGroups,
                                            }
                                            console.log(newGroupState[newSetId])

                                            setGroupState(newGroupState)
                                        }}>
                                        Durchmischen (JIGSAW)
                                    </Button>
                                </StyledOptions>
                            )
                        })}
                    </StyledPreferences>
                </>
            )}
            {chosenGroupSet && (
                <div>
                    <GroupEditor
                        state={state.groupState}
                        {...additionalProps}
                    />
                </div>
            )}
        </StyledRoot>
    )
}
