import { Request, Response } from 'express'
import { PERSON_TYPE, PERSON_TYPES} from '../../../utils/enums'
import { getSubstanceAmount } from '../../../utils/functions'
import Joi from 'joi'

export const responseSchema = Joi.array().items(Joi.object({
        weight: Joi.number().min(1).max(200).required(),
        personType: Joi.string().valid(...PERSON_TYPES).required(),
        substanceAmount: Joi.number().required(),
    }).required())

interface ISubstanceAmount {
    weight: number
    personType: PERSON_TYPE
    substaceAmount: number
}

export const workflow = async (req: Request, res: Response) => {
    let outputData: ISubstanceAmount[] = []

    return res.json(outputData)
}

