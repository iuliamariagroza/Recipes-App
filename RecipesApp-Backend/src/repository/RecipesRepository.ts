import { faker } from "@faker-js/faker";
import { NotFoundException } from "../exceptions/NotFoundException";
import { AuthorModel } from "../models/author";
import { Recipe, RecipeModel } from "../models/recipe";

class RecipesRepository {
  async createRecipe(): Promise<Recipe> {
    try {
      const authors = await AuthorModel.find();

      if (authors.length === 0) {
        throw new Error("No authors found in the database");
      }

      const randomAuthor = authors[Math.floor(Math.random() * authors.length)];

      const newRecipeData: Recipe = {
        id: faker.string.uuid(),
        title: faker.lorem.words(),
        image: faker.image.urlLoremFlickr({ category: "food" }),
        description: faker.lorem.paragraph(),
        author: randomAuthor.id as string,
      };

      const newRecipe = new RecipeModel(newRecipeData);
      const savedRecipe = await newRecipe.save();
      return savedRecipe;
    } catch (error) {
      console.error("Error creating recipe:", error);
      throw error;
    }
  }

  async getRecipes(): Promise<Recipe[]> {
    const recipes = await RecipeModel.find({}).populate("author");
    return recipes;
  }

  async getRecipeById(id: string): Promise<Recipe> {
    try {
      const recipe = await RecipeModel.findById(id).populate("author");
      if (!recipe) {
        throw new NotFoundException(`Recipe with ID ${id} not found`);
      }
      return recipe;
    } catch (error) {
      console.log("Error getting recipe by id: ", error);
      throw error;
    }
  }

  async addRecipe(recipeData: Recipe): Promise<Recipe> {
    const recipe = new RecipeModel(recipeData);
    const savedRecipe = await recipe.save();
    return savedRecipe;
  }

  async deleteRecipe(id: string): Promise<Recipe> {
    const deletedRecipe = await RecipeModel.findById(id);
    if (!deletedRecipe) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    } else {
      await deletedRecipe.deleteOne();
      return deletedRecipe;
    }
  }

  async clearRecipes(): Promise<void> {
    try {
      await RecipeModel.deleteMany({});
    } catch (error) {
      console.error("Error cleaning recipes:", error);
      throw error;
    }
  }
}

export const recipesRepository = new RecipesRepository();
