import io from 'socket.io-client'
import { jwt } from './jwt'
import { useContext } from 'react'
import LessonContext from "~/Contexts/Lesson.context"
import config from "~/config"

const EDITOR_SOCKET_URL = config.EDITOR_SOCKET_URL || ""


// const { store, dispatch } = useContext(LessonContext)

class Socket {

	constructor(url, authorization){
		this.url = url
		this.socket = io(url, {
			reconnection: true,
			reconnectionDelay: 1000,
			reconnectionDelayMax : 5000,
			reconnectionAttempts: Infinity
		  })
		this.isConnected = false

		this.socket.on('connect', () => {
			this.authorization(authorization)
			this.isConnected = this.socket.connected
		})

		this.socket.on('reconnect', () => {
			this.authorization(authorization)
			this.isConnected = this.socket.connected
		})

		this.socket.on('disconnect', () => {
			this.isConnected = this.socket.connected
		 })

		this.socket.on('error', (error) => {
			console.error(error)
			/* dispatch({
				type: 'ERROR',
				payload: 'Die Verbindung zum Server konnte nicht aufrecht erhalten werden'
			}) */
		})
	}


	async authorization(token){
		try {
			await this.emit('authorization', {
				token,
			})
		} catch (err) {
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

export const editorWS = new Socket(EDITOR_SOCKET_URL, jwt)

export default Socket
