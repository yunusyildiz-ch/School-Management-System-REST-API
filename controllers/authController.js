
import { validationResult } from 'express-validator';
import { registerUser, authenticateUser } from '../services/authService.js';

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await authenticateUser(req.body.email, req.body.password);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};