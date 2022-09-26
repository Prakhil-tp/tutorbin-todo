import { Document, Model, model, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  name: string;
  password: string;
}

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  }
});

const User: Model<IUser> = model<IUser>("User", userSchema);

export default User;
