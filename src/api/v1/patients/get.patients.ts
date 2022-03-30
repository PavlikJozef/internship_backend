import { Request, Response } from 'express'

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
    //res.send("My response from get.patients")
    res.json(patients)
}