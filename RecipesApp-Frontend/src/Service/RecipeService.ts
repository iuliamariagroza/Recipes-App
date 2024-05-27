import axios, { AxiosResponse } from "axios";
import { Recipe } from "../models/Recipe";
import api, { baseURL } from "./api";

class RecipeService {
  fetchRecipes = async (): Promise<Recipe[] | null | undefined> => {
    try {
      const response: AxiosResponse = await api.get(baseURL + "/recipes");
      const responseData: Recipe[] = response.data;
      return responseData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.message);
        if (error.message == "Network error") {
          return null;
        }
      } else {
        console.error("Error fetching data", error);
      }
      throw error;
    }
  };

  addData = async (recipe: Recipe) => {
    try {
      const response: AxiosResponse = await api.post(
        baseURL + "/recipes",
        recipe
      );
      const responseData: Recipe = response.data;
      return responseData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error);
      } else {
        console.error("Error fetching data", error);
      }
      throw error;
    }
  };

  deleteData = async (id: string) => {
    try {
      const response: AxiosResponse = await api.delete(
        baseURL + "/recipes/" + id
      );
      const responseData: Recipe = response.data;
      return responseData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error);
      } else {
        console.error("Error fetching data", error);
      }
    }
  };

  updateData = async (recipe: Recipe) => {
    try {
      const response: AxiosResponse = await api.put(
        baseURL + "/recipes/" + recipe.id,
        recipe
      );
      const responseData: Recipe = response.data;
      return responseData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error);
      } else {
        console.error("Error fetching data", error);
      }
      throw error;
    }
  };

  getByIdData = async (id: string) => {
    try {
      const response: AxiosResponse = await api.get(baseURL + "/recipes/" + id);
      const responseData: Recipe = response.data;
      return responseData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.message);
      } else {
        console.error("Error fetching data", error);
      }
    }
  };
}

export const recipeService = new RecipeService();
