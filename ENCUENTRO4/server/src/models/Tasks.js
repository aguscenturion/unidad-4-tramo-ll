import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const TaskModel = sequelize.define('Task', {
    title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    poster: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true
})