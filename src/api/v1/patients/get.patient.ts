import { Request, Response } from "express";
import Joi from "joi";
import { models } from "../../../db";
import { DiagnoseModel } from "../../../db/models/diagnoses";
import { PatientModel } from "../../../db/models/patients";
import { SubstanceModel } from "../../../db/models/substances";
import { GENDERS, PERSON_TYPE, PERSON_TYPES, SUBSTANCE_TIME_UNITS } from "../../../utils/enums";
import { getAge, getPersonType } from '../../../utils/functions'

export const validationSchema = Joi.object({
    body: Joi.object(),
    query: Joi.object(),
    params: Joi.object({
        id: Joi.number().integer().min(1).required()
    })
})

export const responseSchema = Joi.object({
    patient: Joi.object({
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
})

export const workflow = async (req: Request, res: Response) => {

    const {
        Patient
    } = models 
    const id = Number(req.params.id)

    const patient: PatientModel = await Patient.findByPk(id, {
        include: {
            model: DiagnoseModel,
            include: [{
                model: SubstanceModel
            }]
        }
    })

    if(!patient) return res.status(404).send(`Patient with ID: ${id} was not found`)
        
    const age: number = getAge(patient.birthdate)
    const personType: PERSON_TYPE = getPersonType(age)

    res.json({
        patient: {
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
    })
}