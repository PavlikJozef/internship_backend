import { options } from 'joi'
import { Sequelize, Model, DataTypes } from 'sequelize'
import { Models } from '..'
import { GENDER, GENDERS } from '../../utils/enums'

export class PatientModel extends Model {
    id: number
    firstName: string
    lastName: string
    birthdate: Date
    weight: number
    height: number
    indentificationNumber: string
    gender: GENDER

    diagnoseID: number
}

export default (sequelize: Sequelize, modelName: string) => {
    PatientModel.init({
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.TEXT
        },
        lastName: {
            type: DataTypes.TEXT
        },
        birthdate: {
            type: DataTypes.DATEONLY
        },
        weight: {
            type: DataTypes.INTEGER
        },
        height: {
            type: DataTypes.INTEGER
        },
        identificationNumber: {
            type: DataTypes.STRING(12)
        },
        gender: {
            type: DataTypes.ENUM(...GENDERS)
        },
        diagnoseID: {
            type: DataTypes.INTEGER
        }
    }, 
    {
        paranoid: false,
        timestamps: false,
        sequelize,
        modelName,
        tableName: 'patients'
    });

    (PatientModel as any).associate = (models: Models) => {
        //PatientModel.belongsTo(models.Diagnose, )
    }

    return PatientModel
}