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

const sampleRequestFakeResponse = () => {
    return new Promise(resolve => {
        setTimeout(function() {
            return resolve({
                allUsers: [
                    {
                        id: "cjsehx3a1000uxt10i64nf1nn",
                        firstName: "Emil",
                        lastName: "Douglas",
                    },
                    {
                        id: "cjsehx3a1000vxt10p1fvh8q0",
                        firstName: "Clovis",
                        lastName: "Hermann",
                    },
                ],
            })
        }, 1000)
    })
}

export const sampleRequest = ({ count }, fake) => {
    // You can clone https://github.com/notrab/fakerql and run it to make this request work

    if (process.env.NODE_ENV !== "production" && fake === true) {
        return sampleRequestFakeResponse()
    }

    return request(SAMPLE_REQUEST_QUERY, { count })
}
/* end of one request chunk */

export const BOOTSTRAP_LESSON = gql`
    query BootstrapLesson($id: String!) {
        lesson(id: $id) {
            id
            title
            sections
        }
    }
`

const bootstrapFakeResponse = id => {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            resolve({
                id,
                title: `Sample lesson`,
                sections: [
                    {
                        id: 124124,
                        notes: "",
                        title: "Sample Section",
                        docValue:
                            '{"type":"@edtr-io/document","plugin":"rows","state":[{"type":"@edtr-io/document","plugin":"counter","state":1},{"type":"@edtr-io/document","plugin":"counter","state":2},{"type":"@edtr-io/document","plugin":"counter","state":3}]}',
                    },
                    {
                        id: 1235551,
                        notes: "",
                        title: "Second Sample Section",
                        docValue: null,
                    },
                    {
                        id: 5666,
                        notes: "",
                        title: "Third Sample Section",
                        docValue: null,
                    },
                    {
                        id: 75666,
                        notes: "",
                        title: "Fourth Sample Section",
                        docValue: null,
                    },
                ],
            })
        }, 1000)
    })
}

export const bootstrapLesson = ({ id }, fake) => {
    if (process.env.NODE_ENV !== "production" && fake === true) {
        return bootstrapFakeResponse(id)
    }

    return request(BOOTSTRAP_LESSON, { id })
}
