import React from "react";
import Loadable from 'react-loadable';

import info from "./plugin.json";

const Plugin = Loadable({
    loader: () => import("./LinePlugin"),
    loading: () => (
        <p>Lädt..</p>
    )
});

export default {
    Plugin,
    info,
};