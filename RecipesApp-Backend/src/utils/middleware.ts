const jwt = require("jsonwebtoken");
import type { RequestHandler } from "express";

export const verifyToken: RequestHandler = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, "mpp_project");
    req.body["username"] = decoded.username;
    req.body["role"] = decoded.role;
    next();
  } catch (error) {
    console.log(error);

    res.status(401).json({ error: "Invalid token" });
  }
};

export const verifyTokenForManager: RequestHandler = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, "mpp_project");
    req.body["username"] = decoded.username;
    req.body["role"] = decoded.role;
    if (["manager", "admin"].includes(decoded.role)) {
      next();
    } else {
      res.status(401).json({ error: "Invalid token" });
    }
  } catch (error) {
    console.log(error);

    res.status(401).json({ error: "Invalid token" });
  }
};

export const verifyTokenForAdmin: RequestHandler = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, "mpp_project");
    req.body["username"] = decoded.username;
    req.body["role"] = decoded.role;
    if (decoded.role === "admin") {
      next();
    } else {
      res.status(401).json({ error: "Invalid token" });
    }
  } catch (error) {
    console.log(error);

    res.status(401).json({ error: "Invalid token" });
  }
};
