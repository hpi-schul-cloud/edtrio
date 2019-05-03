import React, { useEffect } from "react"
import styled from "styled-components"
import { Portal } from "react-portal"

import Globals from "./Globals"

const Overlay = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Content = styled.div`
    background-color: #fff;
    padding: 15px;
    position: relative;
    min-width: 500px;
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
`

const CloseBtn = styled.img`
    width: 24px;
    height: 24px;
    cursor: pointer;
`
const Footer = styled.div`
    padding-top: 10px;
    margin-top: 25px;
    border-top: 1px solid rgba(182, 182, 182, 1);
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const CloseCaption = styled.span`
    color: #af0537;
    cursor: pointer;
`

const ExtendedSettingsWrapper = ({
    hideExtendedSettings,
    children,
    expanded,
    index,
    rows,
    duplicateRow,
    row,
    extendedSettingsVisible,
}) => {
    useEffect(() => {
        if (!extendedSettingsVisible) return
        function closeListener(evt) {
            if (evt.key === "Escape") {
                hideExtendedSettings()
            }
        }
        window.addEventListener("keydown", closeListener)

        return () => {
            window.removeEventListener("keydown", closeListener)
        }
    }, [extendedSettingsVisible])

    if (!extendedSettingsVisible) return null
    return (
        <Portal>
            <Overlay>
                <Content>
                    <Header>
                        <h4 style={{ marginRight: 25 }}>
                            Erweiterte Einstellungen
                        </h4>
                        <CloseBtn
                            src={require("../assets/close.svg")}
                            onClick={hideExtendedSettings}
                        />
                    </Header>
                    {children}
                    <Footer>
                        <Globals
                            close={hideExtendedSettings}
                            expanded={expanded}
                            index={index}
                            rows={rows}
                            duplicateRow={duplicateRow}
                            row={row}
                        />
                        <CloseCaption onClick={hideExtendedSettings}>
                            Schließen
                        </CloseCaption>
                    </Footer>
                </Content>
            </Overlay>
        </Portal>
    )
}

export default ExtendedSettingsWrapper
