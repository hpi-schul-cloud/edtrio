const config = {
    IS_EMBED: process.env.NODE_ENV === "production",
    GRAPHQL_HTTP_URL: process.env.GRAPHQL_HTTP_URL || 'http://localhost:4000',
    GRAPHQL_WS_URL: process.env.GRAPHQL_WS_URL || 'ws://localhost:4000',
}

export default config
