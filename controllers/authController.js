import { registerUser, loginUser } from '../services/authService.js';

export const register = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    const { username, email, password, role } = req.body;
    const newUser = await registerUser({ username, email, password, role });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await loginUser(username, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
