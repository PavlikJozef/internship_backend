import supertest from "supertest";
import { expect } from "chai"
import app from "../../../../../src/app"
import { schema } from '../../../../../src/api/v1/patients/post.patient'

const url = "/api/v1/patients"

describe(`[POST] ${url}`, () => {
    it('Response shoud return new patient (200) - OK', async () => {
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

    it('Response shoud return new patient (400) - Bad Request (DiagnoseID must be integer)', async () => {
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
                diagnoseID: 15.56
            })
            .set('Content-Type', 'application/json')
        
        expect(response.status).to.eq(400)
        expect(response.type).to.eq('application/json')

        const validationResult = schema.validate(response.body)
        expect(validationResult.error).to.eq(undefined)
    })

    it('Response shoud return new patient (404) - Not Found (DiagnoseID not found in database)', async () => {
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
                diagnoseID: 1518948941
            })
            .set('Content-Type', 'application/json')
        
        expect(response.status).to.eq(400)
        expect(response.type).to.eq('application/json')

        const validationResult = schema.validate(response.body)
        expect(validationResult.error).to.eq(undefined)
    })

    it('Response shoud return new patient (405) - Method Not Allowed (post method should be used in this case)', async () => {
        const response = await supertest(app)
            .get(url)
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
        
        expect(response.status).to.eq(405)
        expect(response.type).to.eq('application/json')

        const validationResult = schema.validate(response.body)
        expect(validationResult.error).to.eq(undefined)
    })

    it('Response shoud return new patient (409) - Conflict (Patient with this id already exists in database)', async () => {
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
        
        expect(response.status).to.eq(409)
        expect(response.type).to.eq('application/json')

        const validationResult = schema.validate(response.body)
        expect(validationResult.error).to.eq(undefined)
    })
})