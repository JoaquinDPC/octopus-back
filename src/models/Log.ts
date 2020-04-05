import mongoose from "mongoose";

const LogSchema = new mongoose.Schema({
  id: Number,
  level: String,
	message: String,
	timeStampt: Date
});

export const Log = mongoose.model("Log", LogSchema);