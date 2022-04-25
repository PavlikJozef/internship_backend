import { Request, Response } from "express";
import { models } from "../../../db";
import { DiagnoseModel } from "../../../db/models/diagnoses";
import { PatientModel } from "../../../db/models/patients";
import { SubstanceModel } from "../../../db/models/substances";
import { PERSON_TYPE } from "../../../utils/enums";
import { getAge, getPersonType } from '../../../utils/functions'

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

    if(!patient) return res.status(404).send("Patient with this ID was not found")
        
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
            identificationNumber: patient.indentificationNumber,
            gender: patient.gender,
            diagnoseID: patient.diagnoseID,
            age: age,
            personType: personType,
            diagnose: patient.diagnose
        }
    })

    /*
    const patient = patients.find(patient => patient.id === parseInt(req.params.id))
    if (!patient) {
        res.status(404).send("Patient ID not found")
    } else {
        res.json(patients.filter(patient => patient.id === parseInt(req.params.id)))
    }
    //res.send(patient);
    */
}