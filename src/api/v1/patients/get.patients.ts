import { Request, Response } from 'express'
import { models } from '../../../db'
import { DiagnoseModel } from '../../../db/models/diagnoses'
import { PatientModel } from '../../../db/models/patients'
import { SubstanceModel } from '../../../db/models/substances'
import { GENDERS, PERSON_TYPE, PERSON_TYPES, SUBSTANCE_TIME_UNITS } from '../../../utils/enums'
import { getAge, getPersonType } from '../../../utils/functions'
import Joi from 'joi'
import { map } from 'lodash'

export const validationSchema = Joi.object({
    body: Joi.object(),
    query: Joi.object({
        limit: Joi.number().valid(10, 15, 25),
        page: Joi.number()
    }),
    params: Joi.object()
})

export const responseSchema = Joi.object({
    patients: Joi.array().items(
        Joi.object({
            id: Joi.number().integer().min(1).required(),
            firstName: Joi.string().max(100).required(),
            lastName: Joi.string().max(100).required(),
            birthdate: Joi.date().required(),
            weight: Joi.number().min(1).max(200).required(),
            height: Joi.number().min(1).required(),
            identificationNumber: Joi.string().pattern(/^[a-zA-Z0-9]*$/).length(12).required(),
            gender: Joi.string().valid(...GENDERS).required(),
            age: Joi.number().min(0).max(100).required(),
            personType: Joi.string().valid(...PERSON_TYPES).required(),
            diagnose: Joi.object({
                id: Joi.number().integer().min(1).required(),
                name: Joi.string().max(100).required(),
                description: Joi.string().max(500).required(),
                substance: Joi.object({
                    id: Joi.number().integer().min(1).required(),
                    name: Joi.string().max(100).required(),
                    timeUnit: Joi.string().valid(...SUBSTANCE_TIME_UNITS).required(),
                    halfLife: Joi.number().min(0).required()
                })
            }).required()
        }).required()
    ).required(),
    pagination: Joi.object({
        limit: Joi.number().integer().min(1).required(),
        page: Joi.number().integer().min(1).required(),
        totalPages: Joi.number().integer().min(0).required(),
        totalCount: Joi.number().integer().min(0).required()
    }).required()
})

export const workflow = async (req: Request, res: Response) => {
    const {
        Patient
    } = models 

    const { query } = req

    const limit: number = Number(query.limit)
    const page: number = Number(query.page)

    const patientsCount = await Patient.findAndCountAll({
        include: {
            model: DiagnoseModel,
                include: [{
                    model: SubstanceModel
                }]
            },
        order: [['id', 'DESC']],
        limit: limit,
        offset: (page - 1) * limit
    })

    const patients: PatientModel[] = patientsCount.rows

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
                age: age,
                personType: personType,
                diagnose: {
                    id: patient.diagnose.id,
                    name: patient.diagnose.name,
                    description: patient.diagnose.description,
                    substance: {
                        id: patient.diagnose.substance.id,
                        name: patient.diagnose.substance.name,
                        timeUnit: patient.diagnose.substance.timeUnit,
                        halfLife: patient.diagnose.substance.halfLife
                    }
                }
            }
        }),
        pagination: {
            limit: limit,
            page: page,
            totalPages: Math.ceil(patientsCount.count / limit),
            totalCount: patientsCount.count
        }
    })
}

