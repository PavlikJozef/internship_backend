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
    const patient = patients.find(c => c.id === parseInt(req.params.id))
    if (!patient) {
        res.status(404).send("Patient ID not found")
    }
    res.send(patient);
}