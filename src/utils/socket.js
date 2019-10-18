import io from 'socket.io-client'
import { jwt } from './jwt'
import { useContext } from 'react'
import LessonContext from "~/Contexts/Lesson"
import config from "~/config"

const EDITOR_SOCKET_URL = config.EDITOR_SOCKET_URL || ""


// const { store, dispatch } = useContext(LessonContext)

class Socket {

	constructor(url, authorization){
		this.url = url
		this.socket = io(url)
		this.connected = false

		this.socket.on('connect', () => {
			console.log(EDITOR_SOCKET_URL)
			console.log('Socket is connected: ' + this.socket.connected) // true
			this.authorization(authorization)
			this.connected = this.socket.connected
		})

		this.socket.on('reconnect', () => {
			this.authorization(authorization)
			this.connected = this.socket.connected
		})

		this.socket.on('disconnect', () => {
			this.connected = this.socket.connected
		 })

		this.socket.on('error', (error) => {
			console.log("Socket error")
			console.log(error)
			/* dispatch({
				type: 'ERROR',
				payload: 'Die Verbindung zum Server konnte nicht aufrecht erhalten werden'
			}) */
		})
	}


	async authorization(token){
		try {
			console.log('start authorization')
			await this.emit('authorization', {
				token,
			})
			console.log('is authoriztated')
		} catch (err) {
			console.log('authentication failed', err)
			/* dispatch({
				type: 'ERROR',
				payload: 'Die Authentifizierung ist fehlgeschlagen. Bitte melde dich an'
			}) */
		}
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
