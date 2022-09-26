import bcrypt from "bcryptjs";
import User from "../models/user-model";
import { TUser } from "../types";

export class UserRepository {
  public async get(email: string) {
    try {
      return await User.findOne({ email });
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }

  public async save(data: TUser) {
    try {
      const user = new User({
        name: data.name,
        email: data.email,
        password: bcrypt.hashSync(data.password)
      });
      const userData = await user.save();
      return { email: userData.email, _id: userData._id, name: userData.name };
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }
}
