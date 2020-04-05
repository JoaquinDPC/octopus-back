import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { Controller } from './MainController';


class App {
  public app: Application;
  public typistController: Controller;

  constructor() {
    this.app = express();
    this.setConfig();

    this.typistController = new Controller(this.app);
  }

  private setConfig() {
    //Allows us to receive requests with data in json format
    this.app.use(bodyParser.json({ limit: '50mb' }));

    //Allows us to receive requests with data in x-www-form-urlencoded format
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended:true}));

    //Enables cors   
    this.app.use(cors());
  }
}

export default new App().app;