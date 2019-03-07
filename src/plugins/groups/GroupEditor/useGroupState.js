import { useState } from "react"

import { move, reorder } from "../helpers"

// TODO: Evaluate: are these needed?
function onBeforeDragStart() {
    /*...*/
}

function onDragStart() {
    /*...*/
}
function onDragUpdate() {
    /*...*/
}

// TODO: rewrite this to make it a lot easier...
// also use workingPackages.groups instead of only groups now

export function useGroupState(studentList) {
    const [workingPackages, setWorkingPackages] = useState([])
    const [unassignedStudents, setUnassignedStudents] = useState(studentList)

    function findGroupWithDroppableId(droppableId) {
        // This is extremely ugly, but I don't have that much time...
        let affectedWorkingPackageIndex = null
        let affectedGroupIndex = null
        workingPackages.forEach((workingPackage, workingPackageIndex) => {
            workingPackage.groups.forEach((group, index) => {
                if (group.droppableId === droppableId) {
                    affectedWorkingPackageIndex = workingPackageIndex
                    affectedGroupIndex = index
                }
            })
        })

        return {
            affectedWorkingPackageIndex,
            affectedGroupIndex,
        }
    }

    function reorderUnassignedStudents(sourceIndex, destinationIndex) {
        const newUnassignedStudents = reorder(
            unassignedStudents,
            sourceIndex,
            destinationIndex,
        )
        setUnassignedStudents(newUnassignedStudents)
    }

    function reorderGroup(droppableId, sourceIndex, destinationIndex) {
        const {
            affectedGroupIndex,
            affectedWorkingPackageIndex,
        } = findGroupWithDroppableId(droppableId)

        const newGroup = reorder(
            workingPackages[affectedWorkingPackageIndex][affectedGroupIndex]
                .students,
            sourceIndex,
            destinationIndex,
        )
        const newWorkingPackages = Array.from(workingPackages)
        const newGroups = Array.from(
            workingPackages[affectedWorkingPackageIndex].groups,
        )
        newGroups[affectedGroupIndex] = newGroup
        newWorkingPackages[affectedWorkingPackageIndex].groups = newGroups

        setWorkingPackages(newWorkingPackages)
    }

    function onDragEnd(result, state) {
        const { source, destination } = result
        const groups = workingPackages[0].groups

        // dropped outside the list
        if (!destination) {
            return
        }

        // reorder in the same list?
        if (source.droppableId === destination.droppableId) {
            if (source.droppableId === "unassignedStudents") {
                reorderUnassignedStudents(source.index, destination.index)
            } else {
                reorderGroup(
                    destination.droppableId,
                    source.index,
                    destination.index,
                )
            }
            // moved to another list
        } else {
            // determine source list array
            let sourceList

            if (source.droppableId === "unassignedStudents") {
                sourceList = unassignedStudents
            } else {
                const affectedGroup = groups.find(
                    group => group.droppableId === source.droppableId,
                )
                sourceList = affectedGroup.students
            }
            // determine destination list array
            let destinationList
            if (destination.droppableId === "unassignedStudents") {
                destinationList = unassignedStudents
            } else {
                const affectedGroup = groups.find(
                    group => group.droppableId === destination.droppableId,
                )
                destinationList = affectedGroup.students
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
            let newGroups = Array.from(groups)

            if (source.droppableId !== "unassignedStudents") {
                const affectedGroup = groups.find(
                    group => group.droppableId === source.droppableId,
                )
                newGroups = newGroups.map(group => {
                    const newGroup = group
                    if (group.droppableId === affectedGroup.droppableId)
                        newGroup.students = result[affectedGroup.droppableId]
                    return newGroup
                })
            }
            if (destination.droppableId !== "unassignedStudents") {
                const affectedGroup = groups.find(
                    group => group.droppableId === destination.droppableId,
                )
                newGroups = newGroups.map(group => {
                    const newGroup = group
                    if (group.droppableId === affectedGroup.droppableId)
                        newGroup.students = result[affectedGroup.droppableId]
                    return newGroup
                })
            }
            setGroups(newGroups)
        }
    }

    function addGroup(workingPackageIndex, groupName) {
        const newWorkingPackages = Array.from(workingPackages)
        newWorkingPackages[workingPackageIndex].groups.push({
            students: [],
            name: groupName,
            droppableId: groupName,
            workspace: groupName + "'s Sample group workspace",
        })
        setWorkingPackages(newWorkingPackages)
    }

    function addWorkingPackage(title) {
        const newWorkingPackages = Array.from(workingPackages)
        newWorkingPackages.push({
            groups: [],
            title,
            content: title + "'s Sample group workspace",
        })
        setWorkingPackages(newWorkingPackages)
    }

    function moveStudentsToRandomGroups() {
        let newGroups = Array.from(groups)
        let counter = 0
        unassignedStudents.forEach((student, id) => {
            newGroups[counter].students.push(student)
            counter++
            if (counter >= groups.length) counter = 0
        })
        setGroups(newGroups)
        setUnassignedStudents([])
    }
    return [
        workingPackages,
        unassignedStudents,
        onDragEnd,
        addGroup,
        addWorkingPackage,
        moveStudentsToRandomGroups,
    ]
}
