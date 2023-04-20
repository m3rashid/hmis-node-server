import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => res.sendStatus(200))
router.get('/favicon.ico', (req, res) => res.sendStatus(200))

export default router
