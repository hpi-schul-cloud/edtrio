import axios from "axios"

// EXAMPLE:
// // 1. normal get request
// api.get('/api').then(data => {
//     console.log(data)
// })

// // 2. post request with body
// api.post('/api/beer/new', { name: 'Augustiner' }).then(data => {
//     console.log(data)
// })

// // 3. post request with body with an error
// api.post('/api/beer/new', { name: 'Augustiner' })
//     .then(data => {
//         console.log(data)
//     })
//     .catch(err => {
//         console.log(err.description) // display that on the page
//     })

// // 4. post request with files
// api.post('/api/artwork/new', { name: 'Whatever' }, { artworkPicture: store.artworkPicture }).then(
//     // artworkPicture will be sent as FormData
//     data => {
//         console.log(data)
//     }
// )

const bodyRequest = (
    type,
    endpoint,
    body,
    files,
    uploadProgress,
    fakeResponse,
) => {
    if (fakeResponse && process.env.NODE_ENV !== "production") {
        return new Promise(resolve =>
            setTimeout(() => resolve(fakeResponse), 250),
        )
    }

    return new Promise((resolve, reject) => {
        let data

        if (files) {
            data = new FormData()

            Object.keys(body).forEach(key => {
                data.append(key, body[key])
            })

            Object.keys(files).forEach(key => {
                data.append(key, files[key])
            })
        } else {
            data = body
        }

        axios[type](endpoint, data, {
            baseURL:
                process.env.NODE_ENV !== "production" &&
                "http://localhost:3030", // TODO include test system? staging?
            headers: {
                Authorization: `Bearer ${localStorage.getItem("identity")}`, // TODO correctly set JWT
            },
            onUploadProgress:
                uploadProgress && typeof uploadProgress === "function"
                    ? uploadProgress
                    : undefined,
        })
            .then(result => {
                resolve(result.data)
            })
            .catch(err => {
                if (
                    err &&
                    err.response &&
                    err.response.data &&
                    err.response.data.error
                ) {
                    err.description = err.response.data.error
                    reject(err)
                } else {
                    reject(err)
                }
            })
    })
}

const api = {
    get: (endpoint, fakeResponse) => {
        if (fakeResponse && process.env.NODE_ENV !== "production") {
            return new Promise(resolve =>
                setTimeout(() => resolve(fakeResponse), 250),
            )
        }

        return new Promise((resolve, reject) => {
            axios
                .get(endpoint, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "identity",
                        )}`,
                    },
                })
                .then(result => resolve(result.data))
                .catch(err => {
                    if (
                        err &&
                        err.response &&
                        err.response.data &&
                        err.response.data.error
                    ) {
                        err.description = err.response.data.error
                        reject(err)
                    } else {
                        reject(err)
                    }
                })
        })
    },

    post: (endpoint, body, files, uploadProgress, fakeResponse) =>
        bodyRequest(
            "post",
            endpoint,
            body,
            files,
            uploadProgress,
            fakeResponse,
        ),
    put: (endpoint, body, files, uploadProgress, fakeResponse) =>
        bodyRequest("put", endpoint, body, files, uploadProgress, fakeResponse),
    patch: (endpoint, body, files, uploadProgress, fakeResponse) =>
        bodyRequest(
            "patch",
            endpoint,
            body,
            files,
            uploadProgress,
            fakeResponse,
        ),
    delete: (endpoint, body, files, uploadProgress, fakeResponse) =>
        bodyRequest(
            "delete",
            endpoint,
            body,
            files,
            uploadProgress,
            fakeResponse,
        ),
}

export default api
