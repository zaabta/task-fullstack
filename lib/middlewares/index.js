const responses = require("../helper/responses");
const authService = require("../auth services");

const isAuth = (req, res, next) => {
  try {
    const token =
      req?.cookies?.token ||
      req?.headers?.authorization?.split(" ")[1] ||
      req?.headers?.Authorization?.split(" ")[1] ||
      null;
    if (!token) return responses.unauthorized(res);
    const decode = authService.decodeToken(token);
    if (!decode) return responses.unauthorized(res);
    req.user = {
      ...decode
    };
    return next();
  } catch (err) {
    console.log("ERROR meddleware fun -->", err)
    return responses.unauthorized(res);
  }
};

module.exports = {
  isAuth
};
