import supertest from "supertest";
import { expect } from "chai"
import app from "../../../../../src/app"
import { responseSchema } from '../../../../../src/api/v1/patients/patch.patient'

const url = "/api/v1/patients/"
const patientID: number = 1

describe(`[PATCH] ${url + `${patientID}`}`, () => {
    it('Response shoud update particular patient (200) - OK', async () => {
        const response = await supertest(app)
            .patch(url+patientID)
            .send({
                weight: 99,
                height: 183,
                gender: "FEMALE",
                identificationNumber: "axxxxfllgh99",
                diagnoseID: 10
            })
            .set('Content-Type', 'application/json')

        expect(response.status).to.eq(200)
        expect(response.type).to.eq('application/json')

        const validationResult = responseSchema.validate(response.body)
        expect(validationResult.error).to.eq(undefined)
    })

    it('Response shoud update particular patient (400) - Bad Request (url address of this endpoint does not match with route)', async () => {
        const response = await supertest(app)
            .patch(url + "a" + patientID)
            .send({
                firstName: "Joe",
                lastName: "Doe",
                birthdate: "2022-11-26",
                weight: 81,
                height: 183,
                gender: "MALE",
                diagnoseID: 14
            })
            .set('Content-Type', 'application/json')
            console.log(url + "a" + patientID)
        expect(response.status).to.eq(400)
        expect(response.type).to.eq('application/json')

        const validationResult = responseSchema.validate(response.body)
        expect(validationResult.error).to.eq(undefined)
    })

    it('Response shoud update particular patient (400) - Bad Request (firstName should be string, not integer)', async () => {
        const response = await supertest(app)
            .patch(url + patientID)
            .send({
                firstName: 123,
                lastName: "Doe",
                birthdate: "2022-11-26",
                weight: 81,
                height: 183,
                gender: "MALE",
                diagnoseID: 14
            })
            .set('Content-Type', 'application/json')
            console.log(url + "a" + patientID)
        expect(response.status).to.eq(400)
        expect(response.type).to.eq('application/json')

        const validationResult = responseSchema.validate(response.body)
        expect(validationResult.error).to.eq(undefined)
    })

    it('Response shoud update particular patient (400) - Bad Request (invalid date format, expected YYYY-MM-DD)', async () => {
        const response = await supertest(app)
            .patch(url + patientID)
            .send({
                firstName: "Filip",
                lastName: "Doe",
                birthdate: "2022-1a1-26",
                weight: 81,
                height: 183,
                gender: "MALE",
                diagnoseID: 14
            })
            .set('Content-Type', 'application/json')
            console.log(url + "a" + patientID)
        expect(response.status).to.eq(400)
        expect(response.type).to.eq('application/json')

        const validationResult = responseSchema.validate(response.body)
        expect(validationResult.error).to.eq(undefined)
    })

    it('Response shoud update particular patient (404) - Not Found (Patient with this id was not found in database)', async () => {
        const response = await supertest(app)
            .patch(url + 99999)
            .send({
                firstName: "Joe",
                lastName: "Doe",
                birthdate: "2022-11-26",
                weight: 81,
                height: 183,
                gender: "MALE",
                diagnoseID: 14
            })
            .set('Content-Type', 'application/json')

        expect(response.status).to.eq(404)
        expect(response.type).to.eq('application/json')

        const validationResult = responseSchema.validate(response.body)
        expect(validationResult.error).to.eq(undefined)
    })

    // it('Response shoud update particular patient (405) - Method Not Allowed (patch method should be used instead of get in this case)', async () => {
    //     const response = await supertest(app)
    //         .get(url + patientID)
    //         .send({
    //             firstName: "Joe",
    //             lastName: "Doe",
    //             birthdate: "2022-11-26",
    //             weight: 81,
    //             height: 183,
    //             gender: "MALE",
    //             diagnoseID: 14
    //         })
    //         .set('Content-Type', 'application/json')

    //     expect(response.status).to.eq(405)
    //     expect(response.type).to.eq('application/json')

    //     const validationResult = responseSchema.validate(response.body)
    //     expect(validationResult.error).to.eq(undefined)
    // })

    it('Response shoud update particular patient (409) - Conflict (conflict with identification number, which is already used)', async () => {
        const response = await supertest(app)
            .patch(url + patientID)
            .send({
                firstName: "Joe",
                lastName: "Doe",
                birthdate: "2022-11-26",
                weight: 81,
                height: 183,
                identificationNumber: "axxxxfllgh99",
                gender: "MALE",
                diagnoseID: 14
            })
            .set('Content-Type', 'application/json')

        expect(response.status).to.eq(409)
        expect(response.type).to.eq('application/json')

        const validationResult = responseSchema.validate(response.body)
        expect(validationResult.error).to.eq(undefined)
    })
})