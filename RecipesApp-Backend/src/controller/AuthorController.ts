import { Request, Response } from "express";
import { validateAuthor } from "../Validations/AuthorValidator";
import { NotFoundException } from "../exceptions/NotFoundException";
import { Author, AuthorModel } from "../models/author";
import { authorService } from "../service/AuthorService";

class AuthorController {
  getAuthors = async (req: Request, res: Response) => {
    try {
      const authors = await authorService.getAuthors();
      res.status(200).send(authors);
    } catch (e) {
      if (e instanceof NotFoundException) {
        res.status(404).send(e.message);
      } else {
        console.log(e);
        res.status(500).send("Internal server error");
      }
    }
  };

  getAuthorById = async (req: Request, res: Response) => {
    try {
      const author = await authorService.getAuthorById(req.params.id);
      res.status(200).send(author);
    } catch (e) {
      if (e instanceof NotFoundException) {
        res.status(404).send(e.message);
      } else {
        console.log(e);
        res.status(500).send("Internal server error");
      }
    }
  };

  getAllRecipes = async (req: Request, res: Response) => {
    const foundAuthor = await AuthorModel.findById({
      id: req.params.id,
    }).populate("recipes");
    res.send(foundAuthor);
  };

  addAuthor = async (req: Request, res: Response) => {
    const validationErrors: string[] = validateAuthor(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).send(validationErrors);
    }
    const data: Author = {
      name: req.body.name,
      id: undefined,
    };

    const author = await authorService.addAuthor(data);

    res.send(author);
  };

  updateAuthor = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const author: any = await AuthorModel.findById(id);
      const { name } = req.body;
      author.name = name;
      await author.save();
      res.status(200).send(author);
    } catch (e) {
      if (e instanceof NotFoundException) {
        res.status(404).send(e.message);
      } else {
        console.log(e);
        res.status(500).send("Internal server error");
      }
    }
  };

  deleteAuthor = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const author = await AuthorModel.findById(id);
      await author?.deleteOne();
      res.status(200).send();
    } catch (e) {
      if (e instanceof NotFoundException) {
        res.status(404).send(e.message);
      } else {
        console.log(e);
        res.status(500).send("Internal server error");
      }
    }
  };
}

export const authorController = new AuthorController();
