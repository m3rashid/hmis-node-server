import winston from 'winston'
import morgan from 'morgan'

const transports = [
	new winston.transports.Console({
		format: winston.format.combine(winston.format.colorize(), winston.format.simple())
	})
]

export const logger = winston.createLogger({
	level: process.env.LOG_LEVEL ?? 'debug',
	exitOnError: false,
	transports
})

const logStream = {
	write: (text: string) => logger.debug(text)
}

morgan.token('body', req => {
	// @ts-ignore
	return JSON.stringify(req.body)
})

export const log = morgan(
	':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" ":body"',
	{ stream: logStream }
)
