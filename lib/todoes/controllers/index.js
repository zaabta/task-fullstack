const responses = require("../../helper/responses");

const createTodo = (req, res, next) => {
  try {
    const userId = req.user.id;
    const content = req.body.content?.trim();
    if (content?.length < 5)
      return responses.failedWithMessage(
        "the task should be more than 5 charts",
        res
      );
      const startDate = req.body?.startDate?.trim()
      const endDate = req.body?.endDate?.trim() || null

      console.log(todo)


  } catch (err) {
    console.log("ERROR--> ", err);
    responses.serverError(res);
  }
};

module.exports = {
  createTodo
};
