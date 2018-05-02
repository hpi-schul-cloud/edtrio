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
const validate = ajv.compile(x_schema);

const errors = [];

const plugins_dir = path.join(__dirname, "../src/Plugins");
const output_file = path.join(plugins_dir, "index.js");

const imageRegex = /^preview\.(png|jpe?g)$/;
const weleleRegex = /(.*"preview_image":)"(image\d)"/;

const pluginScript = function generatePluginScript(main, opts, i) {
    const info = JSON.stringify({ ...opts, preview_image: `image${i}` });
    const data = info.replace(weleleRegex, "$1$2");

    return `
    {
        Plugin: Loadable({
            loader: () => import('${main}').then(object => makePlugin(object.default, ${info})),
            loading: () => (
                <p>Lädt</p>
            )
        }),
        info: ${data},
    }`;
};

const indexScript = async function generateIndexScript(plugin) {
    const content = await readDir(plugin);
    const index = content.findIndex(el => el === "package.json");

    if (index < 0) {
        throw new Error(`package.json is required in ${plugin}`);
    }

    const pkg = path.join(plugin, content[index]);

    const { x, version, description, main } = require(pkg);

    const valid = validate(x);
    if (!valid) {
        throw new Error(
            `x editor config not valid in ${pkg}. ${validate.errors
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

    const imageExists = content.findIndex(el => el.match(imageRegex));

    let previewImage = '"./MissingPlugin/preview.png"';
    if (imageExists > 0) {
        previewImage = `".${path.join(
            `${plugin.split("Plugins")[1]}`,
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

    const plugin_meta = {
        base,
        main,
        info,
        previewImage
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

    const plugin_data = await Promise.all(
        plugins.map(plugin =>
            indexScript(plugin).catch(err => errors.push(err.message))
        )
    );

    const edit_script = `
    /*eslint-disable */
    import React from 'react';
        import Loadable from 'react-loadable';
        import makePlugin from 'edtrio/editor/components/PluginWrapper';

        ${plugin_data
            .map(({ previewImage }, i) => {
                return `import image${i} from ${previewImage}`;
            })
            .join("\n")}

        export default [
            ${plugin_data.map(({ isAdvanced, base, main, info }, i) => {
                const middle = isAdvanced ? "Edit/" : "";
                return pluginScript(`./${base}/${middle}${main}`, info, i);
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
