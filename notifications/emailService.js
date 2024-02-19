import nodemailer from "nodemailer";

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


transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });