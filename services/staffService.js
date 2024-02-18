import Staff from "../models/staff.js";

const createStaff = async (userId, expertise) => {
  try {
    await Staff.create({ userId: userId, expertise: expertise });
  } catch (error) {
    throw error;
  }
};

const updateStaff = async (userId,updatedData) => {
  try {
    const staff = await Staff.findOne({where:{userId : userId}});
    if (!staff) {
      throw new Error("Staff not found");
    }

    const updatedStaff = await staff.update(updatedData);

    return updatedStaff;
  } catch (error) {
    throw error;
  }
};


export { createStaff,updateStaff };
