import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import "./edit-user.css";
import { User } from "../../models/User";

interface EditUserProps {
  users: User[];
  onEditUser: (user: User) => void;
}

const EditUser: React.FC<EditUserProps> = ({ users, onEditUser }) => {
  const { id } = useParams<{ id?: string }>();

  const currentUser = users.find((user) => user.id === id);

  const { register, handleSubmit } = useForm<Partial<User>>({
    defaultValues: currentUser,
  });

  const onSubmit = (data: Partial<User>) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...data };
      onEditUser(updatedUser);
      history.back();
    }
  };

  return (
    <div>
      <h2 data-testid="edituser-title" className="edit-title">
        Edit details
      </h2>
      <form
        data-testid="edituser-form"
        className="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="add-label" htmlFor="username">
          Username:
        </label>
        <input
          className="input-text"
          id="username"
          type="string"
          {...register("username")}
          placeholder="Username"
          data-testid="edit-user-username"
        />
        <label className="add-label" htmlFor="password">
          Password:
        </label>
        <input
          className="input-text"
          id="password"
          type="password"
          {...register("password")}
          placeholder="Password"
        />
        <label className="add-label" htmlFor="role">
          Role:
        </label>
        <input
          className="input-text"
          id="role"
          type="string"
          {...register("role")}
          placeholder="Role"
          data-testid="edit-user-role"
        />
        <button data-testid="edit-user-button" className="save-b" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditUser;
