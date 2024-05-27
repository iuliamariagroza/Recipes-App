import { useNavigate } from "react-router-dom";
import "./navbaruser.css";

const NavbarUser = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/all");
  };

  return (
    <div className="navbar-author">
      <button className="back-button" onClick={handleBackClick}>
        Back To Main Page
      </button>
    </div>
  );
};

export default NavbarUser;
