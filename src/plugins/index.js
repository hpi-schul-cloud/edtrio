
        /*eslint react/display-name:0*/
        import React from 'react';
        import Loadable from 'react-loadable';
        import makePlugin from 'edtrio/editor/components/PluginWrapper';

        export default [
            
    {
        Plugin: Loadable({
            loader: () => import('./DummyPlugin/DummyPlugin.jsx').then(object => makePlugin(object.default, {"name":"Dummy","version":"0.1.0","description":"Leeres Plugin zum Testen","type":"CONTENT"})),
            loading: () => (
                <p>Lädt</p>
            )
        }),
        info: {"name":"Dummy","version":"0.1.0","description":"Leeres Plugin zum Testen","type":"CONTENT"},
    },
    {
        Plugin: Loadable({
            loader: () => import('./LayoutPlugin/LayoutPlugin.jsx').then(object => makePlugin(object.default, {"name":"Zwei Spalten","version":"0.1.0","description":"Jan Peter Rennt","type":"LAYOUT","options":{"size":2,"allowChildRearrangement":false}})),
            loading: () => (
                <p>Lädt</p>
            )
        }),
        info: {"name":"Zwei Spalten","version":"0.1.0","description":"Jan Peter Rennt","type":"LAYOUT","options":{"size":2,"allowChildRearrangement":false}},
    },
    {
        Plugin: Loadable({
            loader: () => import('./LinePlugin/LinePlugin.jsx').then(object => makePlugin(object.default, {"name":"Trennlinie","version":"0.1.0","description":"Horizontale Linie zum Abtrennen von Inhalten","type":"CONTENT"})),
            loading: () => (
                <p>Lädt</p>
            )
        }),
        info: {"name":"Trennlinie","version":"0.1.0","description":"Horizontale Linie zum Abtrennen von Inhalten","type":"CONTENT"},
    },
    {
        Plugin: Loadable({
            loader: () => import('./MissingPlugin/MissingPlugin.jsx').then(object => makePlugin(object.default, {"name":"Missing Plugin","version":"0.1.0","type":"CONTENT"})),
            loading: () => (
                <p>Lädt</p>
            )
        }),
        info: {"name":"Missing Plugin","version":"0.1.0","type":"CONTENT"},
    },
    {
        Plugin: Loadable({
            loader: () => import('./SyntaxHighlight/SyntaxHighlight.jsx').then(object => makePlugin(object.default, {"name":"Syntax Highlight","version":"0.1.0","description":"Syntax Highlight Plugin","type":"CONTENT"})),
            loading: () => (
                <p>Lädt</p>
            )
        }),
        info: {"name":"Syntax Highlight","version":"0.1.0","description":"Syntax Highlight Plugin","type":"CONTENT"},
    },
    {
        Plugin: Loadable({
            loader: () => import('./Text/TextPlugin.jsx').then(object => makePlugin(object.default, {"name":"Text","version":"0.1.0","description":"Schreiben was das Zeug hält","type":"CONTENT"})),
            loading: () => (
                <p>Lädt</p>
            )
        }),
        info: {"name":"Text","version":"0.1.0","description":"Schreiben was das Zeug hält","type":"CONTENT"},
    },
    {
        Plugin: Loadable({
            loader: () => import('./VideoPlugin/VideoPlugin.jsx').then(object => makePlugin(object.default, {"name":"Video","version":"0.1.0","description":"Videos von Youtube und Vimeo einbinden","type":"CONTENT"})),
            loading: () => (
                <p>Lädt</p>
            )
        }),
        info: {"name":"Video","version":"0.1.0","description":"Videos von Youtube und Vimeo einbinden","type":"CONTENT"},
    }
        ]
    