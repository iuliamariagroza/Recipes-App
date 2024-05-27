import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import { Server, Socket } from "socket.io";
import { recipesRepository } from "./repository/RecipesRepository";
import { authorRouter } from "./routes/AuthorRouter";
import { recipesRouter } from "./routes/RecipesRouter";
import { userRouter } from "./routes/UserRouter";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const PORT = 80;
const MONGOURI =
  process.env.MONGODB_CONNECTION_STRING ||
  "mongodb+srv://iulia_m_groza:mariA03@recipes-chefs-db.rowomkw.mongodb.net/?retryWrites=true&w=majority&appName=recipes-chefs-db";

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "172.31.4.200",
    // origin: "http://localhost:80",
    methods: ["GET", "POST"],
  },
});

const sockets: Socket[] = [];

setInterval(async () => {
  try {
    const recipe = await recipesRepository.createRecipe();
    await recipesRepository.addRecipe(recipe);
    const recipes = await recipesRepository.getRecipes();

    for (let socket of sockets) {
      socket.emit("received_recipes", recipes);
    }
  } catch (error) {
    console.error("Error getting recipes: ", error);
  }
}, 10000);

io.on("connection", (socket) => {
  sockets.push(socket);
  console.log("A user has connect to socket " + socket.id);
});

// server.listen(PORT, () => {
//   console.log("listening on *:4000");
// });

export const socket = io;

app.use("/recipes", recipesRouter);
app.use("/authors", authorRouter);
app.use("/users", userRouter);
module.exports = app;

mongoose
  .connect(MONGOURI)
  .then(async () => {
    console.log("Connected to MongoDB");
    await recipesRepository.clearRecipes();
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
