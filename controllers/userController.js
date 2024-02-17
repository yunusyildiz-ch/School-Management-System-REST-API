import * as UserService from '../services/userService.js'

export const register = async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Unauthorized" });
      }
      const { name, email, password, role, expertise, classId } = req.body;
      const newUser = await UserService.register({
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