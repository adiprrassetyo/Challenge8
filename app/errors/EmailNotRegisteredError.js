const ApplicationError = require("./ApplicationError");

class EmailNotRegisteredError extends ApplicationError {
  constructor(email) {
    super(`${email} is not registered!`);
    this.email = email;
  }

  get details() {
    return { email: this.email }
  }
}

module.exports = EmailNotRegisteredError;
