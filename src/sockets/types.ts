import type { IUser } from 'models/user'
import type { Server, Socket } from 'socket.io'

export type SocketData = {
	user?: IUser
	socketId: string
} & Record<string, any>

/**
 * @description These types are used on io.emit
 * @example io.emit('error', { message: '' })
 */
export interface EmitEvents {
	error: (_: { message: string }) => void
	disconnected: (_: SocketData) => void
	connected: (_: SocketData) => void
	createAppointment: (_: { appointment: any }) => void
	createPrescription: (_: { prescription: any }) => void
	dispenseMedicines: (_: { medicines: any }) => void
}

export interface ListenEvents {
	connect: () => void
}

export interface ServerSideEvents {
	ping: () => void
}

export type IO = Server<ListenEvents, EmitEvents, ServerSideEvents, SocketData>
export type SocketType = Socket<ListenEvents, EmitEvents, ServerSideEvents, SocketData>
