import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";


export default class Tool extends Component {
    constructor(props) {
      super(props);

      const { ltiBaseUrl } = document.getElementById("root").dataset;
      this.refFrame = React.createRef();

      this.state = {
        tool: (this.props.initialState ? this.props.initialState.tool : {}),
        ltiBaseUrl,
      };
    }

    componentDidMount() {
      this.setState({
        ...this.props.content
      });
      this.props.saveContent({ tool: this.state.tool })
    }

    enterFullscreen() {
      const elem = this.refFrame.current;
      if (elem.requestFullScreen) {
        elem.requestFullScreen();
      } else if (elem.webkitRequestFullScreen) {
        elem.webkitRequestFullScreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      }
    }

    render() {
        const { tool, ltiBaseUrl } = this.state;
        const { isEditable } = this.props;

        let src = null;
        if (tool.ltiId && ltiBaseUrl) {
          src = ltiBaseUrl + tool.ltiId;
        } else if (tool.url) {
          src = tool.url;
        }

        return (src
            ? (
            <div>
              <button className={styles.fullscreenButton} onClick={e => this.enterFullscreen()}>Vollbild</button>
              <iframe className={styles.frame} src={src} ref={this.refFrame} />
            </div>
            )
            : (
            <p>Das Tool kann eventuell nur in der Schul-Cloud angezeigt werden.</p>
            )
        );
    }

    static propTypes = {
        isEditable: PropTypes.bool.isRequired,
        content: PropTypes.object,
        saveContent: PropTypes.func.isRequired,
        initialState: PropTypes.object
    };
}
