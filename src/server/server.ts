import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { createServer } from "http";
import { AppContext } from "../types";
import { UserService, TodoService } from "../services";
import db from "../storage/db";
import App from "./app";

// init server
const httpApp = express();
const httpServer = createServer(httpApp);

// connect db
db.connect({ dbUrl: process.env.DB_URL });

// initialzeServices
const userService = new UserService();
const todoService = new TodoService();

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
