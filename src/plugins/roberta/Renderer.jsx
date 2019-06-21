import React, { useState, useEffect, useContext } from "react"
import Editor from "./Editor"
import Roberta from "./Roberta"

class Renderer extends React.Component {

    render() {
        
        if(this.props.editable){
            return <Editor {...this.props}></Editor>
        } else {
            return <Roberta {...this.props} fullscreen={false}></Roberta>
        }
    }
}

export default Renderer