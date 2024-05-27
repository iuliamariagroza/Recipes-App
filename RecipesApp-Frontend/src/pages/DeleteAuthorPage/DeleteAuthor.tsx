import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./delete-author.css";

interface DeleteAuthorProps {
  onDeleteAuthor: (id: string) => void;
}

const DeleteAuthor: React.FC<DeleteAuthorProps> = ({ onDeleteAuthor }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();

  const handleDelete = () => {
    if (id) {
      onDeleteAuthor(id);
      navigate("/authors");
    }
  };

  return (
    <div>
      <div className="delete-text">
        <h2 className="delete-title">Delete Author</h2>
        <p className="delete-paragraph">
          Are you sure you want to delete this author?
        </p>
      </div>
      <div>
        <button className="delete-bttn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAuthor;
