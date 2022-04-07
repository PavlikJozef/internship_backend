import { Router } from 'express'

import validationMiddleware from '../../../middlewares/validationMiddleware'

import * as GetPatients from './get.patients'
import * as GetPatient from './get.patient'
import * as PostPatient from './post.patient'
import * as PatchPatient from './patch.patient'
import * as DeletePatient from './delete.patient'

const router = Router()

export default () => {
    router.get('/', GetPatients.workflow)
    router.get('/:id', GetPatient.workflow)
    router.post('/', validationMiddleware(PostPatient.schema), PostPatient.workflow)
    router.patch('/:id', validationMiddleware(PatchPatient.schema), PatchPatient.workflow)
    router.delete('/:id', DeletePatient.workflow)
    return router
}

// bonusova uloha: ako validovat vstupy, pred pustenim k logike end pointu, vyuzitie middlewara