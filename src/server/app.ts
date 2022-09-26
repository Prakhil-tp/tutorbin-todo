import express, { Application } from "express";
import { Server } from "http";
import { AppContext } from "../types";
import { ErrorHandler } from "../middlewares";
import { UserController } from "../controllers/user-controller";
import { TodoController } from "../controllers/todo-controller";

export default class App {
  public app: Application;
  public httpServer: Server;
  private appContext: AppContext;

  constructor(
    httpApp: Application,
    httpServer: Server,
    appContext: AppContext
  ) {
    this.app = httpApp;
    this.httpServer = httpServer;
    this.appContext = appContext;
  }

  public listen(): Server {
    this.initializeMiddlewares();
    this.initializeControllers();
    this.initializeErrorHandling();

    const PORT = process.env.PORT || 3000;
    const server = this.httpServer.listen(PORT);

    return server;
  }

  private initializeMiddlewares() {
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
  }

  private initializeErrorHandling() {
    this.app.use(ErrorHandler.notFoundHandler);
    this.app.use(ErrorHandler.serverErrorHandler);
  }

  private initializeControllers() {
    const userController = new UserController(this.appContext);
    const todoController = new TodoController(this.appContext);
    this.app.use("/", userController.router);
    this.app.use("/", todoController.router);
  }
}
