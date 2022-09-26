import { AppContext } from "../types";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { BaseController } from "./base-controller";

export class UserController extends BaseController {
  public basePath = "/users";

  constructor(appContext: AppContext) {
    super(appContext);
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(`${this.basePath}`, this.addUser);
    this.router.post(`${this.basePath}/login`, this.login);
  }

  private addUser = async (req: Request, res: Response) => {
    try {
      let jwtToken = null;

      const userData = await this.appContext.userService!.addUser({
        ...req.body
      });

      if (userData) {
        jwtToken = await this.appContext.userService!.generateUserToken(
          userData
        );
      }

      res.status(200).json({ success: true, data: userData, token: jwtToken });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: err.message });
    }
  };

  private login = async (req: Request, res: Response) => {
    try {
      let jwtToken = null;
      const { email, password } = req.body;
      const userData = await this.appContext.userService!.getUser(email);
      if (!userData) {
        return res.status(404).json({ message: "User Not found." });
      }
      const isPasswordValid = bcrypt.compareSync(password, userData.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid Password" });
      }

      const data = {
        _id: userData._id,
        email: userData.email,
        name: userData.name
      };
      jwtToken = await this.appContext.userService!.generateUserToken(data);

      res.status(200).json({ success: true, data: data, token: jwtToken });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: err.message });
    }
  };
}
