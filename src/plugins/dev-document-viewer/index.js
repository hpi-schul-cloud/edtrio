import React from 'react'

export default {
    renderEditor(props, editor) {
        return (
            <div className="row">
                <div className="column">
                    { props.children }
                </div>
                <aside className="column documentViewer-wrapper">
                    <pre>
                        <code>
                            { JSON.stringify(editor.value, null, 4) }
                        </code>
                    </pre>
                </aside>
            </div>
        )
    }
}
