import { Request, Response } from "express";
import Joi from "joi";

const patients = [{
    id: 1,
    firstName: "Joe",
    lastName: "Black",
    birthdate: "2021-02-30T15:28:27:612Z",
    weight: 89,
    height: 172,
    gender: 'MALE',
    age: 22,
    personType: 'ADULT',
    diagnoseID: 2
}, {
    id: 2,
    firstName: "Adam",
    lastName: "Black",
    birthdate: "2001-02-30T15:28:27:612Z",
    weight: 79,
    height: 162,
    gender: 'MALE',
    age: 32,
    personType: 'ADULT',
    diagnoseID: 1
}, {
    id: 3,
    firstName: "Alex",
    lastName: "Black",
    birthdate: "2020-02-30T15:28:27:612Z",
    weight: 109,
    height: 185,
    gender: 'MALE',
    age: 44,
    personType: 'ADULT',
    diagnoseID: 3
}]

enum GENDER {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}

export const schema = Joi.object({
    body: Joi.object({
        firstName: Joi.string().max(100).required(),
        lastName: Joi.string().max(100).required(),
        birthdate: Joi.date().required(),
        weight: Joi.number().min(1).max(200).required(),
        height: Joi.number().min(1).required(),
        //indetificationNumber: Joi.string().pattern(/^[a-zA-Z0-9]*$/).length(12).required(),
        gender: Joi.string().valid(...Object.values(GENDER)).required(),
        age: Joi.number().min(0).required(),
        personType: Joi.string().valid("ADULT", "CHILD").required(),
        //substanceAmout: Joi.number().min(1).required(),
        diagnoseID: Joi.number().integer().min(1).required()
    }),
    query: Joi.object(),
    params: Joi.object()
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
    const { body } = req
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