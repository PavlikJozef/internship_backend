import { Request, Response } from "express";
import { DiagnoseModel } from "../../../db/models/diagnoses";
import { PatientModel } from "../../../db/models/patients";
import { GENDERS } from "../../../utils/enums";
import { IPatient } from "../../../utils/interfaces";

const Joi = require('joi').extend(require('@joi/date'))

export const validationSchema = Joi.object({
    body: Joi.object({
        firstName: Joi.string().max(100),
        lastName: Joi.string().max(100),
        birthdate: Joi.date().format('YYYY-MM-DD'),
        weight: Joi.number().min(1).max(200),
        height: Joi.number().min(1),
        identificationNumber: Joi.string().pattern(/^[a-zA-Z0-9]*$/).length(12),
        gender: Joi.string().valid(...GENDERS),
        diagnoseID: Joi.number().integer().min(1)
    }),
    query: Joi.object(),
    params: Joi.object({
        id: Joi.number().integer().min(1).required()
    })
})

export const responseSchema = Joi.object({
    message: Joi.string().required(),
    type: Joi.string().required()
})

export const workflow = async (req: Request, res: Response) => {

    const { params, body } : { params: any, body: IPatient} = req

    const id: number = Number(params.id)

    const patientID: PatientModel = await PatientModel.findByPk(id)
    
    if(!patientID) return res.status(404).json({ message: `Patient with id ${id} was not found`, type: "FAILED"}) 

    if(patientID.identificationNumber === body.identificationNumber) return res.status(409).json({ message: "Patient with this identification number already exists in database", type: "FAILED"})

    const diagnoseID: DiagnoseModel = await DiagnoseModel.findByPk(body.diagnoseID)
        
    if(!diagnoseID) return res.status(404).json({ message: `Diagnose with id: ${body.diagnoseID} does not exist in database` , type: "FAILED"})
    
    const patient: [number, PatientModel[]] = await PatientModel.update(
            body
        ,{
            where: {
                id: params.id
        }
    })
        
    return res.status(200).json({ message: `Patient data with id: ${params.id} were succesfully updated`, type: "SUCCESS"})

}