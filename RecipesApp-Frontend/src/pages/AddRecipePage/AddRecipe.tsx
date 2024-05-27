import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Recipe } from "../../models/Recipe";
import "./add-recipe.css";

interface AddRecipeProps {
  onAddRecipe: (recipe: Recipe) => void;
}

const AddRecipe: React.FC<AddRecipeProps> = ({ onAddRecipe }) => {
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm<Recipe>();
  const [errors, setErrors] = useState<string[] | undefined>(undefined);

  const onSubmit = async (data: Recipe) => {
    data.id = uuidv4();
    const oldRecipe: Recipe = { ...data };
    try {
      await onAddRecipe(oldRecipe);
      reset();
      navigate("/all");
    } catch (error) {
      console.log("Add recipe error: ");
      console.log(error);

      if (axios.isAxiosError(error)) {
        if (Array.isArray(error.response?.data)) {
          setErrors(error.response?.data);
        }
      }
    }
  };

  return (
    <div>
      <h2 className="add-title">Add a recipe</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
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
          type="url"
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
        <label className="add-label" htmlFor="author">
          Author:
        </label>
        <input
          className="input-text"
          id="author"
          type="string"
          {...register("author")}
          placeholder="Author"
        />
        {errors && errors.map((e) => <p style={{ color: "red" }}>{e}</p>)}
        <button className="add-b" type="submit">
          Add recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
