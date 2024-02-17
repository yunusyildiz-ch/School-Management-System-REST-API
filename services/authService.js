import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Student from '../models/student.js';
import Teacher from '../models/teacher.js';

export const registerUser = async (userData) => {
  try {

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = await User.create({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      role: userData.role 
    });
    if (userData.role === 'student') {
      await Student.create({ userId: newUser.id });
    } else if (userData.role === 'teacher') {
      await Teacher.create({ userId: newUser.id });
    }

    return newUser;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    
    const user = await User.findOne({where: { email:email } });
    if (!user) {
      throw new Error('User not found');
    }
  
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error('Incorrect password');
    }
 
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1w' });
    return token;
  } catch (error) {
    throw error;
  }
};


