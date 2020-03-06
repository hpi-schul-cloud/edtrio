// env variables will be set to the window object in public/env.js during build
// https://blog.codecentric.de/en/2018/12/react-application-container-environment-aware-kubernetes-deployment/
// NOTE: You can not put this window and process stuff into a variable
// because parcel does not allow dynamic access to process.env. So something like process.env[name] does not work. :(

// ⚠ DANGER ⚠
// If you introduce new config options with process.env
// also add them to deploy/env.sh
const config = {

	EDITOR_API_URL: window.EDITOR_API_URL || process.env.EDITOR_API_URL || "http://localhost:4001",
	SERVER_API_URL: window.SERVER_API_URL || process.env.SERVER_API_URL || "http://localhost:3030",
	EDITOR_SOCKET_URL: window.EDITOR_SOCKET_URL || process.env.EDITOR_SOCKET_URL || "ws://localhost:4001",
	ETHERPAD_URL: window.ETHERPAD_URL || process.env.ETHERPAD_URL || "https://etherpad.schul-cloud.org/p/",

	HOMEWORK_URI: window.HOMEWORK_URI || process.env.HOMEWORK_URI || "/homework",
	NEXBOARD_BOARDS_URI: window.NEXBOARD_BOARD_URI || process.env.NEXBOARD_BOARD_URI || '/nexboard/boards',
	NEXBOARD_PROJECTS_URI: window.NEXBOARD_PROJECTS_URI || process.env.NEXBOARD_PROJECTS_URI || '/nexboard/projects',

  ENABLE_LTI: window.ENABLE_LTI || process.env.ENABLE_LTI || false,

	breakpoints: {
		tablet: 750,
		desktop: 991,
		desktopLg: 1200,
	},
};

// eslint-disable-next-line no-console
console.info("config", JSON.stringify(config));
export default config;
