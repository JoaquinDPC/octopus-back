import { Request, Response } from "express";
import { MongooseDocument } from 'mongoose';
import moment from 'moment';

import { Log } from "../models/Log";

export class LoggerService {
  public getAllLogs(req: Request, res: Response) {
    Log.find({}, (error: Error, log: MongooseDocument) => {
      if(error) {
        return res.send(error);
      }

      res.json(log);
    });
  };

  public async filterByUserEmail(req: Request, res: Response) {
    const userEmail = req.params.userEmail ? req.params.userEmail : '';

    const result = await Log.find({ 
      userId: userEmail, 
      error: false 
    });

    res.json({ success: true, result });    
  };

  public async getFilteredLog(req: Request, res: Response) {
    const { 
      route = '', 
      userId = '', 
      error = false, 
      timeStampt = moment().add(9, "months").format("YYYY/MM/DD HH:mm:ss"), 
      timeEnd = moment().subtract(3, "months").format("YYYY/MM/DD HH:mm:ss"),
      message = ""
    } = req.body;

    const result = await Log.find({ 
      ... (route && { route }),
      ... (userId && { userId }),
      // ... (timeStampt && { timeStampt }),
      ... (message && { message }),
      ... (error && { error }),
      utc_ts: { $gt:  timeStampt, $lt:  timeEnd }
    });

    res.json({ success: true, result });
  };

  public addNewLog(req: Request, res: Response) {
    console.log(req.body);
    return res.send();

    // TODO: Crear capa extra para interactuar con mongo
    // TODO: Agregar tests 

    // req.body.timeStampt = moment(req.body.timeStampt).format("YYYY/MM/DD HH:mm:ss");
    // const newLog = new Log(req.body);
    // newLog.save((error: Error, log: MongooseDocument) => {
    //   if (error) {
    //     res.send(error);
    //   }
      
    //   res.json(log);
    // });
  };
};