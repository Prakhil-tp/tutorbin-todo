import { ServiceContext, TUser } from "../types";
import jwt from "jsonwebtoken";

export class UserService {
  context!: ServiceContext;

  constructor(serviceContext: ServiceContext) {
    this.context = serviceContext;
  }

  public async getUser(email: string) {
    return this.context.userRepository.get(email);
  }

  public async addUser(data: TUser) {
    return this.context.userRepository.save(data);
  }

  public async generateUserToken(data: TUser) {
    return jwt.sign(data, process.env.JWT_SECRET as string, {
      expiresIn: "24h"
    });
  }
}
