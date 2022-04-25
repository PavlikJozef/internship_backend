export enum GENDER {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}

export enum SUBSTANCE_TIME_UNIT {
    SECOND = 'SECOND',
    MINUTE = 'MINUTE',
    HOUR = 'HOUR',
    DAY = 'DAY'
}

export enum PERSON_TYPE {
    ADULT = 'ADULT',
    CHILD = 'CHILD'
}

export const GENDERS = Object.values(GENDER)
export const SUBSTANCE_TIME_UNITS = Object.values(SUBSTANCE_TIME_UNIT)
export const PERSON_TYPES = Object.values(PERSON_TYPE)