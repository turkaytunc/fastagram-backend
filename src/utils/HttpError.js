export default class HttpError extends Error {
  constructor(message, status) {
    super();
    this.status = status;
    this.message = message;
  }
}
