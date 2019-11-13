import React, {useCallback, useEffect, useState} from "react"
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
    padding: 0 10px;
    font-size: 1.3rem;
    line-height: 1.4;

    .fa-4x{
      font-size: 3rem;
    }

    @media (max-width: 991px) {
        font-size: 1.2rem;
    }

    @media (max-width: 768px) {
        font-size: 1.2rem;
    }

    @media (max-width: 575px) {
        font-size: 1.1rem;
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

    const docValue =
        props.docValue && Object.keys(props.docValue).length
            ? props.docValue
            : {
                    plugin: "rows",
                }

                const children = React.useCallback(
                    document => {
                      return (
                        <PlainEditorContainerInner
                            docValue={docValue}>
                          {document}
                        </PlainEditorContainerInner>
                      )
                    }
                )

    const onChange = ({changed, getDocument}) => {
        props.dispatchChange(getDocument())
    }

    const [initialState, setInitialState] = useState(docValue)

    useEffect(() => {
      if(!props.editing){
        setInitialState(docValue)
      }
    }, [props.docValue])

    return (
        <EditorWrapper editing={true}>
            <Edtr
                theme={editorTheme}
                plugins={plugins}
                defaultPlugin={"text"}
                editable={props.editing}
                omitDragDropContext
                initialState={initialState}
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
    useEffect(() => {
        if(props.docValue && props.docValue.state){

            dispatch((scope) => ({
                type: 'SetPartialState',
                scope,
                payload: props.docValue
            }))
        }
    }, [props.docValue])

    return (
      <React.Fragment>
        <div style={{ margin: '20px 0' }}>{props.children}</div>
        {/* <button
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
        </button> */}
      </React.Fragment>
    )
  }
