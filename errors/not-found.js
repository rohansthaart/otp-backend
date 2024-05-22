import CustomAPIError from "./custom-error.js";

class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message, 404);
  }
}

export default NotFoundError;
