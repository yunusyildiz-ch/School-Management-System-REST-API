
# School Management System REST API

## Overview

This RESTful API project is designed for managing a school's core functions, including handling student, teacher, and class data, as well as facilitating grade management. Built with Node.js and Express.js, and utilizing Sequelize with a MySQL database, it features JWT authentication, automated notifications via Nodemailer, and file management capabilities. The system is deployed on Vercel for live interaction.

## Key Features

- **JWT Authentication:** Secure access using Passport.js.
- **Role-Based Access Control:** Defined roles for Admin, Teacher, and Student with specific permissions.
- **CRUD Operations:** Manage student, teacher, and class records, including creating, viewing, editing, and deleting.
- **Grade Management:** Allows teachers to add, update, and view grades for students.
- **Automated Email Alerts:** Utilizes Nodemailer for sending notifications about assignments, grades, and schedules.
- **Scheduled Reminders:** Uses node-cron for reminders about classes or deadlines.
- **PDF Generation:** For reports on student grades and attendance.
- **File Management:** Upload and download educational content.
- **Deployment:** Backend system deployed on Vercel.

## User Stories

- **Admin:** Manage teacher/student profiles, create classes, view reports.
- **Teacher:** Access class schedules, manage student grades, upload materials.
- **Student:** View class schedules, access grades, download materials.

## Technical Requirements

- **Express.js Endpoints:** Secure and structured.
- **Separation of Concerns:** Organized into models, routers, services.
- **JWT and Role-Based Access:** Secure routes with JWT tokens.
- **Sequelize and MySQL:** Efficient database design.
- **Deployment:** API deployed on Vercel with proper environment configuration.

## Setup and Deployment

### Prerequisites

- Node.js and npm installed.
- MySQL database setup.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/josephfox-ch/School-Management-System-REST-API.git

```

2. Install dependencies:

Ensure you have Node.js installed on your machine. Then, navigate to the project directory in your terminal and run the following command to install the dependencies:

   ```bash

   npm install

   ```

3. Configure `.env` file based on `env.example.json` provided.

# Running Locally

To run the application locally, you'll need to follow these steps:

1. Start the Application
After installing the dependencies, start the application by running the following command:

```bash

npm start

```

This command will start the application and establish a connection to the database. However, if you've removed the app.listen function call from the app.js file, you'll need to add it back to ensure the application listens on a port. Here's an example of how you can modify the code:

```bash

connectDB()
  .then(async () => {
    await createAdminUser();
    app.listen(process.env.EXPRESS_PORT || 3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((error) => {
    console.error("Database connection error: " + error.message);
    process.exit(1);
  });

  ```

2. Access the Application
Once the application is running locally, you can access it by navigating to http://localhost:3000 in your web browser.

**Note:**
Make sure you have your database credentials properly configured in the .env file.
Adjust the port number (3000 in this example) as needed.
After making these changes, you should be able to run the application locally using the npm start command.

3. Start the server:

```bash

   npm start

   ```

## API Documentation

- School Management System.postman_collection.json

## Vercel Deployment and App Usage

### Vercel Deployment

This School Management System backend application has been deployed to Vercel and is currently live. You can access the deployed application at the following link:

```bash

school-management-system-rest-api.vercel.app

```

### Application Setup

Upon initial setup, the application automatically creates an admin user with the email `admin@admin.com` and password `admin`. This admin user has full access to the system.

### User Authentication

To authenticate as a user and obtain a JWT token, you can make a POST request to the /api/auth/login endpoint with the following credentials:

```bash
"email": "admin@admin.com"
"Password": "admin"

```

### Testing with Postman

You can test the API endpoints using Postman. Here's how to authenticate and test other endpoints:

- Login: Make a POST request to /api/auth/login with the provided credentials to obtain a JWT token.
- Authorization: Copy the JWT token from the login response.
- Testing Endpoints: Add the JWT token to the Authorization header as a Bearer token. You can now test other endpoints by sending requests with the token attached.
  
Example Request:

```bash

POST \
  https://school-management-system-rest-api.vercel.app/api/auth/login \
 
    "email": "admin@aadmin.com",
    "password": "admin"

  ```

# Endpoints

# Authentication Routes

This document provides information about the authentication endpoints available.

## Login

- **Endpoint:** `POST /api/auth/login`
- **Description:** Authenticates a user and generates a JWT token for authorization.
- **Authentication:** Not required.
- **Request Body:**
  - `name`: The name of the user.
  - `password`: The password of the user.
- **Response:** Upon successful authentication, returns a JWT token to be used for subsequent requests.


# User Routes

This document provides information about the endpoints available for user management.

## Create a User

- **Endpoint:** `POST /api/user`
- **Description:** Creates a new user in the system.
- **Authentication:** Requires authentication with a valid JWT token.
- **Authorization:** Only admin users or assistants can create users.

## Get All Users

- **Endpoint:** `GET /api/user`
- **Description:** Retrieves a list of all users in the system.
- **Authentication:** Requires authentication with a valid JWT token.
- **Authorization:** Only admin users or assistants can view all users.

## Get User by ID

- **Endpoint:** `GET /api/user/:id`
- **Description:** Retrieves the details of a specific user by their ID.
- **Authentication:** Requires authentication with a valid JWT token.
- **Authorization:** Only admin users or assistants can view user details.

## Update User

- **Endpoint:** `PUT /api/user/:id`
- **Description:** Updates the details of a specific user.
- **Authentication:** Requires authentication with a valid JWT token.
- **Authorization:** Only admin users or assistants can update user details.

## Delete User

- **Endpoint:** `DELETE /api/user/:id`
- **Description:** Deletes a specific user from the system.
- **Authentication:** Requires authentication with a valid JWT token.
- **Authorization:** Only admin users or assistants can delete users.

# Teacher Routes

This document provides information about the endpoints available for teacher management.

## Get All Teachers

- **Endpoint:** `GET /api/teacher`
- **Description:** Retrieves a list of all teachers in the system.
- **Authentication:** Requires authentication with a valid JWT token.
- **Authorization:** Admins, assistants, or teachers can view all teachers.

## Get Teacher by ID

- **Endpoint:** `GET /api/teacher/:id`
- **Description:** Retrieves the details of a specific teacher by their ID.
- **Authentication:** Requires authentication with a valid JWT token.
- **Authorization:** Admins, assistants, or the teacher themselves can view teacher details.

## Get Students of Teacher

- **Endpoint:** `GET /api/teacher/:id/student`
- **Description:** Retrieves the list of students assigned to a specific teacher.
- **Authentication:** Requires authentication with a valid JWT token.
- **Authorization:** Admins, assistants, or the teacher themselves can view the students.

## Get Class Schedules of Teacher

- **Endpoint:** `GET /api/teacher/:id/class-schedule`
- **Description:** Retrieves the class schedules of a specific teacher.
- **Authentication:** Requires authentication with a valid JWT token.
- **Authorization:** Admins, assistants, or teachers can view the class schedules.

## Remove Class Schedule of Teacher

- **Endpoint:** `DELETE /api/teacher/:id/class-schedule/:classScheduleId`
- **Description:** Removes a class schedule assigned to a specific teacher.
- **Authentication:** Requires authentication with a valid JWT token.
- **Authorization:** Admins, assistants, or teachers can remove class schedules.

## Update Teacher

- **Endpoint:** `PUT /api/teacher/:id`
- **Description:** Updates the details of a specific teacher.
- **Authentication:** Requires authentication with a valid JWT token.
- **Authorization:** Only admins or assistants can update teacher details.

## Delete Teacher

- **Endpoint:** `DELETE /api/teacher/:id`
- **Description:** Deletes a specific teacher from the system.
- **Authentication:** Requires authentication with a valid JWT token.
- **Authorization:** Only admins or assistants can delete teachers.

# Student Routes

This document provides information about the endpoints available for student management.

## Get All Students

- **Endpoint:** `GET /api/student`
- **Description:** Retrieves a list of all students in the system.
- **Authentication:** Requires authentication with a valid JWT token.
- **Authorization:** Only administrators or assistants can view all students.

## Get Student by ID

- **Endpoint:** `GET /api/student/:id`
- **Description:** Retrieves the details of a specific student by their ID.
- **Authentication:** Requires authentication with a valid JWT token.
- **Authorization:** Only administrators or assistants can view student details.

## Get Student's Class Schedule

- **Endpoint:** `GET /api/student/:id/class-schedule`
- **Description:** Retrieves the class schedule of a specific student.
- **Authentication:** Requires authentication with a valid JWT token.
- **Authorization:** Only administrators or assistants can view student class schedules.

## Get Student's Teachers

- **Endpoint:** `GET /api/student/:id/teacher`
- **Description:** Retrieves the teachers of a specific student.
- **Authentication:** Requires authentication with a valid JWT token.
- **Authorization:** Only administrators or assistants can view student teachers.

## Update Student

- **Endpoint:** `PUT /api/student/:id`
- **Description:** Updates the details of a specific student.
- **Authentication:** Requires authentication with a valid JWT token.
- **Authorization:** Only administrators or assistants can update student details.

## Delete Student

- **Endpoint:** `DELETE /api/student/:id`
- **Description:** Deletes a specific student from the system.
- **Authentication:** Requires authentication with a valid JWT token.
- **Authorization:** Only administrators or assistants can delete students.

# Class Routes

This document provides information about the endpoints available for class management.

## Create Class

- **Endpoint:** `POST /api/class`
- **Description:** Creates a new class.
- **Authentication:** Requires authentication with a valid JWT token.
- **Authorization:** Only administrators or assistants can create classes.

## Get All Classes

- **Endpoint:** `GET /api/class`
- **Description:** Retrieves a list of all classes in the system.
- **Authentication:** Requires authentication with a valid JWT token.

## Get Class by ID

- **Endpoint:** `GET /api/class/:id`
- **Description:** Retrieves the details of a specific class by its ID.
- **Authentication:** Requires authentication with a valid JWT token.

## Update Class

- **Endpoint:** `PUT /api/class/:id`
- **Description:** Updates the details of a specific class.
- **Authentication:** Requires authentication with a valid JWT token.
- **Authorization:** Only administrators or assistants can update classes.

## Delete Class

- **Endpoint:** `DELETE /api/class/:id`
- **Description:** Deletes a specific class from the system.
- **Authentication:** Requires authentication with a valid JWT token.
- **Authorization:** Only administrators or assistants can delete classes.

## Add Teacher to Class

- **Endpoint:** `POST /api/class/:id/teacher/:teacherId`
- **Description:** Adds a teacher to a specific class.
- **Authentication:** Requires authentication with a valid JWT token.
- **Authorization:** Only administrators or assistants can add teachers to classes.

## Add Student to Class

- **Endpoint:** `POST /api/class/:id/student/:studentId`
- **Description:** Adds a student to a specific class.
- **Authentication:** Requires authentication with a valid JWT token.
- **Authorization:** Only administrators or assistants can add students to classes.

## Get Teachers of Class

- **Endpoint:** `GET /api/class/:id/teacher`
- **Description:** Retrieves the teachers assigned to a specific class.
- **Authentication:** Requires authentication with a valid JWT token.

## Get Students of Class

- **Endpoint:** `GET /api/class/:id/student`
- **Description:** Retrieves the students enrolled in a specific class.
- **Authentication:** Requires authentication with a valid JWT token.

## Remove Teacher from Class

- **Endpoint:** `DELETE /api/class/:id/teacher/:teacherId`
- **Description:** Removes a teacher from a specific class.
- **Authentication:** Requires authentication with a valid JWT token.
- **Authorization:** Only administrators or assistants can remove teachers from classes.

## Remove Student from Class

- **Endpoint:** `DELETE /api/class/:id/student/:studentId`
- **Description:** Removes a student from a specific class.
- **Authentication:** Requires authentication with a valid JWT token.
- **Authorization:** Only administrators or assistants can remove students from classes.

## Set Assignment to Class

- **Endpoint:** `POST /api/class/:id/assignment/:assignmentId`
- **Description:** Assigns an assignment to a specific class.
- **Authentication:** Requires authentication with a valid JWT token.
- **Authorization:** Only administrators, assistants, or teachers can set assignments to classes.

## Get Assignments of Class

- **Endpoint:** `GET /api/class/:id/assignment`
- **Description:** Retrieves the assignments assigned to a specific class.
- **Authentication:** Requires authentication with a valid JWT token.

# Class Schedule Routes

This document provides information about the class schedule endpoints available.

## Create Class Schedule

- **Endpoint:** `POST /api/class-schedule`
- **Description:** Creates a new class schedule.
- **Authentication:** Requires a valid JWT token with admin or teacher role.
- **Request Body:**
  - `scheduleData`: JSON object containing schedule details.
- **Response:** Returns the created class schedule.

## Assign Class Schedule to Class and Create Attendance

- **Endpoint:** `POST /api/class-schedule/:classScheduleId/class/:classId`
- **Description:** Assigns a class schedule to a class and creates attendance records for the class.
- **Authentication:** Requires a valid JWT token with admin or teacher role.
- **Request Parameters:**
  - `classScheduleId`: The ID of the class schedule.
  - `classId`: The ID of the class to which the schedule is assigned.
- **Response:** Returns the updated class schedule and attendance records.

## Update Class Schedule

- **Endpoint:** `PUT /api/class-schedule/:classScheduleId`
- **Description:** Updates an existing class schedule.
- **Authentication:** Requires a valid JWT token with admin role.
- **Request Parameters:**
  - `classScheduleId`: The ID of the class schedule to update.
- **Request Body:**
  - `scheduleData`: JSON object containing updated schedule details.
- **Response:** Returns the updated class schedule.

# Assignment Routes

This document provides information about the assignment endpoints available.

## Get All Assignments

- **Endpoint:** `GET /api/assignment`
- **Description:** Retrieves all assignments.
- **Authentication:** Requires a valid JWT token with admin or assistant role.
- **Response:** Returns a list of all assignments.

## Create Assignment

- **Endpoint:** `POST /api/assignment`
- **Description:** Creates a new assignment.
- **Authentication:** Requires a valid JWT token with admin or teacher role.
- **Request Body:**
  - `assignmentData`: JSON object containing assignment details.
- **Response:** Returns the created assignment.

## Get Assignment by ID

- **Endpoint:** `GET /api/assignment/:id`
- **Description:** Retrieves an assignment by its ID.
- **Authentication:** Requires a valid JWT token with admin or teacher role.
- **Request Parameters:**
  - `id`: The ID of the assignment to retrieve.
- **Response:** Returns the assignment with the specified ID.

## Update Assignment

- **Endpoint:** `PUT /api/assignment/:id`
- **Description:** Updates an existing assignment.
- **Authentication:** Requires a valid JWT token with admin role.
- **Request Parameters:**
  - `id`: The ID of the assignment to update.
- **Request Body:**
  - `assignmentData`: JSON object containing updated assignment details.
- **Response:** Returns the updated assignment.

## Delete Assignment

- **Endpoint:** `DELETE /api/assignment/:id`
- **Description:** Deletes an assignment.
- **Authentication:** Requires a valid JWT token with admin role.
- **Request Parameters:**
  - `id`: The ID of the assignment to delete.
- **Response:** Returns a success message upon successful deletion.

# Grade Routes

This document provides information about the grade endpoints available.

## Add Grade

- **Endpoint:** `POST /api/grade/student/:studentId/assignment/:assignmentId`
- **Description:** Adds a grade for a student's assignment.
- **Authentication:** Requires a valid JWT token with admin, assistant, or teacher role.
- **Request Parameters:**
  - `studentId`: The ID of the student.
  - `assignmentId`: The ID of the assignment.
- **Request Body:**
  - `gradeData`: JSON object containing grade details.
- **Response:** Returns the added grade.

## Remove Grade

- **Endpoint:** `DELETE /api/grade/student/:studentId/assignment/:assignmentId`
- **Description:** Removes a grade for a student's assignment.
- **Authentication:** Requires a valid JWT token with admin, assistant, or teacher role.
- **Request Parameters:**
  - `studentId`: The ID of the student.
  - `assignmentId`: The ID of the assignment.
- **Response:** Returns a success message upon successful removal.

## Get Grade

- **Endpoint:** `GET /api/grade/student/:studentId/assignment/:assignmentId`
- **Description:** Retrieves the grade for a student's assignment.
- **Authentication:** Requires a valid JWT token with admin, assistant, or teacher role.
- **Request Parameters:**
  - `studentId`: The ID of the student.
  - `assignmentId`: The ID of the assignment.
- **Response:** Returns the grade of the specified assignment for the student.

## Get All Grades of Student

- **Endpoint:** `GET /api/grade/student/:studentId`
- **Description:** Retrieves all grades of a student.
- **Authentication:** Requires a valid JWT token with admin, assistant, or teacher role.
- **Request Parameters:**
  - `studentId`: The ID of the student.
- **Response:** Returns a list of all grades of the student.

## Update Grade

- **Endpoint:** `PUT /api/grade/student/:studentId/assignment/:assignmentId`
- **Description:** Updates the grade for a student's assignment.
- **Authentication:** Requires a valid JWT token with admin, assistant, or teacher role.
- **Request Parameters:**
  - `studentId`: The ID of the student.
  - `assignmentId`: The ID of the assignment.
- **Request Body:**
  - `gradeData`: JSON object containing updated grade details.
- **Response:** Returns the updated grade.

# Report Routes

This document provides information about the report endpoints available.

## Download Attendance Report

- **Endpoint:** `GET /api/report/attendance-report/:classId`
- **Description:** Downloads an attendance report for a specific class.
- **Authentication:** Requires a valid JWT token with admin, assistant, or teacher role.
- **Request Parameters:**
  - `classId`: The ID of the class.
- **Response:** Initiates a download of the attendance report file.

## Download Grades Report for Assignment

- **Endpoint:** `GET /api/report/grades-report/assignment/:assignmentId`
- **Description:** Downloads a grades report for a specific assignment.
- **Authentication:** Requires a valid JWT token with admin, assistant, or teacher role.
- **Request Parameters:**
  - `assignmentId`: The ID of the assignment.
- **Response:** Initiates a download of the grades report file.

# File Routes

This document provides information about the file upload and download endpoints available.

## Upload File

- **Endpoint:** `POST /api/file/upload`
- **Description:** Uploads a file to the server.
- **Authentication:** Requires a valid JWT token with admin, assistant, or teacher role.
- **Request Body:**
  - `file`: The file to be uploaded.
- **Response:** Returns a message indicating successful file upload.

## Download File

- **Endpoint:** `GET /api/file/download/:filename`
- **Description:** Downloads a file from the server.
- **Request Parameters:**
  - `filename`: The name of the file to be downloaded.
- **Response:** Initiates a download of the specified file.

## School Management System REST API - Email Notification Services

## Overview

The provided code snippets demonstrate the implementation of email notification services using Nodemailer in a School Management System REST API. The system sends various types of emails to users, such as welcome emails, assignment notifications, and reminder emails.

## Setting Up Nodemailer

```import nodemailer from "nodemailer";```

Nodemailer is imported to facilitate sending emails within the application.

Configuration

```bash
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.APP_EMAIL_ADDRESS,
    pass: process.env.APP_EMAIL_PASS,
  });

  ```

A transporter is created using SMTP transport. Gmail's SMTP server is used for sending emails. The email address and password are obtained from environment variables for authentication.

## Welcome Email

```bash
export const sendWelcomeEmail = async (email, name) => {
  // Mail options
}; 
```

The sendWelcomeEmail function sends a welcome email to newly signed-up users. It includes a personalized greeting message.

## New Assignment Notification

```bash
export const sendNewAssignmentMail = async (email, name, assignmentTitle, date, attachmentPath = null) => {
  // Mail options
};
```

The sendNewAssignmentMail function sends a notification email to students when a new assignment is added to their class. It includes details such as assignment title and due date.

## Assignment Grade Notification

```bash
export const sendAssignmentGradeMail = async (email, name, assignmentTitle, date, grade) => {
  // Mail options
};

```

The sendAssignmentGradeMail function notifies students of their assignment grades. It includes details such as the assignment title, grade, due date, and graded date.

## Assignment Reminder

```bash
export const sendAssignmentReminderMail = async (email, name, assignmentTitle, dueDate) => {
  // Mail options
};

```

The sendAssignmentReminderMail function sends a reminder email to students about upcoming assignment deadlines. It includes details such as the assignment title and due date.

## Email Verification

```bash
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

```

The transporter's verify method is called to check if the email server is ready to take messages. This ensures that the email configuration is correct and the server is operational.

## Conclusion

These functions provide essential email notification capabilities within the School Management System REST API. They enhance user experience by keeping students and teachers informed about important events and deadlines.