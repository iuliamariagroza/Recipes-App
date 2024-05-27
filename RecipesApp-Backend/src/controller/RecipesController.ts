import { Request, Response } from "express";
import mongoose from "mongoose";
import { validateRecipe } from "../Validations/RecipeValidator";
import { NotFoundException } from "../exceptions/NotFoundException";
import { AuthorModel } from "../models/author";
import { Recipe, RecipeModel } from "../models/recipe";
import { authorService } from "../service/AuthorService";
import { recipesService } from "../service/RecipesService";

class RecipesController {
  getRecipes = async (req: Request, res: Response) => {
    try {
      const recipes = await recipesService.getRecipes();
      res.status(200).send(recipes);
    } catch (e) {
      if (e instanceof NotFoundException) {
        res.status(404).send(e.message);
      } else {
        console.log(e);
        res.status(500).send("Internal server error");
      }
    }
  };

  addRecipe = async (req: Request, res: Response) => {
    const validationErrors: string[] = validateRecipe(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).send(validationErrors);
    }
    try {
      let author: any = await AuthorModel.findOne({ name: req.body.author });
      if (!author) {
        author = await AuthorModel.create({
          name: req.body.author,
        });
      }
      const data: Recipe = {
        image: req.body.image,
        author: author._id,
        description: req.body.description,
        title: req.body.title,
        id: undefined,
      };
      const recipe = await recipesService.addRecipe(data);
      author.recipes.push(recipe.id);
      await author.save();
      res.send(recipe);
    } catch (error) {
      console.log(error);
      res.status(404).send({ message: error });
    }
  };

  getRecipeById = async (req: Request, res: Response) => {
    try {
      const recipe = await recipesService.getRecipeById(req.params.id);
      console.log(recipe.id);
      res.status(200).send(recipe);
    } catch (e) {
      if (e instanceof NotFoundException) {
        res.status(404).send(e.message);
      } else {
        console.log(e);
        res.status(500).send("Internal server error");
      }
    }
  };

  updateRecipe = async (req: Request, res: Response) => {
    try {
      const validationErrors: string[] = validateRecipe(req.body);
      if (validationErrors.length > 0) {
        return res.status(400).send(validationErrors);
      }
      const data: Recipe = {
        image: req.body.image,
        author: req.body.author.id,
        description: req.body.description,
        title: req.body.title,
        id: req.params.id,
      };
      const id = req.params.id;
      const updateRecipe = await RecipeModel.findByIdAndUpdate(id, data);
      res.status(200).send(updateRecipe);
    } catch (e) {
      if (e instanceof NotFoundException) {
        res.status(404).send(e.message);
      } else {
        console.log(e);
        res.status(500).send("Internal server error");
      }
    }
  };

  deleteRecipe = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const recipe = await recipesService.getRecipeById(id);
      const author: any = await authorService.getAuthorById(recipe.author);
      if (author) {
        author.recipes = author.recipes.filter(
          (recipeId: mongoose.Types.ObjectId) => recipeId.toString() !== id
        );
        await author.save();
      }
      await recipesService.deleteRecipe(id);
      res.status(200).send(author);
    } catch (e) {
      if (e instanceof NotFoundException) {
        res.status(404).send(e.message);
      } else {
        console.log(e);
        res.status(500).send("Internal server error");
      }
    }
  };

  clearRecipes = async (req: Request, res: Response) => {
    try {
      await RecipeModel.deleteMany({});
      res.status(200).send("Recipes cleared successfully");
    } catch (error) {
      console.error("Error clearing recipes:", error);
      res.status(500).send("Internal server error");
    }
  };
}

export const recipesController = new RecipesController();
