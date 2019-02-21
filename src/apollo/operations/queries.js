import gql from "graphql-tag"
import request from "~/api/request"

/* start of one request chunk */
export const SAMPLE_REQUEST_QUERY = gql`
    query sampleRequest($count: Int!) {
        allUsers(count: $count) {
            id
            firstName
            lastName
        }
    }
`
export const sampleRequest = count => {
    // You can clone https://github.com/notrab/fakerql and run it to make this request work
    return request(SAMPLE_REQUEST_QUERY, count)
}
/* end of one request chunk */

// export const BOOTSTRAP_LESSON = gql`
//     query BootstrapLesson($id: String!) {
//         lesson(id: $id) @client {
//             id
//             title
//             sections
//         }
//     }
// `
