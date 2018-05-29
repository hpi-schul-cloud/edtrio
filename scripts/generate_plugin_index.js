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

const EDTRIO_PLUGIN_SCHEMA = {
    type: "object",
    properties: {
        displayName: { type: "string" },
        type: { enum: ["CONTENT", "LAYOUT", "INPUT"] },
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
const validate = ajv.compile(EDTRIO_PLUGIN_SCHEMA);

const errors = [];

const PLUGINS_DIR = path.join(__dirname, "../src/plugins");
const OUTPUT_FILE = path.join(PLUGINS_DIR, "index.js");

const BASE_IMPORTS = `
/*eslint-disable */
import React from 'react';
import Loadable from 'react-loadable';`;

const EDITOR_HOC = `import makePlugin from 'edtrio/editor/components/PluginWrapper';`;
const VIEWER_HOC = `import makePlugin from 'edtrio/viewer/components/PluginWrapper';`;

const EDITOR_FILE = path.join(PLUGINS_DIR, "plugins.edit.js");
const VIEWER_FILE = path.join(PLUGINS_DIR, "plugins.view.js");

const imageRegex = /^preview\.(png|jpe?g)$/;
const weleleRegex = /(.*"preview_image":)"(image_.+)"/;

const viewLoader = (main, { name, previewImage, ...rest }) => `
{
    Plugin: Loadable({
        loader: () => import('${main}').then(object => makePlugin(object.default, ${JSON.stringify(
    rest
)})),
        loading: () => (
            <p>Lädt</p>
        )
    }),
    info: {name: "${name}"},
}
`;

const editLoader = (main, opts, base) => {
    const info = JSON.stringify({ ...opts, preview_image: `image_${base}` });
    const data = info.replace(weleleRegex, "$1$2");

    return `
    {
        Plugin: Loadable({
            loader: () => import('${main}').then(object => makePlugin(object.default, ${JSON.stringify(
        opts
    )})),
            loading: () => (
                <p>Lädt</p>
            )
        }),
        info: ${data},
    }`;
};

const scriptString = (mode, data, loader) => `
    ${BASE_IMPORTS}
    ${mode === "Edit" ? EDITOR_HOC : VIEWER_HOC}

    ${
        mode === "Edit"
            ? data
                  .map(({ previewImage, base }, i) => {
                      return `import image_${base.toLowerCase()} from ${previewImage}`;
                  })
                  .join("\n")
            : ""
    }

    export default [
        ${data.map(({ isAdvanced, base, main, info }, i) => {
            const middle = isAdvanced ? `${mode}/` : "";
            return loader(
                `./${base}/${middle}${main}`,
                info,
                base.toLowerCase()
            );
        })}
    ]
`;

const indexScript = async function generateIndexScript(plugin) {
    const content = await readDir(plugin);
    const index = content.findIndex(el => el === "package.json");

    if (index < 0) {
        throw new Error(`package.json is required in ${plugin}`);
    }

    const pkg = path.join(plugin, content[index]);

    const { edtrio, version, description, main } = require(pkg);

    const valid = validate(edtrio);
    if (!valid) {
        throw new Error(
            `x editor config not valid in ${pkg}. ${validate.errors
                .map(err => `Error: ${err.message}`)
                .join(" ")}`
        );
    }

    const info = {
        name: edtrio.displayName,
        version,
        description,
        type: edtrio.type,
        options: edtrio.options
    };

    const { base } = path.parse(plugin);

    const imageExists = content.findIndex(el => el.match(imageRegex));

    let previewImage = '"./MissingPlugin/preview.png"';

    if (imageExists > 0) {
        previewImage = `"./${path.join(
            path.parse(plugin).base,
            content[imageExists]
        )}"`.replace(/\\/g, "/");
    }

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

    return {
        isAdvanced,
        base,
        main,
        info,
        previewImage
    };
};

const fileError = ({ message }) => {
    console.log(`File operation error. ${message}`);

    process.exit(1);
};

(async () => {
    const plugin_list = await readDir(PLUGINS_DIR).catch(fileError);

    const plugins = plugin_list
        .map(fldr => path.join(PLUGINS_DIR, fldr))
        .filter(f => !ignore.some(pl => f.includes(pl)))
        .filter(f => fs.statSync(f).isDirectory());

    const plugin_data = await Promise.all(
        plugins.map(plugin =>
            indexScript(plugin).catch(err => errors.push(err.message))
        )
    );

    const edit_script = scriptString("Edit", plugin_data, editLoader);
    const view_script = scriptString("View", plugin_data, viewLoader);

    if (errors.length > 0) {
        errors.forEach((error, i) => {
            console.log(`${i + 1}. ${error}`);
        });

        process.exit(1);
    } else {
        await Promise.all([
            writeFile(EDITOR_FILE, edit_script),
            writeFile(VIEWER_FILE, view_script)
        ]);

        console.log("Done.");
    }
})().catch(err => {
    console.log(`Unknown error ${err.message}.`);
});
