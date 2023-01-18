const response = require("../../helper/responses");
const transformers = require("../../transformers")
const services = require("../services")

const getUsers = async (req, res, next) => {
  try {
    const users = services.getAllUsers();
    if (users?.length == 0)
      return response.failedWithMessage("failed to get users", res)
      return response.successWithMessage(
        "getting users successfully",
        res,
        transformers.usersTransformer(users)
      );
  } catch (err) {
    console.log("ERROR from service --> ", err);
    throw new Error(err);
  }
};

module.exports = {
  getUsers
};
