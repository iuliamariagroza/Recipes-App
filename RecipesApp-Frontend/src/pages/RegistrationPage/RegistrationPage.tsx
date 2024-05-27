import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { userService } from "../../Service/UserService";
import { User } from "../../models/User";
import "./registration-page.css";

const RegistrationPage = () => {
  const [errors, setErrors] = useState<string[] | undefined>(undefined);
  const { reset, handleSubmit, register } = useForm<User>();

  const navigate = useNavigate();

  const onSubmit = async (data: User) => {
    data.id = uuidv4();
    try {
      const response = await userService.registerUser(data);
      if (typeof response === "string") {
        setErrors([response]);
      } else {
        reset();
        navigate("/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (Array.isArray(error.response?.data)) {
          setErrors(error.response?.data);
        }
      }
    }
  };

  return (
    <div className="container">
      <div className="registration-form" data-testid="registration-form">
        <h2 className="registration-title" data-testid="registration-title">
          Registration page
        </h2>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <label className="username-label" htmlFor="username">
            Username:
          </label>
          <input
            className="input-text"
            id="username"
            data-testid="registration-username"
            type="string"
            {...register("username")}
            placeholder="Username"
          />
          <label className="password-label" htmlFor="password">
            Password:
          </label>
          <input
            className="input-text"
            id="password"
            data-testid="registration-password"
            type="password"
            {...register("password")}
            placeholder="Password"
          />
          <label
            className="confirmationPassword-label"
            htmlFor="confirmationPassword"
          >
            Confirmation Password:
          </label>
          <input
            className="input-text"
            id="confirmationPassword"
            data-testid="registration-confirmationPassword"
            type="password"
            {...register("confirmationPassword")}
            placeholder="Confirmation Password"
          />
          <label className="password-label" htmlFor="role">
            Role:
          </label>
          <select
            className="input-text"
            id="role"
            {...register("role")}
            data-testid="registration-role"
          >
            <option value="user">User</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
          {errors &&
            errors.map((e) => (
              <p data-testid={`error-${e}`} style={{ color: "red" }}>
                {e}
              </p>
            ))}
          <button data-testid="register-b" className="register-b" type="submit">
            Register
          </button>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default RegistrationPage;
