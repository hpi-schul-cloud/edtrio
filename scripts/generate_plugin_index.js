const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');

const { promisify } = require('util');

const readDir    = promisify(fs.readdir);
const readFile   = promisify(fs.readFile);
const writeFile  = promisify(fs.writeFile);
const deleteFile = promisify(fs.unlink);
const fileExists = s => new Promise(r=>fs.access(s, fs.F_OK, e => r(!e)));

const x_schema = {
    type: 'object',
    properties: {
        displayName: { type: 'string' },
        type: { enum: ['GRID', 'CONTENT', 'LAYOUT'] },
        options: { 
            type: "object",
            properties: {
                size: { type: "number" },
                allowPluginRearrangement: { type: "boolean" }
            }
        }
    },
    required: ['displayName', 'type']
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
    const index = content.findIndex(el => el === 'package.json');

    if (index < 0) {
        throw new Error(`package.json is required in ${plugin}`);
    }

    const package = path.join(plugin, content[index]);

    const { x, version, description, main } = JSON.parse(
        await readFile(package)//.catch(fileError);
    );

    const valid = validate(x);
    if (!valid) {
        throw new Error(`x editor config not valid in ${package}. ${validate.errors.map(err => `Error: ${err.message}`).join(' ')}`);
    }

    const info = {
        name: x.displayName,
        version,
        description,
        type: x.type,
        options: x.options,
    };

    const { base } = path.parse(plugin);

    return pluginScript(`./${base}/${main}`, info);
};

const fileError = ({ message }) => {
    console.log(`File operation error. ${message}`);

    process.exit(1);
}

(async () => {
    const plugin_list = await readDir(plugins_dir).catch(fileError);
    const plugins = plugin_list.map(fldr => path.join(plugins_dir, fldr)).filter(f => fs.statSync(f).isDirectory());

    if(await fileExists(output_file))
        await deleteFile(output_file).catch(fileError);

    const script = `
        /*eslint react/display-name:0*/
        import React from 'react';
        import Loadable from 'react-loadable';
        import makePlugin from 'edtrio/editor/components/PluginWrapper';

        export default [
            ${await Promise.all(plugins.map(plugin =>
                indexScript(plugin).catch(err => errors.push(err.message))
            ))}
        ]
    `;

    if(errors.length > 0) {
        errors.forEach((error, i) => {
            console.log(`${i + 1}. ${error}`)
        });

        process.exit(1);
    } else {
        await writeFile(path.join(plugins_dir, 'index.js'), script).catch(fileError);

        console.log('Done.')
    }
})().catch(err => {
    console.log(`Unknown error ${err.message}.`);
});
