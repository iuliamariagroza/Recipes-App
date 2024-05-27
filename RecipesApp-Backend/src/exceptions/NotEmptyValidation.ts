import { Recipe } from "../models/recipe";

export class NotEmptyValidation extends Error {
  recipe: Recipe;
  constructor(recipe: Recipe, fieldName: string) {
    super("The " + fieldName + "cannot be empty");
    this.recipe = recipe;
  }
}
