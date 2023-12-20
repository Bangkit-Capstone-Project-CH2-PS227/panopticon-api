import { Sequelize } from "sequelize";
import db from "../config/Database.js"

const { DataTypes } = Sequelize;

export const Users = db.define('users', {
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        isEmail: true,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [8, 255],
            }
        }
    },
    refresh_token:{
        type: DataTypes.TEXT
    },
}, {
    freezeTableName: true
})

export const generateRoom = db.define('rooms', {
    tokenRoom: {
        type: DataTypes.STRING
    },
    name_room: {
        type: DataTypes.STRING
    },
    username:{
        type: DataTypes.STRING
    },
})

export const memberlogs = db.define('memberlogs', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    member: {
        type: DataTypes.STRING
    },
    roomToken:{
        type: DataTypes.STRING
    },
    nameRoom:{
        type: DataTypes.STRING
    },
    joined_at: {
        type: DataTypes.DATE,
    }, 
    status : {
        type: DataTypes.STRING
    }, 
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    },}, 
)

export default {
    Users,
    generateRoom, 
    memberlogs
};
