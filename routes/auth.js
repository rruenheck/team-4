import { Router } from "express";
import { registerUser } from "../controller/auth.js";

const router = Router();

router.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

router.get("/register", (req, res) => {
  res.render("register", { title: "Register" });
  // Not implemented yet
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  // Not implemented yet
  res.status(200).json({ message: "Login successful" });
});

router.post("/register", registerUser);

export default router;
