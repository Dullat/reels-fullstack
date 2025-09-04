const CustomAPIError = require("../erros/custom.error.js");

class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnauthenticatedError;
