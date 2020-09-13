import { Request, Response } from "express";
import { MongooseDocument } from 'mongoose';
import moment from 'moment';

// Interfaces
import { IResponse, IMission, IDBInsertResponse, IInsertResponse } from '../interfaces/mainInterfaces';

// Models
import { Mission, saveNewMission, getActiveMissions, checkMission, deleteMission } from "../models/Mission";


export class GeneralService {
  public basicRequest(req: Request, res: Response) {
    return res.json("Server working!");
  };

  static async getAllActiveMissions(): Promise<IResponse<IMission[]>> {
    const selectResponse = await getActiveMissions();

    if(!selectResponse.success) {
      return { success: false, data: null, message: selectResponse.message  };
    }

    return { success: true, data: selectResponse.data };
  };

  static async newMission(name: string, description: string): Promise<IResponse<IInsertResponse>> {
    const currentDate: Date = moment().format() as unknown as Date;

    const newEntry: IMission = {
      missionName: name,
      description: description,
      completed: false,
      userId: '0',
      deleted: false,
      timeStampt: currentDate
    };

    const insertResponse = await saveNewMission(newEntry);

    if(!insertResponse.success) {
      return { success: false, message: insertResponse. message, data: null };
    }

    return { 
      success: true, 
      data: { 
        insertId: insertResponse.insertId
      } 
    };
  };

  static async checkMission(missionId: string, completed: boolean): Promise<IResponse<null>> {
    const checkResponse = await checkMission(missionId, completed);

    if(!checkResponse.nMatched) {
      return { success: false, message: "La misión no existe.", data: null };
    }

    if(!checkResponse.nModified) {
      return { success: true, message: "La misión ya está chequeada.", data: null };
    }

    return { success: true, data: null };
  };

  static async deleteMission(missionId: string): Promise<IResponse<null>> {
    const deleteResponse = await deleteMission(missionId);

    if(!deleteResponse.nMatched || !deleteResponse.nModified) {
      return { success: false, message: "La misión no existe.", data: null };
    }

    return { success: true, data: null };
  };

};