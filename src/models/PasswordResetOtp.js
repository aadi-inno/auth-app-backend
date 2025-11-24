import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const PasswordResetOtp = sequelize.define("PasswordResetOtp", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    otpHash: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
    }
});
