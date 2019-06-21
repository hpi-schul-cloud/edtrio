import React, { useState, useEffect, useContext } from "react"

import Input from "~/components/Input/Text"
import { EditorInput } from '@edtr-io/editor-ui'

class PrimarySettings extends React.Component {

    render() {
        let {state} = this.props
        return (
            
                <EditorInput
                size={16}
                full={true}
                value={state.link.value}
                label="OpenRoberta URL: "
                placeholder="Paste openRoberta URL here"
                textfieldWidth="70%"
                editorInputWidth="100%"
                onChange={e => {
                    let evt = e.target.value
                    state.link.set(evt)
                    if (evt.startsWith("http://localhost") || evt.startsWith("https://lab.open-roberta.org")) {
                        state.random.set(state.random.value + 1)
                        
                    }
                }
                }
            />
            
        
        )
        
    }
}

export default PrimarySettings