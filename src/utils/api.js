import axios from "axios"
import { getCookie } from "~/utils/cookie"
import config from "~/config"
import { jwt } from "./jwt"

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


axios.defaults.headers.common.Authorization = jwt
axios.defaults.headers.common['Content-Type'] = 'application/json'

const SERVER_API_URL = config.SERVER_API_URL || ""
const EDITOR_API_URL = config.EDITOR_API_URL || ""

const bodyRequest = (
	type,
	baseURL,
	endpoint,
	body,
	files,
	uploadProgress,
	fakeResponse,
) => {
	if (fakeResponse && config.DISABLE_BACKEND) {
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
			baseURL, // TODO include test system? staging?‚
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

class Api {

	constructor( baseURL ) {
		this.baseURL = baseURL
	}

	get (endpoint, fakeResponse) {
		console.log(endpoint)
		if (fakeResponse && config.DISABLE_BACKEND) {
			return new Promise(resolve =>
				setTimeout(() => resolve(fakeResponse), 250),
			)
		}

		return new Promise((resolve, reject) => {
			axios
				.get(endpoint, {
					baseURL: this.baseURL,
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
	}

	post (endpoint, body, files, uploadProgress, fakeResponse) {
		return bodyRequest(
			"post",
			this.baseURL,
			endpoint,
			body,
			files,
			uploadProgress,
			fakeResponse,
		)
	}

	put (endpoint, body, files, uploadProgress, fakeResponse) {
		return bodyRequest("put", this.baseURL, endpoint, body, files, uploadProgress, fakeResponse)
	}

	patch (endpoint, body, files, uploadProgress, fakeResponse){
		return bodyRequest(
			"patch",
			this.baseURL,
			endpoint,
			body,
			files,
			uploadProgress,
			fakeResponse,
		)
	}

	delete (endpoint, fakeResponse) {
		if (fakeResponse && process.env.NODE_ENV !== "production") {
			return new Promise(resolve =>
				setTimeout(() => resolve(fakeResponse), 250),
			)
		}

		return new Promise((resolve, reject) => {
			axios
				.delete(endpoint, {
					baseURL: this.baseURL, // TODO include test system? staging?
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
	}
}

export default Api

export const serverApi = new Api( SERVER_API_URL)
export const editorApi = new Api( EDITOR_API_URL)