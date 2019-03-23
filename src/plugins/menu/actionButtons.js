import React from "react"
import Button from "../../components/Button"
import { StateType } from "@edtr-io/core"
import uuid from "uuid/v4"

export function ImageButton(props) {
    const { state } = props
    return (
        <Button
            onClick={() =>
                state.children.insert(state.children.items.length, {
                    plugin: "image",
                })
            }>
            Bild
        </Button>
    )
}

export function AssignmentButton(props) {
    const { state } = props
    return (
        <Button
            onClick={() =>
                state.children.insert(state.children.items.length, {
                    plugin: "assignment",
                })
            }>
            Abgabe
        </Button>
    )
}

export function TextButton(props) {
    const { state } = props
    return (
        <Button
            onClick={() =>
                state.children.insert(state.children.items.length, {
                    plugin: "text",
                })
            }>
            Text
        </Button>
    )
}

export function GroupButton(props) {
    const { state } = props
    return (
        <Button
            onClick={() =>
                state.children.insert(state.children.items.length, {
                    plugin: "group",
                })
            }>
            Gruppenarbeit
        </Button>
    )
}
export function SimpleGroupButton(props) {
    const { state } = props
    return (
        <Button
            onClick={() =>
                state.children.insert(state.children.items.length, {
                    plugin: "quickGroup",
                })
            }>
            Einfache Gruppenarbeit
        </Button>
    )
}
export function AdvancedGroupButton(props) {
    const { state } = props
    return (
        <Button
            onClick={() =>
                state.children.insert(state.children.items.length, {
                    plugin: "advancedGroup",
                })
            }>
            Erweiterte Gruppenarbeit
        </Button>
    )
}
export function JigsawButton(props) {
    const { state } = props
    return (
        <Button
            onClick={() => {
                const id = uuid()
                const groupState = StateType.object({
                    workingPackages: StateType.list(StateType.child("text"), 0),
                    startValues: StateType.scalar(null),
                    setId: StateType.string(id),
                })
                const advancedGroupState = StateType.object({
                    workingPackages: StateType.list(StateType.child("text"), 0),
                    startValues: StateType.scalar(null),
                    setId: StateType.string(),
                    fixedGroupId: StateType.string(id),
                })

                state.children.insert(state.children.items.length, {
                    plugin: "group",
                    state: {
                        workingPackages: [],
                        startValues: null,
                        setId: id,
                    },
                })
                state.children.insert(state.children.items.length + 1, {
                    plugin: "advancedGroup",
                    state: {
                        workingPackages: [],
                        startValues: null,
                        setId: null,
                        fixedGroupId: id,
                    },
                })
            }}>
            JIGSAW
        </Button>
    )
}
