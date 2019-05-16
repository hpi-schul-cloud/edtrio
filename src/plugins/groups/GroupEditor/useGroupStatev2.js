import { useState, useEffect } from "react"
import uuid from "uuid/v4"

import { move, reorder, shuffle } from "./helpers"
import { StateType } from "@edtr-io/core"

export function useGroupState(startValue, state) {
    // TODO: If state is empty, populate with startValue

    // TODO: Go through groups and remove students already in groups from unassignedStudents

    const [workingPackages, setWorkingPackages] = useState(
        startValue.workingPackages,
    )
    const [groups, setGroups] = useState(startValue.groups)
    const [unassignedStudents, setUnassignedStudents] = useState(
        startValue.unassignedStudents,
    )
    if (
        startValue.workingPackages.length > state.workingPackages.items.length
    ) {
        const j =
            startValue.workingPackages.length -
            state.workingPackages.items.length
        for (let i = 0; i < j; i++) {
            state.workingPackages.insert(state.workingPackages.items.length, {
                plugin: "rows",
                state: [{ plugin: "text" }],
            })
        }
    }

    function addGroup(workingPackageId, groupName) {
        const newGroups = Array.from(groups)
        newGroups.push({
            students: [],
            name: groupName,
            droppableId: `${workingPackageId} - ${groupName}`,
            workingPackageId,
        })

        setGroups(newGroups)
    }

    function addWorkingPackage(title) {
        const newWorkingPackages = Array.from(workingPackages)
        newWorkingPackages.push({
            title,
            id: uuid(),
        })
        state.workingPackages.insert(state.workingPackages.items.length, {
            plugin: "rows",
            state: [{ plugin: "text" }],
        })
        setWorkingPackages(newWorkingPackages)
    }

    function findGroupWithDroppableId(droppableId) {
        return groups.find(group => group.droppableId === droppableId)
    }

    function onDragEnd(result) {
        const { source, destination } = result

        // dropped outside the list
        if (!destination) {
            return
        }
        // reorder in the same list?
        if (source.droppableId === destination.droppableId) {
            if (source.droppableId === "unassignedStudents") {
                const newUnassignedStudents = reorder(
                    unassignedStudents,
                    source.index,
                    destination.index,
                )
                setUnassignedStudents(newUnassignedStudents)
            } else {
                const affectedGroup = findGroupWithDroppableId(
                    destination.droppableId,
                )
                const newGroupStudents = reorder(
                    affectedGroup.students,
                    source.index,
                    destination.index,
                )
                const newGroups = Array.from(groups)
                newGroups.find(
                    group => group.droppableId === destination.droppableId,
                ).students = newGroupStudents
                setGroups(newGroups)
            }
            // moved to another list
        } else {
            let sourceGroupIndex,
                sourceGroup,
                destinationGroupIndex,
                destinationGroup
            let sourceList
            if (source.droppableId === "unassignedStudents") {
                sourceList = unassignedStudents
            } else {
                const affectedGroup = findGroupWithDroppableId(
                    source.droppableId,
                )
                sourceList = affectedGroup.students
                sourceGroup = affectedGroup
            }
            // determine destination list array
            let destinationList
            if (destination.droppableId === "unassignedStudents") {
                destinationList = unassignedStudents
            } else {
                const affectedGroup = findGroupWithDroppableId(
                    destination.droppableId,
                )
                destinationList = affectedGroup.students
                destinationGroup = affectedGroup
            }

            // move the student around
            const result = move(
                sourceList,
                destinationList,
                source,
                destination,
            )

            // update unassignedStudents, if necessary
            if (
                source.droppableId === "unassignedStudents" ||
                destination.droppableId === "unassignedStudents"
            ) {
                setUnassignedStudents(result.unassignedStudents)
            }
            // update groups for source and destination, if necesssary
            const newGroups = Array.from(groups)

            if (sourceGroup !== undefined) {
                newGroups.find(
                    group => group.droppableId === sourceGroup.droppableId,
                ).students = result[source.droppableId]
            }
            if (destinationGroup !== undefined) {
                newGroups.find(
                    group => group.droppableId === destinationGroup.droppableId,
                ).students = result[destination.droppableId]
            }

            setGroups(newGroups)
        }
    }

    function moveStudentsToRandomGroups() {
        const newGroups = Array.from(groups)
        // determine groups number

        const numberOfGroups = groups.length

        newGroups.forEach(group => {
            group.students = Array.from(group.students)
        })
        unassignedStudents.forEach((student, id) => {
            const newGroupNumber = Math.floor(Math.random() * numberOfGroups)
            let counter = 0
            newGroups[newGroupNumber].students.push(student)
        })
        setGroups(newGroups)
        setUnassignedStudents([])
    }

    function changeGroupName(index, name) {
        const newGroups = Array.from(groups)
        newGroups[index].name = name
        setGroups(newGroups)
    }

    function assignRandomStudent() {
        const newGroups = Array.from(groups)
        const newUnassignedStudents = Array.from(unassignedStudents)
        const randomStudentIndex = Math.floor(
            Math.random() * unassignedStudents.length,
        )
        const randomGroupIndex = Math.floor(Math.random() * groups.length)
        const randomGroupStudentIndex = Math.floor(
            Math.random() * newGroups[randomGroupIndex].students.length,
        )
        const [removed] = newUnassignedStudents.splice(randomStudentIndex, 1)
        newGroups[randomGroupIndex].students = Array.from(
            newGroups[randomGroupIndex].students,
        )
        newGroups[randomGroupIndex].students.splice(
            randomGroupStudentIndex,
            0,
            removed,
        )
        setGroups(newGroups)
        setUnassignedStudents(newUnassignedStudents)
    }

    function createAndFillGroups(numberOfGroups) {
        let students = [...unassignedStudents]
        groups.forEach(group => {
            students = [...students, ...group.students]
        })
        const newGroups = []
        // create groups
        for (let i = 1; i <= numberOfGroups; i++) {
            newGroups.push({
                students: [],
                name: `Gruppe ${i}`,
                droppableId: `group ${i}`,
                workingPackageId: workingPackages[0].id,
            })
        }
        // fill groups
        const newUnassignedStudents = shuffle(students)
        newUnassignedStudents.forEach((student, index) => {
            newGroups[index % numberOfGroups].students.push(student)
        })
        setGroups(newGroups)
        setUnassignedStudents([])
    }

    function createEmptyGroups(numberOfGroups) {
        let students = [...unassignedStudents]
        groups.forEach(group => {
            students = [...students, ...group.students]
        })
        const newGroups = []
        // create groups
        for (let i = 1; i <= numberOfGroups; i++) {
            newGroups.push({
                students: [],
                name: `Gruppe ${i}`,
                droppableId: `group ${i}`,
                workingPackageId: workingPackages[0].id,
            })
        }

        setGroups(newGroups)
        setUnassignedStudents(students)
    }

    function removeStudentsFromAllGroups() {
        let newUnassignedStudents = Array.from(unassignedStudents)
        let newGroups = Array.from(groups)

        newGroups.forEach(group => {
            group.students.forEach((student, index) => {
                newUnassignedStudents.push(student)
            })
            group.students = []
        })
        setUnassignedStudents(newUnassignedStudents)
        setGroups(newGroups)
    }
    return [
        workingPackages,
        groups,
        unassignedStudents,
        onDragEnd,
        addGroup,
        addWorkingPackage,
        moveStudentsToRandomGroups,
        removeStudentsFromAllGroups,
        createAndFillGroups,
        createEmptyGroups,
        changeGroupName,
        assignRandomStudent,
    ]
}
