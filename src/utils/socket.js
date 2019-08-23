import io from 'socket.io-client'

const BACKEND_URL = BACKEND_URL || ""

export const socket = io("http://api.edtr.l")
