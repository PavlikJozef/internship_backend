import { Sequelize, Model, DataTypes } from 'sequelize'
import { Models } from '..'
import { SUBSTANCE_TIME_UNIT, SUBSTANCE_TIME_UNITS } from '../../utils/enums'

export class SubstanceModel extends Model {
    id: number
    name: string
    timeUnit: SUBSTANCE_TIME_UNIT
    halfLife: number
}

export default (sequelize: Sequelize, modelName: string) => {
	SubstanceModel.init(
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
				unique: true,
				autoIncrement: true,
			},
			name: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			timeUnit: {
				type: DataTypes.ENUM(...SUBSTANCE_TIME_UNITS),
				allowNull: false,
			},
			halfLife: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			paranoid: false,
			timestamps: false,
			sequelize,
			modelName,
			tableName: 'diagnoses',
		}
	);

	(SubstanceModel as any).associate = (models: Models) => {
		SubstanceModel.belongsTo(models.Diagnose, { foreignKey: 'substanceID' })
	}

	return SubstanceModel
}