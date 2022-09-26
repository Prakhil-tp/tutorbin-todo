import { Request, Response } from "express";
import { AppContext } from "../types";
import { BaseController } from "./base-controller";
import { authentication } from "../middlewares";

export class TodoController extends BaseController {
  public basePath = "/todos";

  constructor(appContext: AppContext) {
    super(appContext);
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(`${this.basePath}`, authentication, this.getTodo);
    this.router.post(`${this.basePath}`, authentication, this.addTodo);
    this.router.put(`${this.basePath}/:id`, authentication, this.updateTodo);
    this.router.delete(`${this.basePath}/:id`, authentication, this.removeTodo);
  }

  private getTodo = async (req: Request, res: Response) => {
    try {
      const todos = await this.appContext.todoService!.getTodo();
      res.status(200).json({ success: true, data: todos });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: err.message });
    }
  };

  private addTodo = async (req: Request, res: Response) => {
    try {
      const todo = await this.appContext.todoService!.addTodo({
        ...req.body
      });
      res.status(200).json({ success: true, data: todo });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: err.message });
    }
  };

  private updateTodo = async (req: Request, res: Response) => {
    try {
      const todo = await this.appContext.todoService!.updateTodo(
        req.params.id,
        { ...req.body }
      );
      res.status(200).json({ success: true, data: todo });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: err.message });
    }
  };

  private removeTodo = async (req: Request, res: Response) => {
    try {
      const todo = await this.appContext.todoService!.removeTodo(req.params.id);
      res.status(200).json({ success: true, data: todo });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: err.message });
    }
  };
}
