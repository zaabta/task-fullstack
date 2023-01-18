const models = require("../../../models");

const getStatus = async () => {
  try {
    const status = await models.Status.findAll({
      attributes: ["id", "name"]
    });
    return status;
  } catch (err) {
    console.log("ERROR from service --> ", err);
    throw new Error(err);
  }
};

const createStatus = async ({ status: name }) => {
  try {
    const [status, created] = await models.Status.findOrCreate({
      where: { name },
      defaults: { name }
    });
    if (!created) return null;
    return status;
  } catch (err) {
    console.log("ERROR from service --> ", err);
    throw new Error(err);
  }
};

module.exports = {
  getStatus,
  createStatus
};
