import express from "express";
import passport from "../config/passport.js";
import { login, register } from "../controllers/authController.js";

const router = express.Router();

router.post("/login",login); //todo: create custom authentication func. for login or create new Strategy for passport.js
router.post(
  "/register",
  passport.authenticate("jwt", { session: false }),
  register
);

export default router;
