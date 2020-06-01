import { Application } from 'express';

import { GeneralService } from '../services/GeneralService';


export class GeneralController {
  private generalService: GeneralService;

  constructor(private app: Application) {
    this.generalService = new GeneralService();
    this.routes();
  };

  public routes() {
    this.app.route("/").get(this.generalService.basicRequest);
  };
};