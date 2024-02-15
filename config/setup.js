import bcrypt from "bcrypt";
import User from "../models/user.js";

export async function createAdminUser() {
  try {
    console.log("Connecting to database...");
    const existingAdmin = await User.findOne({ where: { role: "admin" } });
    if (existingAdmin) {
      console.log("An admin user already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash("admin", 10);
    await User.create({
      name: "admin",
      email: "admin@exapmle.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin user created successfully.");
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
}
