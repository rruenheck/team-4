import { Router } from "express";
import { showAccount } from "../controller/account.js";

const router = Router();

router.get("/account", showAccount);

export default router;
