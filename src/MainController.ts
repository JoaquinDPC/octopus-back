import { Application } from 'express';

import { TypistService } from './services/TypistService';


export class Controller {
  private typistService: TypistService;

  constructor(private app: Application) {
    this.typistService = new TypistService();
    this.routes();
  }

  public routes() {
    this.app.route('/').get(this.typistService.welcomeMessage);
    this.app.route("/logs").get(this.typistService.getAllLogs);
    this.app.route("/add/log").post(this.typistService.addNewLog);
  }
}