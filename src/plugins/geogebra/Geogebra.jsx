import React, { Component } from "react";

import "./style.css";
//RHYH3UQ8

export default class GeogebraNode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.resourceId || "jaz8F8hZ",
    };

    this.applet = React.createRef();
  }

  shouldComponentUpdate(nextProps, { id }) {
    return id !== this.state.id;
  }

  renderApplet(id) {
    this.setState(
      () => {
        return {
          id,
        };
      },
      () => this.props.saveContent(this.state),
    );
  }

  renderHTML() {
    return `<!DOCTYPE>
        <html>
        <head>
            <meta name=viewport content="width=device-width,initial-scale=1">
            <script src="https://cdn.geogebra.org/apps/deployggb.js"></script>
        </head>
        <body>
            <div id="ggb-element" style="margin: 0 auto"></div> 

            <script>
                var ggbApp = new GGBApplet({'appName': 'graphing', 'material_id': '${
                  this.state.id
                }'}, true)
                window.addEventListener('load', function() { 
                    ggbApp.inject('ggb-element')
                })
            </script>
        </body>
        </html>
        `;
  }

  componentDidMount() {
    this.setState({
      ...this.props.content,
    });
  }

  render() {
    // FIXME: props.selected never turn false, even if geogebra
    // isnt selected anymore
    return (
      <div
        className={`geogebra-wrapper plugin-wrapper ${
          this.props.selected ? "selected" : ""
        }`}
        ref={this.applet}
      >
        {this.state.id && (
          <iframe
            title={`Geogebra applet #${this.state.id}`}
            className="geogebra"
            srcDoc={this.renderHTML()}
          />
        )}
      </div>
    );
  }
}
