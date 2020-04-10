import { Schema, model } from "mongoose";

const LogSchema = new Schema({
  id: Number, // { type: string, requeried: true }
  level: String,
	message: String,
	timeStampt: Date
});

export const Log = model("Log", LogSchema);