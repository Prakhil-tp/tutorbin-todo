import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../errors";
import { DefaultErrorMessage } from "../enums";
import { NextFunction, Request, Response } from "express";

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerHeader = req.headers["authorization"];

  if (bearerHeader) {
    const token: string = bearerHeader.split(" ")[1];
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req["user"] = decoded;
        return next();
      } catch (e) {
        console.log(e);
      }
    }
  }

  return next(new UnauthorizedError(DefaultErrorMessage.UNAUTHORIZED_ERROR));
};
