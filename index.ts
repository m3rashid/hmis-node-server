import './index.d.ts'
import 'dotenv/config'
import mongoose from 'mongoose'
import express from 'express'

mongoose.set('debug', process.env.NODE_ENV !== 'production')

const app = express()
const port = process.env.PORT ?? 4000

app.disable('x-powered-by')
app.listen(port, () => {
	console.log(`Server is listening on on http://localhost:${port}`)
})
