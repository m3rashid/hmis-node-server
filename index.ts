import 'utils/env'
import http from 'http'

import compression from 'compression'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import morgan from 'morgan'
import { Server } from 'socket.io'

import socketHandler from 'modules/default/sockets'
import checkSocketAuth from 'modules/default/sockets/auth'
import type {
	EmitEvents,
	ListenEvents,
	ServerSideEvents,
	SocketData
} from 'modules/default/sockets/types'
import routes from 'modules/router'
import { config } from 'utils/config'
import { globalErrorHandlerMiddleware } from 'utils/errors'
// import initialDbMigration from 'utils/setup'
mongoose.set('debug', process.env.NODE_ENV !== 'production')
mongoose.plugin(paginate)

const app = express()
app.use(helmet())
app.use(compression())
app.disable('x-powered-by')
const server = http.createServer(app)
const io = new Server<ListenEvents, EmitEvents, ServerSideEvents, SocketData>(server, {
	cors: config.cors
})

io.engine.use(helmet())
io.use(checkSocketAuth)

io.on('connection', socket => {
	socket.on('connect', () => {
		console.log({
			socket_status: 'connected',
			socketId: socket.id,
			userId: socket.data.user?._id
		})
	})

	socketHandler(io, socket)
})

app.use(cors(config.cors))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use(routes)
app.use((_, res) => res.status(404).send('Not Found'))
app.use(globalErrorHandlerMiddleware)

const startServer = async () => {
	try {
		const PORT = process.env.PORT ?? 4000
		await mongoose.connect(process.env.DATABASE_URL)
		console.log('Connection Established Successfully')
		// await mongoose.connection.db.dropDatabase()
		// console.log('Database Dropped Successfully')
		// await initialDbMigration()
		server.listen(PORT, () => {
			console.log(`Server ON :${PORT}`)
		})
	} catch (err) {
		await mongoose.disconnect()
		console.log(err)
		process.exit(1)
	}
}

startServer().catch((err: any) => {
	console.log(err)
})
