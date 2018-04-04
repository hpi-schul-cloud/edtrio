import React, { Component } from 'react';

import { AppBar } from 'x-editor/UI';

import Editor from 'x-editor/editor/components/Editor';

class EditorScreen extends Component {

    render() {

        return (
            <>
                <AppBar title="X" />

                <Editor />
            </>
        )
    }
}

export default EditorScreen;