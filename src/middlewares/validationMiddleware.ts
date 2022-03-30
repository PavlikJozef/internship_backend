import { Request, Response, NextFunction } from "express"
import Joi from "joi"
export default function validationMiddleware() {
    return (req: Request, res: Response, next: NextFunction) => {
        const validation = {
            name: Joi.string().max(100).required()
        }
        return next()
    }
}