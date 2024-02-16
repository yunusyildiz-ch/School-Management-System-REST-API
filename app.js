import Express from "express";
import cors from "cors";
import Morgan from "morgan";
import User from './models/user.js';
import UserDetail from './models/userDetail.js'
import Teacher from './models/teacher.js';
import Student from './models/student.js';
import Class from './models/class.js';
import Staff from './models/staff.js'
import Assignment from './models/assignment.js'
import authRoutes from './routes/authRoutes.js'

const app = Express();

app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(Morgan("dev"));





app.use('/api/auth', authRoutes);

export default app;
