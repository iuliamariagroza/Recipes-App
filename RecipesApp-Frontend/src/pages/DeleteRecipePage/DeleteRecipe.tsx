import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./delete-recipe.css";
interface DeleteRecipeProps {
  onDeleteRecipe: (id: string) => void;
}

const DeleteRecipe: React.FC<DeleteRecipeProps> = ({ onDeleteRecipe }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();

  const handleDelete = () => {
    if (id) {
      onDeleteRecipe(id);
      navigate("/all");
    }
  };

  return (
    <div>
      <div className="delete-text">
        <h2 className="delete-title">Delete Recipe</h2>
        <p className="delete-paragraph">
          Are you sure you want to delete this recipe?
        </p>
      </div>
      <div>
        <button
          className="delete-bttn"
          onClick={handleDelete}
          data-testid="delete-recipe-button"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteRecipe;
