import { Router } from 'express'

import validationMiddleware from '../../../middlewares/validationMiddleware'

import * as GetPatients from './get.patients'
import * as GetPatient from './get.patient'
import * as PostPatient from './post.patient'
import * as PutPatient from './put.patient'
import * as DeletePatient from './delete.patient'

const router = Router()

export default () => {
    router.get('/', validationMiddleware(), GetPatients.workflow)
    router.get('/:id', validationMiddleware(), GetPatient.workflow)
    router.post('/', validationMiddleware(), PostPatient.workflow)
    router.put('/:id', validationMiddleware(), PutPatient.workflow)
    router.delete('/:id', validationMiddleware(), DeletePatient.workflow)
    return router
}

// bonusova uloha: ako validovat vstupy, pred pustenim k logike end pointu, vyuzitie middlewara