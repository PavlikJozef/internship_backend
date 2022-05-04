import { Request, Response, NextFunction } from "express"
import {Schema} from "joi"

export default function validationMiddleware(schema: Schema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { query, body, params } = req
        const validationResult = schema.validate({ query, body, params})

        if (validationResult.error){
            return res.status(400).json({message: validationResult.error.message, type: 'FAILED'})
        }

        // if (validationResult.error){
        //     return res.status(400).json(validationResult.error)
        // }

        req.body = validationResult.value.body
        req.params = validationResult.value.params
        req.query = validationResult.value.query

        return next()
    }
}