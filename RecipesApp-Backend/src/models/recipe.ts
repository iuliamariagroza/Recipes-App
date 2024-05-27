import mongoose from "mongoose";
export interface Recipe {
  id: string | undefined;
  title: string;
  image: string;
  description: string;
  author: string;
}

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
});

recipeSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const RecipeModel = mongoose.model<Recipe>("Recipe", recipeSchema);
