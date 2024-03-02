import cron from "node-cron";
import { format, addDays } from "date-fns";
import { Op } from "sequelize";
import { findStudentsForAssignment } from "../utils/utils.js";
import {
  Assignment,
  ClassSchedule,
  Teacher,
  Student,
  User,
  Class,
} from "../models/index.js";

import {
  sendAssignmentReminderMail,
  sendScheduleReminderEmail,
} from "../notifications/mailService.js";

const sendRemindersForAssignmentsDueTomorrow = async () => {
  const today = new Date();
  const tomorrow = addDays(today, 1);

  const assignmentsDueTomorrow = await Assignment.findAll({
    where: {
      dueDate: {
        [Op.gte]: tomorrow,
        [Op.lt]: addDays(tomorrow, 1),
      },
    },
  });

  for (const assignment of assignmentsDueTomorrow) {
    const studentEmails = await findStudentsForAssignment(assignment.id);

    for (const { email, name } of studentEmails) {
      await sendAssignmentReminderMail(
        email,
        name,
        assignment.title,
        format(assignment.dueDate, "yyyy-MM-dd")
      );
    }
  }
};

export async function sendScheduleReminder() {
  try {
    const today = new Date();

    const upcomingSchedules = await ClassSchedule.findAll({
      where: {
        startDate: {
          [Op.gt]: today,
        },
      },
      include: [{ model: Class, include: [Teacher, Student] }],
    });

    console.log("checkPoint", upcomingSchedules);

    for (const schedule of upcomingSchedules) {
      const teachers = schedule.Class.Teachers;
      const students = schedule.Class.Students;

      const userIds = [
        ...teachers.map((teacher) => teacher.userId),
        ...students.map((student) => student.userId),
      ];

      const users = await User.findAll({ where: { id: userIds } });
      const formattedDate = format(
        new Date(schedule.startDate),
        "MM/dd/yyyy 'at' h:mm aa"
      );

      for (const teacher of teachers) {
        const teacherUser = users.find((user) => user.id === teacher.userId);
        if (teacherUser) {
          const email = teacherUser.email;
          const name = teacherUser.name;
          await sendScheduleReminderEmail(
            email,
            name,
            schedule.title,
            formattedDate
          );
        }
      }

      for (const student of students) {
        const studentUser = users.find((user) => user.id === student.userId);
        if (studentUser) {
          const email = studentUser.email;
          const name = studentUser.name;
          await sendScheduleReminderEmail(
            email,
            name,
            schedule.title,
            formattedDate
          );
        }
      }
    }

    console.log("Schedule reminders sent successfully.");
  } catch (error) {
    console.error("Error sending schedule reminders:", error);
    throw error;
  }
}

export function setupAssignmentsCronJobs() {
  cron.schedule("0 23  * * *", () => {
    console.log("Running assignment reminder job...");
    sendRemindersForAssignmentsDueTomorrow();
  });
}

export function setupScheduleCronJobs() {
  cron.schedule("00 15 * * *", async () => {
    try {
      console.log("Running schedule reminder job...");
      await sendScheduleReminderEmail();
    } catch (error) {
      console.error("Error running schedule reminder job:", error);
    }
  });
}
