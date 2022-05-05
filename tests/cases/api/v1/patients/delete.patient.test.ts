import supertest from "supertest";
import { expect } from "chai"
import app from "../../../../../src/app"
import { responseSchema } from '../../../../../src/api/v1/patients/delete.patient'

const url = "/api/v1/patients/"
const patientID: number = 1

describe(`[DELETE] ${url + `${patientID}`}`, () => {
    it('Response shoud delete particular patient (200) - OK', async () => {
        const response = await supertest(app)
            .delete(url+patientID)
            .set('Content-Type', 'application/json')

        expect(response.status).to.eq(200)
        expect(response.type).to.eq('application/json')

        const validationResult = responseSchema.validate(response.body)
        expect(validationResult.error).to.eq(undefined)
    })

    it('Response shoud delete particular patient (400) - Bad Request (id is not a number)', async () => {
        const response = await supertest(app)
            .delete(url + 'a')
            .set('Content-Type', 'application/json')

        expect(response.status).to.eq(400)
        expect(response.type).to.eq('application/json')

        const validationResult = responseSchema.validate(response.body)
        expect(validationResult.error).to.eq(undefined)
    })

    it('Response shoud delete particular patient (400) - Not Found (patient does not exists)', async () => {
        const response = await supertest(app)
            .delete(url + 1000)
            .set('Content-Type', 'application/json')

        expect(response.status).to.eq(404)
        expect(response.type).to.eq('application/json')

        const validationResult = responseSchema.validate(response.body)
        expect(validationResult.error).to.eq(undefined)
    })
})