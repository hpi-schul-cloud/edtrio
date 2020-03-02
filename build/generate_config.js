// list of process.env variables used in the project
const envs = [
	"EDITOR_API_URL",
	"SERVER_API_URL",
	"EDITOR_SOCKET_URL",
	"HOMEWORK_URI",
];

// ----------------------------------------------

const fs = require("fs");
const config = envs
	.map((env) => `window.${env} = ${process.env[env]};\n`)
	.join("");

const generateConfig = (filepath = "dist") =>
	fs.writeFileSync(`${filepath}/env.js`, config, function(err) {
		if (err) throw err;
		// eslint-disable-next-line no-console
		console.log(`env saved to "${filepath}/env.js"`);
	});

if (require.main === module) { // execute directly if called from CLI
	generateConfig(process.argv[2]); // read destination from arguments (first and only parameter)
} else {
	module.exports = generateConfig;
}
