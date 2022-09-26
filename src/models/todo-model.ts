import { Document, Model, model, Schema } from "mongoose";

export interface ITodo extends Document {
  task: string;
}

const todoSchema: Schema = new Schema({
  task: {
    type: String,
    required: true,
    unique: true
  }
});

const Todo: Model<ITodo> = model<ITodo>("Todo", todoSchema);

export default Todo;
