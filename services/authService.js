import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const registerUser = async (userData) => {
  try {

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = await User.create({
      username: userData.username,
      email: userData.email,
      password: hashedPassword,
      role: userData.role 
    });
    return newUser;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (username, password) => {
  try {
    
    const user = await User.findOne({ where: { username } });
    if (!user) {
      throw new Error('User not found');
    }
  
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error('Incorrect password');
    }
 
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '5h' });
    return token;
  } catch (error) {
    throw error;
  }
};


