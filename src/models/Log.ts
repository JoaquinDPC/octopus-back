import { Schema, model } from "mongoose";

const LogSchema = new Schema({
  route: String,
  userId: String,
  params: Map,
  error: Boolean,
  timeStampt: Date,
  message: String
});

export const Log = model("Log", LogSchema);