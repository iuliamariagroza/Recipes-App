import axios, { AxiosResponse } from "axios";
import { Author } from "../models/Author";
import api, { baseURL } from "./api";

class AuthorService {
  fetchAuthors = async (): Promise<Author[] | null | undefined> => {
    try {
      const response: AxiosResponse = await api.get(baseURL + "/authors");
      const responseData: Author[] = response.data;
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

  addData = async (author: Author) => {
    try {
      const response: AxiosResponse = await api.post(
        baseURL + "/authors",
        author
      );
      const responseData: Author = response.data;
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
        baseURL + "/authors/" + id
      );
      const responseData: Author = response.data;
      return responseData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error);
      } else {
        console.error("Error fetching data", error);
      }
    }
  };

  updateData = async (author: Author) => {
    try {
      const response: AxiosResponse = await api.put(
        baseURL + "/authors/" + author.id,
        author
      );
      const responseData: Author = response.data;
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

  getByIdData = async (id: string) => {
    try {
      const response: AxiosResponse = await api.get(baseURL + "/authors/" + id);
      const responseData: Author = response.data;
      return responseData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.message);
      } else {
        console.error("Error fetching data", error);
      }
    }
  };
}

export const authorService = new AuthorService();
