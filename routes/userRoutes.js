import express from 'express';
import passport from '../config/passport.js';
import * as UserController from '../controllers/userController.js'
import { isAdminOrAssistant } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    UserController.createUser
  );

router.get("/",passport.authenticate("jwt", { session: false }),isAdminOrAssistant,UserController.getAllUsers)


  export default router;