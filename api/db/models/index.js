const { default: ModelManager } = require('sequelize/lib/model-manager');
const { User, UserSchema }= require('./user.model');

function setupModels(sequelize){
    User.init(UserSchema, User.config(sequelize));
}

module.exports =setupModels;