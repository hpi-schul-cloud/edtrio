// save all used env variables to export them
const usedEnvs = {};

const getEnv = (name, fallback) => {
	usedEnvs[name] = true;

	if(typeof window === 'undefined'){ return fallback; }

	// env variables will be set tot he window object in public/env.js during build
	// https://blog.codecentric.de/en/2018/12/react-application-container-environment-aware-kubernetes-deployment/
	// only in development mode you can dynamicly overwrite them using process.env
	if (process.env.NODE_ENV === 'development') {
		return process.env[name] || fallback
	}
	return window[name] || fallback
}

const config = {
	EDITOR_API_URL: getEnv("EDITOR_API_URL", "http://localhost:4001"),
	SERVER_API_URL: getEnv("SERVER_API_URL", "http://localhost:3030"),
	EDITOR_SOCKET_URL: getEnv("EDITOR_SOCKET_URL","ws://localhost:4001"),
	HOMEWORK_URI: getEnv("HOMEWORK_URI", "/homework"),

	breakpoints: {
		tablet: 750,
		desktop: 991,
		desktopLg: 1200,
	},

	// list of used environment variables
	envs: Object.keys(usedEnvs),
};

// eslint-disable-next-line no-console
console.info("config", config);

module.exports = config
