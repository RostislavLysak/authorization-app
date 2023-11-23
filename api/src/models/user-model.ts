import { Schema, model } from "mongoose";
import { Document } from "mongoose";

export interface IUserSchema extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isActivated: boolean;
  image?: string;
  // activationCode?: string;
  code?: string;
}

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  image: { type: String },
  isActivated: { type: Boolean, default: false },
  // activationCode: { type: String },
  code: { type: String },
});

export default model("User", UserSchema);
