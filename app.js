import Express from "express";
import cors from "cors";
import Morgan from "morgan";
import path from "path";
import passport from "./config/passport.js";
import  {setupCronJobs}  from "./jobs/scheduler.js";
//todo: import { fileURLToPath } from 'url';
import {
  User,
  UserDetail,
  Teacher,
  Student,
  Class,
  Mentor,
  Assignment,
  ClassSchedule,
  Attendance,
  Assistant,
  Grade,
} from "./models/index.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import classRoutes from "./routes/classRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import gradeRoutes from "./routes/gradeRoutes.js";
import classScheduleRoutes from "./routes/classScheduleRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

const app = Express();

//todo: const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(Morgan("dev"));
app.use(passport.initialize());
//todo: app.use('/uploads', Express.static(path.join(__dirname,'uploads')));

setupCronJobs();

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/class", classRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/assignment", assignmentRoutes);
app.use("/api/grade", gradeRoutes);
app.use("/api/class-schedule", classScheduleRoutes);
app.use("/api/report", reportRoutes);

//todo: app.use("/api/attendance", attendanceRoutes);
app.use("/api/file",fileRoutes)

export default app;
