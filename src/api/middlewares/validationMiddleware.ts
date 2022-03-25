import { Request, Response, NextFunction } from "express"
export default function validationMiddleware() {
    return (req: Request, res: Response, next: NextFunction) => {
        console.log("Message from middleware")
        return next()
    }
}