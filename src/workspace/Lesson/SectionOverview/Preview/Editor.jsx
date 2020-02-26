import React from "react"
import styled from "styled-components"
import { Editor as Edtr } from "@edtr-io/core"


import { previewPlugins } from "~/plugins"

const EditorWrapper = styled.div`
	padding: 20px;
    width: 850px;
    transform-origin: left top;
    transform: ${props => props.expanded && "scale(0.2)"};
    overflow: hidden;
    user-select: none;
    * {
        outline: none !important;
    }
`

export default class Editor extends React.Component {
	constructor(props) {
		super(props)
		this.docValue =
            this.props.docValue && Object.keys(this.props.docValue).length
            	? this.props.docValue
            	: {
            		plugin: "rows",
            	}
	}

	render() {
		return (
			<EditorWrapper
				expanded={this.props.expanded}
			>
				<Edtr
					plugins={previewPlugins}
					editable={false}
					omitDragDropContext
					initialState={this.docValue}
				/>
			</EditorWrapper>
		)
	}
}
