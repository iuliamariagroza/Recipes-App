import express from "express";
import { recipesController } from "../controller/RecipesController";
import { verifyToken, verifyTokenForManager } from "../utils/middleware";

export const recipesRouter = express.Router();

//routes for recipes
recipesRouter.get("", verifyToken, recipesController.getRecipes);
recipesRouter.post("", verifyTokenForManager, recipesController.addRecipe);
recipesRouter.get("/:id", verifyToken, recipesController.getRecipeById);
recipesRouter.put(
  "/:id",
  verifyTokenForManager,
  recipesController.updateRecipe
);
recipesRouter.delete(
  "/:id",
  verifyTokenForManager,
  recipesController.deleteRecipe
);
