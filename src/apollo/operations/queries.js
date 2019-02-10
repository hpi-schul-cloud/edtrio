import gql from "graphql-tag"

// an example query
export const HELLO_WORLD_QUERY = gql`
    query HelloWorld($firstMessagePart: String!) {
        HelloWorld(firstMessagePart: $firstMessagePart) @client {
            message
        }
    }
`
