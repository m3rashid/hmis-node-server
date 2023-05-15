import { userConnected, userDisconnected } from 'modules/auth/socket'
import safeSocket from 'modules/default/sockets/safe'
import type { IO, SocketType } from 'modules/default/sockets/types'

const socketHandler = (io: IO, socket: SocketType) => {
	socket.on('disconnect', safeSocket(userDisconnected)(io, socket))
	socket.on('connect', safeSocket(userConnected)(io, socket))
	socket.on('error', () => {
		console.log('Hello')
	})
}

export default socketHandler
