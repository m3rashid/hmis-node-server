import 'helpers/env'
import express from 'express'
import monitor from 'express-status-monitor'
import monitorConfig from 'middlewares/metrics'
import cors from 'cors'

const app = express()
const port = process.env.PORT ?? 4000

app.use(cors())
app.use(monitor(monitorConfig))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.disable('x-powered-by')
app.listen(port, () => {
	console.log(`Server is listening on on http://localhost:${port}`)
})
