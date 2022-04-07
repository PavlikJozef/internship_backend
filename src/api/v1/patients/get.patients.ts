import { Request, Response } from 'express'
import { models } from '../../../db'
import { DiagnoseModel } from '../../../db/models/diagnoses'
import { PatientModel } from '../../../db/models/patients'
import { SubstanceModel } from '../../../db/models/substances'

export const workflow = async (req: Request, res: Response) => {
    const {
        Patient
    } = models 

    const patients: PatientModel[] = await Patient.findAll({
        include: {
        model: DiagnoseModel,
            include: [{
                model: SubstanceModel
            }]
        }
    }
)

    res.json({
        patients
    })
}