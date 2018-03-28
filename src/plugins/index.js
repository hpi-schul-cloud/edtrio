
        import React from "react";
        import Loadable from 'react-loadable';
        import makePlugin from 'x-editor/editor/components/PluginWrapper';

        export default [
            
    {
        Plugin: Loadable({
            loader: () => import("./DummyPlugin/DummyPlugin.jsx").then(object => makePlugin(object.default, {"name":"Dummy Plugin","version":"0.1.0","description":"Leeres Plugin für Testzwecke","type":"CONTENT"})),
            loading: () => (
                <p>Lädt</p>
            )
        }),
        info: {"name":"Dummy Plugin","version":"0.1.0","description":"Leeres Plugin für Testzwecke","type":"CONTENT"},
    },
    {
        Plugin: Loadable({
            loader: () => import("./LayoutPlugin/LayoutPlugin.jsx").then(object => makePlugin(object.default, {"name":"Layout Plugin","version":"0.1.0","description":"Plugin zum Erstellen von Layouts","type":"LAYOUT"})),
            loading: () => (
                <p>Lädt</p>
            )
        }),
        info: {"name":"Layout Plugin","version":"0.1.0","description":"Plugin zum Erstellen von Layouts","type":"LAYOUT"},
    },
    {
        Plugin: Loadable({
            loader: () => import("./LinePlugin/LinePlugin.jsx").then(object => makePlugin(object.default, {"name":"Horizontal Line Plugin","version":"0.1.0","description":"Zeichnet eine horizontale Trennlinie","type":"CONTENT"})),
            loading: () => (
                <p>Lädt</p>
            )
        }),
        info: {"name":"Horizontal Line Plugin","version":"0.1.0","description":"Zeichnet eine horizontale Trennlinie","type":"CONTENT"},
    },
    {
        Plugin: Loadable({
            loader: () => import("./MissingPlugin/MissingPlugin.jsx").then(object => makePlugin(object.default, {"name":"Missing Plugin","version":"0.1.0","type":"CONTENT"})),
            loading: () => (
                <p>Lädt</p>
            )
        }),
        info: {"name":"Missing Plugin","version":"0.1.0","type":"CONTENT"},
    },
    {
        Plugin: Loadable({
            loader: () => import("./TextPlugin/TextPlugin.jsx").then(object => makePlugin(object.default, {"name":"Text Editor","version":"0.1.0","description":"Text Editor Plugin","type":"CONTENT"})),
            loading: () => (
                <p>Lädt</p>
            )
        }),
        info: {"name":"Text Editor","version":"0.1.0","description":"Text Editor Plugin","type":"CONTENT"},
    }
        ]
    