const services = require("../services");
const responses = require("../../helper/responses");

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
    const status = req.body.status;
    if (!status)
      return responses.failedWithMessage("please enter the status", res);
    const newStatus = await services.createStatus({ status });
    if (!newStatus)
      return responses.failedWithMessage("this status is already exist!", res);
    return responses.successWithMessage(
      "the status has been created successfully",
      newStatus,
      res
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
