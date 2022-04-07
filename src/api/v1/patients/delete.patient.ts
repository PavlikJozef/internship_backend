import { Request, Response } from "express";
import { models } from "../../../db";

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