import Assistant from "../models/assistant.js";

const createAssistant = async (userId, expertise) => {
  try {
    await Assistant.create({ userId: userId, expertise: expertise });
  } catch (error) {
    throw error;
  }
};

export { createAssistant };
