import { v4 } from "uuid";
import { Recipe } from "../models/recipe";
import { recipesRepository } from "../repository/RecipesRepository";

class RecipesService {
  async getRecipes(): Promise<Recipe[]> {
    return recipesRepository.getRecipes();
  }

  async getRecipeById(id: string): Promise<Recipe> {
    return recipesRepository.getRecipeById(id);
  }

  async addRecipe(recipe: Recipe): Promise<Recipe> {
    if (!recipe.id) {
      recipe.id = v4();
    }
    return recipesRepository.addRecipe(recipe);
  }

  async deleteRecipe(id: string): Promise<Recipe> {
    return recipesRepository.deleteRecipe(id);
  }

  async clearRecipes(): Promise<void> {
    return recipesRepository.clearRecipes();
  }
}

export const recipesService = new RecipesService();
