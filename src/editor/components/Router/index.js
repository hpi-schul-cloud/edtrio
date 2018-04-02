import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import has from "has";

import {
    updateRoute
} from "x-editor/editor/actions/route";

const getScreen = function checkAndGetScreen(routes, path) {
    if(has(routes, path)) {
        return routes[path];
    } else if(has(routes, "*")) {
        return routes["*"];
    } 

    throw new Error("Route does not exists");
}

//TODO beforechange
class Router extends Component {
    constructor(props) {
        super(props);

        this.routes = props.config.reduce(
            (acc, { path, component }) => ({ ...acc, [path]: component }),
            {}
        );

        window.addEventListener("popstate", props.updateLocation)
    }

    render() {
        const { route } = this.props;

        const Screen = getScreen(this.routes, route);

        return (
            <Screen />
        );
    }

    static propTypes = {
        config: PropTypes.arrayOf(
            PropTypes.shape({
                path: PropTypes.string.isRequired,
                component: PropTypes.func.isRequired
            }).isRequired
        ).isRequired
    };
}

const mapStateToProps = ({ route }) => ({ route });

const mapDispatchToProps = (dispatch) => ({
    updateLocation: () => {
        dispatch(updateRoute(window.location.pathname));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Router);
