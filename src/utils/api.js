import axios from "axios"
import { getCookie } from "~/utils/cookie"

// EXAMPLE:
// 1. normal get request
// api.get('/editor/lessons/123').then(data => {
//     console.log(data)
// })

// // 2. post request with body
// api.post('/editor/lessons/123', { name: 'Augustiner' }).then(data => {
//     console.log(data)
// })

// // 3. post request with body with an error
// api.post('/editor/sections/456', { name: 'Augustiner' })
//     .then(data => {
//         console.log(data)
//     })
//     .catch(err => {
//         console.error(err)
//     })

// // 4. post request with files
// api.post('/editor/sections/456', { name: 'Whatever' }, { picture: store.picture })
//     .then(data => {
//     // picture will be sent as FormData
//         console.log(data)
//     }
// )

const BACKEND_URL = BACKEND_URL || ""

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
            baseURL: BACKEND_URL || "http://localhost:3030", // TODO include test system? staging?
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    (getCookie("jwt").startsWith("Bearer ") ? "" : "Bearer ") +
                    getCookie("jwt"),
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
                    baseURL: BACKEND_URL || "http://localhost:3030", // TODO include test system? staging?
                    headers: {
                        Authorization:
                            (getCookie("jwt").startsWith("Bearer ")
                                ? ""
                                : "Bearer ") + getCookie("jwt"),
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
    delete: (endpoint, fakeResponse) => {
        if (fakeResponse && process.env.NODE_ENV !== "production") {
            return new Promise(resolve =>
                setTimeout(() => resolve(fakeResponse), 250),
            )
        }

        return new Promise((resolve, reject) => {
            axios
                .delete(endpoint, {
                    baseURL: BACKEND_URL || "http://localhost:3030", // TODO include test system? staging?
                    headers: {
                        Authorization:
                            (getCookie("jwt").startsWith("Bearer ")
                                ? ""
                                : "Bearer ") + getCookie("jwt"),
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
}

export default api
