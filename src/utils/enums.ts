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

export enum USER_ROLE {
    USER = 'USER',
    ADMIN = 'ADMIN',
    SUPER_ADMIN = 'SUPER_ADMIN'
}

export const GENDERS = Object.values(GENDER)
export const SUBSTANCE_TIME_UNITS = Object.values(SUBSTANCE_TIME_UNIT)
export const PERSON_TYPES = Object.values(PERSON_TYPE)
export const USER_ROLES = Object.values(USER_ROLE)