import { Request, Response } from "express";
import Joi from "joi";

const patients = [{
    id: 1,
    firstName: "Joe",
    lastName: "Black",
    weight: 77
}, {
    id: 2,
    firstName: "Adam",
    lastName: "Brown",
    weight: 87
}, {
    id: 3,
    firstName: "Alex",
    lastName: "Gray",
    weight: 67
}]

enum GENDER {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}

export const schema = Joi.object({
    body: Joi.object({
        firstName: Joi.string().max(100),
        lastName: Joi.string().max(100),
        birthdate: Joi.date(),
        weight: Joi.number().min(1).max(200),
        height: Joi.number().min(1),
        //indetificationNumber: Joi.string().pattern(/^[a-zA-Z0-9]*$/).length(12),
        gender: Joi.string().valid('MALE', 'FEMALE'),
        age: Joi.number().min(0),
        personType: Joi.string().valid(...Object.values(GENDER)),
        //substanceAmout: Joi.number().min(1).required(),
        diagnoseID: Joi.number().integer().min(1)
    }),
    query: Joi.object(),
    params: Joi.object({
        patientID: Joi.number().integer().required()
    })
})

interface IPatient {
    firstName: string
    lastName: string
    birthdate: Date
    height: number
    weight: number
    identificationNumber: string
    gender: GENDER
    diagnoseID: number
}

export const workflow = (req: Request, res: Response) => {
    //const patient = patients.find(patient => patient.id === parseInt(req.params.id))
    const patient = patients.some(patient => patient.id === parseInt(req.params.id))
    if (!patient) {
        res.status(404).send("Patient ID not found")
    } else {
        const updatePatient = req.body;
        patients.forEach(patient => {
            if (patient.id === parseInt(req.params.id)) {
                patient.firstName = updatePatient.firstName ? updatePatient.firstName : patient.firstName
                patient.lastName = updatePatient.lastName ? updatePatient.lastName : patient.lastName
                patient.weight = updatePatient.weight ? updatePatient.weight : patient.weight
                res.json(patient)
            }
        })

        //patient.name = req.body.name;
        //res.send(patient);
        //res.json(patients.filter(patient => patient.id === parseInt(req.params.id)))
    }
}