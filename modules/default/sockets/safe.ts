import type { Socket } from 'socket.io'

import type { IO } from 'modules/default/sockets/types'
import { logger } from 'utils/logger'

const safeSocket =
	(handler: any) =>
	(io: IO, socket: Socket) =>
	(...args: any) => {
		Promise.resolve(handler(io, socket)(...args)).catch(err => {
			logger.info('Socket Err', err)
			io.emit('error', {
				message:
					process.env.NODE_ENV !== 'production'
						? String(err.message) || 'An error Occurred'
						: 'An error Occurred'
			})
		})
	}

export default safeSocket
