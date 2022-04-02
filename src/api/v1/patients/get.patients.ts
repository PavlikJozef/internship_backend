import { Request, Response } from 'express'
import { models } from '../../../db'
import { PatientModel } from '../../../db/models/patients'

export const workflow = async (req: Request, res: Response) => {
    const {
        Patient
    } = models 

    const patients: PatientModel[] = await Patient.findAll()

    res.json({
        patients
    })
}