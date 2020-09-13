import { Schema, model, Document } from "mongoose";

// Interfaces
import { IMission, IMMission, IDBInsertResponse, IDBSelectResponse, IUpdateResponse } from '../interfaces/mainInterfaces';


const MissionSchema: Schema = new Schema({
  missionName: String,
  description: String,
  completed: Boolean,
  userId: String,
  deleted: Boolean,
  timeStampt: Date
});

export const Mission = model<IMMission>("Mission", MissionSchema);

export const saveNewMission = async (newEntry: IMission): Promise<IDBInsertResponse> => {
  try {
    const newMission = new Mission(newEntry);
    const entryResponse = await newMission.save();

    return { success: true, insertId: entryResponse._id };
  } catch(e) {
    return { success: false, message: e.message, insertId: null };
  };
};

export const getActiveMissions = async (): Promise<IDBSelectResponse<IMMission[]>> => {
  try {
    const result = await Mission.find({ deleted: false });

    return { success: true, data: result };
  } catch(error) {
    return { success: false, message: error.name, data: [] };
  };
};

export const checkMission = async (missionId: string, completed: boolean): Promise<IUpdateResponse> => {
  try { 
    const { n, nModified } = await Mission.updateOne({ 
      _id: missionId
    }, {
      completed: completed
    });

    return { success: true, nModified: nModified, nMatched: n };
  } catch(error) {
    return { success: false, message: error.name, nModified: null, nMatched: null };
  }
};

export const deleteMission = async (missionId: string): Promise<IUpdateResponse> => {
  try { 
    const { n, nModified } = await Mission.updateOne({ 
      _id: missionId
    }, {
      deleted: true
    });

    return { success: true, nModified: nModified, nMatched: n };
  } catch(error) {
    return { success: false, message: error.name, nModified: null, nMatched: null };
  }
};