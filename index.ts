import type {
	ClientToServerEvents,
	InterServerEvents,
	ServerToClientEvents,
	SocketData
} from 'sockets/types'
import 'helpers/env'
import cors from 'cors'
import http from 'http'
import helmet from 'helmet'
import morgan from 'morgan'
import router from 'routes'
import express from 'express'
import mongoose from 'mongoose'
import config from 'helpers/config'
import socketHandler from 'sockets'
import compression from 'compression'
import checkSocketAuth from 'sockets/auth'
import paginate from 'mongoose-paginate-v2'
import monitor from 'express-status-monitor'
// import initialDatabaseMigration from 'fresh'
import monitorConfig from 'middlewares/metrics'
import { Server as SocketServer } from 'socket.io'
import { globalErrorHandlerMiddleware } from 'helpers/errorHandler'

mongoose.set('debug', process.env.NODE_ENV !== 'production')
mongoose.plugin(paginate)

const app = express()
app.use(helmet())
app.use(compression())
app.disable('x-powered-by')
const server = http.createServer(app)
const io = new SocketServer<
	ClientToServerEvents,
	ServerToClientEvents,
	InterServerEvents,
	SocketData
>(server, { cors: config.cors })

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
app.use(monitor(monitorConfig))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(router)

app.use((req, res, next) => res.status(404).send('Not Found'))
app.use(globalErrorHandlerMiddleware)

const startServer = async () => {
	try {
		const PORT = process.env.PORT ?? 4000
		await mongoose.connect(process.env.DATABASE_URL)
		console.log('Connection established successfully')
		// await initialDatabaseMigration()
		server.listen(PORT, () => {
			console.log(`Server on :${PORT}`)
		})
	} catch (err) {
		await mongoose.disconnect()
		console.log(err)
		process.exit(1)
	}
}

startServer()
	.then(() => {})
	.catch(() => {})
