import { NotFoundError } from "../errors";
import { DefaultErrorMessage } from "../enums";
import { ErrorPayload } from "../types";
import {
  Response,
  NextFunction,
  ErrorRequestHandler,
  RequestHandler
} from "express";

export const notFoundHandler: RequestHandler = (
  _,
  res: Response,
  next: NextFunction
) => {
  next(new NotFoundError(DefaultErrorMessage.RESOURCE_NOT_FOUND));
};

export const serverErrorHandler: ErrorRequestHandler = (
  error: any,
  _,
  res: Response,
  next: NextFunction
) => {
  if (!error.statusCode) {
    error.statusCode = 500;
    error.message = DefaultErrorMessage.INTERNAL_SERVER_ERROR;
  }

  const payload: ErrorPayload = {
    message: error.message
  };

  if (error.failures) {
    payload.failures = error.failures;
  }

  res.status(error.statusCode).json(payload);
  next();
};
