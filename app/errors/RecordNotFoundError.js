const ApplicationError = require("./ApplicationError");

class RecordNotFoundError extends ApplicationError {
  constructor(name) {
    super(`${name} not found!`)
  }
}

module.exports = RecordNotFoundError;
