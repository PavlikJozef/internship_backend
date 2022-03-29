import { Request, Response } from "express";

export const workflow = (req: Request, res: Response) => {
    //res.send("My response from get.patients")
    res.json({
        patients: [{
            id: 1,
            name: "Joe"
        }]
    })
}