import { useNavigate } from "react-router-dom";
import "./navbarauthor.css";
import { jwtDecode } from "jwt-decode";

const NavbarAuthor = () => {
  const navigate = useNavigate();
  let role = (jwtDecode(localStorage.getItem("token") ?? "") as any)["role"];

  const handleAddClick = () => {
    navigate("/add-author");
  };

  const handleBackClick = () => {
    navigate("/all");
  };

  return (
    <div className="navbar-author">
      {(role === "admin" || role === "manager") && (
        <button className="add-button" onClick={handleAddClick}>
          Add an author
        </button>
      )}
      <button className="back-button" onClick={handleBackClick}>
        Back To Main Page
      </button>
    </div>
  );
};

export default NavbarAuthor;
