const config = {
    GRAPHQL_HTTP_URL:
        process.env.GRAPHQL_HTTP_URL || "http://localhost:4000/graphql",
    GRAPHQL_WS_URL: process.env.GRAPHQL_WS_URL || "ws://localhost:4000",
    DISABLE_BACKEND: true,
    EDITOR_SOCKET_URL: process.env.EDITOR_SOCKET_URL || "ws://api.edtr.l"
}

export default config
