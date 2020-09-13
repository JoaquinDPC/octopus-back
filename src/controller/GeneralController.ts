import { Application, Request, Response } from 'express';

import { GeneralService } from '../services/GeneralService';

// Interfaces
import { IResponse, IMission } from '../interfaces/mainInterfaces';

// Tools
import { idIsValid } from '../utils/validateUtils';

export class GeneralController {
  private generalService: GeneralService;
  
  constructor(private app: Application) {
    this.generalService = new GeneralService();
    this.routes();
  };

  static async health(req: Request, res: Response) {
    res.json({ success: true, message: "well done!" });
  };

  static async getAllActiveMissions(req: Request, res: Response) {
    const response = await GeneralService.getAllActiveMissions();

    res.json({ success: true, data: response.data });
  };

  static async newMission(req: Request, res: Response) {
    const { missionName = '', description = '' } = req.body;

    if(!missionName || !description) {
      return res.json({ success: false, message: 'Misión inválida.', data: null });  
    }

    const serviceResponse = await GeneralService.newMission(missionName, description);

    res.json(serviceResponse);
  };

  static async checkMission(req: Request, res: Response) {
    const { missionId, completed } = req.body;

    if(!missionId) {
      return res.json({ success: false, message: 'El id de la misión es requerido.', data: null });
    }

    if(!idIsValid(missionId)) {
      return res.json({ success: false, message: 'El id de la misión es inválido.', data: null });
    }

    if(typeof(completed) !== 'boolean') {
      return res.json({ success: false, message: 'El estado de la misión es requerido.', data: null });
    }

    const serviceResponse = await GeneralService.checkMission(missionId, completed);

    res.json(serviceResponse);
  };

  static async deleteMission(req: Request, res: Response) {
    const { missionId } = req.params;

    if(!missionId) {
      return res.json({ success: false, message: 'El id de la misión es requerido.', data: null });
    }

    if(!idIsValid(missionId)) {
      return res.json({ success: false, message: 'El id de la misión es inválido.', data: null });
    }

    const serviceResponse = await GeneralService.deleteMission(missionId);

    res.json(serviceResponse);
  };

  // TODO: Hacer una ruta general, invocar a los controllers desde ahí y luego a sus funciones (como laravel)

  public routes() {
    this.app.route("/").get(GeneralController.health);
    this.app.route("/missions").get(GeneralController.getAllActiveMissions);
    this.app.route("/mission").post(GeneralController.newMission);
    this.app.route("/mission/check").post(GeneralController.checkMission);
    this.app.route("/mission/delete/:id").put(GeneralController.deleteMission);
  };
};
