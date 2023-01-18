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
      Task.belongsTo(models.Status, { foreignKey: "status" })
      Task.belongsTo(models.User, { foreignKey: "userId" })
      Task.belongsToMany(models.Tag, {through: "tagTask", foreignKey:"taskId"})
    }
  }
  Task.init({
    userId: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    status: DataTypes.INTEGER.UNSIGNED,
  }, {
    sequelize,
    modelName: 'Task',
    paranoid: true,
  });
  return Task;
};