import { Request, Response } from "express";
import Joi from "joi";
import { models } from "../../../db";
import { GENDERS } from "../../../utils/enums";

export const schema = Joi.object({
    body: Joi.object({
        firstName: Joi.string().max(100).required(),
        lastName: Joi.string().max(100).required(),
        birthdate: Joi.date().required(),
        weight: Joi.number().min(1).max(200).required(),
        height: Joi.number().min(1).required(),
        identificationNumber: Joi.string().pattern(/^[a-zA-Z0-9]*$/).length(12).required(),
        gender: Joi.string().valid(...GENDERS).required(),
        diagnoseID: Joi.number().integer().min(1).required()
    }),
    query: Joi.object(),
    params: Joi.object()
})

export const workflow = async (req: Request, res: Response) => {

    const {
        Patient
    } = models 

    const id = Number(req.params.id)

    const patient = await Patient.destroy({
        where: {
            id
        }
    })

    if(!patient){
        res.status(404).json({ message: "Patient with this ID was not found", type: "FAILED"})
    } else{
        res.status(200).json({ message: `Patient with ID ${id} was succesfully deleted`, type: "SUCCESS"})
    }

    /*
    const patient = patients.find(patient => patient.id === parseInt(req.params.id))
    if (!patient) {
        res.status(404).send("Patient ID not found")
    } else {
        const index = patients.indexOf(patient);
        patients.splice(index, 1);
        res.json(patient);
    }
    */
}