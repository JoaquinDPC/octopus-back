import { Application, Request, Response } from 'express';

import { GeneralService } from '../services/GeneralService';


export class GeneralController {
  private generalService: GeneralService;
  
  constructor(private app: Application) {
    this.generalService = new GeneralService();
    this.routes();
  };

  static async health(req: Request, res: Response): Promise<any> {
    res.json({ success: true, message: "well done!" });
  };

  public routes() {
    this.app.route("/").get(GeneralController.health);
  };
};