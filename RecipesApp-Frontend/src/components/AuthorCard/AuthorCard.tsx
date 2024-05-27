import { useNavigate } from "react-router-dom";
import { Author } from "../../models/Author";
import "./author-card.css";
import { jwtDecode } from "jwt-decode";

interface AuthorCardProps {
  author: Author;
}

const AuthorCard: React.FC<AuthorCardProps> = ({ author }) => {
  const navigate = useNavigate();
  let role = (jwtDecode(localStorage.getItem("token") ?? "") as any)["role"];

  const handleEditAuthorClick = () => {
    navigate(`/editauthor/${author.id}`);
  };
  const handleDeleteClick = () => {
    navigate(`/deleteauthor/${author.id}`);
  };
  return (
    <div className="author-card">
      <div className="author-card-info">
        <p className="author-name">{author.name}</p>
        {(role === "admin" || role === "manager") && (
          <button className="edit-author-bttn" onClick={handleEditAuthorClick}>
            EDIT AUTHOR
          </button>
        )}
        {(role === "admin" || role === "manager") && (
          <button className="delete-button" onClick={handleDeleteClick}>
            DELETE AUTHOR
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthorCard;
