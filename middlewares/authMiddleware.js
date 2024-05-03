const isAdminOrAssistant = async (req, res, next) => {
  try {
    if (req.user.role === "admin" || req.user.role === "assistant") {
      return next();
    } else {
      return res.status(403).json({ error: "Unauthorized" });
    }
  } catch (error) {
    next(error);
  }
};

const isTeacher = async (req, res, next) => {
  try {
    if (req.user.role === "teacher") {
      return next();
    } else {
      return res.status(403).json({ error: "Unauthorized" });
    }
  } catch (error) {
    next(error);
  }
};

const isAdminOrAssistantOrTeacher = async (req, res, next) => {
  try {
    if (
      req.user.role === "admin" ||
      req.user.role === "assistant" ||
      req.user.role === "teacher"
    ) {
      return next();
    } else {
      return res.status(403).json({ error: "Unauthorized" });
    }
  } catch (error) {
    return next(error);
  }
};

const isStudent = async (req, res, next) => {
  try {
    if (req.user.role === "student") {
      return next();
    } else {
      return res.status(403).json({ error: "Unauthorized" });
    }
  } catch (error) {
    next(error);
  }
};
const isMentor = async (req, res, next) => {
  try {
    if (req.user.role === "mentor") {
      return next();
    } else {
      return res.status(403).json({ error: "Unauthorized" });
    }
  } catch (error) {
    next(error);
  }
};

export {
  isAdminOrAssistant,
  isTeacher,
  isAdminOrAssistantOrTeacher,
  isStudent,
  isMentor,
};
