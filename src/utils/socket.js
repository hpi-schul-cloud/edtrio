import io from 'socket.io-client'
import { jwt } from './jwt'

const EDITOR_SOCKET_URL = EDITOR_SOCKET_URL || ""

class Socket {

	constructor(url, authorization){
		this.url = url
		this.socket = io('ws://api.edtr.l', {
			query: {
				authorization,
			}
		})

		this.socket.on('connect', () => {
			console.log(EDITOR_SOCKET_URL)
			console.log('Socket is connected: ' + this.socket.connected) // true
		})

		this.socket.on('error', (error) => {
			console.log("Socket error")
			console.log(error)
		})
	}
	on(...params){
		this.socket.on(...params)
		return this
	}

	emit(...params){
		return new Promise((resolve, reject) => {
			this.socket.emit(...params, (error, message) => {
				if(error) return reject(error)
				return resolve(message)
			})
		})
	}
}

export const editor = new Socket(EDITOR_SOCKET_URL, jwt)

export default Socket
