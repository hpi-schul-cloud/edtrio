/*eslint react/display-name:0*/
import React from 'react';
import Loadable from 'react-loadable';

export default Loadable({
    loader: () => import('./AddPlugin.jsx').then(object => object.default).catch(err => console.log(err)),
    loading: () => <p>Lädt...</p>
});