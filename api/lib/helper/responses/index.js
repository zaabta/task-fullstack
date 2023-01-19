const successResponse = function(messages = '', data = [], extras = {}) {
    var response = {
        success: true,
        data ,
        messages,
        time: Date.now(),
    }
    response = {...response, ...extras}
    return response
}

const errorResponse = function(messages = '', data = []) {
    var response = {
        success: false,
        data,
        messages, 
        time: Date.now()
    }
    return response
}

exports.unauthorized = (res) => {
  return res.status(401).json(errorResponse("unauthorized please login !"));
};

exports.unauthenticated = (res) => {
  return res
    .status(401)
    .json(errorResponse("unauthenticated, please login first"));
};


exports.failedWithMessage = (msg, res) => {
  return res.status(400).json(errorResponse(msg));
};

exports.serverError = (res) => {
  return res
    .status(500)
    .json(errorResponse("something went wrong, please try again later."));
};

exports.forbidden = (res) => {
  return res.status(403).json(errorResponse("forbidden"));
};

exports.notAcceptable = (res) => {
  return res.status(406).json(errorResponse("Not Acceptable"));
};

exports.successWithMessage = (msg, res, data=[]) => {
  return res.status(200).json(successResponse(msg, data));
};
