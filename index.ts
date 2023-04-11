import './index.d.ts'
import 'dotenv/config'
import express from 'express'

const app = express()
const port = process.env.PORT ?? 4000

app.disable('x-powered-by')
app.listen(port, () => {
	console.log(`Server is listening on on http://localhost:${port}`)
})
