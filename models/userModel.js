import { Sequelize } from "sequelize";
import db from "../config/Database.js"

const { DataTypes } = Sequelize;

export const Users = db.define('users', {
    name:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
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


export const memberLogs = db.define('memberLogs', {
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
    }}, 
)

