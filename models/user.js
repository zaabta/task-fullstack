'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.UserType, {foreignKey:"userTypeId", as:"Type"})
      User.hasMany(models.Task, {foreignKey: "userId"})
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    userTypeId: DataTypes.INTEGER.UNSIGNED
  }, {
    sequelize,
    modelName: 'User',
    tableName: "users",
    paranoid: true,
  });
  return User;
};