import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  ValidateRegistration,
  validateLogin,
} from "../Validations/UserCredentialsValidator";
import { User, UserModel } from "../models/user";
import { NotFoundException } from "../exceptions/NotFoundException";

const SECRET_KEY = "mpp_project";

class UserController {
  createUser = async (req: Request, res: Response) => {
    const validationErrors: string[] = ValidateRegistration(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).send(validationErrors);
    }
    try {
      const existingUser = await UserModel.findOne({
        username: req.body.username,
      });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      const data: User = {
        id: undefined,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
      };
      const user = new UserModel(data);
      const addedUser = await user.save();
      return res.send(addedUser);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  };

  loginUser = async (req: Request, res: Response) => {
    const validationErrors: string[] = validateLogin(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).send(validationErrors);
    }
    const { username, password } = req.body;
    try {
      const user = await UserModel.findOne({
        username: username,
        password: password,
      });

      if (!user) {
        return res.status(440).send({ message: "User is not registered" });
      } else if (
        user?.password !== req.body.password &&
        user.username === req.body.username
      ) {
        res.status(440).send({ message: "Password incorrect." });
      } else if (
        user.username !== req.body.username &&
        user.password === req.body.password
      ) {
        return res.status(440).send({ message: "Username incorrect." });
      }

      const token = jwt.sign({ username, role: user?.role }, SECRET_KEY, {
        expiresIn: "1d",
      });
      return res.status(200).send({ message: "Login successfull", token });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  };

  getUsers = async (req: Request, res: Response) => {
    try {
      const users = await UserModel.find();
      res.status(200).send(users);
    } catch (e) {
      if (e instanceof NotFoundException) {
        res.status(404).send(e.message);
      } else {
        console.log(e);
        res.status(500).send("Internal server error");
      }
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const user: any = await UserModel.findById(id);
      const { username, password, role } = req.body;
      user.username = username;
      user.password = password;
      user.role = role;
      await user.save();
      res.status(200).send(user);
    } catch (e) {
      if (e instanceof NotFoundException) {
        res.status(404).send(e.message);
      } else {
        console.log(e);
        res.status(500).send("Internal server error");
      }
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const user = await UserModel.findById(id);
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      await user.deleteOne();
      res.status(200).send();
    } catch (e) {
      console.log(e);
      res.status(500).send("Internal server error");
    }
  };
}

export const userController = new UserController();
