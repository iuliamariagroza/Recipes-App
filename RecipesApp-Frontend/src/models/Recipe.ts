import { Author } from "./Author";

export interface Recipe {
  id: string;
  title: string;
  image: string;
  description: string;
  author: Author;
}
