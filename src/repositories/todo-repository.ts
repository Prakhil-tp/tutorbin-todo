import { TTodo } from "../types";
import Todo from "../models/todo-model";

export class TodoRepository {
  public async get() {
    try {
      const todos = await Todo.find({});
      return todos.map((elem) => {
        return { _id: elem.id, task: elem.task };
      });
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }

  public async save(data: TTodo) {
    try {
      const todo = new Todo(data);
      const todoData = await todo.save();
      return { task: todoData.task, _id: todoData._id };
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }

  public async update(id: string, data: TTodo) {
    try {
      const todo = await Todo.findById(id);
      todo.task = data.task;
      const todoData = await todo.save();
      return { task: todoData.task, _id: todoData._id };
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }

  public async remove(id: string) {
    try {
      return await Todo.deleteOne({ _id: id });
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }
}
