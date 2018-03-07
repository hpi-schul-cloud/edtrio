import React, { Component } from 'react'
import { Paper, Divider } from 'material-ui'


export default function makePlugin(WrappedComponent) {
    return class extends Component {
        constructor(props) {
            super(props)
            this.state = {
                editable: false,
                content: props.content,
            }

            if(!props.id) {
                throw Error('Plugin id missing!\nEvery plugin needs to have a unique id.')
            }

            this._setWrapperRef = this._setWrapperRef.bind(this)
            this._handleClick = this._handleClick.bind(this)
            this._handleOutsideClick = this._handleOutsideClick.bind(this)
        }

        /**
         * Sets the `wrapperRef` accordingly.
         * Used internally by `_handleOutsideClick()`.
         * @param {ref} node Outermost element that shall be used as ref
         */
        _setWrapperRef(node) {
            this.wrapperRef = node
        }
        
        /**
         * Toggles the components `editable` state
         */
        _handleClick() {
            if(!this.state.editable) {
                this.setState({
                    editable: true
                })

                document.addEventListener('click', this._handleOutsideClick, false)
            }
        }

        /**
         * Handles outside clicks to set `editable` state properly.
         * Eventlistener set by `_handleClick()`, only used internally.
         * @param {event} e Event that occured
         */
        _handleOutsideClick(e) {
            if (this.wrapperRef.contains(e.target)) {
                return
            }
            
            // we are outside
            this._propagateContentChangeToEditor()
            this.setState({
                editable: false
            })
            document.removeEventListener('click', this._handleOutsideClick, false)
        }

        _handleRemove() {
            this.setState({
                editable: false
            })
            document.removeEventListener('click', this._handleOutsideClick, false)
            this.props.handleRemovePlugin(this.props.id)
        }

        _setContent(newContent) {
            this.setState({
                content: newContent
            })
        }

        _propagateContentChangeToEditor() {
            this.props.saveToEditor({
                type: this.props.type,
                id: this.props.id,
                content: this.state.content
            }, this.props.id)
        }

        componentWillReceiveProps(newProps) {
            console.log(newProps.content)
            this.setState({
                content: newProps.content
            })
        }
        
        render() {
            const { editable, content } = this.state

            return (
                <div ref={this._setWrapperRef}>
                    <Paper
                        zDepth={editable ? 3 : 0}
                        rounded={false}
                        onClick={this._handleClick}
                        className={editable ? 'plugin selected' : 'plugin'}>
                        <div className="handle wrapper">
                            <span className="material-icons">drag_handle</span>
                        </div>
                        <div className="inner">
                            <WrappedComponent
                                editable={editable}
                                content={content}
                                setContent={this._setContent.bind(this)} />
                        </div>
                        {
                            editable && (
                                <div className="toolbar">
                                    <Divider />
                                    <div className="menu icons">
                                        <span
                                            className="material-icons"
                                            onClick={this._handleRemove.bind(this)}>
                                            delete
                                        </span>
                                        <span className="material-icons">hot_tub</span>
                                        <span className="material-icons">info</span>
                                    </div>
                                </div>
                            )
                        }
                    </Paper>
                </div>
            )
        }
    }
}