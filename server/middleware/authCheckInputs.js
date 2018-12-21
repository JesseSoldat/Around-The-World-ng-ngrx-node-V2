// utils
const { serverRes, getErrMsg } = require("../utils/serverRes");
const isEmail = require("../utils/isEmail");

const authCheckInputs = async (req, res, next) => {
  const { username, email, password } = req.body;

  // register only check for username
  if (req.url === "/api/register") {
    if (!username) {
      const msg = getErrMsg("allFields");
      return serverRes(res, 400, msg, null);
    }
  }

  // check for email and password
  if (!email || !password) {
    const msg = getErrMsg("allFields");
    return serverRes(res, 400, msg, null);
  }

  // check for valid email
  if (!isEmail(email)) {
    const msg = getErrMsg("isEmail");
    return serverRes(res, 400, msg, null);
  }

  // check the password length
  if (password.length < 6) {
    const msg = getErrMsg("passwordLength");
    return serverRes(res, 400, msg, null);
  }

  next();
};

module.exports = authCheckInputs;
