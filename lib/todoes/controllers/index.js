const responses = require("../../helper/responses");
const services = require("../services");
const transformers = require("../../transformers");

const store = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const content = req.body.content?.trim();
    if (content?.length < 5)
      return responses.failedWithMessage(
        "the task should be more than 5 charts",
        res
      );
    const startDate = req.body?.startDate?.trim();
    const endDate = req.body?.endDate?.trim();

    const todo = await services.createTodo({
      userId,
      content,
      startDate: startDate ? new Date(startDate) : new Date(),
      endDate: endDate ? new Date(endDate) : null
    });
    if (!todo)
      return responses.failedWithMessage("failed to add new task", res);
    return responses.successWithMessage(
      "new task has been created",
      res,
      transformers.todoTransformer(todo)
    );
  } catch (err) {
    console.log("ERROR--> ", err);
    responses.serverError(res);
  }
};

const index = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const todoes = await services.getTodoes({ userId });
    if (Array.isArray(todoes) && !todoes.length)
      return responses.failedWithMessage("no tasks yet! ", res);
    return responses.successWithMessage(
      "getting tasks successfully",
      res,
      transformers.todoesTransformer(todoes)
    );
  } catch (err) {
    console.log("ERROR--> ", err);
    responses.serverError(res);
  }
};

const destory = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const todoId = req.params.id;
    if (isNaN(todoId))
      return responses.failedWithMessage("the todo is not selected", res);
    const deletedTodo = await services.deleteTodo({
      userId,
      todoId
    });
    console.log(deletedTodo);
    if (!deletedTodo[0])
      return responses.failedWithMessage("failed to remove todo", res);
    return responses.successWithMessage("todo removed successfully!", res);
  } catch (err) {
    console.log("ERROR--> ", err);
    responses.serverError(res);
  }
};

const getStatus = async (req, res, next) => {
  try {
    const status = await services.getStatus();
    if (status?.length == 0)
      return responses.failedWithMessage("failed to get the status", res);
    return   responses.successWithMessage("status got successfully", res, status);
  } catch (err) {
    console.log("ERROR--> ", err);
    responses.serverError(res);
  }
};

module.exports = {
  store,
  index,
  destory,
  getStatus
};
