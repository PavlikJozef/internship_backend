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
    const patient = {
        id: patients.length + 1,
        name: req.body.name
    }
    if (!patient.name) {
        res.status(404).send("Patient name is empty")
    } else {
        patients.push(patient)
        res.json(patients)
    }
}