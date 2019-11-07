const config = {
    DISABLE_BACKEND: true,
    EDITOR_SOCKET_URL: process.env.EDITOR_SOCKET_URL || "ws://api.edtr.l"
}
console.log('config', config);
export default config
