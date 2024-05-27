import mongoose from "mongoose";
export interface Author {
  id: string | undefined;
  name: string;
}

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
});

authorSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const AuthorModel = mongoose.model<Author>("Author", authorSchema);
