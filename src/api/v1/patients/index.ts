import { Router } from 'express'

//import validationMiddleware from '../../../middleware/validationMiddleware'
import * as GetPatients from './get.patients'

const router = Router()

export default () => {
    router.get('/', ()=> {}, GetPatients.workflow)
    return router
}

// bonusova uloha: ako validovat vstupy, pred pustenim k logike end pointu, vyuzitie middlewara