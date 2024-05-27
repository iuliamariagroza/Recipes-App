import { NotFoundException } from "../exceptions/NotFoundException";
import { Author, AuthorModel } from "../models/author";

class AuthorRepository {
  async getAuthors(): Promise<Author[]> {
    const authors = await AuthorModel.find({}).populate("recipes");
    return authors;
  }

  async getAuthorById(id: string): Promise<Author> {
    try {
      const author = await AuthorModel.findById(id);
      if (!author) {
        throw new NotFoundException(`Author with ID ${id} not found`);
      }
      return author;
    } catch (error) {
      console.log("Error getting author by id: ", error);
      throw error;
    }
  }

  async addAuthor(authorData: Author): Promise<Author> {
    const author = new AuthorModel(authorData);
    const savedAuthor = await author.save();
    return savedAuthor;
  }
}

export const authorRepository = new AuthorRepository();
