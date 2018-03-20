import { createSelector } from "reselect";

const is_dev_mode = ({ env }) => env === "production" ? false : true;
export const dev_mode = createSelector([is_dev_mode], dev => dev); 

const is_editable = ({ plugin }, id) => plugin.active === id;
export const editable = createSelector([is_editable], edit => edit);

const get_props = ({ plugin }, position ) => ({
    plugins: plugin.loaded,
    ...position,
});
export const plugin_props = createSelector([get_props], ({ plugins, parent, child = false} = {}) => ({
    ...(child ? plugins[parent].childs[child] : plugins[parent])
}));

export const t = createSelector([dev_mode, is_editable], (dev, editable) => ({
    dev,
    editable,
}));