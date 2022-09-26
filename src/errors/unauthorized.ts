import { DefaultErrorMessage } from "../enums";

export class UnauthorizedError extends Error {
  statusCode = 401;
  constructor(message: DefaultErrorMessage) {
    super(message.toString());
  }
}
