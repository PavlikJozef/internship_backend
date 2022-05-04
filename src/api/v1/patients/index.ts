import { Router } from 'express'

import validationMiddleware from '../../../middlewares/validationMiddleware'

import * as GetPatients from './get.patients'
import * as GetPatient from './get.patient'
import * as PostPatient from './post.patient'
import * as PatchPatient from './patch.patient'
import * as DeletePatient from './delete.patient'

const router = Router()

export default () => {
    router.get('/', validationMiddleware(GetPatients.validationSchema),GetPatients.workflow)
    router.get('/:id', validationMiddleware(GetPatient.validationSchema), GetPatient.workflow)
    router.post('/', validationMiddleware(PostPatient.validationSchema), PostPatient.workflow)
    router.patch('/:id', validationMiddleware(PatchPatient.validationSchema), PatchPatient.workflow)
    router.delete('/:id', validationMiddleware(DeletePatient.validationSchema), DeletePatient.workflow)
    return router
}