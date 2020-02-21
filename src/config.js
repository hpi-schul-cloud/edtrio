const config = {
    EDITOR_API_URL: process.env.EDITOR_API_URL || "http://localhost:4001",
    SERVER_API_URL: process.env.SERVER_API_URL || "http://localhost:3030",
    EDITOR_SOCKET_URL: process.env.EDITOR_SOCKET_URL || "ws://localhost:4001",
    ENABLE_LTI: process.env.ENABLE_LTI || false,
}
// eslint-disable-next-line no-console
console.info('config', config)
export default config
