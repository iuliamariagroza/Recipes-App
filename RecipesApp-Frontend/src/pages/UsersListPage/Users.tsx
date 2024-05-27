import UserCard from "../../components/UserCard/UserCard";
import "./users-list.css";
import { User } from "../../models/User";
import NavbarUser from "../../components/Home-User/NavbarUser";
interface Props {
  users: User[];
}
const Users: React.FC<Props> = ({ users }) => {
  return (
    <div className="user-list-page">
      <NavbarUser />
      <div className="user-list-container" data-testid="user-list">
        {users.map((user) => (
          <UserCard user={user} key={user.id} />
        ))}
      </div>
    </div>
  );
};

export default Users;
