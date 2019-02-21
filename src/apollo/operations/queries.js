import gql from "graphql-tag"

const query = id => `
    {
        user(id: ${id}) {
            firstName
            lastName
        }
    }
`

// query is now a GraphQL syntax tree object
console.log(query(5))

export const BOOTSTRAP_LESSON = gql`
    query BootstrapLesson($id: String!) {
        lesson(id: $id) @client {
            id
            title
            sections
        }
    }
`
