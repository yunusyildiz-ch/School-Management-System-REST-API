import express from "express";
import * as AuthController from "../controllers/authController.js";

const router = express.Router();

router.post("/login", AuthController.login); //todo: create custom authentication func. for login or create new Strategy for passport.js

export default router;
