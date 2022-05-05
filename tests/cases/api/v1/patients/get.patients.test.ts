import supertest from "supertest";
import { expect } from "chai"
import app from "../../../../../src/app"
import { responseSchema } from '../../../../../src/api/v1/patients/get.patients'

const url = "/api/v1/patients"

describe(`[GET] ${url}`, () => {
    it('Response shoud return list of patients (200) - OK', async () => {
        const response = await supertest(app)
            .get(url)
            .set('Content-Type', 'application/json')
        
        expect(response.status).to.eq(200)
        expect(response.type).to.eq('application/json')

        const validationResult = responseSchema.validate(response.body)
        expect(validationResult.error).to.eq(undefined)
    })

    it('Response should return list of patients (400) - Bad Request (query parameter does not match with model, wrong method)', async () => {
        const response = await supertest(app)
            .post(url)
            .query({
                personType: 'it',
                period: 0
            })
            .set('Content-Type', 'application/json')

        expect(response.status).to.eq(400)
        expect(response.type).to.eq('application/json')
    })

    it('Response should return list of patients (400) - Bad Request (invalid url address was given)', async () => {
        const response = await supertest(app)
            .get(url+'/as')
            .set('Content-Type', 'application/json')

        expect(response.status).to.eq(400)
        expect(response.type).to.eq('application/json')
    })

    // it('Response should return list of patients (405) - Method Not Allowed (get method should be used instead of post method)', async () => {
    //     const response = await supertest(app)
    //         .post(url)
    //         .set('Content-Type', 'application/json')

    //     expect(response.status).to.eq(405)
    //     expect(response.type).to.eq('application/json')
    // })
})