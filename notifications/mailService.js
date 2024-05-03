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
    subject: "Welcome to HiCoders!",
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to HiCoders!</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
        }
        .container {
          display: flex;
          align-items: center;
          justify-content:center;
          padding: 20px;
          background-color: #f0f0f0;
        }
        .message {
          flex: 1;
          padding: 20px;
        }
        h1 {
          color: #333;
        }
        p {
          color: #666;
        }
        .address {
          font-style: italic;
          color: #999;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="message">
          <h1>Welcome to HiCoders!</h1>
          <p>Hi <strong>${name}</strong>, welcome to our School! We're glad you're here.</p>
          <p class="address">Schaffhauserstrasse 470</p>
          <p class="address">8052 Zürich</p>
        </div>
      </div>
    </body>
    </html>
    `,
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
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Assignment Notification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 5px;
            }
            h1, h2, h3, h4, h5, h6 {
                margin-top: 0;
                margin-bottom: 10px;
            }
            p {
                margin-top: 0;
                margin-bottom: 15px;
            }
            strong {
                font-weight: bold;
            }
            .footer {
                margin-top: 30px;
                padding-top: 15px;
                border-top: 1px solid #ddd;
            }
            .footer p {
                margin-top: 0;
            }
            .address {
              font-style: italic;
              color: #999;
            }

        </style>
    </head>
    <body>
        <div class="container">
            <h2>New Assignment Notification</h2>
            <p>Hi <strong>${name}</strong>,</p>
            <p>A new assignment <strong>"${assignmentTitle}"</strong> has been added to your class.</p>
            <p><strong>Assignment Due Date:</strong> ${format(date, "dd-MM-yyyy")}</p>
            <div class="footer">
                <p><strong>√ Edu-Board Department</strong></p>
                <p><strong>© Hicoders</strong></p>
                <p class="address">Schaffhauserstrasse 470</p>
                <p class="address">8052 Zürich</p>
            </div>
        </div>
    </body>
    </html>
    
    `,
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
  grade
) => {
  const mailOptions = {
    from: process.env.APP_EMAIL_ADDRESS,
    to: email,
    subject: "Assignment Grade",
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Assignment Graded</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 5px;
            }
            h2, h3, h4, h5, h6 {
                margin-top: 0;
                margin-bottom: 10px;
            }
            p {
                margin-top: 0;
                margin-bottom: 15px;
            }
            strong {
                font-weight: bold;
            }
            .footer {
                margin-top: 30px;
                padding-top: 15px;
                border-top: 1px solid #ddd;
            }
            .footer p {
                margin-top: 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Assignment Graded</h2>
            <p>Hi <strong>${name}</strong>,</p>
            <p>Your grade for the assignment <strong>"${assignmentTitle}"</strong> has been posted.</p>
            <p><strong>Grade:</strong> ${grade}</p>
            <p><strong>Assignment Due Date:</strong> ${format(date, "dd-MM-yyyy")}</p>
            <p><strong>Graded Date:</strong> ${format(new Date(), "dd-MM-yyyy")}</p>
            <div class="footer">
                <p><strong>√ Edu-Board Department</strong></p>
                <p><strong>© HiCoders</strong></p>
            </div>
        </div>
    </body>
    </html>
    
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Grade notification email sent successfully");
  } catch (error) {
    console.error("Error sending grade notification email:", error);
  }
};

export const sendAssignmentReminderMail = async (
  email,
  name,
  assignmentTitle,
  dueDate
) => {
  const mailOptions = {
    from: process.env.APP_EMAIL_ADDRESS,
    to: email,
    subject: "Assignment Due Tomorrow",
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Assignment Reminder</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 5px;
            }
            h2, h3, h4, h5, h6 {
                margin-top: 0;
                margin-bottom: 10px;
            }
            p {
                margin-top: 0;
                margin-bottom: 15px;
            }
            strong {
                font-weight: bold;
            }
            .footer {
                margin-top: 30px;
                padding-top: 15px;
                border-top: 1px solid #ddd;
            }
            .footer p {
                margin-top: 0;
            }
            .address {
              font-style: italic;
              color: #999;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Assignment Reminder</h2>
            <p>Hi <strong>${name}</strong>,</p>
            <p>Just a reminder that your assignment <strong>"${assignmentTitle}"</strong> is due tomorrow.</p>
            <p><strong>Assignment Due Date:</strong> ${format(dueDate, "dd-MM-yyyy")}</p>
            <p>Please make sure to submit it on time.</p>
            <div class="footer">
                <p><strong>√ Edu-Board Department</strong></p>
                <p><strong>© Hi Coders</strong></p>
                <p class="address">Schaffhauserstrasse 470</p>
                <p class="address">8052 Zürich</p>
            </div>
        </div>
    </body>
    </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Assignment Reminder email sent successfully");
  } catch (error) {
    console.error("Error sending reminder email:", error);
  }
};


export const  sendScheduleReminderEmail= async(email, name, scheduleTitle, startDate)=>{
  const mailOptions = {
    from: process.env.APP_EMAIL_ADDRESS,
    to: email,
    subject: "Class Schedule Reminder",
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Class Schedule Reminder</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 5px;
            }
            h2, h3, h4, h5, h6 {
                margin-top: 0;
                margin-bottom: 10px;
            }
            p {
                margin-top: 0;
                margin-bottom: 15px;
            }
            strong {
                font-weight: bold;
            }
            .footer {
                margin-top: 30px;
                padding-top: 15px;
                border-top: 1px solid #ddd;
            }
            .footer p {
                margin-top: 0;
            }
            .address {
              font-style: italic;
              color: #999;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Class Schedule Reminder</h2>
            <p>Hi <strong>${name}</strong>,</p>
            <p>Just a reminder that the class schedule <strong>"${scheduleTitle}"</strong> will start on ${startDate}.</p>
            <div class="footer">
                <p><strong>√ Edu-Board Department</strong></p>
                <p><strong>© HiCoders</strong></p>
                <p class="address">Schaffhauserstrasse 470</p>
                <p class="address">8052 Zürich</p>
            </div>
        </div>
    </body>
    </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Class schedule reminder email sent successfully");
  } catch (error) {
    console.error("Error sending class schedule reminder email:", error);
    throw error;
  }
}





transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});
