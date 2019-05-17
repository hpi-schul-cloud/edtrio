import React from "react"
import styled from "styled-components"

import Text from "../../../components/Text"
import Button from "../../../components/Button"
import { JigsawIcon, IterationIcon, QuickGroupIcon, GroupIcon } from "./Icons"

const StyledRoot = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;

    :hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }
`
const StyledOptions = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

const StyledOption = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 200px;
    padding: 8px;
    align-items: center;
`

const StyledDescription = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 10px;
`

function setChild(state, plugin) {
    state.children.insert(state.children.items.length, {
        plugin: plugin,
    })
}

// ({ editable, focused, state })
export function GroupsOverview(props) {
    const { editable, state } = props

    return state.children.items.length > 0 ? (
        state.children.items[0].render()
    ) : (
        <StyledRoot editable={editable}>
            <h2>Gruppenarbeit einfügen</h2>
            <Text>
                Diese Karte erlaubt die Umsetzung von verschiedenen Arten von
                Gruppenarbeiten. Wähle hier einfach die Art von Gruppenarbeit,
                die du benutzen möchtest, und sie wird diese Karte ersetzen.
            </Text>
            <h3>Häufig verwendet</h3>
            <Text>
                Diese Arten von Gruppenarbeiten sind die häufigsten, und
                besonders flexibel einsetzbar.
            </Text>
            <StyledOptions>
                <StyledOption>
                    <h4>Gruppenarbeit</h4>
                    <GroupIcon />
                    <StyledDescription>
                        <Text>
                            Eine sehr flexible Gruppenarbeit. Mehrere
                            Arbeitspakete können auf mehrere Gruppen aufgeteilt
                            werden.
                        </Text>
                        <Button onClick={() => setChild(state, "group")}>
                            Wählen
                        </Button>
                    </StyledDescription>
                </StyledOption>
                <StyledOption>
                    <h4>Einheitliche Gruppenarbeit</h4>
                    <QuickGroupIcon />
                    <StyledDescription>
                        <Text>
                            Eine sehr einfache Gruppenarbeit. Es gibt nur ein
                            Arbeitspaket und die Gruppen sind alle gleich groß.
                            Dafür erfolgt die Gruppenbildung sehr schnell.
                        </Text>
                        <Button onClick={() => setChild(state, "quickGroup")}>
                            Wählen
                        </Button>
                    </StyledDescription>
                </StyledOption>
                <StyledOption>
                    <h4>Gruppen wieder verwenden</h4>
                    <IterationIcon />
                    <StyledDescription>
                        <Text>
                            Hier können bereits verwendete Gruppen wieder
                            aufgegriffen werden! Sie können bestehenden Gruppen
                            neue Aufgaben geben, oder die Gruppen nach
                            bestimmten Schemata neu vermischen.
                        </Text>
                        <Button
                            onClick={() => setChild(state, "groupIteration")}>
                            Wählen
                        </Button>
                    </StyledDescription>
                </StyledOption>
            </StyledOptions>
            <h3>Mehrstufige Templates</h3>
            <Text>
                Hier befinden sich Gruppenarbeiten, die etwas komplexer sind und
                über mehrere Stufen gehen.
            </Text>
            <StyledOptions>
                <StyledOption>
                    <h4>Gruppenpuzzle!</h4>
                    <JigsawIcon />
                    <StyledDescription>
                        <Text>
                            Dreistufige Gruppenarbeit. Zuerst werden gleich
                            große Gruppen gebildet, dann werden diese
                            durchmischt um Expertengruppen zu bilden.
                            Anschließend kommen alle Schüler wieder in ihrer
                            ursprünglichen Gruppe zusammen.
                        </Text>
                        <Button onClick={() => setChild(state, "jigsaw")}>
                            Wählen
                        </Button>
                    </StyledDescription>
                </StyledOption>
            </StyledOptions>
        </StyledRoot>
    )
}
