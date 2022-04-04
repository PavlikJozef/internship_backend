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
            type: DataTypes.TEXT,
            allowNull: false
        },
        lastName: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        birthdate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        height: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        identificationNumber: {
            type: DataTypes.STRING(12),
            allowNull: false
        },
        gender: {
            type: DataTypes.ENUM(...GENDERS),
            allowNull: false
        },
        diagnoseID: {
            type: DataTypes.INTEGER,
            allowNull: false
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
        PatientModel.belongsTo(models.Diagnose, { foreignKey: 'diagnoseID'})
    }

    return PatientModel
}