import jwt from "jsonwebtoken";
import crypto from "crypto";
import fs from "fs";
import { Class,Student,User,Assignment} from '../models/index.js'

const generateToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

function calculateFileHash(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash("sha256");
    const stream = fs.createReadStream(filePath);

    stream.on("data", (data) => {
      hash.update(data, "utf8");
    });

    stream.on("end", () => {
      resolve(hash.digest("hex"));
    });

    stream.on("error", (err) => {
      reject(err);
    });
  });
}






async function findStudentsForAssignment(assignmentId) {
  const assignment = await Assignment.findByPk(assignmentId);
  const classes = await assignment.getClasses({
    include: [{
      model: Student,
      as: 'Students'
    }]
  });

  let allStudents = [];
  for (const cls of classes) {
    const students = await cls.getStudents(); 
    allStudents = allStudents.concat(students);
  }

  const studentsInfo = await Promise.all(allStudents.map(async student => {
    const user = await User.findByPk(student.userId);
    if (!user) {
      console.log(`User not found for student ID: ${student.userId}`);
      return null; 
    }
    return { email: user.email, name: user.name };
  }));

  return studentsInfo.filter(info => info !== null); 
}




export { generateToken, calculateFileHash,findStudentsForAssignment };
