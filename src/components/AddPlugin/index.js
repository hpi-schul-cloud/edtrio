import React from "react";
import Loadable from 'react-loadable';

export default Loadable({
    loader: () => import("./AddPlugin"),
    loading: () => <p>Lädt...</p>
});