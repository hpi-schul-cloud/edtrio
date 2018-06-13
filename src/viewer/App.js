import React, { Component } from "react";

import PluginView from "./Components/Viewer";

import "edtrio/common/base.scss";
import api from '../common/api'

export default class Viewer extends Component {
  constructor (props) {
    super(props);

    this.state = {}
  }

  componentDidMount() {
    api.getData().then(data => {
      this.setState({data});
    })
  }

    render() {
    const { data } = this.state;
      if (data) {
        return <PluginView data={data} />;
      }

      return 'Lädt...';
    }
}
