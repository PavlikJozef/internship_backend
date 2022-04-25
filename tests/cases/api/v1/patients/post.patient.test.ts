import supertest from "supertest";
import { expect } from "chai"
import app from "../../../../../src/app"
import { schema } from '../../../../../src/api/v1/patients/post.patient'

const url = "/api/v1/patients"

describe(`[POST] ${url}`, () => {
    it('Response shoud return new patient (200)', async () => {
        const response = await supertest(app)
            .post(url)
            .send({
                firstName: "Joe",
                lastName: "Doe",
                birthdate: "2022-11-26",
                weight: 81,
                height: 183,
                identificationNumber: "as12df34gh56",
                gender: "MALE",
                diagnoseID: 15
            })
            .set('Content-Type', 'application/json')
        
        expect(response.status).to.eq(200)
        expect(response.type).to.eq('application/json')

        const validationResult = schema.validate(response.body)
        expect(validationResult.error).to.eq(undefined)
    })
})
// Doplnit testovacie subory pre zvysne endpointy 