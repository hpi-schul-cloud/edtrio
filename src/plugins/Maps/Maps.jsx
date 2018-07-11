import React, { Component } from "react";
import PropTypes from "prop-types";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import {movePlugin, removePlugin, selectPlugin, setContent, toggleVisible} from "../../editor/actions/plugin";

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
            lat: !props.content ? -34.397 : props.content.lat,
            lng: !props.content ? 150.644 : props.content.lng
        };

        this.map = React.createRef();
    }

    saveCenter() {
        const center = this.map.current.getBounds().getCenter();

        this.setState(() => {
            const position =  {
                lat: center.lat(),
                lng: center.lng()
            }

            this.props.saveContent(position);

            return position;
        })
    }

    componentDidMount() {
        this.setState({
            ...this.props.content
        });
    }

    render() {
        const { isEditable } = this.props;
        const {lat, lng} = this.state;

        return (
            <>
                <GoogleMap
                    ref={this.map}
                    onBoundsChanged={() => this.props.isEditable && this.saveCenter()}
                    defaultZoom={8}
                    defaultCenter={{ lat, lng }}
                >
                    <Marker position={{ lat, lng }} />
                </GoogleMap>
            </>
        );
    }

    static propTypes = {
        isEditable: PropTypes.bool.isRequired,
        content: PropTypes.object,
        saveContent: PropTypes.func.isRequired,
        //isPrint: PropTypes.bool,
        isViewMode: PropTypes.bool,
    };
}

export default withScriptjs(withGoogleMap(MapsPlugin));
