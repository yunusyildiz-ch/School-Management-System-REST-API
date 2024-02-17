import express from 'express';
import passport from '../config/passport.js';
import * as UserController from '../controllers/userController.js'


const router = express.Router();

router.post(
    "/register",
    passport.authenticate("jwt", { session: false }),
    UserController.register
  );


  export default router;