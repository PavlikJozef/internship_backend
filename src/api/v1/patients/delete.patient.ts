import { Request, Response } from "express";
import Joi from "joi";
import { models } from "../../../db";
import { PatientModel } from "../../../db/models/patients";

export const validationSchema = Joi.object({
    body: Joi.object(),
    query: Joi.object(),
    params: Joi.object({
        id: Joi.number().integer().min(1).valid()
    })
})

export const responseSchema = Joi.object({
    message: Joi.string().required(),
    type: Joi.string().required()
})

export const workflow = async (req: Request, res: Response) => {

    const {
        Patient
    } = models 

    const { params } = req

    if(!Number.isInteger(params.id)) res.status(400).json({ message: `Id: ${params.id} is not an integer`})

    const id: number = Number(params.id)

    const patient: PatientModel = await Patient.findByPk(id)

    if(!patient) return res.status(404).json({ message: `Patient with id: ${patient.id} was not found`, type: "FAILED"})

    const patientID: number = await Patient.destroy({
        where: {
            id: patient.id
        }
    })

    return res.status(200).json({ message: `Patient with ID ${patient.id} was succesfully deleted`, type: "SUCCESS"})

}