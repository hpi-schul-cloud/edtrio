import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import isEqual from "lodash.isequal";

import latex from "latex.js";
import { HtmlGenerator } from "latex.js/dist/html-generator";
import de from "hyphenation.de";

/**
 * Dummy Plugin for testing
 * Does not have any functionality apart from displaying whether it is in edit
 * mode or not.
 * **DEVELOPMENT ONLY**
 */

const generator = new HtmlGenerator({
    hyphenate: true,
    languagePatterns: de,
    //styles: ['css/error.css']
})

class LatexPlugin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            latex: "",
            output: ""
        };
    }

    shouldComponentUpdate({ isEditable }, nextState) {
        return isEditable && !isEqual(this.state, nextState);
    }

    componentDidMount() {
        this.setState({
            ...this.props.content
        });
    }

    handleChange(e) {
        generator.reset();

        let output;

        try {
            output = latex.parse(this.state.latex, {generator}).dom();
        } catch (e) {
            console.log(e)
        }

        console.log(output)

        this.setState(
            {
                latex: e.target.value,
                output
            },
            () => {
                this.props.saveContent(this.state);
            }
        );
    }

    render() {
        const { isEditable } = this.props;

        return (
            <>
                <textarea onInput={(e) => this.handleChange(e)}></textarea>

                <iframe srcDoc={this.state.output.innerHTML}/>
            </>
        );
    }

    static propTypes = {
        isEditable: PropTypes.bool.isRequired,
        content: PropTypes.object,
        saveContent: PropTypes.func.isRequired
        //isPrint: PropTypes.bool,
        //isViewMode: PropTypes.bool,
    };
}

export default LatexPlugin;
