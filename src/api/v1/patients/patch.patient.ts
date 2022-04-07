import { Request, Response } from "express";
import Joi from "joi";
import { DiagnoseModel } from "../../../db/models/diagnoses";
import { PatientModel } from "../../../db/models/patients";
import { GENDERS } from "../../../utils/enums";

export const schema = Joi.object({
    body: Joi.object({
        firstName: Joi.string().max(100),
        lastName: Joi.string().max(100),
        birthdate: Joi.date().required(),
        weight: Joi.number().min(1).max(200),
        height: Joi.number().min(1).required(),
        identificationNumber: Joi.string().pattern(/^[a-zA-Z0-9]*$/).length(12),
        gender: Joi.string().valid(...GENDERS),
        diagnoseID: Joi.number().integer().min(1)
    }),
    query: Joi.object(),
    params: Joi.object()
})

export const workflow = async (req: Request, res: Response) => {

    const id = Number(req.params.id)

    const patientID = await PatientModel.findAll({
        where: {
            id
        }
    })
    
    if(patientID.length == 0){
       res.status(404).json({ message: "Patient with this ID was not found", type: "FAILED"}) 
    } else {
        const diagnoseID = await DiagnoseModel.findAll({
            where: {
                id: req.body.diagnoseID 
            }
        })
        
        if(diagnoseID.length == 0){
            res.status(404).json({ message: "Diagnose with this ID does not exist in database" , type: "FAILED"})
        } else {
            const patient = await PatientModel.update({
                ...req.body
            },{
                where: {
                    id
                }
            })
            res.status(200).json({ message: "Patient data were succesfully updated", type: "SUCCESS"})
        }
    }
    
    /*
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
       */
}