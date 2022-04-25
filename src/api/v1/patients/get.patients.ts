import { Request, Response } from 'express'
import { models } from '../../../db'
import { DiagnoseModel } from '../../../db/models/diagnoses'
import { PatientModel } from '../../../db/models/patients'
import { SubstanceModel } from '../../../db/models/substances'
import { GENDERS, PERSON_TYPE, PERSON_TYPES, SUBSTANCE_TIME_UNITS } from '../../../utils/enums'
import { getAge, getPersonType } from '../../../utils/functions'
import Joi from 'joi'
import { map } from 'lodash'

export const responseSchema = Joi.object({
    body: Joi.object({
        firstName: Joi.string().max(100).required(),
        lastName: Joi.string().max(100).required(),
        birthdate: Joi.date().required(),
        weight: Joi.number().min(1).max(200).required(),
        height: Joi.number().min(1).required(),
        identificationNumber: Joi.string().pattern(/^[a-zA-Z0-9]*$/).length(12).required(),
        gender: Joi.string().valid(...GENDERS).required(),
        diagnoseID: Joi.number().integer().min(1).required(),
        age: Joi.number().min(0).max(100).required(),
        personType: Joi.string().valid(...PERSON_TYPES).required(),
        diagnose: Joi.object({
            id: Joi.number().integer().required(),
            name: Joi.string().max(100).required(),
            description: Joi.string().max(500).required(),
            substance: Joi.object({
                id: Joi.number().integer().required(),
                name: Joi.string().max(100).required(),
                timeUnit: Joi.string().valid(...SUBSTANCE_TIME_UNITS).required(),
                halfLife: Joi.number().min(0).required()
            }).required()
        }).required()
    }),
    query: Joi.object(),
    params: Joi.object()
})

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
    })

    if(!patients) return res.status(404).send("Patients were not found in database")

    res.json({
        patients: map(patients, (patient) =>{
            const age: number = getAge(patient.birthdate)
            const personType: PERSON_TYPE = getPersonType(age)
            return {
                id: patient.id,
                firstName: patient.firstName,
                lastName: patient.lastName,
                birthdate: patient.birthdate,
                weight: patient.weight,
                height: patient.height,
                identificationNumber: patient.identificationNumber,
                gender: patient.gender,
                diagnoseID: patient.diagnoseID,
                age: age,
                personType: personType,
                diagnose: patient.diagnose
            }
        })
    })
}

