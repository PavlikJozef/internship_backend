import supertest from "supertest";
import { expect } from "chai"
import app from "../../../../../src/app"
import { schema } from '../../../../../src/api/v1/patients/patch.patient'

const url = "/api/v1/patients/"
const patientID: number = 10

describe(`[DELETE] ${url + `${patientID}`}`, () => {
    it('Response shoud delete particular patient (200)', async () => {
        const response = await supertest(app)
            .delete(url+patientID)
            .set('Content-Type', 'application/json')

        expect(response.status).to.eq(200)
        expect(response.type).to.eq('application/json')

        const validationResult = schema.validate(response.body)
        expect(validationResult.error).to.eq(undefined)
    })
})