import React, {useCallback} from "react"
import styled from "styled-components"
import {
    Editor as Edtr,
    useScopedDispatch,
    useScopedSelector
} from "@edtr-io/core"

import {
    focusNext,
    focusPrevious,
    persist,
    redo,
    reset,
    undo,
    hasPendingChanges as hasPendingChangesSelector
  } from '@edtr-io/store'

import theme from "~/theme"
import plugins from "./plugins"
export { default as plugins } from "./plugins"

export const EditorWrapper = styled.div`
    min-height: 50px;
    font-size: 20px;
    line-height: 1.4;

    @media (max-width: 991px) {
        font-size: 18px;
    }

    @media (max-width: 768px) {
        font-size: 18px;
    }

    @media (max-width: 575px) {
        font-size: 16px;
    }
`

export const editorTheme = {
    editor: {
        primary: {
            background: theme.colors.primary,
        },
    },
    plugins: {
        rows: {
            menu: {
                highlightColor: theme.colors.primary,
                dropzone: {
                    highlightColor: theme.colors.primary,
                },
            },
        },
        text: {
            hoverColor: "#B6B6B6",
        },
    },
}


export const Editor = (props) => {


    const children = React.useCallback(
        document => {
          return (
            <PlainEditorContainerInner editable={props.editable}>
              {document}
            </PlainEditorContainerInner>
          )
        },
        [props.editable]
    )
  

    const docValue =
        props.docValue && Object.keys(props.docValue).length
            ? props.docValue
            : {
                    plugin: "rows",
                }


    const onChange = ({changed, getDocument}) => {
        props.dispatchChange(getDocument())
    }


    return (
        <EditorWrapper editing={true}>
            <Edtr
                theme={editorTheme}
                plugins={plugins}
                defaultPlugin={"text"}
                editable={props.editing}
                omitDragDropContext
                initialState={docValue}
                onChange={onChange}>
                    {children}
            </Edtr>
        </EditorWrapper>
    )

}
export default Editor



function PlainEditorContainerInner(props) {
    const dispatch = useScopedDispatch()
    const hasPendingChanges = useScopedSelector(hasPendingChangesSelector())
    const [editable, setEditable] = React.useState(
      props.editable === undefined ? true : props.editable
    )
    return (
      <React.Fragment>
        <div style={{ margin: '20px 0' }}>{props.children}</div>
        <button
          onClick={() => {
            dispatch(undo())
          }}
        >
          Undo
        </button>
        <button
          onClick={() => {
            dispatch(redo())
          }}
        >
          Redo
        </button>
        <button
          onClick={() => {
            dispatch(persist())
          }}
          disabled={!hasPendingChanges}
        >
          Mark persisted
        </button>
        <button
          onClick={() => {
            dispatch(reset())
          }}
          disabled={!hasPendingChanges}
        >
          Reset
        </button>
        <button
          onClick={() => {
            dispatch(focusPrevious())
          }}
        >
          Focus Previous
        </button>
        <button
          onClick={() => {
            dispatch(focusNext())
          }}
        >
          FocusNext
        </button>
        <button
          onClick={() => {
            setEditable(!editable)
          }}
        >
          Switch to {editable ? 'render' : 'edit'} mode
        </button>
      </React.Fragment>
    )
  }
