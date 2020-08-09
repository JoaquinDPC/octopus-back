import { Schema, model } from "mongoose";

const LogSchema = new Schema({
  action: String,
  event: String,
  userId: String,
  timeStampt: Date
});

export const Log = model("Log", LogSchema);
