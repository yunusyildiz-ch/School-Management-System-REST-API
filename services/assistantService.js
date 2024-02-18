import Assistant from "../models/assistant.js";

const createAssistant = async (userId, expertise) => {
  try {
    await Assistant.create({ userId: userId, expertise: expertise });
  } catch (error) {
    throw error;
  }
};

const updateAssistant = async (userId, updatedData) => {
  try {
    const assistant = await Assistant.findOne({ where: { userId: userId } });

    if (!assistant) {
      throw new Error("Assistant not found");
    }

    const updatedAssistant = await assistant.update(updatedData);

    return updatedAssistant;
  } catch (error) {
    throw error;
  }
};

export { createAssistant, updateAssistant };
