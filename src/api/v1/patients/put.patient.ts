import { Request, Response } from "express";

const patients = [{
    id: 1,
    name: "Joe"
}, {
    id: 2,
    name: "Adam"
}, {
    id: 3,
    name: "Alex"
}]

export const workflow = (req: Request, res: Response) => {
    //const patient = patients.find(patient => patient.id === parseInt(req.params.id))
    const patient = patients.some(patient => patient.id === parseInt(req.params.id))
    if (!patient) {
        res.status(404).send("Patient ID not found")
    } else {
        const updatePatient = req.body;
        patients.forEach(patient => {
            if (patient.id === parseInt(req.params.id)) {
                patient.name = updatePatient.name ? updatePatient.name : patient.name
                res.json(patient)
            }
        })

        //patient.name = req.body.name;
        //res.send(patient);
        //res.json(patients.filter(patient => patient.id === parseInt(req.params.id)))
    }
}