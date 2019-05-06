import React, { useEffect, useMemo, forwardRef } from "react"
import styled, { css } from "styled-components"
import { Portal } from "react-portal"

import Globals from "./Globals"
import { createPortal } from "react-dom"

const Overlay = styled.div`
    visibility: ${props => props.visible ? 'visible' : 'hidden'};
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

const ExtendedSettingsWrapper = React.forwardRef(({
    hideExtendedSettings,
    expanded,
    index,
    rows,
    duplicateRow,
    row,
    extendedSettingsVisible
}, ref) => {
    useEffect(() => {
        function closeListener(evt) {
            if (evt.key === "Escape") {
                hideExtendedSettings()
            }
        }
        window.addEventListener("keydown", closeListener)

        return () => {
            window.removeEventListener("keydown", closeListener)
        }
    }, [])

    useEffect(() => {
        console.log("rerendering Extended Settings")
    }, [])

    // render only the expanded, so only one extended settings exist
    if (!expanded) return <React.Fragment />
    // render even if not yet visible, because of ref.
    return (
        <Overlay visible={extendedSettingsVisible}>
            <Content>
                <Header>
                    <h4 style={{ marginRight: 25 }}>
                        Erweiterte Einstellungen
                    </h4>
                    <CloseBtn
                        src={require("../../assets/close.svg")}
                        onClick={hideExtendedSettings}
                    />
                </Header>
                <div ref={ref} />
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
    )
})

export default ExtendedSettingsWrapper
