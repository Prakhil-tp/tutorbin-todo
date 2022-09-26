import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { createServer } from "http";
import { AppContext, ServiceContext } from "../types";
import { UserService, TodoService } from "../services";
import { UserRepository, TodoRepository } from "../repositories";
import db from "../storage/db";
import App from "./app";

// init server
const httpApp = express();
const httpServer = createServer(httpApp);

// connect db
db.connect({ dbUrl: process.env.DB_URL });

const userRepository = new UserRepository();
const todoRepository = new TodoRepository();

const serviceContext: ServiceContext = {
  userRepository,
  todoRepository
};

// initialzeServices
const userService = new UserService(serviceContext);
const todoService = new TodoService(serviceContext);

const appContext: AppContext = {
  userService,
  todoService
};

export const app: App = new App(httpApp, httpServer, appContext);

try {
  app.listen();
  console.log(`Server running on port: ${process.env.PORT}`);
} catch (e) {
  console.log(`Error starting HTTP server: ${JSON.stringify(e)}`);
}
