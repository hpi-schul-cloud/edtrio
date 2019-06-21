import React, { useState, useEffect, useContext } from "react"
import Roberta from "./Roberta"
import PrimarySettings from "./PrimarySettings"

class Editor extends React.Component {

    render() {
        
        let {PrimarySettingsWrapper} = this.props
        return (
            
            <React.Fragment>
                <Roberta {...this.props} fullscreen={false}></Roberta>
                <PrimarySettingsWrapper key="robertaEditor">
                    <PrimarySettings {...this.props} />
                </PrimarySettingsWrapper>
            </React.Fragment>

        )

    }
}

export default Editor