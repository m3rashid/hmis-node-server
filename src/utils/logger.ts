import winston from 'winston'

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
