import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./delete-user.css";

interface DeleteUserProps {
  onDeleteUser: (id: string) => void;
}

const DeleteUser: React.FC<DeleteUserProps> = ({ onDeleteUser }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();

  const handleDelete = () => {
    if (id) {
      onDeleteUser(id);
      navigate("/users/");
    }
  };

  return (
    <div>
      <div className="delete-text">
        <h2 data-testid="delete-user-title" className="delete-title">
          Delete User
        </h2>
        <p className="delete-paragraph">
          Are you sure you want to delete this user?
        </p>
      </div>
      <div>
        <button
          data-testid="delete-user-button"
          className="delete-bttn"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteUser;
