import { Router } from "express";
import { registerUser } from "../controller/auth.js";
import { loginUser } from "../controller/auth.js";

const router = Router();

router.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

router.get("/register", (req, res) => {
  res.render("register", { title: "Register" });
  // Not implemented yet
});

router.post("/login", loginUser);

router.post("/register", registerUser);

export default router;
