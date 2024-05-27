import express from "express";
import { authorController } from "../controller/AuthorController";
import { verifyToken, verifyTokenForManager } from "../utils/middleware";

export const authorRouter = express.Router();

//routes for authors
authorRouter.get("", verifyToken, authorController.getAuthors);
authorRouter.post("", verifyTokenForManager, authorController.addAuthor);
authorRouter.get("/:id", verifyToken, authorController.getAuthorById);
authorRouter.put("/:id", verifyTokenForManager, authorController.updateAuthor);
authorRouter.delete(
  "/:id",
  verifyTokenForManager,
  authorController.deleteAuthor
);
