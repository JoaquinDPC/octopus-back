import { Application } from 'express';

import { LoggerService } from '../services/LoggerService';


export class LoggerController {
  private loggerService: LoggerService;

  constructor(private app: Application) {
    this.loggerService = new LoggerService();
    this.routes();
  };

  public routes() {
    this.app.route("/logs").get(this.loggerService.getAllLogs);
    this.app.route("/logs/user/:userEmail").get(this.loggerService.filterByUserEmail);
    this.app.route("/logs/filter").post(this.loggerService.getFilteredLog);
    this.app.route("/captureEvent").post(this.loggerService.addNewLog);
  };
};