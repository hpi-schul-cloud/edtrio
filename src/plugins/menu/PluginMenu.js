import React from "react"
import Button from "../../components/Button"
import { StateType } from "@edtr-io/core"
import uuid from "uuid/v4"

export function PluginMenu(props) {
    const { state } = props
    console.log(state.children.items)
    if (state.children.items.length <= 0)
        return (
            <div>
                {state.text.render()}
                Wähle den nächsten Baustein:
                <Button
                    onClick={() =>
                        state.children.insert(state.children.items.length, {
                            plugin: "group",
                        })
                    }>
                    Gruppenarbeit
                </Button>
                <Button
                    onClick={() =>
                        state.children.insert(state.children.items.length, {
                            plugin: "quickGroup",
                        })
                    }>
                    Einfache Gruppenarbeit
                </Button>
                <Button
                    onClick={() =>
                        state.children.insert(state.children.items.length, {
                            plugin: "advancedGroup",
                        })
                    }>
                    Erweiterte Gruppenarbeit
                </Button>
                Oder wähle ein gesamtes Template:
                <Button
                    onClick={() => {
                        const id = uuid()
                        const groupState = StateType.object({
                            workingPackages: StateType.list(
                                StateType.child("text"),
                                0,
                            ),
                            startValues: StateType.scalar(null),
                            setId: StateType.string(id),
                        })
                        const advancedGroupState = StateType.object({
                            workingPackages: StateType.list(
                                StateType.child("text"),
                                0,
                            ),
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
            </div>
        )
    else
        return (
            <div>
                {state.text.render()}
                {state.children.items.map(child => {
                    return child.render()
                })}
            </div>
        )
}
