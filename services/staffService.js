import Staff from "../models/staff.js";

const createStaff = async (userId, expertise) => {
  try {
    await Staff.create({ userId: userId, expertise: expertise });
  } catch (error) {
    throw error;
  }
};

export { createStaff };
