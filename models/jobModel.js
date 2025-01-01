import sequalize from "../configurations/dbConfiguration.js"
import { DataTypes } from "sequelize"

const Job = sequalize.define("Job", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 100],
        }
    },
    salary: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 300000
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 1000],
        }
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 100],
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id'
        }
    }
}, {
    freezeTableName: true,
})

export default Job