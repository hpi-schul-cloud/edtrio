import React from "react";
import Loadable from 'react-loadable';

import info from "./plugin.json";

const Plugin = Loadable({
    loader: () => import("./SyntaxHighlight").then(object => object.default),
    loading: () => (
        <p>Lädt</p>
    )
});

export default {
    Plugin,
    info,
};