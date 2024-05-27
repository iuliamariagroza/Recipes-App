import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import { jwtDecode } from "jwt-decode";

type Props = {
  handleRecipesFilterByTitle: (title: string) => void;
};

const Navbar: React.FC<Props> = ({ handleRecipesFilterByTitle }) => {
  const navigate = useNavigate();
  let role = (jwtDecode(localStorage.getItem("token") ?? "") as any)["role"];

  const handleAddRecipeClick = () => {
    navigate("/add-recipe");
  };

  // const getRemainingTime = () => {
  //   const expirationTime = parseInt(
  //     localStorage.getItem("expirationTime") ?? "0"
  //   );
  //   const currentTime = Date.now();
  //   const timeDifference = expirationTime - currentTime;
  //   const remainingSeconds = Math.max(0, Math.floor(timeDifference / 1000));
  //   return remainingSeconds;
  // };

  const onTitleFieldChange = (e: React.FormEvent<HTMLInputElement>) => {
    const text = e.currentTarget.value;
    handleRecipesFilterByTitle(text);
  };

  const navigateToStatistics = () => {
    navigate("/chart");
  };

  const navigateToAuthors = () => {
    navigate("/authors");
  };

  const navigateToUsers = () => {
    navigate("/users");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="navbar">
      {(role === "admin" || role === "manager") && (
        <button
          data-testid="add-recipe-b"
          className="add-button"
          onClick={handleAddRecipeClick}
        >
          Add a recipe
        </button>
      )}
      <Typography>
        You are logged in as {localStorage.getItem("username")}
      </Typography>
      {/* <Typography>
        Your session will expire in: {getRemainingTime()} seconds
      </Typography> */}
      <button className="logout-bttn" onClick={handleLogoutClick}>
        Log out
      </button>
      <div className="navbar-actions">
        {role === "admin" && (
          <List data-testid="users-button">
            <ListItem key={"Users"}>
              <ListItemButton
                onClick={navigateToUsers}
                sx={{ textAlign: "center" }}
              >
                <ListItemText primary={"Users"}></ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        )}
        <List>
          <ListItem key={"Authors"}>
            <ListItemButton
              onClick={navigateToAuthors}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={"Authors"}></ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
        <List>
          <ListItem key={"Statistics"}>
            <ListItemButton
              onClick={navigateToStatistics}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={"Statistics"} />
            </ListItemButton>
          </ListItem>
        </List>
        <input
          className="input-text"
          id="search-title"
          type="string"
          placeholder="Search by title"
          onChange={onTitleFieldChange}
        />
      </div>
    </div>
  );
};

export default Navbar;
