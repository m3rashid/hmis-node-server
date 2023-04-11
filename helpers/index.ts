import cors from 'cors'
import express from 'express'
import compression from 'compression'

import { logger } from './logger'
import exception from './exception'

export const middlewares = [
	cors({
		origin: (origin, callback) => {
			callback(null, true)
		},
		credentials: true
	}),
	logger,
	express.json(),
	express.urlencoded({ extended: true }),
	compression(),
	exception
]
