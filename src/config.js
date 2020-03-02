const getEnv = (name) => {
	// env variables will be set tot he window object in public/env.js during build
	// https://blog.codecentric.de/en/2018/12/react-application-container-environment-aware-kubernetes-deployment/
	// only in development mode you can dynamicly overwrite them using process.env
	if (process.env.NODE_ENV === 'development') {
		return process.env[name] || window[name]
	}
	return window[name]
}

const config = {
	EDITOR_API_URL: getEnv("EDITOR_API_URL"),
	SERVER_API_URL: getEnv("SERVER_API_URL"),
	EDITOR_SOCKET_URL: getEnv("EDITOR_SOCKET_URL"),
	HOMEWORK_URI: getEnv("HOMEWORK_URI"),

	breakpoints: {
		tablet: 750,
		desktop: 991,
		desktopLg: 1200,
	},
};

// eslint-disable-next-line no-console
console.info("config", config);
export default config;
