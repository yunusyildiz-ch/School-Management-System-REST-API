import Mentor from "../models/mentor.js";

const createMentor = async (userId, expertise) => {
  try {
    await Mentor.create({ userId: userId, expertise: expertise });
  } catch (error) {
    throw error;
  }
};

const updateMentor = async (userId, updatedData) => {
  try {
    const mentor = await Mentor.findOne({ where: { userId: userId } });
    if (!mentor) {
      throw new Error("mentor not found");
    }

    const updatedMentor = await mentor.update(updatedData);

    return updatedMentor;
  } catch (error) {
    throw error;
  }
};

export { createMentor, updateMentor };
