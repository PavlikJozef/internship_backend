import { Request, Response } from "express";
import { models } from "../../../db";
import { DiagnoseModel } from "../../../db/models/diagnoses";
import { SubstanceModel } from "../../../db/models/substances";


export const workflow = async (req: Request, res: Response) => {

    const {
        Patient
    } = models 
    const id = Number(req.params.id)

    const patient = await Patient.findByPk(id, {
        include: {
            model: DiagnoseModel,
            include: [{
                model: SubstanceModel
            }]
        }
    })

    if(!patient){
        res.status(404).send("Patient with this ID was not found")
    } else{
        res.status(200).json({
            patient
        })
    }

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