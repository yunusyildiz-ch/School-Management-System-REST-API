
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
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure `.env` file based on `.env.example` provided.

### Running Locally

1. Start the server:
   ```bash
   npm start
   ```

### Deploying to Vercel

1. Ensure all environment variables are set in Vercel.
2. Follow Vercel's documentation for Node.js applications.
3. Verify deployment by accessing the live API endpoints.

## API Documentation

Refer to the Swagger documentation for detailed API endpoint information (optional).

## Submission

- The project is submitted via GitHub with comprehensive setup and deployment instructions in the README.
- Add `courses@hicoders.ch` as a collaborator.
- Include `.env.example` in the repository.
- The live API URL is provided in the submission.
