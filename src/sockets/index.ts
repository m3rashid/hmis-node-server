import safeSocket from 'sockets/safe'
import type { IO, SocketType } from 'sockets/types'
import { userConnected, userDisconnected } from 'handlers/user/socket'

const socketHandler = (io: IO, socket: SocketType) => {
	socket.on('disconnect', safeSocket(userDisconnected)(io, socket))
	socket.on('connect', safeSocket(userConnected)(io, socket))
	socket.on('error', () => {})
}

export default socketHandler
