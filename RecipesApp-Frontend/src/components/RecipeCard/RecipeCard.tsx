import { useNavigate } from "react-router-dom";
import { Recipe } from "../../models/Recipe";
import CustomImage from "../CustomImage/CustomImage";
import "./recipe-card.css";
import { jwtDecode } from "jwt-decode";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const navigate = useNavigate();
  const handleViewRecipeClick = () => {
    navigate(`/details/${recipe.id}`);
  };
  let role = (jwtDecode(localStorage.getItem("token") ?? "") as any)["role"];

  const handleDeleteClick = () => {
    navigate(`/delete/${recipe.id}`);
  };

  return (
    <div data-testid="recipe-card" className="recipe-card">
      <CustomImage imgSrc={recipe.image} pt="15%" />
      <div className="recipe-card-info">
        <p className="recipe-title">{recipe.title}</p>
        <button
          data-testid="view-recipe-b"
          className="view-recipe-bttn"
          onClick={handleViewRecipeClick}
        >
          VIEW RECIPE
        </button>
        {(role === "admin" || role === "manager") && (
          <button
            data-testid="delete-recipe-b"
            className="delete-button"
            onClick={handleDeleteClick}
          >
            DELETE RECIPE
          </button>
        )}
      </div>
    </div>
  );
};
export default RecipeCard;
