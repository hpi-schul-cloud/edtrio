import React, { useState } from "react";
import styled from "styled-components";
import config from "~/config";

class WindowWidth extends React.Component {
	constructor(props) {
		super(props);
		this.state = { width: window.innerWidth };
	}

	componentDidMount() {
		window.addEventListener("resize", () =>
			this.setState({ width: window.innerWidth })
		);
	}

	renderChildren() {
		return React.Children.map(this.props.children, (child) =>
			React.cloneElement(child, { windowWidth: this.state.width })
		);
	}

	render() {
		return <React.Fragment>{this.renderChildren()}</React.Fragment>;
	}
}

export default WindowWidth;
