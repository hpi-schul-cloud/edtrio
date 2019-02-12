import React from "react"
import { withRouter } from "react-router"
import { useQuery } from "react-apollo-hooks"
import { Query } from "react-apollo"

import Action from "~/components/Action"
import Container from "~/components/Container"
import Text from "~/components/Text"
import Heading from "~/components/Heading"

import { apolloClient, HELLO_WORLD_QUERY, getDataOrThrow } from "~/apollo"

const ApolloPlayground = props => {
    // EXAMPLE1: vanilla API
    apolloClient
        .query({
            query: HELLO_WORLD_QUERY,
            variables: { firstMessagePart: "Greetings" },
        })
        .then(result => console.log(getDataOrThrow(result).HelloWorld.message))

    // EXAMPLE2: hooks
    const { data, loading, error } = useQuery(HELLO_WORLD_QUERY, {
        variables: { firstMessagePart: "Wow! " },
        suspend: false,
    })
    let message
    if (!loading && !error) message = data.HelloWorld.message
    return (
        <Container>
            <Heading h2>
                This is an apollo playground {props.match.params.apolloId}
            </Heading>
            <Text>
                It is not meant to go into production, just to showcase some
                apollo graphql stuff and to provide a location to play around
                with some features
            </Text>
            <div>{message}</div>
            {/* EXAMPLE3: Query component */}
            <div>
                <Query
                    query={HELLO_WORLD_QUERY}
                    variables={{ firstMessagePart: "Wohoo!" }}>
                    {({ loading, error, data }) => {
                        if (loading) return <p>Loading</p>
                        if (error) return <p>Error</p>
                        return data.HelloWorld.message
                    }}
                </Query>
            </div>
            <Action to="/">Go back to Dashboard</Action>
        </Container>
    )
}

export default withRouter(ApolloPlayground)
