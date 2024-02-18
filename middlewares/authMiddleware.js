const isAdminOrAssistant = async (req, res, next) => {
  console.log(req.user);
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
  console.log(req.user);
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

export { isAdminOrAssistant,isTeacher };
