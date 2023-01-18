const services = require("../services");
const responses = require("../../helper/responses");
const tag = require("../../../models/tag");

const index = async (req, res, next) => {
  try {
    const status = await services.getStatus();
    if (status?.length == 0)
      return responses.failedWithMessage("failed to get the status", res);
    return responses.successWithMessage("status got successfully", res, status);
  } catch (err) {
    console.log("ERROR--> ", err);
    responses.serverError(res);
  }
};

const store = async (req, res, next) => {
  try {
    let tags = req.body.tags;  // []
    const todoId = req.params.todoId

    if (!tags)
      return responses.failedWithMessage("please enter the tags", res);
    tags = tags.replace(/\s/g, '').split("#") 
    if(tags?.length < 2)  return responses.failedWithMessage("please enter the tags", res);
    const newtTags = await services.createTags({ tags, todoId });
    if (!newtTags)
      return responses.failedWithMessage("this tags is not created for this task", res);
    return responses.successWithMessage(
      "the status has been created successfully",
      res,
      newtTags
    );
  } catch (err) {
    console.log("ERROR--> ", err);
    responses.serverError(res);
  }
};

module.exports = {
  index,
  store
};
