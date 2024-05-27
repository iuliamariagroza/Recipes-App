import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { userService } from "../../Service/UserService";
import { User } from "../../models/User";
import "./login-page.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<string[] | undefined>(undefined);
  const { reset, handleSubmit } = useForm<User>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    try {
      const token = await userService.loginUser(username, password);
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      const expirationTime = Date.now() + 120 * 60 * 1000;
      localStorage.setItem("expirationTime", expirationTime.toString());
      setTimeout(logout, expirationTime - Date.now());
      reset();
      navigate("/all");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (Array.isArray(error.response?.data)) {
          setErrors(error.response?.data);
        }
      }
    }
  };

  const checkTokenValidity = () => {
    const token = localStorage.getItem("token");
    const expirationTime = localStorage.getItem("expirationTime");

    if (token && expirationTime) {
      const currentTime = Date.now();
      console.log("Current time:", currentTime);
      const remainingTime = parseInt(expirationTime, 10) - currentTime;
      console.log("Remaining time:", remainingTime);

      if (remainingTime > 0) {
        console.log(
          "Token is still valid. Session will expire in",
          remainingTime / 1000,
          "seconds."
        );
        setTimeout(logout, remainingTime);
      } else {
        logout();
        console.log("Token has expired. User logged out.");
      }
    }
  };

  useEffect(() => {
    checkTokenValidity();
  }, []);

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="login-form" data-testid="login-form">
        <h2 className="login-title" data-testid="login-title">
          Login page
        </h2>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <label className="username-label" htmlFor="username">
            Username:
          </label>
          <input
            className="input-text"
            id="username"
            data-testid="login-username"
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className="password-label" htmlFor="password">
            Password:
          </label>
          <input
            className="input-text"
            id="password"
            data-testid="login-password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors &&
            errors.map((e) => (
              <p data-testid={`error-${e}`} style={{ color: "red" }}>
                {e}
              </p>
            ))}
          <button
            data-testid="login-b"
            id="login-button"
            className="login-b"
            type="submit"
          >
            Login
          </button>
          <p>
            Don't have an account? <Link to="/">Register here!</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
