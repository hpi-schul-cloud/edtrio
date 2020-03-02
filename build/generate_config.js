const fs = require("fs");
const { envs } = require("../src/config.js");

const config = envs
	.map((env) => `window.${env} = ${process.env[env]};\n`)
	.join("");

const generateConfig = (filepath = "dist") =>
	fs.writeFileSync(`${filepath}/env.js`, config, function(err) {
			if (err) throw err;
			`env saved to "${filepath}/env.js"`
		});

// execute directly if called from CLI and not required
// https://stackoverflow.com/questions/6398196/detect-if-called-through-require-or-directly-by-command-line
if (require.main === module) {
	generateConfig(process.argv[2]); // read destination from arguments (first and only parameter)
}else{
	module.exports = generateConfig
}
