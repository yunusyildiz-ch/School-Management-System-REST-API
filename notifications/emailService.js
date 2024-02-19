import nodemailer from "nodemailer";
import { format } from "date-fns";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.APP_EMAIL_ADDRESS,
    pass: process.env.APP_EMAIL_PASS,
  },
});

export const sendWelcomeEmail = async (email, name) => {
  const mailOptions = {
    from: process.env.APP_EMAIL_ADDRESS,
    to: email,
    subject: "Welcome to School Management System!",
    html: `<p>Hi <strong>${name}</strong>, welcome to our School! We're glad you're here.</p>`,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};

export const sendNewAssignmentMail = async (
  email,
  name,
  assignmentTitle,
  date,
  attachmentPath = null
) => {
  const mailOptions = {
    from: process.env.APP_EMAIL_ADDRESS,
    to: email,
    subject: "New Assignment",
    html: `<p>Hi <strong>${name}</strong>, A new assignment <strong>"${assignmentTitle}"</strong> has been added to your class.</p> 
    <p><strong>Assignment Due Date:</strong> ${format(date, "dd-MM-yyyy")}</p>

     <h4>√ Edu-Board Department</h4>
     <h4>© School Management System</h4>`,
  };

  if (attachmentPath) {
    mailOptions.attachments = [
      {
        path: attachmentPath,
        contentType: "application/pdf",
      },
    ];
  }
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};



export const sendAssignmentGradeMail = async (
  email,
  name,
  assignmentTitle,
  date,
  grade,
) => {
  
  const mailOptions = {
    from: process.env.APP_EMAIL_ADDRESS,
    to: email,
    subject: "Assignment Grade",
    html: `
      <p>Hi <strong>${name}</strong>,</p>
      <p>Your grade for the assignment <strong>"${assignmentTitle}"</strong> has been posted.</p>
      <p><strong>Grade:</strong> ${grade}</p>
      <p><strong>Assignment Due Date:</strong> ${format(date, "dd-MM-yyyy")}</p>
      <p><strong>Graded Date:</strong> ${format(new Date(), "dd-MM-yyyy")}</p>
      <h4>√ Edu-Board Department</h4>
      <h4>© School Management System</h4>
    `,
  };


  try {
    await transporter.sendMail(mailOptions);
    console.log("Grade notification email sent successfully");
  } catch (error) {
    console.error("Error sending grade notification email:", error);
  }
};





transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});
