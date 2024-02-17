import Express from "express";
import cors from "cors";
import Morgan from "morgan";
import passport from "./config/passport.js";
import User from "./models/user.js";
import UserDetail from "./models/userDetail.js";
import Teacher from "./models/teacher.js";
import Student from "./models/student.js";
import Class from "./models/class.js";
import Staff from "./models/staff.js";
import Assignment from "./models/assignment.js";
import authRoutes from "./routes/authRoutes.js";
import classRoutes from "./routes/classRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

const app = Express();

app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(Morgan("dev"));
app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use("/api/class", classRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/student", studentRoutes);

export default app;
