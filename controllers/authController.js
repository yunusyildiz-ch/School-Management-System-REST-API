import { registerUser, loginUser } from "../services/authService.js";

export const register = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const { name, email, password, role, expertise, classId } = req.body;
    const newUser = await registerUser({
      name,
      email,
      password,
      role,
      expertise,
      classId,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
