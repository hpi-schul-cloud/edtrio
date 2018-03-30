import { createSelector } from "reselect";

const is_dev_mode = ({ env }) => { env !== "production" };
export const makeDevMode = () => createSelector([is_dev_mode], dev => dev); 

const is_editable = ({ plugin }, { id }) => plugin.active === id;
export const makeEditable = () => createSelector([is_editable], edit => edit);

const get_props = ({ plugin }, { id }) => plugin.lookup[id].content;
export const makePluginProps = () => createSelector([get_props], content => content) 