import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Author } from "../../models/Author";
import "./add-author.css";

interface AddAuthorProps {
  onAuthorRecipe: (author: Author) => void;
}

const AddAuthor: React.FC<AddAuthorProps> = ({ onAuthorRecipe }) => {
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm<Author>();

  const onSubmit = (data: Author) => {
    data.id = uuidv4();
    const oldAuthor: Author = { ...data };
    onAuthorRecipe(oldAuthor);
    reset();
    navigate("/authors");
  };

  return (
    <div>
      <h2 className="add-title">Add an author</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label className="add-label" htmlFor="name">
          Name:
        </label>
        <input
          className="input-text"
          id="name"
          type="string"
          {...register("name")}
          placeholder="Name"
        />
        <button className="add-b" type="submit">
          Add author
        </button>
      </form>
    </div>
  );
};

export default AddAuthor;
