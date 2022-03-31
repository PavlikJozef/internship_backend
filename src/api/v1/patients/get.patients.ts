import { Request, Response } from 'express'

// Zalozenie interfacu + typescript
interface IPatient {
    id: number,
    firstName: string
    /*
    {
    "patients": [
        {
        "id": 0,
        "firstName": "string",
        "lastName": "string",
        "birthdate": "2022-03-30T17:39:31.686Z",
        "weight": 0,
        "height": 0,
        "identificationNumber": "string",
        "gender": "MALE",
        "age": 0,
        "personType": "ADULT",
        "substanceAmount": 0,
        "diagnose": {
            "id": 0,
            "name": "string",
            "description": "string",
            "substance": {
            "id": 0,
            "name": "string",
            "timeUnit": "SECOND",
            "halfLife": 0
            }
        }
        }
    ],
    "pagination": {
        "limit": 0,
        "page": 0,
        "totalPages": 0,
        "totalCount": 0
    }
    }
    */
}

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