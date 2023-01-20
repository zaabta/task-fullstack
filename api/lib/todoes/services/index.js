const models = require("../../../models");
const { fn } = require("sequelize");


const createTodo = async ({ userId, content, startDate, endDate }) => {
  try {
    const todo = await models.Task.create(
      {
        userId,
        content,
        startDate,
        endDate,
        status: 1
      },
      {
        include: [
          {
            model: models.Status,
            
          }
        ]
      }
    );
    return todo;
  } catch (err) {
    console.log("ERROR-->", err);
    throw new Error(err);
  }
};

const getTodoes = async ({ userId, offset }) => {
  try {
    const todoes = await models.Task.findAndCountAll({
      where: {
        userId,
        deletedAt: null
      },
      order: [
        ['createdAt', 'DESC'],
    ],
      include: [
        {
          model: models.Status
        }
      ],
      offset: offset ? +offset: 0,
      limit: 2
    });
    return todoes;
  } catch (err) {
    console.log("ERROR from service --> ", err);
    throw new Error(err);
  }
};

const deleteTodo = async ({ userId, todoId: id }) => {
  try {
    const updateCols = await models.Task.update(
      {
        deletedAt: fn("now")
      },
      {
        where: { userId, id }
      }
    );
    return updateCols;
  } catch (err) {
    console.log("ERROR from service --> ", err);
    throw new Error(err);
  }
};



const changeStatus = async ({ userId, statusId: status, todoId: id }) => {
    try {
      const updatedTodo = await models.Task.update(
        { status },
        { where: { userId, id}}
      );
      return updatedTodo
    } catch (err) {
      throw new Error(err);
    }
  };




module.exports = {
  createTodo,
  getTodoes,
  deleteTodo,
  changeStatus
};
