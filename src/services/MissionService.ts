// Libs
import { Request, Response } from "express";
import { MongooseDocument } from 'mongoose';

// Interfaces
import { IRule } from '../interfaces/mainInterfaces'

// Services
import { Rule } from "../models/Rule";


export default class RuleService {
  public addRule(rule: IRule) {

    try {
      // const newLog = new Rule(rule);
      console.log(rule);
      

      return { success: true };
    } catch(error) {
      return { 
        success: false,
        code: error.code || error.message, 
        message: "Error inesperado insertando regla."
      }  
    }

  };  

};