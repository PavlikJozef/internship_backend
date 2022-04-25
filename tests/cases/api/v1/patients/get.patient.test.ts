import supertest from "supertest";
import { expect } from "chai"
import app from "../../../../../src/app"
import { responseSchema } from '../../../../../src/api/v1/patients/get.patients'

const url = "/api/v1/patients/"
const patientID: number = 25

describe(`[GET] ${url + `${patientID}`}`, () => {
    it('Response shoud return particular patient (200)', async () => {
        const response = await supertest(app)
            .get(url+patientID)
            .set('Content-Type', 'application/json')

        expect(response.status).to.eq(200)
        expect(response.type).to.eq('application/json')

        const validationResult = responseSchema.validate(response.body)
        expect(validationResult.error).to.eq(undefined)
        expect(response.body.patient.id).to.eq(patientID)
    })

    it('Response shoud return particular patient (400)', async () => {
        const response = await supertest(app)
            .get(url + "/" + patientID)
            .set('Content-Type', 'application/json')
            console.log(url + "a" + patientID)
        expect(response.status).to.eq(400)
        expect(response.type).to.eq('application/json')

        const validationResult = responseSchema.validate(response.body)
        expect(validationResult.error).to.eq(undefined)
        expect(response.body.patient.id).to.eq(patientID)
    })

    it('Response shoud return particular patient (404)', async () => {
        const response = await supertest(app)
            .get(url + 99999)
            .set('Content-Type', 'application/json')

        expect(response.status).to.eq(404)
        expect(response.type).to.eq('application/json')

        const validationResult = responseSchema.validate(response.body)
        expect(validationResult.error).to.eq(undefined)
        expect(response.body.patient.id).to.eq(patientID)
    })
})