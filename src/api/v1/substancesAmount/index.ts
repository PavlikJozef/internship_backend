import { Router } from 'express'

import * as GetSubstancesAmount from './get.substancesAmount'

const router = Router()

export default () => {
    router.get('/', GetSubstancesAmount.workflow)
    return router
}