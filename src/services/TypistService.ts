import { Request, Response } from "express";
import { MongooseDocument } from 'mongoose';


import { WELCOME_MESSAGE } from "../constants/TypistConstants";
import { Log } from "../models/Log";


export class TypistService {
  public welcomeMessage(req: Request, res: Response) {
    return res.status(200).send(WELCOME_MESSAGE);
  }

  public getAllLogs(req: Request, res: Response) {
    Log.find({}, (error: Error, log: MongooseDocument) => {
      if (error) {
        return res.send(error);
      }

      res.json(log);
    });
  }

  public addNewLog(req: Request, res: Response) {
    const newLog = new Log(req.body);
    newLog.save((error: Error, log: MongooseDocument) => {
      if (error) {
        res.send(error);
      }
      
      res.json(log);
    });
  }
}