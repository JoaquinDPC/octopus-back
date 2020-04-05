import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import { Controller } from './MainController';
import { MONGO_URL } from './constants/TypistConstants';


class App {
  public app: Application;
  public typistController: Controller;

  constructor() {
    this.app = express();
    this.setConfig();
    this.setMongoConfig();


    this.typistController = new Controller(this.app);
  }

  private setConfig() {
    this.app.use(bodyParser.json({ limit: '50mb' }));
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended:true}));
    this.app.use(cors());
  }

  private setMongoConfig() {
    mongoose.Promise = global.Promise;
    mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  }
}

export default new App().app;