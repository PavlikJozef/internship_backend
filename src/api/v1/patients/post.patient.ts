import { Request, Response } from "express";
import Joi from "joi";
import { DiagnoseModel } from "../../../db/models/diagnoses";
import { PatientModel } from "../../../db/models/patients";
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
    console.log("I came here 1")

    const patientID = await PatientModel.findAll({
        where: {
            identificationNumber: req.body.identificationNumber
        }
    })
    console.log("I came here2")
    if(patientID.length > 0){
       res.status(409).json({ message: "Patient with this ID already exists in database", type: "FAILED"}) 
       console.log("I came here3")
    } else {
        const diagnoseID = await DiagnoseModel.findAll({
            where: {
                id: req.body.diagnoseID 
            }
        })

        if(diagnoseID.length == 0){
            res.status(404).json({ message: "Diagnose with this ID does not exist in database" , type: "FAILED"})
        } else {
            const newPatientID = await PatientModel.findAll()
            const patient = await PatientModel.create({
                id: newPatientID.length + 2,
                ...req.body
            })
            res.status(200).json({ message: "Patient was succesfully added into database", type: "SUCCESS"})
        }
    }
    /*
    const patient = {
        id: patients.length + 1,
        firstName: body.firstName,
        lastName: body.lastName,
        birthdate: body.birthdate,
        weight: body.weight,
        height: body.height,
        gender: body.gender,
        age: body.age,
        personType: body.personType,
        diagnoseID: body.diagnoseID
    }
    console.log(patient)
    patients.push(patient)
    res.json(patients)
    */
    /*
    const patient = {
        id: patients.length + 1,
        name: req.body.name
    }
    if (!patient.name) {
        res.status(400).send("Patient name is required")
    } else {
        patients.push(patient)
        res.json(patients)
    }
    */
}

//validationResult.erro.details[0].message