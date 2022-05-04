import supertest from "supertest";
import { expect } from "chai"
import app from "../../../../../src/app"
import { responseSchema } from '../../../../../src/api/v1/patients/get.patient'

const url = "/api/v1/patients/"
const patientID: number = 1
const wrongPatientID: number = 9999

describe(`[GET] ${url + `${patientID}`}`, () => {
    it('Response shoud return particular patient (200) - OK', async () => {
        const response = await supertest(app)
            .get(url+patientID)
            .set('Content-Type', 'application/json')
            console.log(url+patientID)
        expect(response.status).to.eq(200)
        expect(response.type).to.eq('application/json')

        const validationResult = responseSchema.validate(response.body)
        expect(validationResult.error).to.eq(undefined)
        expect(response.body.patient.id).to.eq(patientID)
    })

    it('Response shoud return particular patient (400) - Bad Request (url address is incorrect)', async () => {
        const response = await supertest(app)
            .get(`${url} + ${wrongPatientID}`)
            .set('Content-Type', 'application/json')
        expect(response.status).to.eq(400)
        expect(response.type).to.eq('application/json')
        console.log(`${url} + ${wrongPatientID}`)
        const validationResult = responseSchema.validate(response.body)
        expect(validationResult.error).to.eq(undefined)
    })

    it('Response shoud return particular patient (404) - Not Found (Patient with this id does not exists in database)', async () => {
        const response = await supertest(app)
            .get(`${url}${wrongPatientID}`)
            .set('Content-Type', 'application/json')

        expect(response.status).to.eq(404)
        expect(response.type).to.eq('application/json')

        const validationResult = responseSchema.validate(response.body)
        expect(validationResult.error).to.eq(undefined)
    })

    // it('Response should return list of patients (405) - Method Not Allowed (get method should be used instead post method in this case)', async () => {
    //     const response = await supertest(app)
    //         .post(url)
    //         .set('Content-Type', 'application/json')

    //     expect(response.status).to.eq(405)
    //     expect(response.type).to.eq('application/json')
    // })
})