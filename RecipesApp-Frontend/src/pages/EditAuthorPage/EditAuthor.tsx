import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Author } from "../../models/Author";
import "./edit-author.css";

interface EditAuthorProps {
  authors: Author[];
  onEditAuthor: (author: Author) => void;
}

const EditAuthor: React.FC<EditAuthorProps> = ({ authors, onEditAuthor }) => {
  const { id } = useParams<{ id?: string }>();

  const currentAuthor = authors.find((author) => author.id === id);

  const { register, handleSubmit } = useForm<Partial<Author>>({
    defaultValues: currentAuthor,
  });

  const onSubmit = (data: Partial<Author>) => {
    if (currentAuthor) {
      const updatedAuthor = { ...currentAuthor, ...data };
      onEditAuthor(updatedAuthor);
      history.back();
    }
  };

  return (
    <div>
      <h2 className="edit-title">Edit details</h2>
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
        <button className="save-b" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditAuthor;
