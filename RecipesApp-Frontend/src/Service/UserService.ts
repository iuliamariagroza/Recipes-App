import axios, { AxiosResponse } from "axios";
import { User } from "../models/User";
import api, { baseURL } from "./api";

class UserService {
  registerUser = async (user: User) => {
    try {
      const response: AxiosResponse = await axios.post(
        baseURL + "/users/register",
        user
      );
      const responseData: User = response.data;
      return responseData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error);
      } else {
        console.error("Error registering user", error);
      }
      throw error;
    }
  };

  loginUser = async (username: string, password: string) => {
    try {
      const response: AxiosResponse = await axios.post(
        baseURL + "/users/login",
        { username, password }
      );

      const { token } = response.data;
      return token;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error);
      } else {
        console.error("Error trying to login user", error);
      }
      throw error;
    }
  };

  getUsers = async (): Promise<User[] | null> => {
    try {
      const response: AxiosResponse = await api.get(baseURL + "/users/");
      const responseData: User[] = response.data;
      return responseData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.message);
        if (error.message == "Network error") {
          return null;
        }
      } else {
        console.error("Error fetching data", error);
      }
      throw error;
    }
  };

  updateUser = async (user: User) => {
    try {
      const response: AxiosResponse = await api.put(
        baseURL + "/users/" + user.id,
        user
      );
      const responseData: User = response.data;
      return responseData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error);
      } else {
        console.error("Error fetching data", error);
      }
      throw error;
    }
  };

  deleteData = async (id: string) => {
    try {
      const response: AxiosResponse = await api.delete(
        baseURL + "/users/" + id
      );
      const responseData: User = response.data;
      return responseData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error);
      } else {
        console.error("Error fetching data", error);
      }
    }
  };
}

export const userService = new UserService();
