import { Router } from 'express'

import validationMiddleware from '../../../middlewares/validationMiddleware'

import * as GetPatients from './get.patients'
import * as GetPatient from './get.patient'
import * as PostPatient from './post.patient'
import * as PutPatient from './put.patient'
import * as DeletePatient from './delete.patient'

const router = Router()

export default () => {
    router.get('/', GetPatients.workflow)
    router.get('/:id', GetPatient.workflow)
    router.post('/', validationMiddleware(PostPatient.schema), PostPatient.workflow)
    router.put('/:id', validationMiddleware(PutPatient.schema), PutPatient.workflow)
    router.delete('/:id', DeletePatient.workflow)
    return router
}

// bonusova uloha: ako validovat vstupy, pred pustenim k logike end pointu, vyuzitie middlewara