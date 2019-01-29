// utils
const { serverRes } = require("../utils/serverRes");

const isUser = (req, res, next) => {
  const currentUserId = req.user._id;
  const { userId } = req.params;

  if (currentUserId.toString() !== userId.toString()) {
    serverRes(res, 401, "Unauthorized Request", null);
  }
  next();
};

module.exports = isUser;
