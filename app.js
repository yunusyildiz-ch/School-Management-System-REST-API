import Express from "express";
import cors from "cors";
import Morgan from "morgan";
import "dotenv/config";
import  {connectDB} from "./config/db.js";
//todo : ? import './config/multerConfig.js'
import  './models/index.js'
import { createAdminUser } from "./config/setup.js";
import path from "path";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import passport from "./config/passport.js";
import  {setupCronJobs}  from "./jobs/scheduler.js";
//todo: import { fileURLToPath } from 'url';
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

const options = {
  definition: {
    openapi: "3.0.0",
    
    info: {
      title: "School Management System",
      version: "1.0.0",
      description: "School Management System ReST API Documentation",
      contact:{
        name: "Joseph FOX",
        email: "josephfox@swissmail.com",
        url: "https://www.linkedin.com/in/josephfox-ch/",
        city: "Genève",
        state: "GE",
        country: "CH",
      }
    },
    servers: [
      {
        url: "http://localhost:3000/",
      },
    ],
  },
  apis: ["./routes/*.js"],
}
const spacs = swaggerJsDoc(options)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spacs));



connectDB()
  .then(async () => {
    await createAdminUser()
    
  })
  .catch((error) => {
    console.error("Database connection error: " + error.message);
    process.exit(1);
  });


export default app;
