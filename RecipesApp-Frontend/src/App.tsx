import Snackbar from "@mui/material/Snackbar";
import { useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import io from "socket.io-client";
import "./App.css";
import { authorService } from "./Service/AuthorService";
import { recipeService } from "./Service/RecipeService";
import { Author } from "./models/Author";
import { Recipe } from "./models/Recipe";
import AddAuthor from "./pages/AddAuthorPage/AddAuthor";
import AddRecipe from "./pages/AddRecipePage/AddRecipe";
import Authors from "./pages/AuthorListPage/Authors";
import Chart from "./pages/Chart/Chart";
import DeleteAuthor from "./pages/DeleteAuthorPage/DeleteAuthor";
import DeleteRecipe from "./pages/DeleteRecipePage/DeleteRecipe";
import EditAuthor from "./pages/EditAuthorPage/EditAuthor";
import EditRecipe from "./pages/EditRecipePage/EditRecipe";
import LoginPage from "./pages/LoginPage/LoginPage";
import Details from "./pages/RecipesDetails/Details";
import Recipes from "./pages/RecipesPage/Recipes";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import axios from "axios";
import { User } from "./models/User";
import Users from "./pages/UsersListPage/Users";
import { userService } from "./Service/UserService";
import EditUser from "./pages/EditUserPage/EditUser";
import DeleteUser from "./pages/DeleteUserPage/DeleteUser";

const socket = io(
  "http://ec2-13-51-254-7.eu-north-1.compute.amazonaws.com/:80",
  { transports: ["websocket"] }
);

function loadFromLocalStorage(key: string) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

function storeOffline(type: string, data: unknown) {
  const offlineData = loadFromLocalStorage("offlineData") || [];
  offlineData.push({ type, data });
  localStorage.setItem("offlineData", JSON.stringify(offlineData));
}

const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteringText, setFilteringText] = useState<string>("");
  const [networkError, setIsNetworkError] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [hasNetwork, setHasNetwork] = useState<boolean>(true);
  const [authors, setAuthors] = useState<Author[]>([]);
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const token = localStorage.getItem("token");

  const syncOfflineData = async () => {
    const offlineData = loadFromLocalStorage("offlineData");
    console.log("offline recipes: ", offlineData);
    if (offlineData) {
      for (const { type, data } of offlineData) {
        try {
          if (type === "addRecipe") {
            await recipeService.addData(data);
          } else if (type === "updateRecipe") {
            await recipeService.updateData(data);
          } else if (type === "addAuthor") {
            await authorService.addData(data);
          } else if (type === "updateAuthor") {
            await authorService.updateData(data);
          }
        } catch (error) {
          console.error("Sync error: ", error);
        }
      }
      localStorage.clear();
    }
  };

  async function fetchRecipes() {
    try {
      const recipes = await recipeService.fetchRecipes();
      if (recipes == null) {
        setIsNetworkError(true);
        const localRecipes = loadFromLocalStorage("recipes");
        if (localRecipes) {
          setRecipes(localRecipes);
        }
      } else {
        setIsNetworkError(false);
        localStorage.setItem("recipes", JSON.stringify(recipes));
        setRecipes(recipes ?? []);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        if (error.response?.status == 401) {
          navigate("/login");
        }
      }
    }
  }

  useEffect(() => {
    if (token) fetchRecipes();
  }, []);

  useEffect(() => {
    async function fetchUsers() {
      const users = await userService.getUsers();
      if (users == null) {
        setIsNetworkError(true);
      } else if (users !== undefined) {
        setIsNetworkError(false);
        setUsers(users);
      }
    }
    if (token) fetchUsers();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const authors = await authorService.fetchAuthors();
        if (authors == null) {
          setIsNetworkError(true);
          const localAuthors = loadFromLocalStorage("authors");
          if (localAuthors) {
            setAuthors(localAuthors);
          }
        } else {
          setIsNetworkError(false);
          localStorage.setItem("authors", JSON.stringify(authors));
          setAuthors(authors ?? []);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status == 401) {
            navigate("/login");
          }
        }
      }
    }

    if (token) fetchData();
  }, []);

  useEffect(() => {
    socket.on("received_recipes", (data: object) => {
      console.log("Socket: ");
      console.log(data);
      setRecipes(data as Recipe[]);
    });
  }, []);

  const handleAddRecipe = async (newRecipe: Recipe) => {
    if (hasNetwork) {
      try {
        const addedRecipe = await recipeService.addData(newRecipe);
        if (addedRecipe) {
          setRecipes([...recipes, newRecipe]);
        }
      } catch (error) {
        console.error("Error adding recipe:", error);
        storeOffline("addRecipe", newRecipe);
        throw error;
      }
    } else {
      console.log("offline");
      setRecipes([...recipes, newRecipe]);
      storeOffline("addRecipe", newRecipe);
    }
  };

  const handleAddAuthor = async (newAuthor: Author) => {
    if (hasNetwork) {
      try {
        const addedAuthor = await authorService.addData(newAuthor);
        if (addedAuthor) {
          setAuthors([...authors, newAuthor]);
        }
      } catch (error) {
        console.error("Error adding author:", error);
        storeOffline("addAuthor", newAuthor);
        throw error;
      }
    } else {
      setAuthors([...authors, newAuthor]);
      storeOffline("addAuthor", newAuthor);
    }
  };

  const handleEditAuthor = async (updatedAuthor: Author) => {
    if (hasNetwork) {
      try {
        const updateAuthor = await authorService.updateData(updatedAuthor);
        const index = authors.findIndex(
          (author) => author.id === updatedAuthor.id
        );
        if (index !== -1 && updateAuthor !== undefined) {
          const updateAuthors = [...authors];
          updateAuthors[index] = updateAuthor;
          setAuthors(updateAuthors);
        }
      } catch (error) {
        console.error("Error updating author: ", error);
        storeOffline("updateAuthor", updatedAuthor);
        throw error;
      }
    } else {
      const index = authors.findIndex(
        (author) => author.id === updatedAuthor.id
      );
      if (index !== -1) {
        const updatedAuthors = [...authors];
        updatedAuthors[index] = updatedAuthor;
        setAuthors(updatedAuthors);
        storeOffline("updateAuthor", updatedAuthor);
      }
    }
  };

  const handleEditUser = async (updatedUser: User) => {
    try {
      const updateUser = await userService.updateUser(updatedUser);
      const index = users.findIndex((user) => user.id === updatedUser.id);
      if (index !== -1 && updateUser !== undefined) {
        const updateUsers = [...users];
        updateUsers[index] = updateUser;
        setUsers(updateUsers);
      }
    } catch (error) {
      console.error("Error updating author: ", error);
      throw error;
    }
  };

  const handleDeleteRecipe = async (id: string) => {
    await recipeService.deleteData(id);
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
    setRecipes(updatedRecipes);
  };

  const handleDeleteAuthor = async (id: string) => {
    await authorService.deleteData(id);
    const updatedAuthors = authors.filter((author) => author.id !== id);
    setAuthors(updatedAuthors);
  };

  const handleDeleteUser = async (id: string) => {
    await userService.deleteData(id);
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  const handleEditRecipe = async (updatedRecipe: Recipe) => {
    if (hasNetwork) {
      try {
        const updateRecipe = await recipeService.updateData(updatedRecipe);
        const index = recipes.findIndex(
          (recipe) => recipe.id === updatedRecipe.id
        );
        if (index !== -1 && updateRecipe !== undefined) {
          const updatedRecipes = [...recipes];
          updatedRecipes[index] = updateRecipe;
          setRecipes(updatedRecipes);
        }
      } catch (error) {
        console.error("Error adding recipe:", error);
        storeOffline("updateRecipe", updatedRecipe);
        throw error;
      }
    } else {
      const updatedRecipes = recipes.map((r) =>
        r.id === updatedRecipe.id ? updatedRecipe : r
      );
      setRecipes(updatedRecipes);
      storeOffline("updateRecipe", updatedRecipe);
    }
  };

  const handleRecipesFilterByTitle = (title: string) => {
    setFilteringText(title);
  };

  useEffect(() => {
    window.addEventListener("online", () => {
      setHasNetwork(true);
      setOpen(true);
      console.log("Online");
      syncOfflineData();
    });
    window.addEventListener("offline", () => {
      setHasNetwork(false);
      setOpen(true);
      console.log("offline");
    });
  }, []);

  if (networkError) return <div>Server is down</div>;

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={() => {
          setOpen(false);
        }}
        message={hasNetwork ? "Became online" : "Became offline"}
      />
      <Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route
          path="/all"
          element={
            <Recipes
              recipes={recipes.filter((e) =>
                e.title.toLowerCase().includes(filteringText.toLowerCase())
              )}
              handleRecipesFilterByTitle={handleRecipesFilterByTitle}
              fetchRecipes={fetchRecipes}
            />
          }
        />
        <Route path="/details/:id" element={<Details recipes={recipes} />} />
        <Route
          path="/add-recipe"
          element={<AddRecipe onAddRecipe={handleAddRecipe} />}
        ></Route>
        <Route
          path="/delete/:id"
          element={<DeleteRecipe onDeleteRecipe={handleDeleteRecipe} />}
        />
        <Route
          path="/edit/:id"
          element={
            <EditRecipe recipes={recipes} onEditRecipe={handleEditRecipe} />
          }
        />
        <Route path="/chart" element={<Chart recipes={recipes} />} />
        <Route path="/authors" element={<Authors authors={authors} />} />
        <Route
          path="/add-author"
          element={<AddAuthor onAuthorRecipe={handleAddAuthor} />}
        ></Route>
        <Route
          path="/editauthor/:id"
          element={
            <EditAuthor authors={authors} onEditAuthor={handleEditAuthor} />
          }
        />
        <Route
          path="/deleteauthor/:id"
          element={<DeleteAuthor onDeleteAuthor={handleDeleteAuthor} />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/users" element={<Users users={users} />} />
        <Route
          path="/edituser/:id"
          element={<EditUser users={users} onEditUser={handleEditUser} />}
        />
        <Route
          path="/deleteuser/:id"
          element={<DeleteUser onDeleteUser={handleDeleteUser} />}
        />
      </Routes>
    </div>
  );
};
export default App;
