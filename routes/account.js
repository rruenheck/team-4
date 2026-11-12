import { Router } from "express";
import { showAccount, updateAccName } from "../controller/account.js";

const router = Router();

router.get("/account", showAccount);
router.post("/account/:id/name", updateAccName);

export default router;
