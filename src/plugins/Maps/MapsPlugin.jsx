import React, { Component } from "react";
import PropTypes from "prop-types";

import Maps from "./Maps";

class Map extends Component{
    render() {

        return (
            <>
                <Maps googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                      loadingElement={(<div style={{ height: `100%` }}></div>)}
                      containerElement={(<div style={{ height: `400px` }}></div> )}
                      mapElement={(<div style={{ height: `100%` }} />)}
                      {...this.props}
                >

                </Maps>
            </>
        )
    }



    static propTypes = {
        isEditable: PropTypes.bool.isRequired,
        content: PropTypes.object,
        saveContent: PropTypes.func.isRequired,
        //isPrint: PropTypes.bool,
        isViewMode: PropTypes.bool,
    };
}

export default Map;