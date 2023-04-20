import type { Socket, Server } from 'socket.io'
import type {
	ClientToServerEvents,
	InterServerEvents,
	ServerToClientEvents,
	SocketData
} from 'sockets/types'

export type IO = Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>
export type SocketType = Socket<
	ClientToServerEvents,
	ServerToClientEvents,
	InterServerEvents,
	SocketData
>

const socketHandler = (io: IO, socket: SocketType) => {}

export default socketHandler
