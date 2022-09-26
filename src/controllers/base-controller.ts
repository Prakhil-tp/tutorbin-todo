import { Router } from "express";
import { AppContext } from "../types";

export class BaseController {
  public router: Router = Router();
  protected appContext: AppContext;

  constructor(appContext: AppContext) {
    this.appContext = appContext;
  }
}
