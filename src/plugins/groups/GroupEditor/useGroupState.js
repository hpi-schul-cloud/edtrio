import { useState, useEffect } from "react"

import { move, reorder, shuffle } from "./helpers"

// TODO: rewrite this to make it a lot easier...

export function useGroupState(studentList, editorStateValue, state) {
    const startValue = Array.isArray(editorStateValue) ? editorStateValue : []

    const [workingPackages, setWorkingPackages] = useState(startValue)
    const [unassignedStudents, setUnassignedStudents] = useState(studentList)

    function updateWorkingPackages(newWorkingPackages) {
        editorStateValue = newWorkingPackages
        setWorkingPackages(newWorkingPackages)
    }

    useEffect(() => {
        startValue.forEach(() => {
            state.workingPackages.insert(state.workingPackages.items.length, {
                plugin: "counter",
            })
        })
    }, [startValue])

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

        const newGroupStudents = reorder(
            workingPackages[affectedWorkingPackageIndex].groups[
                affectedGroupIndex
            ].students,
            sourceIndex,
            destinationIndex,
        )
        const newWorkingPackages = Array.from(workingPackages)
        const newGroups = Array.from(
            workingPackages[affectedWorkingPackageIndex].groups,
        )
        newGroups[affectedGroupIndex].students = newGroupStudents
        newWorkingPackages[affectedWorkingPackageIndex].groups = newGroups

        updateWorkingPackages(newWorkingPackages)
    }

    function onDragEnd(result, state) {
        const { source, destination } = result

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
            let sourceGroupIndex,
                sourceWorkingPackageIndex,
                destinationGroupIndex,
                destinationWorkingPackageIndex
            let sourceList

            if (source.droppableId === "unassignedStudents") {
                sourceList = unassignedStudents
            } else {
                const {
                    affectedGroupIndex,
                    affectedWorkingPackageIndex,
                } = findGroupWithDroppableId(source.droppableId)
                sourceGroupIndex = affectedGroupIndex
                sourceWorkingPackageIndex = affectedWorkingPackageIndex
                sourceList =
                    workingPackages[affectedWorkingPackageIndex].groups[
                        affectedGroupIndex
                    ].students
            }
            // determine destination list array
            let destinationList
            if (destination.droppableId === "unassignedStudents") {
                destinationList = unassignedStudents
            } else {
                const {
                    affectedGroupIndex,
                    affectedWorkingPackageIndex,
                } = findGroupWithDroppableId(destination.droppableId)
                destinationGroupIndex = affectedGroupIndex
                destinationWorkingPackageIndex = affectedWorkingPackageIndex
                destinationList =
                    workingPackages[affectedWorkingPackageIndex].groups[
                        affectedGroupIndex
                    ].students
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
            const newWorkingPackages = Array.from(workingPackages)

            if (sourceWorkingPackageIndex !== undefined) {
                newWorkingPackages[sourceWorkingPackageIndex].groups[
                    sourceGroupIndex
                ].students = result[source.droppableId]
            }
            if (destinationWorkingPackageIndex !== undefined) {
                newWorkingPackages[destinationWorkingPackageIndex].groups[
                    destinationGroupIndex
                ].students = result[destination.droppableId]
            }

            updateWorkingPackages(newWorkingPackages)
        }
    }

    function addGroup(workingPackageIndex, groupName) {
        const newWorkingPackages = Array.from(workingPackages)
        newWorkingPackages[workingPackageIndex].groups.push({
            students: [],
            name: groupName,
            droppableId: `${workingPackageIndex} - ${groupName}`,
        })
        updateWorkingPackages(newWorkingPackages)
    }

    function addWorkingPackage(title) {
        const newWorkingPackages = Array.from(workingPackages)
        newWorkingPackages.push({
            groups: [],
            title,
        })
        updateWorkingPackages(newWorkingPackages)
        state.workingPackages.insert(state.workingPackages.items.length, {
            plugin: "counter",
        })
    }

    function moveStudentsToRandomGroups() {
        let newWorkingPackages = Array.from(workingPackages)
        // determine groups number
        const reducer = (accumulator, currentValue) =>
            accumulator + currentValue.groups.length
        const numberOfGroups = newWorkingPackages.reduce(reducer, 0)
        unassignedStudents.forEach((student, id) => {
            const newGroupNumber = Math.floor(Math.random() * numberOfGroups)
            let counter = 0
            newWorkingPackages.forEach(workingPackage => {
                workingPackage.groups.forEach(group => {
                    if (counter === newGroupNumber) {
                        group.students.push(student)
                    }
                    counter++
                })
            })
        })
        updateWorkingPackages(newWorkingPackages)
        setUnassignedStudents([])
    }

    function createAndFillGroups(numberOfGroups) {
        let students = [...unassignedStudents]
        if (workingPackages[0])
            workingPackages[0].groups.forEach(group => {
                students = [...students, ...group.students]
            })
        const newWorkingPackages = []
        newWorkingPackages.push({
            groups: [],
            title: "Working Package",
        })
        // create groups
        for (let i = 1; i <= numberOfGroups; i++) {
            newWorkingPackages[0].groups.push({
                students: [],
                name: `Gruppe ${i}`,
                droppableId: `group ${i}`,
            })
        }
        // fill groups
        const newUnassignedStudents = shuffle(students)
        newUnassignedStudents.forEach((student, index) => {
            newWorkingPackages[0].groups[index % numberOfGroups].students.push(
                student,
            )
        })

        updateWorkingPackages(newWorkingPackages)
        setUnassignedStudents([])
    }

    function removeStudentsFromAllGroups() {
        let newUnassignedStudents = Array.from(unassignedStudents)
        let newWorkingPackages = Array.from(workingPackages)
        newWorkingPackages.forEach(workingPackage => {
            workingPackage.groups.forEach(group => {
                newUnassignedStudents = newUnassignedStudents.concat(
                    group.students,
                )
                group.students = []
            })
        })
        setUnassignedStudents(newUnassignedStudents)
        updateWorkingPackages(newWorkingPackages)
    }
    return [
        workingPackages,
        unassignedStudents,
        onDragEnd,
        addGroup,
        addWorkingPackage,
        moveStudentsToRandomGroups,
        removeStudentsFromAllGroups,
        updateWorkingPackages,
        createAndFillGroups,
    ]
}
