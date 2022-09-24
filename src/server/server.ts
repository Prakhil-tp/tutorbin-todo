import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { createServer } from "http";
import { AppContext } from "../types";
import App from "./app";

// init server
const httpApp = express();
const httpServer = createServer(httpApp);

// initialzeServices

const appContext: AppContext = {};

export const app: App = new App(httpApp, httpServer, appContext);

try {
  app.listen();
  console.log(`Server running on port: ${process.env.PORT}`);
} catch (e) {
  console.log(`Error starting HTTP server: ${JSON.stringify(e)}`);
}
