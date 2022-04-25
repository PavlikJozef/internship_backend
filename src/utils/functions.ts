import { PERSON_TYPE } from "./enums";

export const getAge = (birthdate: Date) => {
    return new Date(Date.now() - new Date(birthdate).getTime()).getFullYear() - 1970;
}

export const getPersonType = (value: number) => {
    return value >= 18 ? PERSON_TYPE.ADULT : PERSON_TYPE.CHILD;  
}