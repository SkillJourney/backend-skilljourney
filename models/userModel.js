import sequelize from "../configurations/dbConfiguration.js";
import { DataTypes } from "sequelize";

const User = sequelize.define("User", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 20],
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [1, 100],
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8, 100],
        }
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "USER"
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [1, 100],
            isUrl: true,
        }
    },
}, {
    freezeTableName: true,
})

export default User