import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { recipeService } from "../../Service/RecipeService";
import { Recipe } from "../../models/Recipe";
import "./Details.css";
import { jwtDecode } from "jwt-decode";

interface Props {
  recipes: Recipe[];
}

const Details: React.FC<Props> = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [recipe, setRecipe] = useState<Recipe | undefined>(undefined);
  let role = (jwtDecode(localStorage.getItem("token") ?? "") as any)["role"];

  useEffect(() => {
    async function getRecipe(id: string) {
      const foundRecipe = await recipeService.getByIdData(id);
      if (foundRecipe !== undefined) {
        setRecipe(foundRecipe);
      }
    }
    if (params.id) getRecipe(params.id);
    console.log(role);
  }, []);

  const handleEditButton = () => {
    navigate(`/edit/${recipe?.id}`);
  };

  return (
    <div className="details-container">
      <div className="details-title-image">
        <h2 className="detail-title">{recipe?.title}</h2>
        <img className="detail-image" src={recipe?.image} alt="unavailable" />
      </div>
      <div className="detail-recipe-author">
        <p className="detail-author">Author: {recipe?.author?.name}</p>
        <p className="detail-description">Recipe: {recipe?.description}</p>
      </div>
      {(role === "admin" || role === "manager") && (
        <div className="edit">
          <button
            data-testid="edit-recipe-b"
            className="edit-button"
            onClick={handleEditButton}
          >
            Edit details
          </button>
        </div>
      )}
    </div>
  );
};

export default Details;
