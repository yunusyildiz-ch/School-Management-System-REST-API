import express from "express";
import passport from "../config/passport.js";
import { login, register } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", passport.authenticate("jwt", { session: false }), login);
router.post(
  "/register",
  passport.authenticate("jwt", { session: false }),
  register
);

export default router;
