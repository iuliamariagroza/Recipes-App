import { Pagination, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import Navbar from "../../components/Home/Navbar";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { Recipe } from "../../models/Recipe";
import "./recipes-section.css";

const numberOfItemsPerPage = 3;

interface Props {
  recipes: Recipe[];
  handleRecipesFilterByTitle: (title: string) => void;
  fetchRecipes: () => void;
}

const Recipes: React.FC<Props> = ({
  recipes,
  handleRecipesFilterByTitle,
  fetchRecipes,
}) => {
  const [page, setPage] = useState<number>(1);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const numberOfPages = () => {
    if (recipes.length % numberOfItemsPerPage == 0) {
      return recipes.length / numberOfItemsPerPage;
    }
    return ~~(recipes.length / numberOfItemsPerPage) + 1;
  };

  const recipesToShow = (): Recipe[] => {
    const leftIndex = (page - 1) * numberOfItemsPerPage;
    const rightIndex = Math.min(
      recipes.length,
      leftIndex + numberOfItemsPerPage
    );
    return recipes.slice(leftIndex, rightIndex);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="recipe-page">
      <Navbar handleRecipesFilterByTitle={handleRecipesFilterByTitle} />
      <div className="recipe-container">
        {recipesToShow().map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe.id} />
        ))}
      </div>
      <Stack alignItems="center">
        <Pagination
          className="recipes-pagination"
          onChange={handlePageChange}
          count={numberOfPages()}
          variant="outlined"
        />
      </Stack>
    </div>
  );
};

export default Recipes;
