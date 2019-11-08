const config = {
    EDITOR_API_URL: process.env.EDITOR_API_URL || "http://localhost:4001",
    SERVER_API_URL: process.env.SERVER_API_URL || "http://localhost:3030",
   // DISABLE_BACKEND: true,
    EDITOR_SOCKET_URL: process.env.EDITOR_SOCKET_URL || "ws://api.edtr.l"
}
console.log('config', config);
export default config
