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

export const schema = Joi.object({
    body: Joi.object({
        firstName: Joi.string().max(100).required(),
        lastName: Joi.string().max(100).required(),
        birthdate: Joi.date().required(),
        weight: Joi.number().min(1).max(200).required(),
        height: Joi.number().min(1).required(),
        //indetificationNumber: Joi.string().pattern(/^[a-zA-Z0-9]*$/).length(12).required(),
        gender: Joi.string().valid('MALE', 'FEMALE').required(),
        age: Joi.number().min(0).required(),
        personType: Joi.string().valid("ADULT", "CHILD").required(),
        //substanceAmout: Joi.number().min(1).required(),
        diagnoseID: Joi.number().integer().min(1).required()
    }),
    query: Joi.object(),
    params: Joi.object()
})

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