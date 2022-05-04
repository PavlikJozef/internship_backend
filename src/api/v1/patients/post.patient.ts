import { Request, Response } from "express";
import Joi from "joi";
import { DiagnoseModel } from "../../../db/models/diagnoses";
import { PatientModel } from "../../../db/models/patients";
import { GENDERS } from "../../../utils/enums";

export const validationSchema = Joi.object({
    body: Joi.object({
        firstName: Joi.string().max(100).required(),
        lastName: Joi.string().max(100).required(),
        birthdate: Joi.date().required(),
        weight: Joi.number().min(1).max(200).required(),
        height: Joi.number().min(1).required(),
        identificationNumber: Joi.string().pattern(/^[a-zA-Z0-9]*$/).length(12).required(),
        gender: Joi.string().valid(...GENDERS).required(),
        diagnoseID: Joi.number().integer().required()
    }),
    query: Joi.object(),
    params: Joi.object()
})

export const responseSchema = Joi.object({
    message: Joi.string().required(),
    type: Joi.string().required()
})

export const workflow = async (req: Request, res: Response) => {

    const { body } = req

    const patientIdNumber = await PatientModel.findOne({
        where: {
            identificationNumber: body.identificationNumber
        }
    })

    if(!patientIdNumber) return res.status(409).json({ message: "Patient with this identification number already exists in database", type: "FAILED"}) 
    
    const diagnoseID = await DiagnoseModel.findByPk(body.diagnoseID)

    if(Number.isInteger(diagnoseID)) return res.status(400).json({ message: "Diagnose must be an integer type", type: "FAILED"}) 

    if(!diagnoseID) return res.status(404).json({ message: "Diagnose with this ID does not exist in database", type: "FAILED"})
            
    const patient = await PatientModel.create(
        req.body
    )
            
    return res.status(200).json({ message: `Patient was succesfully added into database, his id is ${patient.id}`, type: "SUCCESS"})

}