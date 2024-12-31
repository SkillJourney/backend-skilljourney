import User from '../models/userModel.js'
import Job from '../models/jobModel.js'

const setupAssociations = () => {
    User.hasMany(Job, {
        foreignKey: "userId",
        as: "jobs",
    });

    Job.belongsTo(User, {
        foreignKey: "userId",
        as: "user",
    });
};

export default setupAssociations;