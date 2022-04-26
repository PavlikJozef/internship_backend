import { Sequelize, Model, DataTypes } from 'sequelize'
import { USER_ROLES, USER_ROLE} from '../../utils/enums'


export class UserModel extends Model{
    
    id: number
    name: string
    password: string
    userRole: USER_ROLE
}

export default (sequelize: Sequelize, modelName: string) => {
    UserModel.init({
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        userRole: {
            type: DataTypes.ENUM(...USER_ROLES),
            allowNull: false
        },
    }, 
    {
        paranoid: false,
        timestamps: false,
        sequelize,
        modelName,
        tableName: 'users'
    });

    return UserModel
}