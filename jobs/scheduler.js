import cron from "node-cron";
import { format, addDays } from "date-fns";
import { Op } from "sequelize";
import { findStudentsForAssignment } from "../utils/utils.js";
import { Assignment } from "../models/index.js";

import { sendAssignmentReminderMail } from "../notifications/mailService.js";

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

export function setupCronJobs() {
  cron.schedule("0 23  * * *", () => {
    console.log("Running assignment reminder job...");
    sendRemindersForAssignmentsDueTomorrow();
  });
}
