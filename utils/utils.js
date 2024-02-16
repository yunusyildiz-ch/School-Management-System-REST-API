import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

 const generateToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};




export default generateToken;