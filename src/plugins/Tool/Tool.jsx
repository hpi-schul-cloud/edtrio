import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal } from "edtrio/UI";
import axios from "axios";

import styles from "./styles.scss";


export default class Tool extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tool: null,
            toolList: [
              {
                name: 'dummy',
                url: 'https://localhost:3000/',
              }
            ],
            open: false,
        };
    }

    handleOpen() {
        this.setState({ selectorOpen: true });
    }

    handleClose() {
        this.setState({ selectorOpen: false });
    }

    componentDidMount() {
        /*axios.get("")
          .then(list => {
              this.setState()
          })*/
      this.setState({
        ...this.props.content
      });
    }

    handleChange(tool) {
      this.setState({ tool }, () =>
        this.props.saveContent({ tool: this.state.tool })
      );
    }

    render() {
        const { tool, toolList, selectorOpen } = this.state;
        const { isEditable } = this.props;

        return (
          <>
          {isEditable && (
            <>
            <Modal open={selectorOpen} onClose={e => this.handleClose()} >
                Bitte auswählen:
                <ul>
                  {toolList.map(tool =>
                    <li key={tool.name} onClick={e => {
                      this.handleChange(tool);
                      this.handleClose();
                    }}>{tool.name}</li>
                  )}

                </ul>
            </Modal>
            <button onClick={e => this.handleOpen()}>Auswählen</button>
            {tool && (
              <div>
              {tool.name}<br />
              <iframe src={tool.url} />
              </div>
            )}
            </>
          )}
          { !isEditable && (
            <iframe src={tool.url} />
          )}
          </>
        );
    }

    static propTypes = {
        isEditable: PropTypes.bool.isRequired,
        content: PropTypes.object,
        saveContent: PropTypes.func.isRequired
    };
}
