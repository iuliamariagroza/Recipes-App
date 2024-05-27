import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Recipe } from "../../models/Recipe";
import "./edit-recipe.css";

interface EditRecipeProps {
  recipes: Recipe[];
  onEditRecipe: (recipe: Recipe) => void;
}

const EditRecipe: React.FC<EditRecipeProps> = ({ recipes, onEditRecipe }) => {
  const [errors, setErrors] = useState<string[] | undefined>(undefined);
  const { id } = useParams<{ id?: string }>();

  const currentRecipe = recipes.find((recipe) => recipe.id === id);

  const { register, handleSubmit } = useForm<Partial<Recipe>>({
    defaultValues: currentRecipe,
  });

  const onSubmit = async (data: Partial<Recipe>) => {
    if (currentRecipe) {
      const updatedRecipe = { ...currentRecipe, ...data };
      try {
        await onEditRecipe(updatedRecipe);
        history.back();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (Array.isArray(error.response?.data)) {
            setErrors(error.response?.data);
          }
        }
      }
    }
  };

  return (
    <div>
      <h2 className="edit-title">Edit details</h2>
      <form
        className="form"
        onSubmit={handleSubmit(onSubmit)}
        data-testid="edit-recipe-form"
      >
        <label className="add-label" htmlFor="title">
          Title:
        </label>
        <input
          className="input-text"
          id="title"
          type="string"
          {...register("title")}
          placeholder="Title"
        />
        <label className="add-label" htmlFor="image">
          Image:
        </label>
        <input
          className="input-text"
          id="image"
          type="string"
          {...register("image")}
          placeholder="Image"
        />
        <label className="add-label" htmlFor="description">
          Description:
        </label>
        <input
          className="input-text"
          id="description"
          type="text"
          {...register("description")}
          placeholder="Description"
        />
        {errors && errors.map((e) => <p style={{ color: "red" }}>{e}</p>)}
        <button
          className="save-b"
          type="submit"
          data-testid="save-recipe-button"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditRecipe;
