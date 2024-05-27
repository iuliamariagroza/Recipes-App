import mongoose from "mongoose";

export interface User {
  id: string | undefined;
  username: string;
  password: string;
  role: string;
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const UserModel = mongoose.model<User>("User", userSchema);
