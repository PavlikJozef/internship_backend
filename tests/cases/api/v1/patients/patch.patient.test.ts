import supertest from "supertest";
import { expect } from "chai"
import app from "../../../../../src/app"
import { schema } from '../../../../../src/api/v1/patients/patch.patient'

const url = "/api/v1/patients/"
const patientID: number = 10

describe(`[PATCH] ${url + `${patientID}`}`, () => {
    it('Response shoud update particular patient (200)', async () => {
        const response = await supertest(app)
            .patch(url+patientID)
            .send({
                weight: 99,
                height: 183,
                gender: "FEMALE",
                diagnoseID: 14
            })
            .set('Content-Type', 'application/json')

        expect(response.status).to.eq(200)
        expect(response.type).to.eq('application/json')

        const validationResult = schema.validate(response.body)
        expect(validationResult.error).to.eq(undefined)
        expect(response.body.patient.id).to.eq(patientID)
    })

    it('Response shoud update particular patient (400)', async () => {
        const response = await supertest(app)
            .patch(url + "/" + patientID)
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

        const validationResult = schema.validate(response.body)
        expect(validationResult.error).to.eq(undefined)
        expect(response.body.patient.id).to.eq(patientID)
    })

    it('Response shoud update particular patient (404)', async () => {
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

        const validationResult = schema.validate(response.body)
        expect(validationResult.error).to.eq(undefined)
        expect(response.body.patient.id).to.eq(patientID)
    })
    // field for check validation of params
})