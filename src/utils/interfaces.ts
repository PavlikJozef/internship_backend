import { GENDER } from "./enums"

interface IPatient {
    firstName: string
    lastName: string
    birthdate: Date
    height: number
    weight: number
    identificationNumber: string
    gender: GENDER
    diagnoseID: number
}