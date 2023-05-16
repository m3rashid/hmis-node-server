import type { IO, SocketType } from 'modules/default/sockets/types'

export const userDisconnected = (io: IO, socket: SocketType) => (data: any) => {
	console.log({ data })
	io.emit('disconnected', { socketId: socket.id, user: socket.data.user })
}

export const userConnected = (io: IO, socket: SocketType) => (data: any) => {
	console.log({ data })
	io.emit('connected', { socketId: socket.id, user: socket.data.user })
}
