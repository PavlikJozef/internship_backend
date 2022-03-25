import { Request, Response } from 'express'
import patients from '.'

export const workflow = (req: Request, res: Response) => {
    res.send("My response from get.patients")
    //res.json({ patients: [{ id: 1, name: "Joe"}]
}