const fs = require("fs");
const path = require("path");
const Ajv = require("ajv");

const { promisify } = require("util");

const readDir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const deleteFile = promisify(fs.unlink);
const fileExists = s => new Promise(r => fs.access(s, fs.F_OK, e => r(!e)));

const { ignore } = require("./../config/plugins/ignore.json");

const x_schema = {
    type: "object",
    properties: {
        displayName: { type: "string" },
        type: { enum: ["CONTENT", "LAYOUT"] },
        options: {
            type: "object",
            properties: {
                size: { type: "number" },
                allowPluginRearrangement: { type: "boolean" }
            }
        }
    },
    required: ["displayName", "type"]
};

const ajv = new Ajv();
const validate = ajv.compile(x_schema);

const errors = [];

const plugins_dir = path.join(__dirname, "../src/Plugins");
const output_file = path.join(plugins_dir, "index.js");

const pluginScript = function generatePluginScript(main, opts) {
    const info = JSON.stringify(opts);

    return `
    {
        Plugin: Loadable({
            loader: () => import('${main}').then(object => makePlugin(object.default, ${info})),
            loading: () => (
                <p>Lädt</p>
            )
        }),
        info: ${info},
    }`;
};

const indexScript = async function generateIndexScript(plugin) {
    const content = await readDir(plugin);
    const index = content.findIndex(el => el === "package.json");

    if (index < 0) {
        throw new Error(`package.json is required in ${plugin}`);
    }

    const package = path.join(plugin, content[index]);

    const { x, version, description, main } = require(package);

    const valid = validate(x);
    if (!valid) {
        throw new Error(
            `x editor config not valid in ${package}. ${validate.errors
                .map(err => `Error: ${err.message}`)
                .join(" ")}`
        );
    }

    const info = {
        name: x.displayName,
        version,
        description,
        type: x.type,
        options: x.options
    };

    const { base } = path.parse(plugin);

    const isAdvanced = ["View", "Edit"].every(el => {
        const folder = path.join(plugin, el);

        let isFolder = true;
        try {
            fs.statSync(folder).isDirectory();
        } catch (e) {
            isFolder = false;
        }

        return isFolder;
    });

    const plugin_meta = {
        base,
        main,
        info
    };

    return {
        isAdvanced,
        ...plugin_meta
    };

    //return pluginScript(`./${base}/${main}`, info);
};

const fileError = ({ message }) => {
    console.log(`File operation error. ${message}`);

    process.exit(1);
};

(async () => {
    const plugin_list = await readDir(plugins_dir).catch(fileError);

    const plugins = plugin_list
        .map(fldr => path.join(plugins_dir, fldr))
        .filter(f => fs.statSync(f).isDirectory())
        .filter(f => !ignore.some(pl => f.includes(pl)));

    if (await fileExists(output_file))
        await deleteFile(output_file).catch(fileError);

    const plugin_data = await Promise.all(
        plugins.map(plugin =>
            indexScript(plugin).catch(err => errors.push(err.message))
        )
    );

    const edit_script = `
    /*eslint react/display-name:0*/
    import React from 'react';
        import Loadable from 'react-loadable';
        import makePlugin from 'edtrio/editor/components/PluginWrapper';

        export default [
            ${plugin_data.map(({ isAdvanced, base, main, info }) => {
                const middle = isAdvanced ? "Edit/" : "";
                return pluginScript(`./${base}/${middle}${main}`, info);
            })}
        ]
    `;

    const view_script = `
    /*eslint react/display-name:0*/
    import React from 'react';
        import Loadable from 'react-loadable';
        import makePlugin from 'edtrio/viewer/components/PluginWrapper';

        export default [
            ${plugin_data.map(({ isAdvanced, base, main, info }) => {
                const middle = isAdvanced ? "View/" : "";
                return pluginScript(`./${base}/${middle}${main}`, info);
            })}
        ]
    `;

    if (errors.length > 0) {
        errors.forEach((error, i) => {
            console.log(`${i + 1}. ${error}`);
        });

        process.exit(1);
    } else {
        await Promise.all([
            await writeFile(
                path.join(plugins_dir, "plugins.edit.js"),
                edit_script
            ),
            await writeFile(
                path.join(plugins_dir, "plugins.view.js"),
                view_script
            )
        ]);

        console.log("Done.");
    }
})().catch(err => {
    console.log(`Unknown error ${err.message}.`);
});

/*
const fs = require("fs");
const path = require("path");
const Ajv = require("ajv");

const { promisify } = require("util");

const readDir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const deleteFile = promisify(fs.unlink);
const fileExists = s => new Promise(r => fs.access(s, fs.F_OK, e => r(!e)));

const { ignore } = require("./../config/plugins/ignore.json");

const x_schema = {
    type: "object",
    properties: {
        displayName: { type: "string" },
        type: { enum: ["CONTENT", "LAYOUT"] },
        options: {
            type: "object",
            properties: {
                size: { type: "number" },
                allowPluginRearrangement: { type: "boolean" }
            }
        }
    },
    required: ["displayName", "type"]
};

const ajv = new Ajv();
const validate = ajv.compile(x_schema);

const errors = [];

const plugins_dir = path.join(__dirname, "../src/Plugins");
const output_file = path.join(plugins_dir, "index.js");

const pluginScript = function generatePluginScript(main, opts) {
    const info = JSON.stringify(opts);

    return `
    {
        Plugin: Loadable({
            loader: () => import('${main}').then(object => makePlugin(object.default, ${info})),
            loading: () => (
                <p>Lädt</p>
            )
        }),
        info: ${info},
    }`;
};

const indexScript = async function generateIndexScript(plugin) {
    const content = await readDir(plugin);
    const index = content.findIndex(el => el === "package.json");

    if (index < 0) {
        throw new Error(`package.json is required in ${plugin}`);
    }

    const package = path.join(plugin, content[index]);

    const { x, version, description, main } = require(package);

    const valid = validate(x);
    if (!valid) {
        throw new Error(
            `x editor config not valid in ${package}. ${validate.errors
                .map(err => `Error: ${err.message}`)
                .join(" ")}`
        );
    }

    const info = {
        name: x.displayName,
        version,
        description,
        type: x.type,
        options: x.options
    };

    const { base } = path.parse(plugin);

    const isAdvanced = ["View", "Edit"].every(el => {
        const folder = path.join(plugin, el);

        let isFolder = true;
        try {
            fs.statSync(folder).isDirectory();
        } catch (e) {
            isFolder = false;
        }

        return isFolder;
    });

    const plugin_meta = {
        base,
        main,
        info
    };

    return {
        isAdvanced,
        ...plugin_meta
    };

    //return pluginScript(`./${base}/${main}`, info);
};

const fileError = ({ message }) => {
    console.log(`File operation error. ${message}`);

    process.exit(1);
};

(async () => {
    const plugin_list = await readDir(plugins_dir).catch(fileError);

    const plugins = plugin_list
        .map(fldr => path.join(plugins_dir, fldr))
        .filter(f => fs.statSync(f).isDirectory())
        .filter(f => !ignore.some(pl => f.includes(pl)));

    if (await fileExists(output_file))
        await deleteFile(output_file).catch(fileError);

    const plugin_data = await Promise.all(
        plugins.map(plugin =>
            indexScript(plugin).catch(err => errors.push(err.message))
        )
    );

    const all_plugins = plugin_data.reduce(
        (acc, el) => {
            if (el.isAdvanced) {
                acc.advanced.push(el);
            } else {
                acc.common.push(el);
            }

            return acc;
        },
        {
            common: [],
            advanced: []
        }
    );

    const common_script = `
    /*eslint react/display-name:0
    import React from 'react';
        import Loadable from 'react-loadable';
        import makePlugin from 'edtrio/editor/components/PluginWrapper';

        export default [
            ${all_plugins.common.map(({ base, main, info }) => {
                return pluginScript(`./${base}/${main}`, info);
            })}
        ]
    `;

    const view_script = `
    /*eslint react/display-name:0
    import React from 'react';
        import Loadable from 'react-loadable';
        import makePlugin from 'edtrio/viewer/components/PluginWrapper';

        export default [
            ${all_plugins.advanced.map(({ base, main, info }) => {
                return pluginScript(`./${base}/View/${main}`, info);
            })}
        ]
    `;

    const edit_script = `
    /*eslint react/display-name:0
    import React from 'react';
        import Loadable from 'react-loadable';
        import makePlugin from 'edtrio/editor/components/PluginWrapper';

        export default [
            ${all_plugins.advanced.map(({ base, main, info }) => {
                return pluginScript(`./${base}/Edit/${main}`, info);
            })}
        ]
    `;

    if (errors.length > 0) {
        errors.forEach((error, i) => {
            console.log(`${i + 1}. ${error}`);
        });

        process.exit(1);
    } else {
        await Promise.all([
            await writeFile(
                path.join(plugins_dir, "plugins.js"),
                common_script
            ),
            await writeFile(
                path.join(plugins_dir, "plugins.edit.js"),
                edit_script
            ),
            await writeFile(
                path.join(plugins_dir, "plugins.view.js"),
                view_script
            )
        ]).catch(fileError);

        console.log("Done.");
    }
})().catch(err => {
    console.log(`Unknown error ${err.message}.`);
});
*/
