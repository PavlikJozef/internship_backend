import { Router } from 'express'
import PatientsRouter from './patients'
import SubstancesAmountRouter from './substancesAmount'

const router = Router()

export default () => {
    router.use('/patients', PatientsRouter())
    router.use('/substancesAmount', SubstancesAmountRouter())
    return router
}