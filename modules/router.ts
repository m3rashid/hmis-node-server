import { Router } from 'express'

import appointmentRouter from 'modules/appointment/router'
import authRouter from 'modules/auth/router'
import availabilityRouter from 'modules/availability/router'
import configRouter from 'modules/config/router'
import inventoryRouter from 'modules/inventory/router'
import notificationRouter from 'modules/notification/router'
import prescriptionRouter from 'modules/prescription/router'
import profileRouter from 'modules/profile/router'
import resourceRouter from 'modules/resources/router'
import roleRouter from 'modules/role/router'

const router = Router()

router.get('/', (_, res) => res.sendStatus(200))
router.get('/favicon.ico', (_, res) => res.sendStatus(200))

router.use('/appointment', appointmentRouter)
router.use('/auth', authRouter)
router.use('/availability', availabilityRouter)
router.use('/config', configRouter)
router.use('/inventory', inventoryRouter)
router.use('/notification', notificationRouter)
router.use('/prescription', prescriptionRouter)
router.use('/profile', profileRouter)
router.use('/resource', resourceRouter)
router.use('/role', roleRouter)

export default router
