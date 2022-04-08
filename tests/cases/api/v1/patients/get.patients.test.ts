import supertest from "supertest";
import { expect } from "chai"
import app from "../../../../../src/app"
//import { responseSchema } from '../../../../../src/api/v1/patients/get.patients'

const url = "/api/v1/patients"

describe(`[GET] ${url}`, () => {
    it('Response shoud return list of patients', async () => {
        const response = await supertest(app)
        .get(url)
        .set('Content-Type', 'application/json')
        
        expect(response.status).to.eq(200)
        expect(response.type).to.eq('application/json')

        // const validationResult = responseSchema.validate(response.body)
        // expect(validationResult.error).to.eq(undefined)
    })
})
// Doplnit testovacie subory pre zvysne endpointy 