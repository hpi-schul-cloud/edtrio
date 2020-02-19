import React, { useState } from "react"
import styled from "styled-components"
import config from "~/config"




const onWidthChange = (setState) => () => {
	setState({width: window.innerWidth});
}

// const [width, setWidth]  = useState(viewportWidth());
// window.addEventListener("resize", onWidthChange(setWidth))

class WindowWidth extends React.Component {

	constructor(props) {
		super(props);
  	this.state = {width: window.innerWidth};
  	window.addEventListener("resize", onWidthChange(this.setState))

		this.mofidifiedChildren = React.Children.map(child => Object.bind(child, {windowWidth: this.state.width} ))
		console.log("test", this.mofidifiedChildren)
		console.log("create windows tesr width")
    
	}

	render() {
		console.log("nlib", this.mofidifiedChildren)
  	return (
  		<React.Fragment>
  			{this.mofidifiedChildren}
  		</React.Fragment>)
	}
}


export default WindowWidth;