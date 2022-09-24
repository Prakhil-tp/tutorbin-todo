import { DefaultErrorMessage } from "../enums";

export class NotFoundError extends Error {
  statusCode = 404;
  constructor(message: DefaultErrorMessage) {
    super(message.toString());
  }
}
