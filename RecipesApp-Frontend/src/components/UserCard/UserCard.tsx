import { useNavigate } from "react-router-dom";
import "./user-card.css";
import { User } from "../../models/User";

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const navigate = useNavigate();

  const handleEditUserClick = () => {
    navigate(`/edituser/${user.id}`);
  };
  const handleDeleteUserClick = () => {
    navigate(`/deleteuser/${user.id}`);
  };
  return (
    <div className="user-card" data-user-id={user.id} data-testid="user-card">
      <div className="user-card-info">
        <p className="user-name">{user.username}</p>
        <p className="user-role">{user.role}</p>
        <button
          data-testid="edit-user-b"
          className="edit-author-bttn"
          onClick={handleEditUserClick}
        >
          EDIT USER
        </button>
        <button
          data-testid="delete-user-b"
          className="delete-button"
          onClick={handleDeleteUserClick}
        >
          DELETE USER
        </button>
      </div>
    </div>
  );
};

export default UserCard;
