import Express from "express";
import cors from "cors";
import Morgan from "morgan";
import "dotenv/config";
import { connectDB } from "./config/db.js";
//todo : ? import './config/multerConfig.js'
import "./models/index.js";
import { createAdminUser } from "./config/setup.js";
import path from "path";
import fs from "fs";
import yaml from "yaml-js";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import passport from "./config/passport.js";
import {
  setupAssignmentsCronJobs,
  setupScheduleCronJobs,
} from "./jobs/scheduler.js";
import { fileURLToPath } from "url";
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

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const openApiYamlPath = path.join(__dirname, "./public/SchoolManSystemOpenAPI.yaml");
const openapiObject = yaml.load(fs.readFileSync(openApiYamlPath, "utf8"));

app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(Morgan("dev"));
app.use(passport.initialize());

app.use(Express.static(path.join(__dirname, "public")));

setupAssignmentsCronJobs();
setupScheduleCronJobs();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public", "welcome.html"));
});
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
app.use("/api/file", fileRoutes);

// const CSS_URL =   "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
  // customCssUrl: CSS_URL

  
const options = {
  swaggerDefinition: openapiObject,
  apis: ["./routes/*.js"],

};

const swaggerSpec = swaggerJsDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

connectDB()
  .then(async () => {
    await createAdminUser().then(async () => {
      app.listen(process.env.EXPRESS_PORT);
    });
  })
  .catch((error) => {
    console.error("Database connection error: " + error.message);
    process.exit(1);
  });

export default app;
