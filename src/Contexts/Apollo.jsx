import React from "react"

// Note: These are not official Apollo Hooks. However, several of the Apollo Maintainers are contributing to this project
// so Apollo Hooks will probably look similar https://github.com/trojanowski/react-apollo-hooks/issues/40
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks"
import { ApolloProvider } from "react-apollo"
import { apolloClient } from "~/apollo"

const ApolloContextProvider = ({ children }) => {
    return (
        <ApolloProvider client={apolloClient}>
            <ApolloHooksProvider client={apolloClient}>
                {children}
            </ApolloHooksProvider>
        </ApolloProvider>
    )
}

export default ApolloContextProvider
