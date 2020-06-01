import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import { LoggerController } from './controller/LoggerController';
import { GeneralController } from './controller/GeneralController';
import { MONGO_URL } from './constants/constants';


class App {
  public app: Application;
  public loggerController: LoggerController;
  public generalController: GeneralController;

  constructor() {
    this.app = express();
    this.setConfig();
    this.setMongoConfig();

    this.loggerController = new LoggerController(this.app);
    this.generalController = new GeneralController(this.app);
  };

  private setConfig() {
    this.app.use(bodyParser.json({ limit: '50mb' }));
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    this.app.use(cors());
  };

  private setMongoConfig() {
    mongoose.Promise = global.Promise;
    mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  };
};

export default new App().app;