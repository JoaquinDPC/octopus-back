import { Document } from "mongoose";

export interface IResponse<T> {
  success: boolean,
  message?: string,
  data: T | null
};

export interface IMission {
  missionName: string,
  description: string,
  completed: boolean,
  userId: string,
  deleted: boolean,
  timeStampt: Date
};

// Mongo interfaces
export interface IMMission extends Document {
  missionName: string,
  description: string,
  completed: boolean,
  userId: string,
  deleted: boolean,
  timeStampt: Date
};

export interface IDBBaseReponse {
  success: boolean,
  message?: string
};

export interface IDBInsertResponse extends IDBBaseReponse {
  insertId: string
};

export interface IDBSelectResponse<T> extends IDBBaseReponse {
  data: T
};

export interface IUpdateResponse extends IDBBaseReponse {
  nModified: number,
  nMatched: number
};

export interface IInsertResponse {
  insertId: string
};