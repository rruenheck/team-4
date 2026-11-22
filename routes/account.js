import { Router } from "express";
import {
  showAccount,
  updateAccName,
  makeAdmin,
} from "../controller/account.js";

const router = Router();

router.get("/account", showAccount);
router.post("/account/:id/name", updateAccName);
router.patch("/account/:id/admin", makeAdmin);

export default router;
