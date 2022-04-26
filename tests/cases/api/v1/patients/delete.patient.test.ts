import supertest from "supertest";
import { expect } from "chai"
import app from "../../../../../src/app"
import { schema } from '../../../../../src/api/v1/patients/delete.patient'

const url = "/api/v1/patients/"
const patientID: number = 1036

describe(`[DELETE] ${url + `${patientID}`}`, () => {
    it('Response shoud delete particular patient (200) - OK', async () => {
        const response = await supertest(app)
            .delete(url+patientID)
            .set('Content-Type', 'application/json')

        expect(response.status).to.eq(200)
        expect(response.type).to.eq('application/json')

        const validationResult = schema.validate(response.body)
        expect(validationResult.error).to.eq(undefined)
        expect(response.body.patient.id).to.eq(patientID)
    })

    it('Response shoud delete particular patient (400) - Bad Request (url address does not match with endpoint for deleting patients)', async () => {
        const response = await supertest(app)
            .delete(url + "a" + patientID)
            .set('Content-Type', 'application/json')

        expect(response.status).to.eq(400)
        expect(response.type).to.eq('application/json')

        const validationResult = schema.validate(response.body)
        expect(validationResult.error).to.eq(undefined)
    })

    it('Response shoud delete particular patient (404) - Not Found (Patient with this id was not found in database)', async () => {
        const response = await supertest(app)
            .delete(url + 987965)
            .set('Content-Type', 'application/json')

        expect(response.status).to.eq(404)
        expect(response.type).to.eq('application/json')

        const validationResult = schema.validate(response.body)
        expect(validationResult.error).to.eq(undefined)
    })

    it('Response shoud delete particular patient (405) - Method Not Allowed (delete method should be used instead of post in this case)', async () => {
        const response = await supertest(app)
            .post(url)
            .set('Content-Type', 'application/json')

        expect(response.status).to.eq(405)
        expect(response.type).to.eq('application/json')

        const validationResult = schema.validate(response.body)
        expect(validationResult.error).to.eq(undefined)
    })
})