import * as AuthService from "../services/authService.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await AuthService.login(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
