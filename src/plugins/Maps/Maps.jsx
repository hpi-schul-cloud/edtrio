import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

/**
 * Dummy Plugin for testing
 * Does not have any functionality apart from displaying whether it is in edit
 * mode or not.
 * **DEVELOPMENT ONLY**
 */
class MapsPlugin extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount() {
        this.setState({
            ...this.props.content
        });
    }

    render() {
        const { isEditable } = this.props;

        return (
            <>
                <GoogleMap
                    defaultZoom={8}
                    defaultCenter={{ lat: -34.397, lng: 150.644 }}
                >
                    <Marker position={{ lat: -34.397, lng: 150.644 }} />
                </GoogleMap>
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

export default withScriptjs(withGoogleMap(MapsPlugin));
