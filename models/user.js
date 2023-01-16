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
<<<<<<< HEAD
=======
      User.belongsTo(models.UserType, {foreignKey:"userTypeId", as:"Type"})
>>>>>>> 72beb1b (1st day)
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
<<<<<<< HEAD
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
=======
    userTypeId: DataTypes.INTEGER.UNSIGNED
  }, {
    sequelize,
    modelName: 'User',
    tableName: "users",
>>>>>>> 72beb1b (1st day)
    paranoid: true,
  });
  return User;
};