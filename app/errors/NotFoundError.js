const ApplicationError = require("./ApplicationError");

class NotFoundError extends ApplicationError {
  constructor(method, url) {
    super("Not found!")
    this.method = method;
    this.url = url;
  }

  get details() {
    return {
      method: this.method,
      url: this.url,
    }
  }
}

module.exports = NotFoundError;
