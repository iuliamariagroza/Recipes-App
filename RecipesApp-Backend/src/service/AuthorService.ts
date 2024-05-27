import { v4 } from "uuid";
import { Author } from "../models/author";
import { authorRepository } from "../repository/AuthorRepository";

class AuthorService {
  async getAuthors(): Promise<Author[]> {
    return authorRepository.getAuthors();
  }

  async getAuthorById(id: string | undefined): Promise<Author | undefined> {
    if (id === undefined) {
      return Promise.resolve(undefined);
    }
    return authorRepository.getAuthorById(id);
  }

  async addAuthor(author: Author): Promise<Author> {
    if (!author.id) {
      author.id = v4();
    }
    return authorRepository.addAuthor(author);
  }
}

export const authorService = new AuthorService();
