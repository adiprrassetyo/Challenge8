const ApplicationError = require("./ApplicationError");

class WrongPasswordError extends ApplicationError {
  constructor() {
    super("Password is not correct!");
  }
}

module.exports = WrongPasswordError;
