'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Task.init({
    userId: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    status: DataTypes.TINYINT,
    taskDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Task',
    paranoid: true,
  });
  return Task;
};